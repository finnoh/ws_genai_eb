# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Live exercise environment variables

Set these before building/deploying when using Google Forms live submissions:

```bash
GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/<FORM_ID>/viewform?usp=pp_url
GOOGLE_FORM_EXERCISE_FIELD=<ENTRY_ID_FOR_EXERCISE>
GOOGLE_FORM_GROUP_FIELD=<ENTRY_ID_FOR_GROUP> # optional
ACTIVE_EXERCISE_ID=E1 # optional
LIVE_RESULTS_JSON_URL=<PUBLISHED_JSON_ENDPOINT>
LIVE_RESULTS_SHEET_CSV_URL=<PUBLISHED_CSV_ENDPOINT>
# optional runtime IDs used by scripts/google/*.py
WORKSHOP_FORM_ID=<FORM_ID>
WORKSHOP_SPREADSHEET_ID=<SPREADSHEET_ID>
```

You can generate these values with:

```bash
./scripts/google/bootstrap_workshop.sh --write-env-file website/.env.local
```
