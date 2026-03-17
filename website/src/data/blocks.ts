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
  lectureFocus: string[];
  handsOnActivity: string;
  debriefPrompts: string[];
  microArtifact: string;
  exerciseId?: 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8';
};

export const blocks: BlockItem[] = [
  {
    id: 'D1B1',
    title: 'Intro',
    day: 'Day 1',
    block: 'Block 1',
    slidePath: '/slides/blocks/day1/day1_block1.html',
    lectureFocus: ['Course framing', 'Reliability mindset', 'Workflow norms'],
    handsOnActivity: 'Run one baseline prompt as a group and capture one blocker.',
    debriefPrompts: ['What assumption failed first?', 'What evidence would falsify this?'],
    microArtifact: 'Baseline output plus blocker note.',
  },
  {
    id: 'D1B2',
    title: 'LLMs and AI Agents',
    day: 'Day 1',
    block: 'Block 2',
    slidePath: '/slides/blocks/day1/day1_block2.html',
    lectureFocus: ['Next-token prediction', 'LM formula', 'Agent loop', 'Context/tools/memory'],
    handsOnActivity: 'Classify prompt components and rewrite one weak prompt.',
    debriefPrompts: ['Which assumption failed first?', 'What evidence would falsify output?'],
    microArtifact: 'Prompt anatomy decomposition + revised prompt.',
    exerciseId: 'E1',
  },
  {
    id: 'D1B3',
    title: 'Context',
    day: 'Day 1',
    block: 'Block 3',
    slidePath: '/slides/blocks/day1/day1_block3.html',
    lectureFocus: ['Instruction hierarchy', 'Role/persona prompting', 'Solution space narrowing'],
    handsOnActivity: 'Run A/B prompt variants with a fixed output target.',
    debriefPrompts: ['What assumption failed first?', 'What evidence would falsify output?'],
    microArtifact: 'Before/after prompt + scored A/B table.',
    exerciseId: 'E2',
  },
  {
    id: 'D1B4',
    title: 'Tools 1',
    day: 'Day 1',
    block: 'Block 4',
    slidePath: '/slides/blocks/day1/day1_block4.html',
    lectureFocus: ['Tool-calling lifecycle', 'MCP vs skills', 'IDE vs coding agent', 'Plan mode'],
    handsOnActivity: 'Deliver one bugfix or refactor with executable verification.',
    debriefPrompts: ['What failed first under time pressure?', 'What evidence would falsify your confidence?'],
    microArtifact: 'Patch summary + verification trace.',
    exerciseId: 'E3',
  },
  {
    id: 'D1B5',
    title: 'Tools 2',
    day: 'Day 1',
    block: 'Block 5',
    slidePath: '/slides/blocks/day1/day1_block5.html',
    lectureFocus: ['Advanced tool use', 'Parallel agents', 'Backlog scheduling', 'AGENTS.md customization'],
    handsOnActivity: 'Multi-agent coding exercise with verification traces.',
    debriefPrompts: ['What lessons learned?', 'What failed and why?'],
    microArtifact: 'Multi-agent coordination notes.',
  },
  {
    id: 'D1B6',
    title: 'Memory',
    day: 'Day 1',
    block: 'Block 6',
    slidePath: '/slides/blocks/day1/day1_block6.html',
    lectureFocus: ['Working vs persistent memory', 'Stale memory risks', 'Memory safety', 'Disclosure'],
    handsOnActivity: 'Draft one paragraph with claim-evidence traceability.',
    debriefPrompts: ['Which sentence was hardest to verify?', 'What evidence would falsify your core claim?'],
    microArtifact: 'Paragraph + claim-evidence table + disclosure.',
    exerciseId: 'E4',
  },
  {
    id: 'D2B1',
    title: 'Ideation and Idea Validation',
    day: 'Day 2',
    block: 'Block 1',
    slidePath: '/slides/blocks/day2/day2_block1.html',
    lectureFocus: ['Ideation funnel', 'Fast kill criteria', 'Falsifiability gates'],
    handsOnActivity: 'Idea audit and validation micro artifact.',
    debriefPrompts: ['Which assumptions failed first?', 'What evidence would falsify?'],
    microArtifact: 'Idea audit note.',
  },
  {
    id: 'D2B2',
    title: 'Data Collection',
    day: 'Day 2',
    block: 'Block 2',
    slidePath: '/slides/blocks/day2/day2_block2.html',
    lectureFocus: ['Instrument design', 'Synthetic respondents', 'Contamination risks', 'Attention checks'],
    handsOnActivity: 'Synthetic stimulus design and stress test.',
    debriefPrompts: ['What could this not replace?', 'What limitation matters most?'],
    microArtifact: '6 stimuli + protocol note + limitations.',
    exerciseId: 'E6',
  },
  {
    id: 'D2B3',
    title: 'Literature Review and Research',
    day: 'Day 2',
    block: 'Block 3',
    slidePath: '/slides/blocks/day2/day2_block3.html',
    lectureFocus: ['Retrieval workflow', 'Claim-evidence ledger', 'Source triage', 'Traceable synthesis'],
    handsOnActivity: 'Evidence paragraph with provenance.',
    debriefPrompts: ['What assumption failed first?', 'What stays human-owned?'],
    microArtifact: 'Evidence paragraph with citation ledger.',
  },
  {
    id: 'D2B4',
    title: 'Data Analysis & Coding 1',
    day: 'Day 2',
    block: 'Block 4',
    slidePath: '/slides/blocks/day2/day2_block4.html',
    lectureFocus: ['Orchestration architecture', 'Tool/memory contracts', 'Failure handling'],
    handsOnActivity: 'Design an orchestrated workflow with contracts.',
    debriefPrompts: ['Which split paid off first?', 'What would falsify this architecture?'],
    microArtifact: 'Architecture sketch + contracts + fallback.',
    exerciseId: 'E5',
  },
  {
    id: 'D2B5',
    title: 'Data Analysis & Coding 2',
    day: 'Day 2',
    block: 'Block 5',
    slidePath: '/slides/blocks/day2/day2_block5.html',
    lectureFocus: ['Reliability controls', 'Timeouts/retries/fallbacks', 'Parallel execution economics'],
    handsOnActivity: 'Reliability-enhanced analysis agent.',
    debriefPrompts: ['What failed?', 'What evidence?', 'What to simplify?'],
    microArtifact: 'Reliability controls documentation.',
  },
  {
    id: 'D2B6',
    title: 'Writing & Valorization',
    day: 'Day 2',
    block: 'Block 6',
    slidePath: '/slides/blocks/day2/day2_block6.html',
    lectureFocus: ['Output evaluation', 'LLM-as-judge limits', 'Adoption memo', 'Governance'],
    handsOnActivity: 'Score two outputs + draft adoption memo + personal verification protocol.',
    debriefPrompts: ['Where did raters disagree?', 'What governance control is non-negotiable?'],
    microArtifact: 'Scored comparison + adoption memo + resilience protocol.',
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
