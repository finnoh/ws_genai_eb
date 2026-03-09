import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'overview',
    'schedule',
    {
      type: 'category',
      label: 'Classroom',
      items: ['live-exercises', 'live-results'],
    },
    'slides-and-assets',
    'resources',
  ],
};

export default sidebars;
