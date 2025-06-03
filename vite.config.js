import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/inject.jsx",
      name: "ChatWidget",
      formats: ["iife"],
      fileName: () => `ChatWidget.jsx`,
    },
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      // Optional: you can add global Tailwind config here if needed
    }
  }
})
