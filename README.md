# Devon Hills — Portfolio

A fast, static portfolio with a restrained late-90s terminal aesthetic. It is built with Astro, TypeScript, semantic HTML, and plain CSS. The production page works without client-side JavaScript or third-party requests.

[Live portfolio](https://devonhills.dev) · [Résumé](public/resume.pdf) · [LinkedIn](https://linkedin.com/in/devonjhills) · [Email](mailto:devonjhills@gmail.com)

## Local development

Requires Node.js 22.19 or newer and npm.

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run check    # Validate Astro and TypeScript
npm run build    # Check and generate the static site in dist/
npm run preview  # Preview the production build
```

## Update content

All profile, project, experience, education, and contact content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). Edit the relevant entry, keep project entries in the desired display order, then run `npm run build` before committing.

The full résumé lives at `public/resume.pdf`. The former filename redirects to this stable URL in production, so existing links continue to work.

## Deployment and project subdomains

Cloudflare Pages deploys the `main` branch through its GitHub integration. It builds the site with `npm run build`, publishes `dist/`, and uses Node.js 22.19.0. No Astro adapter, server process, API token, or runtime environment variable is required.

Production redirects and response headers are defined in `public/_redirects` and `public/_headers`. Astro copies both files into `dist/` for Cloudflare Pages to apply.

Future projects should remain independent deployments. To publish one at `project1.devonhills.dev`:

1. Deploy the project using the framework and host suited to that project.
2. Add `project1.devonhills.dev` as its custom domain.
3. Add the provider's requested CNAME or other DNS record for `project1`.
4. Verify HTTPS and the production URL.
5. Add the project and live URL to `src/data/portfolio.ts`.

This keeps the portfolio small and lets each project evolve without coupling its framework or release cycle to this repository.
