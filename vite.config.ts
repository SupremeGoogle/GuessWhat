import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Проект раздаётся с GitHub Pages по пути /GuessWhat/, поэтому в сборке
  // ассеты должны получать этот префикс. В dev-сервере база остаётся '/'.
  base: command === 'build' ? '/GuessWhat/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
}));
