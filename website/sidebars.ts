import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Schedule',
      link: {
        type: 'doc',
        id: 'schedule',
      },
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'live-exercises',
          label: 'Exercises ✏️',
        },
        {
          type: 'category',
          label: 'Building AI Agents 🤖',
          collapsible: false,
          collapsed: false,
          items: ['content/day1-1', 'content/day1-2', 'content/day1-3', 'content/day1-4', 'content/day1-5', 'content/day1-6'],
        },
        {
          type: 'category',
          label: 'AI Agents in Research 🔬',
          collapsible: false,
          collapsed: false,
          items: ['content/day2-1', 'content/day2-2', 'content/day2-3', 'content/day2-4', 'content/day2-5', 'content/day2-6'],
        },
      ],
    },
  ],
};

export default sidebars;
