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
        'content/day1-block-1-orientation',
        'content/day1-block-2-fundamentals',
        'content/day1-block-3-prompting-i',
        'content/day1-block-4-prompting-ii',
        'content/day1-block-5-tools-mcp-coding',
        'content/day1-block-6-writing-safety',
        'content/day2-block-1-reliability-recap',
        'content/day2-block-2-orchestration-i',
        'content/day2-block-3-orchestration-ii',
        'content/day2-block-4-pipeline-i',
        'content/day2-block-5-pipeline-ii',
        'content/day2-block-6-evaluation-adoption',
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
