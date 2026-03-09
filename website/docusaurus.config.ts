import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const googleFormUrl = process.env.GOOGLE_FORM_URL ?? '';
const liveResultsSheetCsvUrl = process.env.LIVE_RESULTS_SHEET_CSV_URL ?? '';
const liveResultsJsonUrl = process.env.LIVE_RESULTS_JSON_URL ?? '';

const config: Config = {
  title: 'TI AI Agents Workshop',
  tagline: 'Companion site for slides, exercises, and live results',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://finnoh.github.io',
  baseUrl: '/ws_genai_eb/',
  organizationName: 'finnoh',
  projectName: 'ws_genai_eb',
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/finnoh/ws_genai_eb/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'TI Workshop',
      logo: {
        alt: 'TI Workshop Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/docs/overview', label: 'Overview', position: 'left'},
        {to: '/docs/live-exercises', label: 'Live Exercises', position: 'left'},
        {to: '/docs/live-results', label: 'Live Results', position: 'left'},
        {
          href: 'https://github.com/finnoh/ws_genai_eb',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Workshop',
          items: [
            {label: 'Overview', to: '/docs/overview'},
            {label: 'Schedule', to: '/docs/schedule'},
            {label: 'Slides', to: '/docs/slides-and-assets'},
          ],
        },
        {
          title: 'Live Class',
          items: [
            {label: 'Live Exercises', to: '/docs/live-exercises'},
            {label: 'Live Results', to: '/docs/live-results'},
          ],
        },
        {
          title: 'Code',
          items: [
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
  customFields: {
    googleFormUrl,
    liveResultsSheetCsvUrl,
    liveResultsJsonUrl,
  },
};

export default config;
