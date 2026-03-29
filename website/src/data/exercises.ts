import e01e06Overrides from './exercises_e01_e06_overrides.json';

export type ExerciseId =
  | 'E01'
  | 'E02'
  | 'E03'
  | 'E04'
  | 'E05'
  | 'E06'
  | 'E07'
  | 'E08'
  | 'E09'
  | 'E10'
  | 'E11'
  | 'E12';

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

const exerciseSeed: ExerciseItem[] = [
  {
    id: 'E01',
    title: 'Setup Jan + OpenRouter + hello world',
    day: 'Day 1',
    block: 'Block 1',
    durationMinutes: 30,
    answerType: 'text',
    prompt:
      'Submit startup evidence, one run of exercises/01/hello_world.py, one manual check from tiny.csv, and one TODO-STUDENT change note.',
    objective:
      'Get setup operational, run the hello-world script, and practice one small student-side script edit.',
    inputs: ['Install workflow', 'OpenRouter key in .env', 'exercises/01/hello_world.py + tiny.csv'],
    deliverable:
      'Startup evidence + Jan response + script output + manual verification + TODO update note.',
    rubricSpecific: ['Environment setup is reproducible.', 'Manual verification evidence is explicit.'],
    commonFailureModes: ['Missing OPENROUTER_API_KEY or base URL.', 'Skipping minimum startup evidence before coding.'],
    extensionTask: 'Switch to a second free OpenRouter model and compare output quality or speed.',
    detailPath: '/docs/blocks/e1-prompt-anatomy-lab',
  },
  {
    id: 'E02',
    title: 'Prompt anatomy in LangChain code',
    day: 'Day 1',
    block: 'Block 2',
    durationMinutes: 30,
    answerType: 'code',
    prompt:
      'Submit output from exercises/02/prompt_lab.py, including one TODO-STUDENT prompt tweak and one verification note.',
    objective: 'Turn noisy extraction into structured Python output and compare one prompt tweak.',
    inputs: ['exercises/02/prompt_lab.py', 'Noisy country paragraph', 'One TODO-STUDENT prompt variant'],
    deliverable:
      'Runnable output with cleaned country list + verification evidence + TODO experiment note.',
    rubricSpecific: ['Output is a valid Python list.', 'Cleaning/filtering logic is correct and explicit.'],
    commonFailureModes: ['Output format drifts from strict list.', 'Typos fixed inconsistently or fictional places included.'],
    extensionTask:
      'Optional multi-agent blackjack demo (Dealer, Gambler, Referee) using explicit standard rules: card values, initial deal, hit/stand, bust, dealer hits to 17+, blackjack precedence, and push on equal totals.',
    detailPath: '/docs/blocks/e2-prompt-rewrite-challenge',
  },
  {
    id: 'E03',
    title: 'Context pipeline with retrieval',
    day: 'Day 1',
    block: 'Block 3',
    durationMinutes: 30,
    answerType: 'text',
    prompt:
      'Submit an A/B comparison from exercises/03/retrieval_ab.py, including TODO-STUDENT variants (question + k).',
    objective: 'Run baseline vs retrieval on the same question and document one retrieval-fixed failure.',
    inputs: ['exercises/03/retrieval_ab.py', 'Local corpus in exercises/03/local_docs'],
    deliverable:
      'A/B note with one retrieval-fixed failure + one quoted chunk + one comparison note.',
    rubricSpecific: ['A/B comparison controls key variables.', 'Improvement is traceable to retrieved evidence.'],
    commonFailureModes: [
      'Baseline and retrieval runs use different prompts/settings.',
      'Improvement claimed without source chunk evidence or boundary disclosure.',
    ],
    extensionTask: 'Add metadata filtering and report precision difference.',
    detailPath: '/docs/blocks/e3-ide-coding-sprint',
  },
  {
    id: 'E04',
    title: 'Tool-calling mini-agent',
    day: 'Day 1',
    block: 'Block 4',
    durationMinutes: 30,
    answerType: 'code',
    prompt:
      'Submit trace from exercises/04/tool_agent.py showing two tool calls, plausibility check, and one TODO-STUDENT change.',
    objective:
      'Run a two-tool LangChain agent and verify output with one reproducible check.',
    inputs: [
      'exercises/04/tool_agent.py',
      'Two tools: label lookup + average',
      'One multi-step question requiring both tools',
    ],
    deliverable: 'Tool trace + plausibility check + one TODO update note.',
    rubricSpecific: ['Tool selection behavior is observable and justified.', 'Output check is explicit and plausible.'],
    commonFailureModes: ['Agent answers directly without using both tools.', 'No no-auth fallback when external tool setup fails.'],
    extensionTask: 'Add graceful fallback for a forced tool failure and show fallback trace.',
    detailPath: '/docs/blocks/e4-draft-verify-paragraph',
  },
  {
    id: 'E05',
    title: 'Connect LangChain agent to MCP time server',
    day: 'Day 1',
    block: 'Block 5',
    durationMinutes: 30,
    answerType: 'code',
    prompt: 'Submit MCP run evidence from exercises/05/mcp_tool.py with one success path, one error path, and TODO-STUDENT experiments.',
    objective: 'Connect LangChain to mcp-server-time via MCP and verify success/error handling.',
    inputs: ['exercises/05/mcp_tool.py', 'mcp-server-time via uvx', 'LangChain MCP adapters'],
    deliverable: 'MCP tool-call demo + sanity check + handled error-path evidence.',
    rubricSpecific: ['MCP connection is working and observable.', 'Success and error paths are both documented.'],
    commonFailureModes: ['uvx/mcp-server-time not available.', 'No explicit error-path evidence.'],
    extensionTask: 'Connect one additional MCP server and run one extra query.',
    detailPath: '/docs/blocks/e5-design-agent-workflow',
  },
  {
    id: 'E06',
    title: 'Memory behavior: session + retrieval',
    day: 'Day 1',
    block: 'Block 6',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit run evidence from exercises/06/memory_demo.py showing short-term reset behavior, long-term recall, and one TODO-STUDENT change note.',
    objective: 'Show short-term vs long-term memory behavior with a reproducible script run.',
    inputs: ['exercises/06/memory_demo.py', 'Session reset behavior', 'long_term_store.json'],
    deliverable: 'Trace showing remembered preference + retrieved project fact across reset + risk note.',
    rubricSpecific: ['Short-term vs long-term memory is clearly separated.', 'Risk disclosure is concrete and relevant.'],
    commonFailureModes: ['Memory behavior claimed without trace evidence.', 'Unsafe or stale memory retained without correction.'],
    extensionTask: 'Compress memory notes and re-evaluate retrieval quality.',
    detailPath: '/docs/blocks/e6-build-mini-pipeline',
  },
  {
    id: 'E07',
    title: 'Ideation project + idea napkin',
    day: 'Day 2',
    block: 'Block 1',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit one selected lead idea napkin, domain scorecard comparison, and one IP/HARKING caution.',
    objective: 'Use researcher context + domain scoring to generate and select among at least two idea napkins.',
    inputs: ['Researcher context card', 'At least two candidate domains', 'Idea napkin template'],
    deliverable: 'Selected lead napkin + scorecard comparison + caution note.',
    rubricSpecific: ['Domain selection logic is explicit.', 'Lead idea is scoped and testable.'],
    commonFailureModes: ['Only one idea generated before selection.', 'No explicit IP/HARKING caution.'],
    extensionTask: 'Add a third idea napkin and define a tie-break rule.',
    detailPath: '/docs/blocks/e7-evaluate-two-outputs',
  },
  {
    id: 'E08',
    title: 'AI data-collection design memo',
    day: 'Day 2',
    block: 'Block 2',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit a one-page memo with mode choice, threat model, verification plan, and one prototype artifact reference.',
    objective: 'Choose exactly one mode (A or B or C) for a research question and produce a validity-aware mini prototype.',
    inputs: ['Research question', 'Mode A/B/C choice', 'Prototype artifact (stimulus, survey skeleton, or synthetic respondent prompt)'],
    deliverable: 'Design memo + prototype artifact reference with one explicit mode choice.',
    rubricSpecific: ['Mode choice is clearly justified.', 'Verification plan is concrete and feasible.'],
    commonFailureModes: ['Mixing modes instead of choosing one.', 'Threats listed without executable checks.'],
    extensionTask: 'Add pilot criteria (sample size and stop/continue rule).',
    detailPath: '/docs/blocks/e8-resilience-protocol-plan',
  },
  {
    id: 'E09',
    title: 'Evidence paragraph + claim ledger',
    day: 'Day 2',
    block: 'Block 3',
    durationMinutes: 30,
    answerType: 'text',
    prompt:
      'Submit one evidence paragraph plus claim/source/snippet/confidence/gap ledger (minimum two claims), with one policy note and one unresolved gap.',
    objective: 'Produce auditable synthesis with journal-policy check and claim-to-source traceability.',
    inputs: ['Search stack of choice', 'Journal policy note on AI-assisted literature use', 'Claim ledger template'],
    deliverable: 'Evidence paragraph + claim ledger (minimum two claims) + policy note + unresolved gap.',
    rubricSpecific: ['Claim-evidence links are traceable.', 'Confidence and gaps are explicitly documented.'],
    commonFailureModes: ['Claims not linked to source snippets.', 'No policy/paywall disclosure where relevant.'],
    extensionTask: 'Add a third paper and test Zotero retrieval integration; report whether it improved the ledger.',
    detailPath: '/docs/blocks/e9-evidence-paragraph-claim-ledger',
  },
  {
    id: 'E10',
    title: 'Reproducible analysis loop',
    day: 'Day 2',
    block: 'Block 4',
    durationMinutes: 30,
    answerType: 'code',
    prompt: 'Submit minimal code, executable checks, keep/reject comparison note, and AI provenance note.',
    objective: 'Compare direct prompting vs test-first loop and document a keep/reject decision.',
    inputs: ['Scoped analysis task + tiny dataset', 'At least one unit test', 'Direct-prompt baseline output'],
    deliverable: 'Code + check outputs + limitation note + keep/reject decision + provenance note.',
    rubricSpecific: ['Prompt-code-test loop is complete and reproducible.', 'Keep/reject decision is evidence-based.'],
    commonFailureModes: ['No executable checks before accepting output.', 'No explicit comparison to baseline approach.'],
    extensionTask: 'Add one edge-case test that initially fails, then fix it.',
    detailPath: '/docs/blocks/e10-reproducible-analysis-loop',
  },
  {
    id: 'E11',
    title: 'Issue -> agent -> PR workflow drill',
    day: 'Day 2',
    block: 'Block 5',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit issue text, handoff prompt, review verdict, and either a PR link or a simulated PR record.',
    objective: 'Write a scoped feature issue, hand off to an agent, and review PR output with human checkpoints.',
    inputs: ['Scoped issue with acceptance criteria', 'Agent handoff prompt', 'PR review checklist'],
    deliverable: 'Issue + handoff + final review verdict + PR link or simulated PR record.',
    rubricSpecific: ['Issue scope and acceptance criteria are explicit.', 'Review verdict references concrete evidence.'],
    commonFailureModes: ['Issue scope too broad for one PR.', 'Review skips test/diff evidence.'],
    extensionTask: 'Add one policy rule for mandatory human override.',
    detailPath: '/docs/blocks/e11-issue-agent-pr-workflow',
  },
  {
    id: 'E12',
    title: 'Writing + syndication sprint',
    day: 'Day 2',
    block: 'Block 6',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit a 300-500 word brief, 3-channel plan, and disclosure note. Optional: add one web-ready page draft.',
    objective: 'Convert rough notes into a short brief and dissemination-ready outputs.',
    inputs: ['Bullet notes or voice transcript', 'One target audience', 'One paper/topic for web-ready draft'],
    deliverable: 'Brief + syndication plan + disclosure (optional web-ready page draft).',
    rubricSpecific: ['Brief is clear and audience-aware.', 'Syndication plan is specific and actionable.'],
    commonFailureModes: ['Generic prose detached from audience.', 'No explicit AI assistance disclosure.'],
    extensionTask: 'Add one platform-specific rewrite and/or a web-ready page draft.',
    detailPath: '/docs/blocks/e12-writing-syndication-sprint',
  },
];

type ExerciseOverride = Partial<Pick<ExerciseItem, 'title' | 'prompt' | 'objective' | 'inputs' | 'deliverable'>>;

const normalizedOverrides = e01e06Overrides as Partial<Record<ExerciseId, ExerciseOverride>>;

export const exercises: ExerciseItem[] = exerciseSeed.map((item) => {
  const override = normalizedOverrides[item.id];
  if (!override) {
    return item;
  }
  return {
    ...item,
    ...override,
    inputs: override.inputs ?? item.inputs,
  };
});

export function getExerciseById(exerciseId: ExerciseId): ExerciseItem {
  const item = exercises.find((exercise) => exercise.id === exerciseId);
  if (!item) {
    throw new Error(`Unknown exercise id: ${exerciseId}`);
  }
  return item;
}
