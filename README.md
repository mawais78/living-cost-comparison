# Living Cost Comparison

A Next.js application for comparing city living costs, monthly budgets, and equivalent salaries.

## Local development

Requirements:

- Node.js 22.13 or newer
- npm 10 or newer

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run lint
npm run build
```

After a successful build, preview the production server with:

```bash
npm start
```

## Deploy to AWS Amplify

1. Push this repository to GitHub, GitLab, Bitbucket, or AWS CodeCommit.
2. In the AWS Amplify console, choose **Create new app** and connect the repository.
3. Select the `main` branch.
4. Use the detected build settings. The included `amplify.yml` installs dependencies with `npm ci`, runs `npm run build`, and publishes the `.next` output.
5. Create or select an Amplify service role when prompted, then choose **Save and deploy**.

The project uses Next.js 15, which is supported by Amplify Hosting compute for SSR and statically generated routes. Node.js 22 is declared in `package.json` and is supported by Amplify.

## Project structure

- `app/` — pages, layouts, metadata, sitemap, and robots configuration
- `components/` — interactive calculators and shared UI
- `lib/cost-data.ts` — city cost data and comparison calculations
- `public/` — icons, brand assets, and editorial images
- `amplify.yml` — AWS Amplify build configuration

## Domain configuration

Canonical metadata currently uses `https://livingcostcomparison.com`. After the first deployment, connect that domain in Amplify or update the canonical origin in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`.
