# Nét Nút Studio

Bilingual editorial website for a website redesign studio. English uses unprefixed routes; Vietnamese uses /vi routes.

## Development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

Set `NEXT_PUBLIC_SITE_URL` to final public origin before build. Default fallback is https://netnut.studio.

```bash
npm run lint
npm run build
npm run start
```

## Routes

- / and /vi
- /about and /vi/about
- /contact and /vi/contact
- /redesign/nha-moc-demo and /vi/redesign/nha-moc-demo
- /robots.txt
- /sitemap.xml

Contact form currently validates locally only. Connect real submission destination and privacy policy before production use.

Illustrative case-study previews are synthetic and labeled; no external website is fetched.
