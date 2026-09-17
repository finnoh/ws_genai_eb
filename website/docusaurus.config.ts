import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'TI AI Agents Workshop',
  tagline: 'AI agents in economics and business research · May 13–14, 2027',
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
      respectPrefersColorScheme: false,
      disableSwitch: true,
    },
    image: 'img/ti-ai-agents-social-card.png',
    navbar: {
      hideOnScroll: false,
      title: 'TI AI Agents',
      logo: {
        alt: 'AI Agents Workshop',
        src: 'img/favicon.svg',
      },
      items: [
        {to: '/docs/schedule', label: 'Workshop', position: 'left'},
        {to: '/docs/about', label: 'About', position: 'left'},
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
      style: 'light',
      links: [
        {
          title: 'Workshop',
          items: [
            {label: 'Schedule', to: '/docs/schedule'},
            {label: 'Exercises', to: '/docs/live-exercises'},
            {label: 'About', to: '/docs/about'},
          ],
        },
        {
          title: 'Content',
          items: [
            {label: 'AI Agents in Research', to: '/docs/content/day2-1'},
            {label: 'Building AI Agents', to: '/docs/content/day1-2'},
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'Tinbergen course page',
              href: 'https://tinbergen.nl/ai-agents-in-economics-and%20business-research',
            },
            {label: 'GitHub repository', href: 'https://github.com/finnoh/ws_genai_eb'},
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
          editUrl: 'https://github.com/finnoh/ws_genai_eb/edit/main/website/',
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
};

export default config;
