# Touchpointe.digital (Next.js)

This project uses **Next.js (App Router)** while keeping the same UI and content.

## Routes

- `/` - Home page
- `/syllabus` - Syllabus page
- Legacy URLs are supported via rewrites:
  - `/index.html` -> `/`
  - `/syllabus.html` -> `/syllabus`

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Deployment Notes

- The admin editor writes to local files in `data/site-content.json` and `public/uploads` during local development.
- Serverless deployments such as Vercel do not provide persistent writable local storage.
- In those deployments, the admin panel now falls back to read-only mode to prevent deployment/runtime failures.
- You can also force read-only mode by setting `CONTENT_READ_ONLY=true`.

## Notes

- Page HTML content is embedded in `lib/legacyPages.js`.
- Global CSS is in `app/globals.css`.
