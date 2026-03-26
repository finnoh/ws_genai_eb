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
  exerciseId?: 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8';
};

export const blocks: BlockItem[] = [
  {
    id: 'D1B1',
    title: 'Intro',
    day: 'Day 1',
    block: 'Block 1',
    slidePath: '/slides/blocks/day1/day1_block1.html',
    objective: 'Set shared course norms, tool setup expectations, and a reliability-first mindset for all later blocks.',
    inputs: ['Kickoff deck + schedule', 'Jan/student-agent-pack install instructions'],
    deliverable: 'One baseline prompt output plus one blocker note from setup or first interaction.',
    lectureFocus: ['Course framing', 'Reliability mindset', 'Workflow norms'],
    handsOnActivity: 'Run one baseline prompt as a group and capture one blocker.',
    debriefPrompts: ['What assumption failed first?', 'What evidence would falsify this?'],
    microArtifact: 'Baseline output plus blocker note.',
    rubricSpecific: [
      'Baseline attempt is specific enough to inspect failure modes.',
      'Blocker note includes a concrete next action or workaround.',
    ],
    extensionTask: 'Customize one local instruction file (for example AGENTS.md) and note what changed.',
  },
  {
    id: 'D1B2',
    title: 'LLMs and AI Agents',
    day: 'Day 1',
    block: 'Block 2',
    slidePath: '/slides/blocks/day1/day1_block2.html',
    objective: 'Understand next-token mechanics and classify when tasks need context, tools, or memory.',
    inputs: ['One weak baseline prompt', 'Prompt anatomy checklist (role, task, constraints, output format)'],
    deliverable: 'Prompt anatomy decomposition plus one improved prompt with short rationale.',
    lectureFocus: ['Next-token prediction', 'LM formula', 'Agent loop', 'Context/tools/memory'],
    handsOnActivity: 'Classify prompt components and rewrite one weak prompt.',
    debriefPrompts: ['Which assumption failed first?', 'What evidence would falsify output?'],
    microArtifact: 'Prompt anatomy decomposition + revised prompt.',
    rubricSpecific: [
      'Prompt cleanly separates role, task, constraints, and format.',
      'Rationale names at least one likely failure mode and mitigation.',
    ],
    extensionTask: 'Run the revised prompt on a new context and log what breaks.',
    exerciseId: 'E1',
  },
  {
    id: 'D1B3',
    title: 'Context',
    day: 'Day 1',
    block: 'Block 3',
    slidePath: '/slides/blocks/day1/day1_block3.html',
    objective: 'Use context engineering to narrow solution space and improve output reliability.',
    inputs: ['Baseline prompt and rewritten variant', 'One fixed output target for A/B comparison'],
    deliverable: 'Before/after prompt pair and a short A/B score table.',
    lectureFocus: ['Instruction hierarchy', 'Role/persona prompting', 'Solution space narrowing'],
    handsOnActivity: 'Run A/B prompt variants with a fixed output target.',
    debriefPrompts: ['What assumption failed first?', 'What evidence would falsify output?'],
    microArtifact: 'Before/after prompt + scored A/B table.',
    rubricSpecific: [
      'A/B variants differ on a small number of controlled changes.',
      'Scores are backed by explicit evidence from outputs.',
    ],
    extensionTask: 'Add one retrieval source and compare whether quality improves or drifts.',
    exerciseId: 'E2',
  },
  {
    id: 'D1B4',
    title: 'Tools 1',
    day: 'Day 1',
    block: 'Block 4',
    slidePath: '/slides/blocks/day1/day1_block4.html',
    objective: 'Apply tool-calling patterns (MCP/skills/IDE) to complete one verifiable coding task.',
    inputs: ['Concrete bugfix or refactor target', 'Agent trace with commands and checks'],
    deliverable: 'Patch summary with verification trace and one unresolved risk.',
    lectureFocus: ['Tool-calling lifecycle', 'MCP vs skills', 'IDE vs coding agent', 'Plan mode'],
    handsOnActivity: 'Deliver one bugfix or refactor with executable verification.',
    debriefPrompts: ['What failed first under time pressure?', 'What evidence would falsify your confidence?'],
    microArtifact: 'Patch summary + verification trace.',
    rubricSpecific: [
      'Change scope is narrow and tied to one explicit problem.',
      'Verification includes at least one executable check.',
    ],
    extensionTask: 'Add one negative test that would catch the original issue earlier.',
    exerciseId: 'E3',
  },
  {
    id: 'D1B5',
    title: 'Tools 2',
    day: 'Day 1',
    block: 'Block 5',
    slidePath: '/slides/blocks/day1/day1_block5.html',
    objective: 'Design and run a small multi-agent workflow with explicit handoffs and verification.',
    inputs: ['One shared coding task', 'Coordination plan (roles, order, handoff contract)'],
    deliverable: 'Multi-agent coordination notes plus final output and verification trace.',
    lectureFocus: ['Advanced tool use', 'Parallel agents', 'Backlog scheduling', 'AGENTS.md customization'],
    handsOnActivity: 'Multi-agent coding exercise with verification traces.',
    debriefPrompts: ['What lessons learned?', 'What failed and why?'],
    microArtifact: 'Multi-agent coordination notes.',
    rubricSpecific: [
      'Role split is explicit and reduces duplicate work.',
      'Handoffs include enough context for the next agent/human to continue safely.',
    ],
    extensionTask: 'Swap one agent role and compare throughput and error rate.',
  },
  {
    id: 'D1B6',
    title: 'Memory',
    day: 'Day 1',
    block: 'Block 6',
    slidePath: '/slides/blocks/day1/day1_block6.html',
    objective: 'Separate short-term context from persistent memory and use memory safely in writing.',
    inputs: ['One claim to support', 'Citation integrity checklist and memory policy'],
    deliverable: 'Paragraph with claim-evidence table, confidence score, and disclosure note.',
    lectureFocus: ['Working vs persistent memory', 'Stale memory risks', 'Memory safety', 'Disclosure'],
    handsOnActivity: 'Draft one paragraph with claim-evidence traceability.',
    debriefPrompts: ['Which sentence was hardest to verify?', 'What evidence would falsify your core claim?'],
    microArtifact: 'Paragraph + claim-evidence table + disclosure.',
    rubricSpecific: [
      'Every non-trivial claim maps to evidence or an uncertainty note.',
      'Disclosure clearly states where AI support was used.',
    ],
    extensionTask: 'Rewrite for a skeptical reviewer and tighten evidence language.',
    exerciseId: 'E4',
  },
  {
    id: 'D2B1',
    title: 'Ideation and Idea Validation',
    day: 'Day 2',
    block: 'Block 1',
    slidePath: '/slides/blocks/day2/day2_block1.html',
    objective: 'Move from broad ideas to testable, falsifiable research opportunities.',
    inputs: ['Domain map of candidate ideas', 'Quick kill-criteria checklist'],
    deliverable: 'Idea audit memo with one advanced and one discarded direction.',
    lectureFocus: ['Ideation funnel', 'Fast kill criteria', 'Falsifiability gates'],
    handsOnActivity: 'Idea audit and validation micro artifact.',
    debriefPrompts: ['Which assumptions failed first?', 'What evidence would falsify?'],
    microArtifact: 'Idea audit note.',
    rubricSpecific: [
      'At least one idea is rejected with clear evidence-based reasoning.',
      'Chosen idea has a concrete falsification test.',
    ],
    extensionTask: 'Run one additional validation pass with an alternate domain framing.',
  },
  {
    id: 'D2B2',
    title: 'Data Collection',
    day: 'Day 2',
    block: 'Block 2',
    slidePath: '/slides/blocks/day2/day2_block2.html',
    objective: 'Choose an AI data-collection mode (A/B/C) and define validity controls.',
    inputs: ['Mode taxonomy A/B/C', 'Design constraints and risk checklist'],
    deliverable: 'Design choice memo with one verification plan and key limitations.',
    lectureFocus: ['Instrument design', 'Synthetic respondents', 'Contamination risks', 'Attention checks'],
    handsOnActivity: 'Synthetic stimulus design and stress test.',
    debriefPrompts: ['What could this not replace?', 'What limitation matters most?'],
    microArtifact: '6 stimuli + protocol note + limitations.',
    rubricSpecific: [
      'Mode choice is justified with explicit validity risks.',
      'Verification plan is concrete and runnable in class.',
    ],
    extensionTask: 'Stress-test one assumption with a counterfactual prompt or persona.',
    exerciseId: 'E6',
  },
  {
    id: 'D2B3',
    title: 'Literature Review and Research',
    day: 'Day 2',
    block: 'Block 3',
    slidePath: '/slides/blocks/day2/day2_block3.html',
    objective: 'Produce traceable synthesis using an explicit claim-evidence ledger workflow.',
    inputs: ['One claim to support', 'Source shortlist with snippets/DOI/page notes'],
    deliverable: 'Evidence paragraph and ledger with confidence + unresolved gaps.',
    lectureFocus: ['Retrieval workflow', 'Claim-evidence ledger', 'Source triage', 'Traceable synthesis'],
    handsOnActivity: 'Evidence paragraph with provenance.',
    debriefPrompts: ['What assumption failed first?', 'What stays human-owned?'],
    microArtifact: 'Evidence paragraph with citation ledger.',
    rubricSpecific: [
      'Each claim has a retrievable quote/snippet or unresolved tag.',
      'Citation keys are internally consistent with sources used.',
    ],
    extensionTask: 'Run a missing-citation check and resolve at least one gap.',
  },
  {
    id: 'D2B4',
    title: 'Data Analysis & Coding 1',
    day: 'Day 2',
    block: 'Block 4',
    slidePath: '/slides/blocks/day2/day2_block4.html',
    objective: 'Build one reproducible analysis+model run with assumptions and verification note.',
    inputs: ['Sample dataset or prepared pipeline', 'Modeling objective and keep/reject criteria'],
    deliverable: 'Reproducible analysis artifact with assumptions and verification note.',
    lectureFocus: ['Orchestration architecture', 'Tool/memory contracts', 'Failure handling'],
    handsOnActivity: 'Design an orchestrated workflow with contracts.',
    debriefPrompts: ['Which split paid off first?', 'What would falsify this architecture?'],
    microArtifact: 'Architecture sketch + contracts + fallback.',
    rubricSpecific: [
      'Run can be reproduced by another group with listed steps.',
      'Assumptions and rejection criteria are explicit.',
    ],
    extensionTask: 'Add one robustness/spec check and document outcome.',
    exerciseId: 'E5',
  },
  {
    id: 'D2B5',
    title: 'Data Analysis & Coding 2',
    day: 'Day 2',
    block: 'Block 5',
    slidePath: '/slides/blocks/day2/day2_block5.html',
    objective: 'Operationalize a team workflow from issue intake to agent output and PR review.',
    inputs: ['Two scoped GitHub issues', 'PR review checklist and test evidence requirements'],
    deliverable: 'Workflow runbook with issue template, handoff policy, and review checklist.',
    lectureFocus: ['Reliability controls', 'Timeouts/retries/fallbacks', 'Parallel execution economics'],
    handsOnActivity: 'Reliability-enhanced analysis agent.',
    debriefPrompts: ['What failed?', 'What evidence?', 'What to simplify?'],
    microArtifact: 'Reliability controls documentation.',
    rubricSpecific: [
      'Workflow includes explicit human review gates.',
      'Runbook captures at least one failure and mitigation pattern.',
    ],
    extensionTask: 'Dispatch a second issue and compare cycle time and quality.',
  },
  {
    id: 'D2B6',
    title: 'Writing & Valorization',
    day: 'Day 2',
    block: 'Block 6',
    slidePath: '/slides/blocks/day2/day2_block6.html',
    objective: 'Evaluate outputs, draft adoption memo, and define a personal resilience protocol.',
    inputs: ['Two outputs for same task', 'Rubric and governance checklist'],
    deliverable: 'Scored comparison, short adoption memo, and verification protocol draft.',
    lectureFocus: ['Output evaluation', 'LLM-as-judge limits', 'Adoption memo', 'Governance'],
    handsOnActivity: 'Score two outputs + draft adoption memo + personal verification protocol.',
    debriefPrompts: ['Where did raters disagree?', 'What governance control is non-negotiable?'],
    microArtifact: 'Scored comparison + adoption memo + resilience protocol.',
    rubricSpecific: [
      'Scoring differences are justified with evidence, not preference.',
      'Memo states deployment risks, controls, and monitoring plan.',
    ],
    extensionTask: 'Apply your protocol to one live task next week and log one adjustment.',
    exerciseId: 'E7',
  },
];

export function getBlockById(blockId: BlockId): BlockItem {
  const item = blocks.find((block) => block.id === blockId);
  if (!item) {
    throw new Error(`Unknown block id: ${blockId}`);
  }
  return item;
}
