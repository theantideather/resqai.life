import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'zustand', '@supabase/supabase-js', 'lucide-react']
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
          auth: ['@supabase/supabase-js', 'zustand']
        }
      }
    }
  }
});