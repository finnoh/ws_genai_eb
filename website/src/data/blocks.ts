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
    objective: 'Run a team ideation sprint in a shared ChatGPT/Claude project and produce three distinct idea napkins in one selected domain.',
    inputs: ['Shared ChatGPT/Claude project workspace', 'Domain scoring table (interest, feasibility, timeliness)', 'Idea napkin template'],
    deliverable: 'Shared project evidence + scored domain table + three idea napkins with risk notes.',
    lectureFocus: ['Explore -> select -> immerse -> question -> napkin', 'Project setup for ideation'],
    handsOnActivity: 'Form teams of three, create one shared project, score domains, and draft three separate napkins for the selected domain.',
    debriefPrompts: ['Why did your team select this domain?', 'Which napkin is most promising and why?'],
    microArtifact: 'Scored domain table plus three distinct napkins with one risk each.',
    rubricSpecific: ['Domain scoring and selection logic is explicit.', 'Napkins are distinct, scoped, and testable.'],
    extensionTask: 'Invite collaborators to the same project and compare score disagreements before final selection.',
    exerciseId: 'E07',
  },
  {
    id: 'D2B2',
    title: 'AI in Data Collection',
    day: 'Day 2',
    block: 'Block 2',
    slidePath: '/slides/blocks/day2/day2_block2.html',
    objective: 'Prototype all three AI data-collection modes with concrete examples and compare plausibility/validity risks.',
    inputs: ['A/B treatment idea for AI-generated stimuli', 'Prolific + AI-agent integration notes', 'Synthetic respondent setup inspired by Twin-2K-500'],
    deliverable: 'One worked example per mode plus plausibility note and cross-mode comparison table.',
    lectureFocus: ['DGP/instrument framing', 'Synthetic respondents', 'Validity threats'],
    handsOnActivity: 'Build one example for each mode: controlled A/B stimuli, new-instrument idea via Prolific + agent, and one synthetic respondent interview.',
    debriefPrompts: ['Which mode felt most feasible?', 'Where did plausibility break first?'],
    microArtifact: 'Three mode artifacts plus a short plausibility and risk comparison.',
    rubricSpecific: ['Each mode has a concrete artifact.', 'Plausibility and validity risks are compared explicitly.'],
    extensionTask: 'Add one external validation check for the synthetic respondent answers.',
    exerciseId: 'E08',
  },
  {
    id: 'D2B3',
    title: 'Literature Review',
    day: 'Day 2',
    block: 'Block 3',
    slidePath: '/slides/blocks/day2/day2_block3.html',
    objective:
      'Map a familiar literature stream using AI only, then verify what is correct, missing, or hallucinated.',
    inputs: ['One familiar research stream', 'AI literature search workflow', 'Prompt to build a 2D paper map'],
    deliverable:
      'AI-generated literature table + 2D map + verification note (+ optional Zotero MCP test note).',
    lectureFocus: ['Structured retrieval workflows', 'Verifiable citation practice', 'Gap logging'],
    handsOnActivity: 'Ask AI to recover core papers without naming them, generate a table and 2D map, then audit quality against your own knowledge.',
    debriefPrompts: ['What did AI miss?', 'What did AI hallucinate?'],
    microArtifact: 'Literature table + 2D positioning map + verification audit note.',
    rubricSpecific: ['Table/map are structured and interpretable.', 'Verification explicitly separates correct, missing, and hallucinated items.'],
    extensionTask: 'Configure Zotero MCP and compare paper recall quality before vs after integration.',
    exerciseId: 'E09',
  },
  {
    id: 'D2B4',
    title: 'Rigorous Analysis with AI Agents',
    day: 'Day 2',
    block: 'Block 4',
    slidePath: '/slides/blocks/day2/day2_block4.html',
    objective: 'Translate one target journal AI policy into an agent-enforceable documentation checklist.',
    inputs: ['Target journal AI-use guideline page', 'Disclosure/checklist draft', 'Current agent instruction file or template'],
    deliverable: 'Journal policy summary + agent-ready AI-usage checklist + repository pattern note.',
    lectureFocus: ['Reproducible coding loop', 'Unit-test-first habits', 'Data access restrictions'],
    handsOnActivity: 'Extract journal requirements, convert them into checklist rules, and encode the rules in agent instructions/templates.',
    debriefPrompts: ['Which requirement is hardest to operationalize?', 'How will you enforce this in future projects?'],
    microArtifact: 'Policy-to-agent checklist with one concrete enforcement mechanism.',
    rubricSpecific: ['Policy summary is source-backed and precise.', 'Checklist rules are operational for agent use.'],
    extensionTask: 'Add one repository pattern to enforce AI-use logging in PRs or commit templates.',
    exerciseId: 'E10',
  },
  {
    id: 'D2B5',
    title: 'Research Workflows',
    day: 'Day 2',
    block: 'Block 5',
    slidePath: '/slides/blocks/day2/day2_block5.html',
    objective: 'Create a reusable template repository and practice issue -> agent -> PR iterations on style-guide tasks.',
    inputs: ['New GitHub repository', 'Issue templates mapped to Genskow and Shapiro style-guide chapters', 'Agent handoff prompt + PR review checklist'],
    deliverable: 'Template repo + issue set + agent PR evidence across style-guide tasks.',
    lectureFocus: ['Workflow decomposition', 'GitHub CLI handoffs', 'Review checkpoints'],
    handsOnActivity:
      'Create and clone a new repo, ensure agent commit/push access, then solve multiple scoped issues step by step with PR-based review.',
    debriefPrompts: ['Which issue scope worked best for handoff?', 'Where did human override remain essential?'],
    microArtifact: 'Issue set + PR trail showing iterative agent handoff and review.',
    rubricSpecific: ['Issues are clearly scoped and separable.', 'Review uses concrete diff/check evidence.'],
    extensionTask: 'Promote the repository to a GitHub template and add a starter checklist for future projects.',
    exerciseId: 'E11',
  },
  {
    id: 'D2B6',
    title: 'Writing & Syndication',
    day: 'Day 2',
    block: 'Block 6',
    slidePath: '/slides/blocks/day2/day2_block6.html',
    objective: 'Draft a short agenda text with AI-assisted writing workflows and optionally scaffold a research website.',
    inputs: ['Current research agenda notes', 'Bullet-outline and voice-to-text writing workflows', 'Optional older project/paper for website scaffold'],
    deliverable: 'Half-page agenda draft + workflow reflection + optional website scaffold evidence.',
    lectureFocus: ['Drafting pipeline', 'Disclosure constraints', 'Multi-channel research syndication'],
    handsOnActivity: 'Write from bullets and voice dictation, edit manually, compare both workflows, then optionally scaffold a simple project website.',
    debriefPrompts: ['Which workflow felt more natural?', 'Where did manual editing matter most?'],
    microArtifact: 'Agenda draft plus explicit workflow comparison note.',
    rubricSpecific: ['Draft is clear and human-edited.', 'Workflow comparison captures concrete trade-offs.'],
    extensionTask: 'Scaffold a minimal research website for one completed project and review its structure.',
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
