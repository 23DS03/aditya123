import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

function getPublicUrl(value) {
  const candidate = value?.trim()
  if (!candidate) return null

  try {
    const url = new URL(candidate)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch {
    return candidate.startsWith('/') && !candidate.startsWith('//') ? candidate : null
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const hasLocalResume = existsSync(fileURLToPath(new URL('./public/resume/resume.pdf', import.meta.url)))
  const resumeUrl = getPublicUrl(env.RESUME_URL) || (hasLocalResume ? '/resume/resume.pdf' : null)
  const linkedinUrl = getPublicUrl(env.LINKEDIN_URL) || 'https://www.linkedin.com/'
  const githubUrl = getPublicUrl(env.GITHUB_URL) || 'https://github.com/'
  const instagramUrl = getPublicUrl(env.INSTAGRAM_URL) || 'https://www.instagram.com/'

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_RESUME_URL': JSON.stringify(resumeUrl),
      'import.meta.env.VITE_LINKEDIN_URL': JSON.stringify(linkedinUrl),
      'import.meta.env.VITE_GITHUB_URL': JSON.stringify(githubUrl),
      'import.meta.env.VITE_INSTAGRAM_URL': JSON.stringify(instagramUrl),
    },
    cacheDir: join(tmpdir(), 'frontend-vite-cache'),
    server: {
      proxy: {
        "/api": {
          target: `http://127.0.0.1:${env.API_PORT || 8000}`,
          changeOrigin: true,
        },
      },
    },
  }
})
