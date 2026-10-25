export const projects = [
  {
    id: 'workspace', title: 'AI Software Engineer Workspace', short: 'AI workspace', color: 'blue',
    category: 'AGENTIC SOFTWARE', role: 'Software engineering project · 2026',
    summary: 'From a feature request to structured, validated code.',
    problem: 'Generating code is only one part of the problem. The output also needs to be well formed, persisted, and safe to execute.',
    decision: 'Separate generation, validation, and execution. Reject malformed or duplicate file writes before an isolated worker runs anything.',
    evidence: 'A network-disabled Docker worker with a strict 30-second execution timeout. Conversation history and project context persist in PostgreSQL.',
    skills: ['TypeScript', 'Next.js', 'Node.js', 'Prisma', 'PostgreSQL', 'Docker', 'LLM tool calling', 'Structured outputs'],
    code: 'https://github.com/Aryan2k4/AI-Software-Engineer', demo: 'https://ai-software-engineer-rho.vercel.app/',
    flow: [
      { title: 'Feature request', detail: 'Natural language + saved repository context', icon: '01' },
      { title: 'Generate & validate', detail: 'Structured outputs · reject malformed file writes', icon: '02' },
      { title: 'Isolated execution', detail: 'Docker · no network · 30-second timeout', icon: '03' }
    ], note: 'The interesting part? What happens after generation.'
  },
  {
    id: 'facility', title: 'Smart Facility Operations', short: 'Facility ops', color: 'mint',
    category: 'APPLIED AI / INTERNSHIP', role: 'AI & Software Engineering Intern · Infosys Springboard 7.0',
    summary: 'Turning building telemetry into actionable operations.',
    problem: 'Energy, maintenance, occupancy, security, and cost data need to inform operational decisions, even when an upstream AI provider fails.',
    decision: 'Connect ingestion and evaluation pipelines to persistent state. Make fallback and recovery workflows idempotent so interrupted runs can resume safely.',
    evidence: 'Integrated 35,040 time-series energy readings. Automated pytest suites evaluate MAE, R², precision, recall, and F1.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'LLM tool calling', 'pytest', 'ML evaluation'],
    code: 'https://github.com/Aryan2k4/Infosys_Agentic-AI-for-Smart-facility-operations-and-Optimization-', demo: 'https://facilityops.onrender.com/',
    flow: [
      { title: 'Building telemetry', detail: 'Energy · maintenance · occupancy · security · cost', icon: '01' },
      { title: 'Analyze & evaluate', detail: 'Python · model predictions · Groq LLM tools', icon: '02' },
      { title: 'Act & recover', detail: 'Work orders · alerts · persistent PostgreSQL state', icon: '03' }
    ], note: 'Good systems have a plan for when things fail.'
  },
  {
    id: 'redteam', title: 'Adversarial ML Platform', short: 'ML red team', color: 'pink',
    category: 'ML SECURITY', role: 'Team lead · team of 4 · 2026',
    summary: 'Test the model. Then test how it breaks.',
    problem: 'Clean accuracy does not tell the whole story. Models also need evaluation under adversarial perturbations and poisoned training data.',
    decision: 'Build repeatable attack evaluators for linear-softmax classifiers and keep training and test data strictly separated.',
    evidence: 'FGSM, PGD, decision-only random search, and label-flip poisoning. Tests check perturbation bounds, repeatable trajectories, and clean-retraining defense baselines.',
    skills: ['Python', 'NumPy', 'FastAPI', 'Docker', 'ML evaluation', 'Adversarial robustness'],
    code: 'https://github.com/Aryan2k4/adversarial-ml-platform', demo: 'https://adversarial-ml-platform.onrender.com/login',
    flow: [
      { title: 'Clean baseline', detail: 'Linear-softmax classifier · separate train/test data', icon: '01' },
      { title: 'Attack & defend', detail: 'FGSM · PGD · black-box search · label poisoning', icon: '02' },
      { title: 'Measure robustness', detail: 'Clean accuracy · adversarial accuracy · success rate', icon: '03' }
    ], note: 'A model is only as convincing as its evaluation.'
  },
  {
    id: 'yatra', title: 'Yatra Kavach', short: 'Offline safety', color: 'yellow',
    category: 'OFFLINE-FIRST SYSTEMS', role: 'Backend lead · team of 4 · 2026',
    summary: 'Route safety for places where the signal disappears.',
    problem: 'High-altitude pilgrimage corridors in Himachal Pradesh have unreliable cellular connectivity. Emergency data cannot depend on a steady connection.',
    decision: 'Queue SOS alerts, GPS coordinates, and route checkpoints locally, then synchronize compact payloads atomically when connectivity returns.',
    evidence: 'Backend development for a four-person hackathon team, focused on offline-to-cloud synchronization and resilient emergency workflows.',
    skills: ['REST APIs', 'Offline sync', 'Backend systems'],
    code: null, demo: 'https://yatra-kavach-tau.vercel.app/',
    flow: [
      { title: 'SOS & checkpoints', detail: 'Emergency alert · last-known GPS · route progress', icon: '01' },
      { title: 'Local queue', detail: 'Keep events available while the device is offline', icon: '02' },
      { title: 'Reconnect & sync', detail: 'Compact payloads · atomic cloud synchronization', icon: '03' }
    ], note: 'Built around a constraint close to home.'
  }
];

export function projectsForSkill(skill = '') {
  const normalized = String(skill).trim().toLowerCase();
  return projects.filter(project => !normalized || project.skills.some(item => item.toLowerCase() === normalized));
}

export function projectById(id) {
  return projects.find(project => project.id === id) ?? projects[0];
}
