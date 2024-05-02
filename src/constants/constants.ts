export const FRONTEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://servify-page.vercel.app/'
    : 'http://localhost:3000';
