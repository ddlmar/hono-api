import { ApiRoutes } from '@server/app'

import { hc } from 'hono/client'

const client = hc<ApiRoutes>(`${import.meta.env.VITE_BASE_URL}`)

export const api = client.api
