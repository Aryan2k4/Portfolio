# Portfolio rebuild implementation plan

**Goal:** Rebuild Aryan's portfolio for software and AI/ML recruiters, with no portrait or avatar, preserving the existing repository and Vercel deployment URL.

**Architecture:** Keep buildless HTML, CSS and vanilla JavaScript. A semantic readable page remains useful without JavaScript. Progressive interactions connect actual projects to architecture decisions and resume-backed skills. No external AI service or simulated live telemetry.

**Design:** Warm paper, oversized black typography, cobalt highlights, golden yellow and mint panels, offset borders, generous editorial spacing. Hero copy: "I build software. And make AI useful." Hero interactive workbench shows four selectable project architectures, clearly labeled simplified diagrams. Below: four project case studies, skill-to-project evidence explorer, experience and education, awards and existing certificates, direct contact and current resume download. Subtle motion respects reduced motion. No portrait, chatbot, neon gradients, invented experience, ratings or unverifiable metrics.

**Decisions:** User requested immediate implementation and delegated design choices; proceed inline without further preference gates. Reuse the existing static deployment. Keep the resume's old filename working by updating its bytes and provide a clearly named new file. Retain certificates. Work on a feature branch in this task's dedicated clone. The GitHub connector is read-only; authenticated Git is available for writes.

## Tasks
- [x] Implement accessible project switching and skill filtering; verify meaningful state transitions with Node tests, then browser keyboard and pointer checks.
- [x] Replace the page and add assets/styles.css, assets/app.mjs and assets/portfolio.mjs. Use original SVG project illustrations drawn in code. Copy latest supplied resume to both current and legacy paths.
- [x] Check desktop and mobile layout, resume and certificate paths, dialog close/focus, reduced motion, no-JS content, links and browser console. Run all tests.
- [ ] Request an independent code review, fix material issues, commit and deploy through existing main branch after validating remote head has not changed. Verify the exact existing public URL serves this revision.

## Review focus
Keyboard-only access; small-screen horizontal overflow; no-JS fallbacks; accurate distinction between illustration and live software; maintaining the existing Vercel project and resume paths.

## Progress
Repository cloned at baseline; no pre-existing test command. Git dry-run confirms authenticated push access.

2026-10-26: Six Node tests pass (observed failing selection/filter behavior before implementation). Browser checks at 1280px, 390px and 320px: no horizontal page overflow; workbench project switching, skill-to-project mapping, Enter-to-open and Escape-to-close dialog, and focus restoration verified. Browser reports no warning/error logs. All 27 local resource URLs return 200, all anchors resolve, and both resume paths match supplied PDF bytes. No-JS markup remains readable; reduced-motion CSS removes animation/transition and smooth scrolling.

Independent reviewer found one material omission: certificate discovery dropped from 23 to four. Browser reproduction confirmed four links. Added an expandable 19-item library; browser verification now shows 23 links. No other actionable findings. Decorative labels adjusted to avoid covering controls. Vercel dashboard confirms existing project `portfolio` uses `Aryan2k4/Portfolio` and the requested production domain `portfolio-xi-six-astatt22lg.vercel.app`.
