import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // Проект раздаётся с GitHub Pages по пути /GuessWhat/, поэтому в сборке
  // ассеты должны получать этот префикс. В dev-сервере база остаётся '/'.
  // `vite preview` тоже приходит с command === 'serve' (как и dev-сервер),
  // но раздаёт уже собранный `dist`, где base намертво зашит в HTML/JS как
  // '/GuessWhat/' — без учёта isPreview здесь `npm run preview` пытался
  // отдавать ассеты с корня, а собранный бандл запрашивал их по
  // /GuessWhat/assets/*, из-за чего страница оставалась пустой (JS не
  // грузился) при локальном плейтесте уровня.
  base: command === 'build' || isPreview ? '/GuessWhat/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
}));
