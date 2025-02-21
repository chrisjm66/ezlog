import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: 'http://localhost:8100',
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
  },
})
