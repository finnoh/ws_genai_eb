export type ExerciseId = 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8';

export type ExerciseItem = {
  id: ExerciseId;
  title: string;
  day: 'Day 1' | 'Day 2';
  block: string;
  durationMinutes: number;
  answerType: 'text' | 'code' | 'link';
  prompt: string;
  objective: string;
  inputs: string[];
  deliverable: string;
  rubricSpecific: string[];
  commonFailureModes: string[];
  extensionTask: string;
  detailPath: string;
};

export const canonicalRubricDimensions = [
  'Usefulness: does it help the task?',
  'Correctness: is it factually/procedurally right?',
  'Reproducibility: can another group rerun it?',
  'Risk awareness: did they identify and mitigate key risks?',
];

export const canonicalTimebox = {
  lectureMinutes: 20,
  handsOnMinutes: 30,
  debriefMinutes: 10,
};

export const exercises: ExerciseItem[] = [
  {
    id: 'E1',
    title: 'Prompt anatomy lab',
    day: 'Day 1',
    block: 'Block 2',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit one improved prompt with a short rationale.',
    objective: 'Classify prompt components and improve one weak prompt for a research task.',
    inputs: [
      'One weak baseline prompt from your table',
      'Prompt anatomy checklist (role, task, constraints, output format)',
    ],
    deliverable: 'One rewritten prompt plus a short rationale for key edits.',
    rubricSpecific: [
      'Prompt separates role, task, constraints, and format clearly.',
      'Rationale names at least one likely failure mode and mitigation.',
    ],
    commonFailureModes: [
      'Vague constraints that allow generic output.',
      'No explicit output structure for later comparison.',
    ],
    extensionTask: 'Run the revised prompt on one alternate context and note what breaks.',
    detailPath: '/docs/blocks/e1-prompt-anatomy-lab',
  },
  {
    id: 'E2',
    title: 'Prompt rewrite challenge',
    day: 'Day 1',
    block: 'Block 4',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Run an A/B prompt test and report one failure mode.',
    objective: 'Use decomposition patterns to produce a stronger prompt and evaluate it with evidence.',
    inputs: [
      'Baseline prompt and one rewritten variant',
      'Scoring rubric from exercises/rubrics.md',
    ],
    deliverable: 'A/B comparison with scores, failure note, and final recommended prompt.',
    rubricSpecific: [
      'Comparison includes concrete quality differences, not preferences.',
      'Final recommendation is justified with rubric evidence.',
    ],
    commonFailureModes: [
      'A/B prompts differ on too many variables at once.',
      'Scores are assigned without textual evidence.',
    ],
    extensionTask: 'Add a self-critique step and compare whether reliability improves.',
    detailPath: '/docs/blocks/e2-prompt-rewrite-challenge',
  },
  {
    id: 'E3',
    title: 'IDE coding sprint',
    day: 'Day 1',
    block: 'Block 5',
    durationMinutes: 30,
    answerType: 'code',
    prompt: 'Implement one bug fix or refactor with verification notes.',
    objective: 'Apply coding-agent tooling to deliver one safe, verifiable change in a real codebase.',
    inputs: [
      'A concrete bug or refactor target',
      'Agent trace showing commands and checks',
    ],
    deliverable: 'Patch summary with verification trace and one unresolved risk.',
    rubricSpecific: [
      'Change scope is narrow and tied to one explicit problem.',
      'Verification includes at least one executable check.',
    ],
    commonFailureModes: [
      'Large refactors without tests or rollback plan.',
      'Blind trust in agent output without reading diffs.',
    ],
    extensionTask: 'Add one negative test that would have caught the original failure earlier.',
    detailPath: '/docs/blocks/e3-ide-coding-sprint',
  },
  {
    id: 'E4',
    title: 'Draft + verify paragraph',
    day: 'Day 1',
    block: 'Block 7',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Draft a paragraph and attach citation support checks.',
    objective: 'Produce one claim-evidence paragraph with explicit source checks and disclosure.',
    inputs: [
      'One research claim and supporting sources',
      'Citation integrity checklist',
    ],
    deliverable: 'Paragraph with citation checks, confidence score, and uncertainty note.',
    rubricSpecific: [
      'Every non-trivial claim is mapped to a source or uncertainty note.',
      'Disclosure language states where AI support was used.',
    ],
    commonFailureModes: [
      'Source title added without validating claim alignment.',
      'Overconfident prose despite weak evidence.',
    ],
    extensionTask: 'Rewrite the paragraph for a skeptical reviewer and tighten evidence language.',
    detailPath: '/docs/blocks/e4-draft-verify-paragraph',
  },
  {
    id: 'E5',
    title: 'Design an agent workflow',
    day: 'Day 2',
    block: 'Block 3',
    durationMinutes: 30,
    answerType: 'link',
    prompt: 'Share a workflow sketch with tool and memory contracts.',
    objective: 'Design a reliability-aware agent workflow with explicit boundaries and fallbacks.',
    inputs: [
      'Target task and constraints',
      'Architecture sketch template with retries and fallback paths',
    ],
    deliverable: 'Workflow diagram plus contract table (inputs, tools, memory, outputs).',
    rubricSpecific: [
      'Workflow defines timeout, retry, and fallback behavior.',
      'Human handoff points are explicit.',
    ],
    commonFailureModes: [
      'No failure path when tools return empty or noisy outputs.',
      'Memory assumptions are underspecified.',
    ],
    extensionTask: 'Red-team one assumption and update the design accordingly.',
    detailPath: '/docs/blocks/e5-design-agent-workflow',
  },
  {
    id: 'E6',
    title: 'Build a mini pipeline',
    day: 'Day 2',
    block: 'Block 5',
    durationMinutes: 30,
    answerType: 'link',
    prompt: 'Provide a protocol draft and sample outputs for your pipeline.',
    objective: 'Build a mini research pipeline with clear role boundaries for human and agent work.',
    inputs: [
      'Pipeline canvas (ideation to protocol)',
      'Synthetic output sample and limitation checklist',
    ],
    deliverable: 'Protocol note with sample artifacts and limitations section.',
    rubricSpecific: [
      'Pipeline distinguishes exploratory and decision-critical steps.',
      'Limitations include at least one methodological validity risk.',
    ],
    commonFailureModes: [
      'Treating synthetic outputs as substitute evidence.',
      'No documentation of prompts or parameter settings.',
    ],
    extensionTask: 'Add a replication plan that another group could run in 15 minutes.',
    detailPath: '/docs/blocks/e6-build-mini-pipeline',
  },
  {
    id: 'E7',
    title: 'Evaluate two outputs',
    day: 'Day 2',
    block: 'Block 6',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Score two outputs with the rubric and justify differences.',
    objective: 'Evaluate competing outputs with a transparent scoring process and adoption recommendation.',
    inputs: [
      'Two candidate outputs for the same task',
      'Evaluation rubric and tie-break rule',
    ],
    deliverable: 'Scored comparison and short adoption memo with risks.',
    rubricSpecific: [
      'Scoring disagreements are explained with evidence, not intuition.',
      'Memo includes cost, governance, and monitoring considerations.',
    ],
    commonFailureModes: [
      'Rubric criteria changed mid-evaluation.',
      'Recommendation ignores deployment risk.',
    ],
    extensionTask: 'Run a second evaluator and compare inter-rater disagreement.',
    detailPath: '/docs/blocks/e7-evaluate-two-outputs',
  },
  {
    id: 'E8',
    title: 'Resilience protocol plan',
    day: 'Day 2',
    block: 'Block 7',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit a personal verification protocol and risk controls.',
    objective: 'Create a practical protocol that balances speed, cost, and cognitive resilience.',
    inputs: [
      'Cost and risk assumptions for your context',
      'Verification checklist template',
    ],
    deliverable: 'One-page verification protocol with trigger rules and review cadence.',
    rubricSpecific: [
      'Protocol has clear triggers for manual review.',
      'Cost and reliability tradeoffs are explicit.',
    ],
    commonFailureModes: [
      'Protocol is too abstract for real-time use.',
      'No plan for drift or skill atrophy.',
    ],
    extensionTask: 'Pilot your protocol for one week and log one adjustment.',
    detailPath: '/docs/blocks/e8-resilience-protocol-plan',
  },
];

export function getExerciseById(exerciseId: ExerciseId): ExerciseItem {
  const item = exercises.find((exercise) => exercise.id === exerciseId);
  if (!item) {
    throw new Error(`Unknown exercise id: ${exerciseId}`);
  }
  return item;
}
