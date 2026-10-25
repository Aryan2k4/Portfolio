import { projects, projectById, projectsForSkill } from './portfolio.mjs';

const bench = document.querySelector('#workbench');
const content = document.querySelector('#bench-content');
const headings = {
  workspace: 'From an idea.\nTo code that runs.',
  facility: 'From a signal.\nTo a useful action.',
  redteam: 'Find the weakness.\nMeasure the defense.',
  yatra: 'No signal?\nKeep the data moving.'
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function selectProject(id) {
  const project = projectById(id);
  const heading = element('div', 'bench-heading');
  heading.append(element('span', 'mono', `${String(projects.indexOf(project) + 1).padStart(2, '0')} / ${project.category}`));
  const title = element('h2');
  headings[project.id].split('\n').forEach((line, index) => {
    if (index) title.append(document.createElement('br'));
    title.append(document.createTextNode(line));
  });
  heading.append(title);
  const flow = element('div', 'flow');
  project.flow.forEach((step, index) => {
    if (index) {
      const connector = element('span', 'flow-connector', '↓');
      connector.setAttribute('aria-hidden', 'true');
      flow.append(connector);
    }
    const row = element('div', 'flow-node');
    const copy = element('div');
    copy.append(element('strong', '', step.title), element('p', '', step.detail));
    const marker = element('span', 'node-check', index === 1 ? '✓' : '↗');
    marker.setAttribute('aria-hidden', 'true');
    row.append(element('span', 'node-icon', step.icon), copy, marker);
    flow.append(row);
  });
  content.replaceChildren(heading, flow, element('p', 'bench-note', project.note));
  bench.dataset.color = project.color;
  document.querySelector('#bench-link').href = `#project-${project.id}`;
  document.querySelectorAll('[data-project]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.project === project.id)));
  content.classList.remove('bench-enter');
  requestAnimationFrame(() => content.classList.add('bench-enter'));
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.disabled = false;
  button.addEventListener('click', () => selectProject(button.dataset.project));
});

function selectSkill(skill) {
  const matches = projectsForSkill(skill);
  const panel = document.querySelector('#skill-evidence');
  const title = element('h3', '', skill);
  const arrow = element('span', '', '↘');
  arrow.setAttribute('aria-hidden', 'true');
  title.append(arrow);
  panel.replaceChildren(title, element('p', 'evidence-count', `Used in ${matches.length} selected project${matches.length === 1 ? '' : 's'}`));
  for (const project of matches) {
    const link = element('a');
    link.href = `#project-${project.id}`;
    const icon = element('b', '', '↗');
    icon.setAttribute('aria-hidden', 'true');
    link.append(element('span', '', project.title), element('small', '', project.summary), icon);
    panel.append(link);
  }
  document.querySelectorAll('[data-skill]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.skill === skill)));
}

document.querySelectorAll('[data-skill]').forEach(button => {
  button.disabled = false;
  button.addEventListener('click', () => selectSkill(button.dataset.skill));
});

const dialog = document.querySelector('#project-dialog');
let dialogTrigger;
function openProject(id, trigger) {
  const project = projectById(id);
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-role').textContent = project.role;
  const body = document.querySelector('#dialog-body');
  body.replaceChildren();
  for (const [title, text] of [['The problem', project.problem], ['The engineering decision', project.decision], ['What I built & checked', project.evidence]]) {
    const section = element('section', 'dialog-section');
    section.append(element('h3', '', title), element('p', '', text));
    body.append(section);
  }
  const links = document.querySelector('#dialog-links');
  links.replaceChildren();
  for (const [text, url] of [['Explore the code ↗', project.code], ['Open live demo ↗', project.demo]]) {
    if (!url) continue;
    const link = element('a', 'button button-dark', text);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    links.append(link);
  }
  dialogTrigger = trigger;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.scrollTop = 0;
  dialog.querySelector('.dialog-close').focus();
}

if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-detail]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => openProject(button.dataset.detail, button));
  });
}
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  dialogTrigger?.focus();
});
