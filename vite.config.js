import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    // Serve public/admin/index.html raw at /admin/ in dev.
    // Without this, Vite's SPA fallback serves the main index.html for /admin/.
    // The HTML is served without Vite's HMR injection so the CDN+Babel admin
    // page isn't disrupted by Vite's module pipeline.
    {
      name: 'serve-admin-page',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && /\/admin\/?(\?.*)?$/.test(req.url)) {
            const filePath = path.resolve(__dirname, 'public/admin/index.html')
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(fs.readFileSync(filePath, 'utf-8'))
            return
          }
          next()
        })
      }
    }
  ],
  base: '/MatKenGame/',
})
