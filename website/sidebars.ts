import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'overview',
      label: 'Workshop Overview',
    },
    {
      type: 'category',
      label: 'Live Workshop',
      items: ['live-hub', 'start-here', 'schedule', 'live-exercises', 'live-results'],
    },
    {
      type: 'category',
      label: 'Self-Study and Portfolio',
      items: [
        'self-study',
        'public-course-summary',
        'slides-and-assets',
        'resources',
        'patterns',
        'failure-library',
      ],
    },
    {
      type: 'category',
      label: 'Instructor Toolkit',
      items: ['materials-index', 'exercises', 'block-template', 'run-this-workshop'],
    },
  ],
};

export default sidebars;
