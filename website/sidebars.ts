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
      label: 'Course Content by Block',
      items: [
        'content/day1-1',
        'content/day1-2',
        'content/day1-3',
        'content/day1-4',
        'content/day1-5',
        'content/day1-6',
        'content/day2-1',
        'content/day2-2',
        'content/day2-3',
        'content/day2-4',
        'content/day2-5',
        'content/day2-6',
      ],
    },
    {
      type: 'category',
      label: 'Exercises (E1-E8)',
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
      label: 'Self-Study Beyond Workshop',
      items: [
        'self-study',
        'self-study-roadmap',
        'self-study-projects',
        'resources',
        'patterns',
        'failure-library',
        'slides-and-assets',
      ],
    },
    {
      type: 'category',
      label: 'Instructor Toolkit',
      items: ['materials-index', 'exercises', 'block-template', 'block-drafts', 'run-this-workshop', 'public-course-summary'],
    },
  ],
};

export default sidebars;
