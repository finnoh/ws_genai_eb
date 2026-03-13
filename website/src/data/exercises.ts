export type ExerciseItem = {
  id: string;
  title: string;
  day: 'Day 1' | 'Day 2';
  durationMinutes: number;
  answerType: 'text' | 'code' | 'link';
  prompt: string;
};

export const exercises: ExerciseItem[] = [
  {
    id: 'E1',
    title: 'Prompt anatomy lab',
    day: 'Day 1',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit one improved prompt with a short rationale.',
  },
  {
    id: 'E2',
    title: 'Prompt rewrite challenge',
    day: 'Day 1',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Run an A/B prompt test and report one failure mode.',
  },
  {
    id: 'E3',
    title: 'IDE coding sprint',
    day: 'Day 1',
    durationMinutes: 30,
    answerType: 'code',
    prompt: 'Implement one bug fix or refactor with verification notes.',
  },
  {
    id: 'E4',
    title: 'Draft + verify paragraph',
    day: 'Day 1',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Draft a paragraph and attach citation support checks.',
  },
  {
    id: 'E5',
    title: 'Design an agent workflow',
    day: 'Day 2',
    durationMinutes: 30,
    answerType: 'link',
    prompt: 'Share a workflow sketch with tool and memory contracts.',
  },
  {
    id: 'E6',
    title: 'Build a mini pipeline',
    day: 'Day 2',
    durationMinutes: 30,
    answerType: 'link',
    prompt: 'Provide a protocol draft and sample outputs for your pipeline.',
  },
  {
    id: 'E7',
    title: 'Evaluate two outputs',
    day: 'Day 2',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Score two outputs with the rubric and justify differences.',
  },
  {
    id: 'E8',
    title: 'Resilience protocol plan',
    day: 'Day 2',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit a personal verification protocol and risk controls.',
  },
];
