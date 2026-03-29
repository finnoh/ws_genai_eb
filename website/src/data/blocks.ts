export type BlockId =
  | 'D1B1'
  | 'D1B2'
  | 'D1B3'
  | 'D1B4'
  | 'D1B5'
  | 'D1B6'
  | 'D2B1'
  | 'D2B2'
  | 'D2B3'
  | 'D2B4'
  | 'D2B5'
  | 'D2B6';

export type BlockItem = {
  id: BlockId;
  title: string;
  day: 'Day 1' | 'Day 2';
  block: string;
  slidePath: string;
  objective: string;
  inputs: string[];
  deliverable: string;
  lectureFocus: string[];
  handsOnActivity: string;
  debriefPrompts: string[];
  microArtifact: string;
  rubricSpecific: string[];
  extensionTask: string;
  exerciseId: 'E01' | 'E02' | 'E03' | 'E04' | 'E05' | 'E06' | 'E07' | 'E08' | 'E09' | 'E10' | 'E11' | 'E12';
};

export const blocks: BlockItem[] = [
  {
    id: 'D1B1',
    title: 'Course Kickoff: Why AI Agents Now',
    day: 'Day 1',
    block: 'Block 1',
    slidePath: '/slides/blocks/day1/day1_block1.html',
    objective:
      'Frame the workshop, set reliability-first norms, and complete minimum setup viability (startup evidence + one Jan response) before optional hello-world coding.',
    inputs: ['Workshop framing slide deck', 'student-agent-pack install workflow'],
    deliverable:
      'Minimum setup evidence + one first-run Jan response; full completion adds hello-world run and manual verification.',
    lectureFocus: ['Course framing', 'Why AI agents now', 'Jan introduction and operating norms'],
    handsOnActivity:
      'Install or validate student-agent-pack, capture startup evidence, then run hello-world only if setup is stable.',
    debriefPrompts: ['What failed first?', 'Which setup check increased confidence most?'],
    microArtifact: 'Startup check evidence plus one Jan response (and optional hello-world output).',
    rubricSpecific: ['Setup evidence is concrete.', 'Blocker note includes one actionable fix.'],
    extensionTask: 'Run hello-world with a second free model and compare behavior briefly.',
    exerciseId: 'E01',
  },
  {
    id: 'D1B2',
    title: 'LLMs and AI Agents',
    day: 'Day 1',
    block: 'Block 2',
    slidePath: '/slides/blocks/day1/day1_block2.html',
    objective: 'Understand core LLM mechanics and map prompt anatomy to a runnable coding task.',
    inputs: ['Weak baseline prompt', 'Prompt anatomy checklist'],
    deliverable: 'Runnable prompt example with cleaned structured output and a short orientation note.',
    lectureFocus: ['Next-token prediction', 'Agent loop', 'Context/tools/memory distinction'],
    handsOnActivity: 'Rewrite and execute one prompt with explicit output constraints.',
    debriefPrompts: ['Where did ambiguity remain?', 'What changed output quality most?'],
    microArtifact: 'Prompt anatomy breakdown plus executable snippet.',
    rubricSpecific: ['Prompt structure is explicit.', 'Output format is verifiable.'],
    extensionTask:
      'Optional: run the Dealer/Gambler/Referee blackjack mini-demo with explicit standard rules and referee verdict.',
    exerciseId: 'E02',
  },
  {
    id: 'D1B3',
    title: 'Context',
    day: 'Day 1',
    block: 'Block 3',
    slidePath: '/slides/blocks/day1/day1_block3.html',
    objective:
      'Use context engineering and retrieval to improve reliability over a no-context baseline with one explicit boundary disclosure.',
    inputs: ['Baseline task output', 'One retrieval-ready context source'],
    deliverable:
      'A/B note showing baseline versus retrieval-based behavior, one quoted source chunk, and one privacy/copyright boundary disclosure.',
    lectureFocus: ['Context engineering', 'Instruction hierarchy', 'Retrieval-oriented hygiene'],
    handsOnActivity: 'Run baseline and retrieval variants and compare errors.',
    debriefPrompts: ['What did retrieval fix?', 'Where did drift remain?'],
    microArtifact: 'A/B comparison with one validated improvement, one quoted chunk, and one boundary note.',
    rubricSpecific: ['Comparison isolates a meaningful context change.', 'Evidence supports the claimed improvement.'],
    extensionTask: 'Add metadata filtering and report precision difference.',
    exerciseId: 'E03',
  },
  {
    id: 'D1B4',
    title: 'Tools 1',
    day: 'Day 1',
    block: 'Block 4',
    slidePath: '/slides/blocks/day1/day1_block4.html',
    objective:
      'Understand tool-calling loops and implement a small agent using multiple tools, with a no-auth local fallback path.',
    inputs: ['Tool-calling objective', 'At least two callable tools', 'No-auth fallback tool path'],
    deliverable: 'Trace showing tool selection, execution, one verification check, and one fallback/failure note.',
    lectureFocus: ['Tool calls as tokens', 'Action-observation loops', 'Skills and MCP framing'],
    handsOnActivity: 'Build and run a mini tool-calling workflow end-to-end.',
    debriefPrompts: ['Which tool call was unnecessary?', 'How did you verify tool output?'],
    microArtifact: 'Tool trace with one explicit verification step.',
    rubricSpecific: ['Trace proves multiple tool calls.', 'Verification step is reproducible.'],
    extensionTask: 'Force one tool failure and show graceful fallback behavior in the trace.',
    exerciseId: 'E04',
  },
  {
    id: 'D1B5',
    title: 'Tools 2',
    day: 'Day 1',
    block: 'Block 5',
    slidePath: '/slides/blocks/day1/day1_block5.html',
    objective: 'Move from tool user to tool builder by creating and connecting a tiny MCP-style tool.',
    inputs: ['Simple tool idea', 'Minimal SKILL.md or tool contract'],
    deliverable: 'Input -> tool output -> agent explanation flow with sanity notes.',
    lectureFocus: ['Skill design patterns', 'Script-first tool design', 'Minimal MCP architecture'],
    handsOnActivity: 'Build one tiny tool and wire it into an agent call path.',
    debriefPrompts: ['What contract made integration easier?', 'Where did tool assumptions break?'],
    microArtifact: 'Connected tool demo plus sanity check notes.',
    rubricSpecific: ['Tool interface is clear and narrow.', 'End-to-end call path is demonstrated.'],
    extensionTask: 'Add one parameter validation guard and document behavior.',
    exerciseId: 'E05',
  },
  {
    id: 'D1B6',
    title: 'Memory',
    day: 'Day 1',
    block: 'Block 6',
    slidePath: '/slides/blocks/day1/day1_block6.html',
    objective: 'Separate short-term context and persistent memory with an explicit memory policy.',
    inputs: ['Memory policy template', 'One session example with retrieval'],
    deliverable: 'Chat trace showing remembered preference, retrieved fact, and risk note.',
    lectureFocus: ['Short-term vs long-term memory', 'Memory policy', 'RAG basics'],
    handsOnActivity: 'Implement memory behavior and test across session boundaries.',
    debriefPrompts: ['Which memory was stale?', 'How did you constrain retrieval trust?'],
    microArtifact: 'Memory policy plus traced session behavior.',
    rubricSpecific: ['Policy distinguishes memory layers clearly.', 'Risk note captures one concrete failure mode.'],
    extensionTask: 'Compress memory notes and compare retrieval quality.',
    exerciseId: 'E06',
  },
  {
    id: 'D2B1',
    title: 'Ideation with AI Agents',
    day: 'Day 2',
    block: 'Block 1',
    slidePath: '/slides/blocks/day2/day2_block1.html',
    objective: 'Run a structured ideation flow from domain exploration to idea napkin.',
    inputs: ['Candidate domain list', 'Selection criteria'],
    deliverable: 'Idea napkin plus domain scorecard and one IP/HARKING caution.',
    lectureFocus: ['Explore -> select -> immerse -> question -> napkin', 'Project setup for ideation'],
    handsOnActivity: 'Create and score candidate domains, then draft one idea napkin.',
    debriefPrompts: ['Why this domain?', 'What keeps this idea falsifiable?'],
    microArtifact: 'Idea napkin plus domain scoring evidence.',
    rubricSpecific: ['Selection logic is explicit.', 'Idea includes a concrete research question.'],
    extensionTask: 'Re-score the idea under stricter feasibility criteria.',
    exerciseId: 'E07',
  },
  {
    id: 'D2B2',
    title: 'AI in Data Collection',
    day: 'Day 2',
    block: 'Block 2',
    slidePath: '/slides/blocks/day2/day2_block2.html',
    objective: 'Choose exactly one data-collection mode (A or B or C) and define validity-aware controls.',
    inputs: ['Mode taxonomy A/B/C', 'Validity risk checklist'],
    deliverable: 'Design memo with one explicit mode choice, threat model, verification plan, and prototype artifact reference.',
    lectureFocus: ['DGP/instrument framing', 'Synthetic respondents', 'Validity threats'],
    handsOnActivity: 'Draft one mode-specific protocol, build one tiny prototype artifact, and stress test key assumptions.',
    debriefPrompts: ['Which validity threat dominates?', 'How would you verify externally?'],
    microArtifact: 'One-page design memo with explicit mode choice and prototype artifact reference.',
    rubricSpecific: ['Mode choice is justified.', 'Verification plan is concrete.'],
    extensionTask: 'Add pilot criteria (sample size + stop/continue rule).',
    exerciseId: 'E08',
  },
  {
    id: 'D2B3',
    title: 'Literature Review',
    day: 'Day 2',
    block: 'Block 3',
    slidePath: '/slides/blocks/day2/day2_block3.html',
    objective:
      'Produce one evidence paragraph supported by a claim-evidence ledger with journal-policy note and minimum evidence threshold.',
    inputs: ['Target claim set', 'At least two papers', 'Search results with snippets and source metadata'],
    deliverable:
      'Evidence paragraph plus claim/source/snippet/confidence/gap ledger (minimum two claims), policy note, and unresolved gap.',
    lectureFocus: ['Structured retrieval workflows', 'Verifiable citation practice', 'Gap logging'],
    handsOnActivity: 'Search, triage, and write one traceable synthesis paragraph with a minimum two-paper evidence base.',
    debriefPrompts: ['Which claim is least secure?', 'What evidence is still missing?'],
    microArtifact: 'Paragraph with transparent provenance ledger (minimum two claims).',
    rubricSpecific: ['Claims are traceable to sources.', 'Unresolved gaps are explicitly logged.'],
    extensionTask: 'Add a third paper and test whether Zotero retrieval improves the ledger.',
    exerciseId: 'E09',
  },
  {
    id: 'D2B4',
    title: 'Rigorous Analysis with AI Agents',
    day: 'Day 2',
    block: 'Block 4',
    slidePath: '/slides/blocks/day2/day2_block4.html',
    objective: 'Run a reproducible prompt -> code -> run -> test -> fix workflow.',
    inputs: ['Scoped analysis task', 'Test-first verification plan'],
    deliverable: 'Minimal code output plus executable check and keep/reject note.',
    lectureFocus: ['Reproducible coding loop', 'Unit-test-first habits', 'Data access restrictions'],
    handsOnActivity: 'Implement and verify one small analysis workflow.',
    debriefPrompts: ['Which test caught the most risk?', 'What did you reject and why?'],
    microArtifact: 'Verified run log with assumptions and decision note.',
    rubricSpecific: ['Verification is executable.', 'Decision note is evidence-based.'],
    extensionTask: 'Add one negative test and rerun the loop.',
    exerciseId: 'E10',
  },
  {
    id: 'D2B5',
    title: 'Research Workflows',
    day: 'Day 2',
    block: 'Block 5',
    slidePath: '/slides/blocks/day2/day2_block5.html',
    objective: 'Practice issue -> agent -> PR workflow with explicit human review gates.',
    inputs: ['Scoped issue template', 'Agent handoff prompt', 'PR review checklist'],
    deliverable: 'Issue text, handoff prompt, PR review verdict, and PR link or simulated PR record.',
    lectureFocus: ['Workflow decomposition', 'GitHub CLI handoffs', 'Review checkpoints'],
    handsOnActivity:
      'Create one issue, dispatch to an agent, and review resulting diff (simulated PR evidence acceptable if permissions block real PR).',
    debriefPrompts: ['Where should humans always intervene?', 'What trust signal mattered most?'],
    microArtifact: 'Workflow drill evidence from issue to review.',
    rubricSpecific: ['Handoff is clear and scoped.', 'Review verdict references concrete checks.'],
    extensionTask: 'Add one explicit policy rule for mandatory human override.',
    exerciseId: 'E11',
  },
  {
    id: 'D2B6',
    title: 'Writing & Syndication',
    day: 'Day 2',
    block: 'Block 6',
    slidePath: '/slides/blocks/day2/day2_block6.html',
    objective: 'Turn rough notes into a short brief and publish-ready syndication plan (web-ready page is optional).',
    inputs: ['Bullet notes or voice transcript', 'Disclosure and channel checklist'],
    deliverable: '300-500 word brief plus 3-channel syndication plan and disclosure note; optional web-ready page draft.',
    lectureFocus: ['Drafting pipeline', 'Disclosure constraints', 'Multi-channel research syndication'],
    handsOnActivity: 'Draft one brief and prepare a minimal publication plan.',
    debriefPrompts: ['What edit improved clarity most?', 'What disclosure is mandatory?'],
    microArtifact: 'Brief plus concrete syndication plan.',
    rubricSpecific: ['Brief is coherent and concise.', 'Syndication plan is realistic and specific.'],
    extensionTask: 'Adapt the brief for one additional audience and/or create a web-ready page draft.',
    exerciseId: 'E12',
  },
];

export function getBlockById(blockId: BlockId): BlockItem {
  const item = blocks.find((block) => block.id === blockId);
  if (!item) {
    throw new Error(`Unknown block id: ${blockId}`);
  }
  return item;
}
