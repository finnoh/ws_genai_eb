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

export const exercises: ExerciseItem[] = [
  {
    id: 'E01',
    title: 'Setup Jan + OpenRouter + hello world',
    day: 'Day 1',
    block: 'Block 1',
    durationMinutes: 30,
    answerType: 'text',
    prompt:
      'Minimum: submit startup evidence + one Jan response. Full: add hello-world output, manual verification note, and one customization note.',
    objective:
      'Get setup operational with a minimum viability check first; run hello-world coding if setup is stable and time permits.',
    inputs: ['Install workflow', 'OpenRouter key in .env', 'Tiny CSV with a numeric column'],
    deliverable:
      'Minimum startup evidence + Jan response; full submission adds hello-world run + manual verification + customization note.',
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
      'Submit a runnable snippet returning cleaned country names as a Python list plus a short model/docs orientation note (minimum one practical takeaway).',
    objective: 'Turn a noisy extraction task into structured Python output and document one model/docs rationale.',
    inputs: ['Noisy country paragraph', 'LangChain prompt + structured output', 'Orientation links (OpenRouter, OpenCode, LangChain docs)'],
    deliverable:
      'Runnable snippet returning cleaned country names as a Python list + short orientation note (minimum one practical takeaway).',
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
      'Submit a fair A/B comparison (same question, same model) with one baseline failure fixed by retrieval, one quoted source chunk, and one boundary disclosure.',
    objective: 'Build a tiny local corpus and run a fair A/B test (no retrieval vs retrieval) on the same question.',
    inputs: ['Local corpus with 4-6 short files', 'LangChain loading/splitting/retrieval components'],
    deliverable:
      'A/B note with one retrieval-fixed failure + one quoted supporting chunk + one privacy/copyright boundary disclosure.',
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
      'Submit a trace showing two-tool use (including one existing tool), one verification check, one failure-mode note, and a no-auth fallback path.',
    objective:
      'Integrate at least one existing tool and define a no-auth local fallback for a two-tool, multi-step research question.',
    inputs: [
      'One existing research-relevant tool',
      'One local helper tool',
      'One no-auth fallback path',
      'One multi-step question requiring both tools',
    ],
    deliverable: 'Tool trace + output verification + failure-mode note + fallback plan.',
    rubricSpecific: ['Tool selection behavior is observable and justified.', 'Output check is explicit and plausible.'],
    commonFailureModes: ['Agent answers directly without using both tools.', 'No no-auth fallback when external tool setup fails.'],
    extensionTask: 'Add graceful fallback for a forced tool failure and show fallback trace.',
    detailPath: '/docs/blocks/e4-draft-verify-paragraph',
  },
  {
    id: 'E05',
    title: 'Build and connect tiny MCP tool',
    day: 'Day 1',
    block: 'Block 5',
    durationMinutes: 30,
    answerType: 'code',
    prompt: 'Submit an input -> tool output -> agent explanation demo with one sanity check and one handled error case.',
    objective: 'Build one tiny custom tool, define input/output contract, and wire it into an agent workflow.',
    inputs: ['Tiny domain tool idea (e.g., NPV, breakeven, elasticity)', 'I/O contract (arguments, units, return fields)'],
    deliverable: 'Connected custom tool demo + sanity check + error-path evidence.',
    rubricSpecific: ['Tool contract is clear and testable.', 'Integration run demonstrates success and error behavior.'],
    commonFailureModes: ['Missing argument validation.', 'Tool works in isolation but not in workflow.'],
    extensionTask: 'Expose the function via a minimal local MCP server and rerun one call.',
    detailPath: '/docs/blocks/e5-design-agent-workflow',
  },
  {
    id: 'E06',
    title: 'Memory behavior: session + retrieval',
    day: 'Day 1',
    block: 'Block 6',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit a trace with remembered preference, retrieved project fact, and one memory risk disclosure.',
    objective: 'Define memory policy and show short-term vs retriever-backed long-term memory behavior.',
    inputs: ['Memory policy (store/ignore/prune)', 'AGENTS.md and MEMORY.md alignment', 'PROJECT_BACKGROUND.md note'],
    deliverable: 'Trace showing remembered preference + retrieved project fact + risk note.',
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

export function getExerciseById(exerciseId: ExerciseId): ExerciseItem {
  const item = exercises.find((exercise) => exercise.id === exerciseId);
  if (!item) {
    throw new Error(`Unknown exercise id: ${exerciseId}`);
  }
  return item;
}
