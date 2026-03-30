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
  objectiveBullets?: string[];
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
    title: 'Team ideation sprint in ChatGPT/Claude project',
    day: 'Day 2',
    block: 'Block 1',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Form a research team of 3 and create one shared project in ChatGPT or Claude (invite each other if possible).',
    objective: 'Use a shared AI project to score domains and produce three distinct idea napkins in one selected domain.',
    objectiveBullets: [
      'Form a research team of 3 and create one shared project in ChatGPT or Claude (invite each other if possible).',
      'With AI, brainstorm possible research domains that fit your combined team skills and interests.',
      'With AI and your team, score candidate domains on interest, feasibility, and timeliness (1-5) and select one domain.',
      'Together with AI, for the selected domain, draft 3 separate idea napkins (3 distinct possible projects).',
      'Add one short note on why each napkin is promising and what the main risk is.',
    ],
    inputs: [
      'Shared ChatGPT/Claude project workspace',
      'Domain scoring table (interest, feasibility, timeliness)',
      'Idea napkin template for 3 project variants',
    ],
    deliverable: 'shared project evidence + scored domain table + 3 idea napkins with risk notes.',
    rubricSpecific: ['Domain scoring and selection logic is explicit.', 'Three napkins are clearly distinct and scoped.'],
    commonFailureModes: ['Only one idea napkin is submitted.', 'No explicit risk note per napkin.'],
    extensionTask: 'Invite collaborators into the same project and compare score disagreements before final selection.',
    detailPath: '/docs/blocks/e7-evaluate-two-outputs',
  },
  {
    id: 'E08',
    title: 'Three AI data-collection modes by example',
    day: 'Day 2',
    block: 'Block 2',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Submit one worked example for each mode: Natural DGP + same instrument, Natural DGP + new instrument, and AI DGP.',
    objective: 'Prototype three different AI data-collection modes and compare their plausibility and validity risks.',
    objectiveBullets: [
      'Natural DGP + same instrument: design A/B experimental stimuli with AI (e.g., two highly similar images that differ only on one treatment).',
      'Natural DGP + new instrument: research how Prolific could be connected to an AI agent and propose one new data-collection flow.',
      'AI DGP: build a tiny synthetic-respondent demo using a few observations inspired by Twin-2K-500 (Toubia et al.).',
      'Interview at least one synthetic respondent and assess whether the answers seem plausible.',
      'Ask the synthetic respondent survey questions that you are interested in.',
    ],
    inputs: [
      'One treatment idea for A/B stimuli',
      'Prolific + AI-agent integration notes',
      'Tiny synthetic respondent profile inspired by Twin-2K-500',
    ],
    deliverable: 'one worked example per mode + plausibility note + cross-mode comparison table.',
    rubricSpecific: ['All three modes include concrete example artifacts.', 'Plausibility and validity risks are explicitly compared.'],
    commonFailureModes: ['Examples remain abstract without a concrete artifact.', 'No plausibility check for synthetic respondent interview.'],
    extensionTask: 'Add one external validation check for the synthetic respondent answers.',
    detailPath: '/docs/blocks/e8-resilience-protocol-plan',
  },
  {
    id: 'E09',
    title: 'AI-only literature mapping in a known stream',
    day: 'Day 2',
    block: 'Block 3',
    durationMinutes: 30,
    answerType: 'text',
    prompt:
      'Pick a small stream you know well and submit an AI-generated literature table, 2D map, and your verification note.',
    objective: 'Test how well AI can reconstruct a familiar literature stream without being given explicit paper names.',
    objectiveBullets: [
      'Pick a small research stream you know well, but do not name specific papers to the AI.',
      'Ask AI to map the stream, retrieve core papers, and generate a structured literature table.',
      'Ask AI to create a 2D scatterplot positioning papers on two meaningful dimensions.',
      'Evaluate what is missing, incorrect, or hallucinated against your own domain knowledge.',
      'Optional extension: install Zotero MCP and test whether your coding agent can recall papers from your Zotero library.',
    ],
    inputs: ['One familiar subfield', 'AI literature search workflow', '2D mapping prompt with two chosen dimensions'],
    deliverable: 'AI-generated table + 2D map + verification note (and optional Zotero MCP test note).',
    rubricSpecific: ['Map and table are structured and interpretable.', 'Verification clearly separates correct, missing, and hallucinated items.'],
    commonFailureModes: ['Papers are provided to AI up front, defeating the exercise.', 'No explicit verification against prior domain knowledge.'],
    extensionTask: 'Configure Zotero MCP and compare recall quality before vs after integration.',
    detailPath: '/docs/blocks/e9-evidence-paragraph-claim-ledger',
  },
  {
    id: 'E10',
    title: 'Journal AI-policy to agent policy',
    day: 'Day 2',
    block: 'Block 4',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Choose one target journal and submit its AI guideline summary plus an agent-ready usage checklist.',
    objective: 'Translate journal AI-use policy into explicit agent instructions and a reproducible documentation workflow.',
    objectiveBullets: [
      'Choose one target journal where you may want to publish and locate its AI-use guidelines.',
      'Identify what the journal expects for disclosure and documentation of AI assistance.',
      'Translate these requirements into a practical checklist for your own research workflow.',
      'Define how to encode this checklist directly into your AI-agent instructions and templates.',
    ],
    inputs: ['Target journal AI policy page', 'Draft disclosure/checklist template', 'Your current agent instruction file'],
    deliverable: 'journal policy summary + agent-ready AI-usage checklist + repository pattern note.',
    rubricSpecific: ['Policy summary is precise and source-backed.', 'Checklist items are operational and agent-implementable.'],
    commonFailureModes: ['Journal policy is summarized without concrete workflow implications.', 'Checklist is too generic to enforce in agent instructions.'],
    extensionTask: 'Add one repository documentation pattern that enforces AI-use logging in commits or PRs.',
    detailPath: '/docs/blocks/e10-reproducible-analysis-loop',
  },
  {
    id: 'E11',
    title: 'Template repo + issue-to-agent workflow drill',
    day: 'Day 2',
    block: 'Block 5',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Create a new repo, set up agent commit/push flow, and run issue -> agent -> PR steps using style-guide issues.',
    objective: 'Build a reusable template repository and practice agent handoff/review via multiple scoped GitHub issues.',
    objectiveBullets: [
      'Create a new GitHub repository in your account and clone it locally with help from an AI agent.',
      'Configure the workflow so the agent can commit locally and push to the remote repository.',
      'Write multiple GitHub issues based on different chapters/aspects of the Genskow and Shapiro style guide.',
      'Send your coding agent to solve issues step by step and to open pull requests for each solved issue.',
      'Keep this repo as a reusable template for future programming/research projects (consider the "template" repository type).',
    ],
    inputs: ['New GitHub repository', 'Issue templates tied to style-guide chapters', 'Agent handoff prompt and PR review checklist'],
    deliverable: 'new template repo + issue set + agent PR evidence across style-guide tasks.',
    rubricSpecific: ['Issues are scoped and map to distinct style-guide aspects.', 'PR evidence shows iterative agent handoff and review.'],
    commonFailureModes: ['Agent permissions are not configured for push/PR workflow.', 'Issues are too broad to verify step by step.'],
    extensionTask: 'Promote the repository to a GitHub template and document a starter checklist for future projects.',
    detailPath: '/docs/blocks/e11-issue-agent-pr-workflow',
  },
  {
    id: 'E12',
    title: 'Writing + syndication sprint',
    day: 'Day 2',
    block: 'Block 6',
    durationMinutes: 30,
    answerType: 'text',
    prompt: 'Draft about one-third of a page on your current research agenda using AI-assisted writing workflows.',
    objective: 'Practice AI-assisted writing from bullets or voice input, then refine with human editing and optional web publishing.',
    objectiveBullets: [
      'In VS Code (or similar), draft about a third of a page on your current research agenda with AI support.',
      'Try one workflow: bullet outline -> AI draft -> your manual edit.',
      'Try one workflow: voice-to-text dictation -> AI cleanup/edit.',
      'Compare which workflow feels more natural and where quality improves or degrades.',
      'Optional extension: choose one completed/older project and ask an AI agent to scaffold a simple research website repository (e.g. with Astro).',
    ],
    inputs: ['Current research agenda notes', 'Bullet-to-draft and voice-to-text workflow options', 'Optional older project/paper for website scaffold'],
    deliverable: 'half-page agenda draft + workflow reflection note + optional website scaffold evidence.',
    rubricSpecific: ['Draft has clear argument flow and explicit human editing.', 'Workflow reflection captures trade-offs, not just preferences.'],
    commonFailureModes: ['Output is AI-first prose without substantive human revision.', 'No explicit comparison between the two writing workflows.'],
    extensionTask: 'Ask an agent to scaffold a minimal research website for one completed project and review the output structure.',
    detailPath: '/docs/blocks/e12-writing-syndication-sprint',
  },
];

type ExerciseOverride = Partial<Pick<ExerciseItem, 'title' | 'prompt' | 'objective' | 'objectiveBullets' | 'inputs' | 'deliverable'>>;

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
