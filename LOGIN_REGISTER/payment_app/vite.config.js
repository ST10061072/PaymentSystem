import { defineConfig } from 'vite'
import fs from 'fs';
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('../server/keys/privatekey.pem'),
      cert: fs.readFileSync('../server/keys/certificate.pem'),
    },
  },

  plugins: [react()],
})
