# Fiori Turnaround Roadmap

## Stocktake

### What Is Already Here

- A Vite-powered static catalog at `index.html`.
- A root package named `fiori-common-components`.
- A mostly migrated pnpm setup, with `pnpm-lock.yaml` present and `package-lock.json` deleted in the working tree.
- Component demos under `components/`, including `alertbox`, `svg-icon`, `fiori-disclosure`, `session-end-alert`, `skip-links-nav`, `card-with-flyout`, `carousel`, `curated-gallery`, `forms`, `megamenu`, `hero`, and several Fiori experiments.
- A separate `fiori-react` Vite React app that is still essentially starter scaffolding, but can become a focused React interoperability lab.
- Unit-style Vitest coverage for `alertbox`.
- Playwright coverage for `alertbox` pages.
- Repository settings with issue labels and one open issue for `session-end-alert` storage behavior.

### Strongest Existing Asset

`alertbox` is the closest thing to a production candidate. It already has:

- Custom elements for manager and banner rendering.
- JSON configuration.
- Zod validation.
- Dismissal behavior across page, session, and permanent storage.
- Date-range support.
- Action buttons and links.
- Event emission.
- Unit and Playwright tests.
- Multi-page examples.

This should become the reference component before broadening the project, but its validation approach should be reviewed rather than treated as a permanent default. Zod may remain the right choice, but lighter options such as Valibot or plain purpose-built validation may be better for some components.

### Main Problems

- The root README is too thin and partly stale. It says the project has no external dependencies, but `zod` is currently a runtime dependency.
- CI still uses `npm ci`, while the branch appears to be moving to pnpm.
- Component maturity is unclear. Some folders look like reusable components, some are experiments, and some are demos with no docs.
- Modern platform feature support is not surfaced consistently. Developers need to know up front whether a component is production ready, experimental, requires polyfills, or depends on Baseline Newly available or Limited availability features.
- Runtime validation choices are not yet governed by component-level criteria. Some components may need a schema library, while others may be better served by lighter validation or no library at all.
- The root catalog links only a subset of components.
- Accessibility is an obvious theme, but there is no automated axe reporting yet.
- There is no documented relationship to the latest Miyagi, CSS validation, axe aggregate reporter, claude-toolkit, autoresearch, or the VS Code extensions.
- `fiori-react` is present but does not yet demonstrate how these Web Components behave in React.

## Strategy

Build the repo first as a practical component library, then use that real project as a tooling proving ground.

The component library gives the project intrinsic value. The proving ground gives the wider ecosystem a realistic test target and public demonstration surface. Those two purposes reinforce each other as long as component maturity is explicit and the tooling integrations improve the component quality bar instead of distracting from it.

Fiori should also push the web platform. Components may use Baseline Newly available and Limited availability features when they are the right tool, but the catalog, README, and component docs must make support status, polyfills, dependencies, and production suitability impossible to miss.

React interoperability is part of that proof surface, but it has a special role: `fiori-react` should become the canonical source for using the components from React without moving the canonical component implementation into React.

## Milestones

### Milestone 1: Make The Project Coherent

Goal: a contributor or agent can understand the repo in five minutes.

- Complete pnpm migration in scripts, CI, README, and local setup.
- Update the README with purpose, install/run/test commands, component inventory, readiness labels, feature-support labels, dependency/polyfill notes, and contribution notes.
- Add or update `CONTRIBUTING.md`.
- Add a component status table that distinguishes production ready, production ready with documented polyfills or dependencies, experimental, and archived.
- Reframe `fiori-react` as an active React interoperability lab.
- Ensure the root catalog links every active demo or clearly links only supported demos.

Done when:

- Fresh checkout instructions work.
- CI uses the same package manager as local development.
- Every component has a documented support status and next action.

### Milestone 2: Make The Catalog Useful To Real Users

Goal: the first screen and component pages feel like a small, usable component library rather than a folder index.

- Redesign the root catalog around component discovery, status, and usage.
- Give each active component a consistent page shape: demo, usage, accessibility notes, API/configuration, browser support, Baseline/feature availability, dependencies, polyfills, and known limitations.
- Keep copy-and-adapt usage paths obvious for dependency-light components.
- Clearly separate supported components from experiments.
- Make project naming consistently Fiori, with repository/package naming explained where needed.

Done when:

- A user can find a component, understand whether it is ready to use in production today, and copy the minimum required files or markup.
- Experiments remain visible only where their status is clear.

### Milestone 3: Promote `alertbox` To Reference Quality

Goal: one component sets the bar for all future work.

- Review `alertbox` API and storage semantics.
- Review `alertbox` validation needs and compare Zod with lighter options such as Valibot or purpose-built validation.
- Tighten date-range logic to avoid locale-string comparison risks.
- Confirm accessible names, roles, focus behavior, and announcement behavior.
- Add axe checks for all `alertbox` demo pages.
- Add documentation for events, validation failures, storage behavior, browser support, dependencies, and production readiness.
- Consider whether `svg-icon` is an internal dependency, a peer component, or a required bundled asset.

Done when:

- `alertbox` has docs, demos, unit tests, Playwright tests, accessibility checks, and clear known limitations.
- Future components can copy its documentation and test structure.

### Milestone 4: Wire In The Tooling Ecosystem

Goal: sibling projects have a real, maintained fixture.

- Integrate the latest Miyagi so it can read component folders, docs, examples, and mock data.
- Add a Project Calavera recipe or audit path for the repo's linting, formatting, TypeScript, Stylelint, accessibility, and CSS validation setup.
- Add CSS custom-property examples and optional `@property` registrations for the CSS property type validator.
- Add an accessibility test script that produces axe aggregate reporter input.
- Add a generated or documented report workflow for local review.
- Add claude-toolkit or Codex skill guidance for component review, semantic HTML, accessibility remediation, and CSS validation.
- Add an autoresearch fixture that uses one component task as a repeatable eval.

Done when:

- At least three sibling tools can run against this repo with documented commands and meaningful output.

### Milestone 5: Build The React Interoperability Lab

Goal: make `fiori-react` the source of truth for using Fiori components in React, without making React the component implementation source.

- Replace the Vite starter content in `fiori-react` with a real integration example.
- Keep the lab on React 19 and evaluate React Compiler where it improves real examples without adding confusing build complexity.
- Create React usage examples for all reference-ready components, with issue prioritization deciding the order.
- Demonstrate attribute/property mapping, custom events, refs or imperative methods, and styling hooks.
- Decide when a thin React wrapper is useful and when direct custom-element usage is clearer.
- Document TypeScript ergonomics for custom elements in JSX.
- Add React-facing tests for the integration behavior that React users are likely to depend on.
- Verify any React Compiler adoption through build output, linting, and observable behavior instead of enabling it by default without evidence.
- Feed findings back into the Web Component API design so the platform components stay easier to consume from any framework.

Done when:

- `fiori-react` shows Fiori Web Components working in React with documented integration tradeoffs.
- React 19 is the baseline for the React lab, and React Compiler usage is documented when enabled or explicitly deferred when not appropriate.
- The React example improves the Web Component API or docs rather than forking behavior.

### Milestone 6: Graduate The Next Components

Goal: expand value without flattening all experiments into "supported" components.

Recommended graduation order:

1. `skip-links-nav`, because it is small, accessibility-centered, and already documented.
2. `session-end-alert`, because it has a real open issue and clear product value.
3. `svg-icon`, because other components already depend on it.
4. `fiori-disclosure`, because it is a useful interactive primitive.

For each candidate:

- Confirm intended use.
- Define the public API.
- Add or update README.
- Add tests appropriate to behavior.
- Add accessibility checks.
- Add demo coverage in the root catalog and Miyagi.

Done when:

- At least three components meet the reference-quality checklist or are explicitly labelled as experiments.

## Near-Term Issue Candidates

- Finish pnpm migration and update GitHub Actions.
- Rewrite the root README around the new goal and component inventory.
- Create a component maturity table.
- Make `alertbox` date-range comparisons timezone-safe and test them.
- Review validation-library tradeoffs for `alertbox` and document when Fiori components should use Zod, Valibot, purpose-built validation, or no runtime validation library.
- Add axe accessibility checks for `alertbox`.
- Decide and document `session-end-alert` storage behavior, including whether storage should be configurable.
- Integrate the latest Miyagi with the component folder structure.
- Add Project Calavera configuration or docs for managing the repo's tooling recipe.
- Add CSS custom-property validation examples.
- Replace the `fiori-react` starter with Web Component integration examples.
- Evaluate React Compiler for `fiori-react` once the first real examples exist.
- File and prioritize GitHub issues from this roadmap, including component graduation order and React example order.

## Component Maturity Draft

| Component | Current Read | Suggested Status | Next Action |
| --- | --- | --- | --- |
| `alertbox` | Feature-rich with tests and docs | Reference candidate | Hardening, accessibility reporting, API review |
| `skip-links-nav` | Small, documented, accessibility-focused | Active candidate | Add tests and catalog coverage |
| `svg-icon` | Useful dependency for other components | Active candidate | Add tests and clarify packaging |
| `session-end-alert` | Useful component with open storage question | Active candidate | Resolve configurable storage model |
| `fiori-disclosure` | Documented Web Component primitive | Active candidate | Add tests and accessibility review |
| `card-with-flyout` | Documented native popover/anchor experiment | Experiment or active candidate | Decide support browser/polyfill model |
| `carousel` | Rich demo with many assets | Experiment | Clarify purpose and accessibility requirements |
| `curated-gallery` | Asset-heavy demo | Experiment | Decide whether it is a component or content demo |
| `megamenu` | Data-driven demo | Experiment | Add docs before promoting |
| `forms` | Form option demos | Experiment | Inventory and document |
| `hero` | Visual layout demo | Experiment | Decide whether it belongs in component catalog |
| `fiori-wc` | Fiori experiments | Experiment | Consolidate or archive |
| `disclosure-component-custom` | Older disclosure variant | Archive candidate | Compare with `fiori-disclosure` |
| `responsive-slider` | Demo component | Experiment | Accessibility and API review |
| `fiori-react` | Starter React app | Active integration lab | Replace starter with Web Component interoperability examples |

## Decision Log

- Treat `alertbox` as the first reference component unless future review exposes a better candidate.
- Treat pnpm migration as current work in progress and complete it rather than reverting to npm.
- Keep experiments for now, but label them clearly before inviting users or agents to rely on them.
- Treat the usable component library as the primary product and the tooling ecosystem integration as its supporting proof surface.
- Treat React integration as the canonical React usage layer and feedback loop for the Web Components, not as a replacement implementation track.
- Encourage Lit when it improves developer experience, code clarity, and maintainability.
- Choose runtime validation deliberately per component. Zod, Valibot, custom validation, and no validation are all valid outcomes depending on API shape, payload complexity, bundle impact, and maintainability.
- Use React 19 as the React lab baseline, and adopt React Compiler only where it improves or validates realistic Fiori React usage.
- Allow Baseline Newly available and Limited availability platform features when component docs clearly state readiness, browser support, polyfills, dependencies, and production suitability.
