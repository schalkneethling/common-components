# Project Goal

## North Star

Make Fiori a practical library of real, usable, accessible web platform components that people can copy, study, adapt, and use in their projects.

The library should push the boundaries of the web platform, including Baseline Newly available and Limited availability features when they make a component better. That ambition must be paired with clear component-level documentation: production readiness, browser support, feature availability, required polyfills, and dependencies should be visible before a developer invests time adopting a component.

The supporting purpose is to make Fiori a realistic test bed and proving ground for the tooling ecosystem around it. The latest Miyagi should be integrated with the project, and projects such as Project Calavera, the CSS property type validator, axe aggregate reporter, claude-toolkit, autoresearch, and VS Code extensions should be able to demonstrate their value here against a real-world component library rather than contrived fixtures. The repo should also explore how standards-based Web Components can work inside a React context, where `fiori-react` becomes the source of truth for using these components from React without replacing their platform foundation.

## Who This Is For

This project is primarily for developers and maintainers who need common web components with clear HTML, CSS, JavaScript, accessibility behavior, documentation, tests, support status, and integration notes.

It is also for the maintainer and contributors who want a practical project laboratory, React developers who want to use Web Components without losing React ergonomics, and users of the wider toolchain who need believable proof points: component folders for Miyagi, repeatable tooling recipes for Project Calavera, typed CSS and custom-property examples for CSS tools, Playwright pages for accessibility reporting, and real project context for agent skills and VS Code extensions.

## Core Goals

1. Ship useful, accessible, platform-first components.
   Components should solve recognizable interface needs such as alerts, skip links, disclosure, icons, session warnings, cards, menus, forms, galleries, and sliders. They should prefer native HTML, CSS, and Web Components before framework code. Lit is encouraged when it improves developer experience, code clarity, and maintainability.

2. Establish a reference component quality bar.
   At least one component should demonstrate the complete standard: README, demo page, API notes, accessible markup, unit tests where useful, Playwright coverage, visual or accessibility checks, support status, feature availability, dependency and polyfill notes, and clear maintenance boundaries.

3. Separate production-ready components from experiments.
   The repo can use modern and emerging platform features, but every component must clearly state whether it is production ready, production ready with documented polyfills or dependencies, experimental, or archived. This prevents the catalog from implying maturity or browser support that the code does not yet have.

4. Use the repo as an integration playground for sibling projects.
   Fiori should intentionally exercise Miyagi component docs and mock data, Project Calavera tooling recipes, CSS property validation, Playwright accessibility aggregation, agent-skill workflows, and VS Code custom-property tools.

5. Make React usage first-class without making React the implementation source.
   The `fiori-react` app should become the source of truth for using Fiori components in React. It should show how the Web Components behave in React applications, where thin React wrappers help, how custom events map into React handlers, how refs and imperative APIs are exposed, and what documentation React users need.

6. Keep the project easy to inspect and run.
   A contributor or agent should be able to install dependencies, start the catalog, run tests, understand component status, and pick the next useful task without reverse-engineering the repository.

7. Build a small, credible contribution surface.
   Issues, labels, documentation, and tests should guide improvements around accessibility, browser behavior, component APIs, CSS quality, and examples.

## Success Looks Like

- The root README clearly explains what Fiori is, how to run it, which components exist, and how production-ready or experimental each one is.
- A user can open the catalog, inspect a component, understand its accessibility model, and reuse the code with confidence.
- One component, likely `alertbox`, becomes the reference implementation for documentation, tests, accessibility behavior, events, configuration, and release readiness.
- Every component has a support status, owner intent, and next action.
- Every component that uses Baseline Newly available or Limited availability features documents browser support, fallbacks, polyfills, dependencies, and production suitability.
- The package-manager transition is complete: lockfile, scripts, CI, docs, and local commands agree.
- CI runs formatting or linting, unit tests, Playwright tests, and accessibility checks with useful artifacts.
- The latest Miyagi is integrated with the project and can present the component catalog, documentation, and examples.
- The `fiori-react` app documents canonical React usage for the components, including props/attributes, events, refs, and accessibility expectations.
- Project Calavera can apply or inspect the repo's tooling recipe as a realistic web-component project.
- CSS custom properties and `@property` registrations are structured enough to exercise the CSS property type validator and VS Code custom-property tools.
- Playwright accessibility runs can feed axe aggregate reporter with realistic component-page results.
- Agent-facing docs and skills can use this repo as a concrete fixture for semantic HTML, component review, CSS validation, and accessibility remediation.

## Non-Goals

- This is not a broad UI framework or a full design system.
- This is not trying to replace mature component libraries.
- This should not optimize for framework bindings before the platform components and demos are solid.
- React wrappers should not become the canonical implementation of a component; they are the canonical React usage layer and adoption helpers.
- This should not publish every experiment as production-ready.
- This should not hide complex behavior behind heavy build tooling when a plain web-platform example would be clearer.
- This should not become only a test fixture or tooling demo. The components should remain understandable, accessible, and useful to humans.
- This should not promise production support for emerging APIs unless support limits, fallbacks, polyfills, and dependencies are documented clearly.

## Principles and Constraints

- Accessibility is part of the component contract, not a later audit phase.
- Prefer semantic HTML, native behavior, logical CSS properties, and small JavaScript modules.
- Push the web platform deliberately. Baseline Newly available and Limited availability features are welcome when they teach something or make the component better, as long as support status is explicit.
- Dependencies, including Lit and polyfills, are allowed when they clearly improve developer experience, correctness, or maintainability, but the README and component docs must not claim "no external dependencies" when runtime dependencies exist.
- Documentation, demos, tests, and implementation should describe the same behavior.
- React integration should reveal friction transparently rather than hiding Web Component semantics behind heavy abstractions.
- Experiments are welcome when clearly labelled.
- Generated assets and large media should support real examples, not obscure the component behavior.
- The repo should stay friendly to automated agents: clear docs, stable commands, small fixtures, and explicit current focus.
- Existing user work in progress, including the pnpm migration, should be preserved and completed intentionally.

## Current Focus

The first turnaround milestone is to stabilize the project shape and create actionable GitHub issues from this goal:

1. Complete the pnpm migration across local scripts, CI, and docs.
2. Rewrite the root README around Fiori's purpose, readiness model, and integration surface.
3. Create a component inventory with support status and next actions.
4. File and prioritize issues for reference components, React usage, Miyagi integration, accessibility reporting, CSS validation, Project Calavera, and documentation.

## Open Questions

- None at the project-goal level. Component sequencing and first React examples should be decided during issue filing and prioritization.
