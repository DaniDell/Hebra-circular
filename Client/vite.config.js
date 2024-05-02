import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config as loadEnv } from 'dotenv';
import compression from 'vite-plugin-compression';

loadEnv();

// Access environment variables
const backendUrl = process.env.VITE_BACKEND_URL;

export default defineConfig({
  plugins: [react(), compression()],
  server: {
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', 'custom.secret']
    },
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
});