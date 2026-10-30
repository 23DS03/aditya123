# Portfolio

## Deploying on Vercel

The chat API is deployed as Vercel Functions at `/api/chat` and `/api/health`.
For a frontend and API deployed in the same Vercel project, leave
`VITE_API_BASE_URL` unset so the frontend calls the API on the same domain.

Add `GROQ_API_KEY` as an environment variable in the Vercel project settings
(for the Production and Preview environments you use), then redeploy. Do not
put this secret in a `VITE_` variable. If the API is hosted separately, set
`VITE_API_BASE_URL` to that API's base URL and configure its allowed frontend
origin with `FRONTEND_ORIGIN`.
