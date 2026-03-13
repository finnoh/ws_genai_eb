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
      label: 'Exercise Blocks (E1-E8)',
      items: [
        'blocks/e1-prompt-anatomy-lab',
        'blocks/e2-prompt-rewrite-challenge',
        'blocks/e3-ide-coding-sprint',
        'blocks/e4-draft-verify-paragraph',
        'blocks/e5-design-agent-workflow',
        'blocks/e6-build-mini-pipeline',
        'blocks/e7-evaluate-two-outputs',
        'blocks/e8-resilience-protocol-plan',
      ],
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
