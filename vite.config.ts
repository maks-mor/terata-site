import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Защитная политика безопасности добавляется только в готовую сборку:
// в режиме разработки она мешает живому обновлению страницы.
const securityPolicy = {
  name: 'terata-csp',
  apply: 'build' as const,
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: {
        'http-equiv': 'Content-Security-Policy',
        content:
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'",
      },
      injectTo: 'head-prepend' as const,
    },
  ],
};

// Редирект /infrastructure -> /infrastructure/ чтобы Vite preview не отдавал SPA fallback (главную страницу)
const infrastructureRedirect = {
  name: 'infrastructure-redirect',
  configurePreviewServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url?.split('?')[0];
      if (url === '/infrastructure') {
        const query = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
        res.writeHead(301, { Location: `/infrastructure/${query}` });
        res.end();
        return;
      }
      next();
    });
  },
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url?.split('?')[0];
      if (url === '/infrastructure') {
        const query = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
        res.writeHead(301, { Location: `/infrastructure/${query}` });
        res.end();
        return;
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), securityPolicy, infrastructureRedirect],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Не вшивать мелкие файлы в код: иначе защитная политика их блокирует.
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
