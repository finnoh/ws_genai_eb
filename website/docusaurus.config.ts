import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const googleFormUrl = process.env.GOOGLE_FORM_URL ?? '';
const googleFormExerciseField = process.env.GOOGLE_FORM_EXERCISE_FIELD ?? '';
const googleFormGroupField = process.env.GOOGLE_FORM_GROUP_FIELD ?? '';
const activeExerciseId = process.env.ACTIVE_EXERCISE_ID ?? '';
const liveResultsSheetCsvUrl = process.env.LIVE_RESULTS_SHEET_CSV_URL ?? '';
const liveResultsJsonUrl = process.env.LIVE_RESULTS_JSON_URL ?? '';

const config: Config = {
  title: 'TI AI Agents Workshop',
  tagline: 'Companion site for slides, exercises, and live results',
  favicon: 'img/favicon.svg',
  future: {
    v4: true,
  },
  url: 'https://finnoh.github.io',
  baseUrl: '/ws_genai_eb/',
  organizationName: 'finnoh',
  projectName: 'ws_genai_eb',
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      hideOnScroll: true,
      title: 'TI AI Agents',
      logo: {
        alt: 'Sparkles logo',
        src: 'img/favicon.svg',
      },
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {to: '/docs/live-hub', label: 'Live', position: 'left'},
        {to: '/docs/self-study', label: 'Learn', position: 'left'},
        {to: '/docs/materials-index', label: 'Materials', position: 'left'},
        {to: '/docs/run-this-workshop', label: 'Instructor Kit', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          label: 'All Docs',
          position: 'right',
        },
        {
          href: 'https://github.com/finnoh/ws_genai_eb',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Live Workshop',
          items: [
            {label: 'Live Hub', to: '/docs/live-hub'},
            {label: 'Start Here', to: '/docs/start-here'},
            {label: 'Live Exercises', to: '/docs/live-exercises'},
            {label: 'Live Results', to: '/docs/live-results'},
            {label: 'Schedule', to: '/docs/schedule'},
          ],
        },
        {
          title: 'Learn and Reuse',
          items: [
            {label: 'Self-Study', to: '/docs/self-study'},
            {label: 'Materials Index', to: '/docs/materials-index'},
            {label: 'Patterns', to: '/docs/patterns'},
            {label: 'Failure Library', to: '/docs/failure-library'},
          ],
        },
        {
          title: 'Instructor',
          items: [
            {label: 'Run This Workshop', to: '/docs/run-this-workshop'},
            {label: 'Repository', href: 'https://github.com/finnoh/ws_genai_eb'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tinbergen Institute Workshop.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/finnoh/ws_genai_eb/tree/main/website/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        language: ['en'],
      },
    ],
  ],
  customFields: {
    googleFormUrl,
    googleFormExerciseField,
    googleFormGroupField,
    activeExerciseId,
    liveResultsSheetCsvUrl,
    liveResultsJsonUrl,
  },
};

export default config;
