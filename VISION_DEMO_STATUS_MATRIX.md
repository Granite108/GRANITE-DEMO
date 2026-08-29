# VISION_DEMO_STATUS_MATRIX.md

The exact, real status badges shown to the viewer in each scene, extracted directly from the shipped scene code (scenes_part1.js / scenes_part2.js) — not a separately-maintained description that could drift from what actually renders. Cross-checked against VISION_DEMO_SOURCE_MAP.md; both agree.

| # | Scene | Status shown to viewer |
|---|---|---|
| 1 | The Empty Chat Window | (none — problem framing) |
| 2 | The Golden Seed | PROVEN + PARTIALLY INTEGRATED |
| 3 | Context Packaging | PROVEN + PARTIALLY INTEGRATED |
| 4 | The Council | PROVEN + DESIGNED |
| 5 | From Answers to Artifacts | PROVEN + PARTIALLY INTEGRATED |
| 6 | Resonance | PROVEN + PARTIALLY INTEGRATED |
| 7 | Guided Life Navigation | PROVEN + PARTIALLY INTEGRATED |
| 8 | Business Optimization | PROVEN + PARTIALLY INTEGRATED |
| 9 | Monte Carlo | PROVEN + PARTIALLY INTEGRATED |
| 10 | Knowledge Becomes a Tree | PROVEN + DESIGNED |
| 11 | One Document, Many Human Interfaces | DESIGNED |
| 12 | Education | PARTIALLY INTEGRATED |
| 13 | The Human Network | DESIGNED |
| 14 | A New Layer of Communication Infrastructure | FUTURE IMPLICATION |
| 15 | Cognitive Continuity | FUTURE IMPLICATION |
| Final | Beyond the Prompt | (none — problem framing) |

## Real integrations vs. demonstration data, exactly as shipped

- **Scene 3 (Context Packaging):** genuinely calls `GraniteContextPackaging.structureNavIntake()`, `.buildGateIntakeObject()`, and `.packageContext()` — the real, unmodified module. Output shown is real, not scripted.
- **Scene 4 (Council):** genuinely calls `GraniteCognitiveRoles.listRoles()` — the real 10-role registry. The two interaction-mode examples (Full Council Diagnostics / Simple Execute) are illustrative text, not a live orchestration call, since that requires network-dependent reasoning the demo does not perform.
- **Scene 9 (Monte Carlo):** genuinely calls `GraniteScenarioSimulation.runSimulation()` — the real, unmodified module — with a real, deterministic seeded rerun achieved by temporarily substituting `Math.random` for the duration of one call only, then restoring it. Every number shown is a real, freshly computed result, not pre-recorded.
- **Scenes 2, 5, 6, 7, 8, 10–15:** use schema-accurate or conceptually accurate demonstration data, clearly framed as such in the narration. No live model call, no network access, and no API key is required anywhere in this demonstration.