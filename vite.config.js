import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minimal Vite config — just the React plugin (JSX + Fast Refresh).
// No extra build magic; this is a single-page React app.
export default defineConfig({
  plugins: [react()],
})
