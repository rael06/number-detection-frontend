# HandWritten_digits_calculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deployment

The site runs at `https://number-detection.rael-calitro.ovh` on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) (static assets only, `wrangler.jsonc`). It calls the API of the repository `number-detection-backend` (`src/environments/environment.ts`, used by `ng build`; `environment.prod.ts` has the same URL).

GitHub Actions (`.github/workflows/ci-cd.yml`) builds every push and pull request with Node 12 (Angular 8 does not build on current Node), and on `master` deploys `dist/` with Wrangler.

- Settings: GitHub environment `production`, restricted to `master`: secret `CLOUDFLARE_API_TOKEN` (account token from the « Edit Cloudflare Workers » template, zone rule limited to `rael-calitro.ovh`), variable `CLOUDFLARE_ACCOUNT_ID`.
- The repository variable `DEPLOY_ENABLED` (`true`/`false`) turns deployments on or off.
- Rollback: Cloudflare → Workers & Pages → `number-detection` → Deployments, or `wrangler rollback`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
