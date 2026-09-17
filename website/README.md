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

## Live exercise runtime environment variables

Set these before building or deploying the live exercise site. Docusaurus exposes them to the exercise UI through its runtime configuration.

```bash
GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/<FORM_ID>/viewform?usp=pp_url
GOOGLE_FORM_EXERCISE_FIELD=<ENTRY_ID_FOR_EXERCISE>
GOOGLE_FORM_GROUP_FIELD=<ENTRY_ID_FOR_GROUP> # leave blank: the current exercise UI does not prefill a group
ACTIVE_EXERCISE_ID=E01 # exposed for exercise-aware pages; currently not consumed by the exercise UI
RESULTS_SHEET_URL=https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
```

`GOOGLE_FORM_URL` and `GOOGLE_FORM_EXERCISE_FIELD` are required to generate prefilled exercise links. `RESULTS_SHEET_URL` enables the Results sheet link. `GOOGLE_FORM_GROUP_FIELD` remains available for future group-prefill support but is not used by the current UI.
