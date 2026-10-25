import test from 'node:test';
import assert from 'node:assert/strict';
import { projectsForSkill, projectById } from '../assets/portfolio.mjs';

test('Python points a recruiter to facility operations and adversarial ML', () => {
  assert.deepEqual(projectsForSkill('Python').map(p => p.id), ['facility', 'redteam']);
});
test('skill lookup normalizes casing and surrounding whitespace', () => {
  assert.deepEqual(projectsForSkill('  pYtHon ').map(p => p.id), ['facility', 'redteam']);
});
test('all projects are discoverable with an empty filter', () => {
  assert.equal(projectsForSkill('').length, 4);
});
test('an unsupported skill does not claim project evidence', () => {
  assert.deepEqual(projectsForSkill('Rust'), []);
});
test('project selection loads the matching architecture and actual destination', () => {
  const p = projectById('yatra');
  assert.equal(p.title, 'Yatra Kavach');
  assert.equal(p.demo, 'https://yatra-kavach-tau.vercel.app/');
  assert.ok(p.flow.some(node => /queue/i.test(node.title)));
});
test('unknown project selections safely use the initial project', () => {
  assert.equal(projectById('missing').id, 'workspace');
});
