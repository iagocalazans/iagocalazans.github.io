import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resumePrerender } from './vite-plugins/resume-prerender.js';

export default defineConfig({
  plugins: [react(), resumePrerender()],
  server: {
    port: 5173,
    open: false,
  },
});
