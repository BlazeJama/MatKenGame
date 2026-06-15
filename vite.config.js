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
    },
    // Copy data/vehicles.js to dist/data/vehicles.js after every build so the
    // live admin page (a raw CDN-based HTML file, not Vite-bundled) can import
    // it via `import { vehicles } from '../data/vehicles.js'`. Without this
    // copy, Vite only bundles the file into the JS blob and the admin gets a
    // 404, loading with an empty vehicle list.
    {
      name: 'copy-vehicles-data',
      closeBundle() {
        const src  = path.resolve(__dirname, 'data/vehicles.js')
        const dest = path.resolve(__dirname, 'dist/data/vehicles.js')
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(src, dest)
      }
    }
  ],
  base: '/MatKenGame/',
})
