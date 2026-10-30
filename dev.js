import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { loadEnvFile } from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { createServer } from "vite";

const envFile = fileURLToPath(new URL("./.env", import.meta.url));
const apiServerFile = fileURLToPath(new URL("./server.js", import.meta.url));

try {
  loadEnvFile(envFile);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const apiPort = process.env.API_PORT || "8000";
const healthUrl = `http://127.0.0.1:${apiPort}/api/health`;

let apiProcess = null;
let apiStartupError = null;
let viteServer;
let isStopping = false;

function stop(signal = "SIGTERM") {
  if (isStopping) return;
  isStopping = true;
  if (apiProcess) apiProcess.kill(signal);
  void viteServer?.close();
}

process.once("SIGINT", () => stop("SIGINT"));
process.once("SIGTERM", () => stop("SIGTERM"));

async function waitForApi() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (apiStartupError) {
      throw new Error(`Could not start the Chat API: ${apiStartupError.message}`);
    }

    if (apiProcess?.exitCode !== null) {
      throw new Error("Chat API stopped before it became ready.");
    }

    try {
      const response = await fetch(healthUrl, { signal: AbortSignal.timeout(500) });
      if (response.ok && (await response.json()).status === "ok") return;
    } catch {
      // The API may still be starting.
    }

    await delay(250);
  }

  throw new Error(`Chat API did not become ready at ${healthUrl}.`);
}

try {
  let apiIsReady = false;

  try {
    const response = await fetch(healthUrl, { signal: AbortSignal.timeout(500) });
    apiIsReady = response.ok && (await response.json()).status === "ok";
  } catch {
    // Start the local API if nothing healthy is listening on its configured port.
  }

  if (apiIsReady) {
    console.log(`Using the existing Chat API at http://127.0.0.1:${apiPort}.`);
  } else if (existsSync(apiServerFile)) {
    apiProcess = spawn(process.execPath, [apiServerFile], {
      env: process.env,
      stdio: "inherit",
    });
    apiProcess.once("error", (error) => {
      apiStartupError = error;
    });
    apiProcess.once("exit", (code, signal) => {
      if (isStopping) return;
      console.error(`Chat API exited unexpectedly (code ${code ?? "none"}, signal ${signal ?? "none"}).`);
      process.exitCode = 1;
      void viteServer?.close().finally(() => {
        isStopping = true;
      });
    });
    await waitForApi();
  }

  viteServer = await createServer();
  await viteServer.listen();
  viteServer.printUrls();
} catch (error) {
  stop();
  console.error(error.message);
  process.exitCode = 1;
}
