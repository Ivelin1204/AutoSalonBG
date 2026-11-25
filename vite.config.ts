import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// base: './' — сайтът работи от всяка папка (GitHub Pages или директно отваряне на файла).
// viteSingleFile — build-ът е един самостоятелен index.html, който се отваря с двоен клик.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
});
