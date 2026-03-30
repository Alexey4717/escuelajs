This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server (Turbopack). |
| `pnpm build` | Production build. |
| `pnpm start` | Serve the last production build. |
| `pnpm clean` | Deletes build and cache folders: `.next`, `out`, `build`, `coverage`, `.turbo` (via [`rimraf`](https://www.npmjs.com/package/rimraf), cross-platform). |
| `pnpm clean:full` | Runs `clean`, then removes `node_modules`. Run `pnpm install` afterward. |
| `pnpm lint` | ESLint (`src` + `next.config.ts`) and Stylelint (CSS/SCSS). Fails on warnings (ESLint `--max-warnings 0`). |
| `pnpm lint:fix` | Same linters with auto-fix. |
| `pnpm lint:ts` | ESLint only for `./src/**/*.{ts,tsx}` and `./next.config.ts`. |
| `pnpm lint:ts:fix` | ESLint with `--fix` for the same paths. |
| `pnpm lint:style` | Stylelint for `**/*.{css,scss}` (see `.stylelintrc.cjs`). |
| `pnpm lint:style:fix` | Stylelint with `--fix`. |
| `pnpm prettier` | Prettier write for `ts`, `tsx`, `json`, `css`, `scss`. |
| `pnpm prettier:check` | Prettier check only (no writes); useful in CI. |
| `pnpm analyze` | Bundle analyzer (see below). |
| `pnpm prepare` | Installs [Husky](https://typicode.github.io/husky/) git hooks after `pnpm install`. |

TypeScript is checked during `pnpm build` (and via your editor). This stack uses **ESLint** directly (not `next lint` — not exposed in Next.js 16 CLI here).

**Pre-commit:** `.husky/pre-commit` runs `lint-staged`: Prettier and ESLint/Stylelint with fix on staged `*.{ts,tsx}` and `*.{css,scss}`. Ensure the repo is initialized with `git` so hooks apply.

## Bundle analysis

This project includes [`@next/bundle-analyzer`](https://www.npmjs.com/package/@next/bundle-analyzer). To build with Webpack and open interactive bundle reports (client, Node.js, and edge), run:

```bash
pnpm analyze
```

Reports are written to `.next/analyze/` as HTML files (for example `client.html`). Next.js 16 uses Turbopack for production builds by default; the analyzer requires Webpack, so the script passes `--webpack` to `next build`.
