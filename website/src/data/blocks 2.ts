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
    title: 'Orientation and baseline setup',
    day: 'Day 1',
    block: 'Block 1',
    slidePath: '/slides/blocks/day1/day1_b1_orientation.html',
    lectureFocus: ['Course outcomes and norms', 'Role allocation', 'Baseline prompt check'],
    handsOnActivity: 'Run one baseline prompt as a group and capture one blocker.',
    debriefPrompts: ['What setup assumption failed?', 'What is your minimum ready state?'],
    microArtifact: 'Baseline output plus blocker note.',
  },
  {
    id: 'D1B2',
    title: 'LLM and agent fundamentals',
    day: 'Day 1',
    block: 'Block 2',
    slidePath: '/slides/blocks/day1/day1_b2_llm_fundamentals.html',
    lectureFocus: ['What a model does vs what an agent does', 'Context, tools, and memory boundaries', 'Prompt anatomy'],
    handsOnActivity: 'Classify prompt components and rewrite one weak prompt.',
    debriefPrompts: ['Where can this hallucinate?', 'What should not be delegated?'],
    microArtifact: 'Prompt anatomy label set and one revised prompt.',
    exerciseId: 'E1',
  },
  {
    id: 'D1B3',
    title: 'Prompting and context engineering I',
    day: 'Day 1',
    block: 'Block 3',
    slidePath: '/slides/blocks/day1/day1_b3_prompting_i.html',
    lectureFocus: ['Instruction hierarchy', 'Constraint writing', 'A/B prompt setup'],
    handsOnActivity: 'Run A/B prompt variants with a fixed output target.',
    debriefPrompts: ['Which constraint actually changed output quality?', 'What evidence supports your pick?'],
    microArtifact: 'A/B comparison note with chosen variant.',
  },
  {
    id: 'D1B4',
    title: 'Prompting and context engineering II',
    day: 'Day 1',
    block: 'Block 4',
    slidePath: '/slides/blocks/day1/day1_b4_prompting_ii.html',
    lectureFocus: ['Decomposition patterns', 'Rubric-first prompting', 'Self-check loops'],
    handsOnActivity: 'Complete the prompt rewrite challenge with rubric scoring.',
    debriefPrompts: ['What failed under rubric scoring?', 'How did you tighten the prompt?'],
    microArtifact: 'Final prompt and scored rationale.',
    exerciseId: 'E2',
  },
  {
    id: 'D1B5',
    title: 'Tools, MCP, and coding agents',
    day: 'Day 1',
    block: 'Block 5',
    slidePath: '/slides/blocks/day1/day1_b5_tools_mcp_ide.html',
    lectureFocus: ['Tool-calling lifecycle', 'MCP contract basics', 'Verification traces in IDEs'],
    handsOnActivity: 'Deliver one bugfix or refactor with executable verification.',
    debriefPrompts: ['What failed first: reproduction, fix, or verification?', 'What would you automate safely next?'],
    microArtifact: 'Patch summary with verification trace.',
    exerciseId: 'E3',
  },
  {
    id: 'D1B6',
    title: 'AI-assisted writing and safety',
    day: 'Day 1',
    block: 'Block 6',
    slidePath: '/slides/blocks/day1/day1_b6_writing_safety.html',
    lectureFocus: ['Claim-evidence writing', 'Citation checks', 'Disclosure and risk controls'],
    handsOnActivity: 'Draft one paragraph with citation support and safety annotations.',
    debriefPrompts: ['Which claim is least supported?', 'What uncertainty did you disclose?'],
    microArtifact: 'Revised paragraph with verification notes.',
    exerciseId: 'E4',
  },
  {
    id: 'D2B1',
    title: 'Recap and reliability mindset',
    day: 'Day 2',
    block: 'Block 1',
    slidePath: '/slides/blocks/day2/day2_b1_recap_reliability.html',
    lectureFocus: ['Confidence vs evidence', 'Reliability protocol recap', 'Audit logic'],
    handsOnActivity: 'Audit yesterday artifacts against a reliability checklist.',
    debriefPrompts: ['What evidence was missing?', 'What would falsify your confidence?'],
    microArtifact: 'Reliability audit note.',
  },
  {
    id: 'D2B2',
    title: 'Agent systems and orchestration I',
    day: 'Day 2',
    block: 'Block 2',
    slidePath: '/slides/blocks/day2/day2_b2_orchestration_i.html',
    lectureFocus: ['Single-agent vs multi-agent', 'Tool and memory contracts', 'Minimal architecture design'],
    handsOnActivity: 'Design a minimal orchestrated workflow for one research task.',
    debriefPrompts: ['Where are boundaries unclear?', 'Where is human override required?'],
    microArtifact: 'Workflow sketch with role boundaries.',
  },
  {
    id: 'D2B3',
    title: 'Orchestration II with reliability controls',
    day: 'Day 2',
    block: 'Block 3',
    slidePath: '/slides/blocks/day2/day2_b3_orchestration_ii.html',
    lectureFocus: ['Timeouts and retries', 'Fallback logic', 'Failure injection'],
    handsOnActivity: 'Add reliability controls to a block-2 workflow and test one failure mode.',
    debriefPrompts: ['Which fallback actually worked?', 'What hidden dependency was exposed?'],
    microArtifact: 'Failure-aware architecture note.',
    exerciseId: 'E5',
  },
  {
    id: 'D2B4',
    title: 'Research pipeline design with agents I',
    day: 'Day 2',
    block: 'Block 4',
    slidePath: '/slides/blocks/day2/day2_b4_pipeline_i.html',
    lectureFocus: ['Pipeline stages', 'Human-agent role boundaries', 'Validity checks'],
    handsOnActivity: 'Draft a mini ideation-to-protocol pipeline with explicit boundaries.',
    debriefPrompts: ['Which stage has the highest validity risk?', 'What cannot be delegated?'],
    microArtifact: 'Pipeline canvas with stage ownership.',
  },
  {
    id: 'D2B5',
    title: 'Research pipeline design with agents II',
    day: 'Day 2',
    block: 'Block 5',
    slidePath: '/slides/blocks/day2/day2_b5_pipeline_ii.html',
    lectureFocus: ['Synthetic stimuli generation', 'Protocol caveats', 'Replacement fallacies'],
    handsOnActivity: 'Generate pilot stimuli and write a limitation-first protocol note.',
    debriefPrompts: ['What could this not replace?', 'What limitation matters most for interpretation?'],
    microArtifact: 'Pilot stimuli set and limitations note.',
    exerciseId: 'E6',
  },
  {
    id: 'D2B6',
    title: 'Evaluation, adoption, and resilience',
    day: 'Day 2',
    block: 'Block 6',
    slidePath: '/slides/blocks/day2/day2_b6_evaluation_adoption_resilience.html',
    lectureFocus: ['Rubric-based evaluation', 'Adoption economics', 'Personal verification protocols'],
    handsOnActivity: 'Score two outputs and draft an adoption memo with controls.',
    debriefPrompts: ['Where did raters disagree and why?', 'What governance control is non-negotiable?'],
    microArtifact: 'Scored outputs, adoption memo, and resilience protocol.',
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
