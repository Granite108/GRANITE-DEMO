# VISION_DEMO_SOURCE_MAP.md

Audit performed against the real, uploaded G.R.A.N.I.T.E. source tree (architecture docs, all .js/.html modules, the Council Chamber and Resonance Engine archives) and cross-referenced against work independently built and tested across this project's own development history. Every status below reflects direct inspection - reading the real file, checking for a real test, or finding an explicit, honest scope-boundary comment in the code itself - not the Vision Manifest's own claims accepted at face value. Where my independent check confirms the manifest's own status table (Section 19), that agreement is noted; where I found something the manifest doesn't mention, that's noted too.

Status definitions, used exactly as specified:
- PROVEN - implemented and independently verified (real code, real test, or both).
- PARTIALLY INTEGRATED - real components exist; production infrastructure or end-to-end wiring remains.
- DESIGNED - specified in architecture/contracts; not yet proven as a working system.
- FUTURE IMPLICATION - a plausible consequence, not a present product claim.

---

## Scene 1 - The Empty Chat Window

No system claim - this scene establishes the problem, not a G.R.A.N.I.T.E. capability. No status label needed.

## Scene 2 - The Golden Seed

System: Persistent, branch-scoped user context.
Source files: granite-seed-store-react-copy.js (persistence + branch structure); granite-guide.js (buildSeed(), branch-aware reads).
Relevant tests: Real, direct confirmation across this project's own build work - GraniteSeedStore.commit()/.load() exercised repeatedly with real candidate-seed shape validation (REQUIRED_SHAPE_KEYS), confirmed honest syncedToCloud:false fallback when no Supabase client is loaded.
Status: PROVEN (local persistence, structured retrieval, branch separation) / PARTIALLY INTEGRATED (cloud ownership, cross-device restoration, authenticated multi-user RLS - none of these are exercised anywhere in the available source; no real Supabase client library is loaded in any tested path).
Scene classification: PROVEN + PARTIALLY INTEGRATED, shown honestly as both.

## Scene 3 - Context Packaging

System: Assembling task-relevant, authorized context into one package before reasoning.
Source files: granite-context-packaging.js (buildGateIntakeObject(), packageContext(), structureNavIntake(), structureBizIntake()).
Relevant tests: Directly, extensively exercised in this project's own Guided Life and Business Optimization builds - real field-name preservation confirmed (objectives, barriers, etc.), real downstream consumption by GraniteGuide.buildSeed() confirmed.
Status: PROVEN (the packaging contract and its structured output are real, tested code) / PARTIALLY INTEGRATED (live, provider-backed reasoning over that package depends on production credentials, which don't exist in this environment).
Scene classification: PROVEN + PARTIALLY INTEGRATED.

## Scene 4 - The Council (Diagnose vs. Execute)

System: Cognitive-role orchestration and tiered escalation.
Source files: granite-cognitive-roles.js (10 real, named cognitive functions - Structural Analyst, Forensic Auditor, Diagnostic Scanner, Signal Scout, Pattern Weaver, Narrative Synthesizer, Conceptual Blender, and others - explicitly documented as a separate system from LOKI's own Pantheon codenames, not a forced equivalence); granite-council-orchestrator.js (decideTier() - real 3-tier decision logic: explicit selection, single/multi-role, or justified LOKI escalation with a fixed, real justification list); granite-council-execution.js.
Relevant tests: No dedicated automated test file found for the orchestrator in the uploaded set. The tier-decision logic itself is real, complete, and directly inspectable - it fails safe (defaults to a single clarity-translator role) on any unparseable or invalid model response, confirmed by reading the code's own fallback branches.
Status: PROVEN (the orchestration contract, the real 10-role registry, and the tier-decision logic exist as real, complete code) / DESIGNED (full live multi-provider orchestration under real load is not demonstrated by any test in the available source).
Scene classification: PROVEN (structure) + DESIGNED (full live orchestration) - do not present Tier 3 escalation as routinely exercised in production; it is a real, coded path, not yet proven under real traffic.

## Scene 5 - From Answers to Artifacts

System: Artifact registry, versioning, and Candidate to Confirm to Commit governance.
Source files: granite-artifact-registry.js (real gate-to-renderer registry, confirmed and directly used throughout this project's own Guided Life/Business Optimization builds); granite-artifact-timeline.js (real, generic version/revision-history normalizer - explicitly documented as reading existing stateHistory/revisionHistory data, not inventing new data); granite-relationship-proposals.js and granite-golden-threads.js (both real, working implementations of the Candidate to Confirm to Commit pattern for artifact relationships - explicitly never auto-committing, always requiring a real person's approval, and explicitly refusing any AI-fabricated artifact ID rather than silently accepting one).
Relevant tests: Artifact registry and its renderers directly, repeatedly tested in this project's Guided Life and Business Optimization work (real buildReport()/structured-reporting validation). No dedicated automated test found for granite-golden-threads.js or granite-relationship-proposals.js in the uploaded set, though both are real, complete, non-stub code.
Status: PROVEN (registry, versioning, and the Candidate-Confirm-Commit pattern all exist as real, working code) / PARTIALLY INTEGRATED (provider-generated artifacts beyond what's been directly tested, cloud continuity, and cross-user permissions remain unbuilt).
Scene classification: PROVEN + PARTIALLY INTEGRATED.

## Scene 6 - Resonance

System: Presentation-layer adaptation with an invariant factual substrate.
Source files: resonance_engine-1.html / resonance_engine-2.html (real, substantial - 1,514 lines each - client-side prototypes); resonance_engine_reconstruction_package.zip; granite-lens-registry.js (real module explicitly built to unify two previously-separate, hardcoded presentation mechanisms - the manual workspace's lens switcher and Reality Engine's audit-trail rendering - into one real, consistent (context) => html contract); genesis_calibration_chamber.html and its own architecture/changelog/data-schema docs (Golden Seed-backed calibration state).
Relevant tests: The manifest's own claim of "a boundary audit demonstrating that expression can change while facts, evidence, and conclusions remain invariant" is consistent with the lens registry's own documented separation of concerns, but no automated test file confirming this boundary was found in the uploaded set - this is a real, working prototype, not a test-proven invariant.
Status: PROVEN (a genuinely substantial, production-feeling client-side prototype with real Golden Seed state integration and a real, unifying lens-presentation layer) / PARTIALLY INTEGRATED (backend persistence and platform-wide enforcement of the fact/expression boundary are not demonstrated).
Scene classification: PROVEN (prototype exists and is substantial) + PARTIALLY INTEGRATED (no automated proof of the invariant found - the demo should not claim this boundary was test-verified, only that it is the prototype's designed behavior).

## Scene 7 - Guided Life Navigation

System: Structured intake through a real 8-stage LOKI pipeline to a validated 9-phase roadmap.
Source files: GUIDED_LIFE_NAVIGATION_QUESTIONNAIRE.html, granite-guided-life-contract.js, granite-guided-life-adapter.js, plus the shared chain (granite-context-packaging.js, granite-loki-pipeline.js, granite-reality-engine.js, granite-artifact-registry.js).
Relevant tests: Directly built and run in this project's own development history - a real, 47-check packaged test suite (GRANITE_GUIDED_LIFE_NAVIGATION_ENGINE_PRE_INTEGRATION_2026-08-27.zip), including a real, confirmed 8-stage LOKI trace with Proteus correctly absent, real structureNavIntake() field preservation, real malformed-report rejection, and a fresh-extraction verification pass.
Status: PROVEN - this is the single most independently verified scene in the entire demonstration; every claim has a real, packaged, rerunnable test behind it. PARTIALLY INTEGRATED for live provider completion and the production route change (not yet made; documented in that package's own INTEGRATION_HANDOFF.md).
Scene classification: PROVEN + PARTIALLY INTEGRATED - this scene can be demonstrated with the highest confidence of any in the presentation.

## Scene 8 - Business Optimization

System: Structured intake through a real 9-stage LOKI pipeline (Proteus included) to a validated artifact bundle.
Source files: granite-business-optimization-contract.js, granite-business-schemas.js, granite-business-optimization-adapter.js, granite-business-entitlement.js, plus the shared chain.
Relevant tests: Directly built and run in this project's own development history - a real, 53-check packaged test suite (GRANITE_BUSINESS_OPTIMIZATION_ENGINE_PRE_INTEGRATION_2026-08-27.zip), including a real, confirmed 9-stage LOKI trace with Proteus at its exact verified position, real universal-category and conditional-lens validation, real default-deny entitlement behavior, and a fresh-extraction verification pass.
Status: PROVEN (same level of direct, rerunnable verification as Guided Life) / PARTIALLY INTEGRATED (live data integrations, production provider execution, and entitlement/payment infrastructure remain incomplete - confirmed directly: no real Stripe or subscription code exists anywhere in the available source).
Scene classification: PROVEN + PARTIALLY INTEGRATED.

## Scene 9 - Monte Carlo

System: Seeded, reproducible probabilistic simulation.
Source files: granite-scenario-simulation.js.
Relevant tests: Directly built and run in this project's own development history - real seed reproducibility confirmed (same seed + same inputs -> byte-identical output), real divergence confirmed under a different seed, real backward compatibility confirmed for no-seed calls, real Pearson-correlation sensitivity ranking confirmed, and real integration into the Business Optimization results workspace's assumption-review-before-execution lifecycle, including the real ephemeral-data rule (raw samples discarded from memory immediately after an insight is approved - confirmed directly, not assumed).
Status: PROVEN - the simulation engine itself, including reproducibility, is the most rigorously, directly tested individual piece of math anywhere in this project. PARTIALLY INTEGRATED for real-world assumption calibration (today's variable ranges are AI-proposed during a triage step, explicitly labeled explicit_assumption until a person confirms them against something real).
Scene classification: PROVEN + PARTIALLY INTEGRATED. The demo's "modify one assumption and rerun" interaction (per the directive) is genuinely supportable locally and deterministically, since the real simulator requires no network access to run.

## Scene 10 - Knowledge Becomes a Tree

System: Versioned, relationship-aware knowledge structure.
Source files: granite-artifact-timeline.js (real version/revision history - confirmed reading existing, real stateHistory/revisionHistory data); granite-golden-threads.js and granite-relationship-proposals.js (real Candidate-Confirm-Commit relationship proposals between real, existing artifacts); WORLD_TREE_ARCHITECTURE.md (181 lines), Tree_of_Knowledge_v0_5_HANDOFF.md (526 lines), Tree_of_Knowledge_Evolution_HANDOFF.md (440 lines).
Relevant tests: No automated test file found for any World Tree-specific module in the uploaded set.
Important, precise finding: granite-artifact-timeline.js's own header comment is explicit that relationship edges (influences, dependencies, contradictions, derived-from, merged-into) are "explicitly NOT built here, per the agreed scope" - though every timeline entry already carries a real, empty relationships array reserved for that future work. This is a genuinely important distinction: version/revision history is real and working; the relationship graph itself is designed and reserved-for, not populated.
Status: PROVEN (version/revision history, and the proposal-layer mechanics for relationships) / DESIGNED (the actual relationship graph - edges between artifacts showing contradiction, derivation, support - is architected but not populated by any code in the available source) / PARTIALLY INTEGRATED (live Supabase RLS and storage, per the manifest).
Scene classification: Show version history and the Candidate-Confirm-Commit relationship-proposal mechanism as PROVEN. Show the fuller "contradicts / derives-from / supports" relationship graph as DESIGNED - do not render it as if populated data already exists, because it doesn't.

## Scene 11 - One Document, Many Human Interfaces

System: One canonical artifact, multiple role-specific, authorized representations.
Source files: No dedicated cross-user, role-based sharing module found anywhere in the uploaded source. This scene's real prerequisites are Scene 5 (artifact versioning/authority) and Scene 6 (Resonance's presentation-layer adaptation) - both real - combined with authenticated, permissioned multi-user sharing, which is not built.
Relevant tests: None applicable - no code to test.
Status: DESIGNED - exactly matching the manifest's own claim. The architectural prerequisites are real and proven individually; their combination into authenticated cross-user role-based views is not implemented anywhere in the available source.
Scene classification: DESIGNED. This scene must be presented as a compelling, honest composition of two real, proven capabilities (versioned artifacts + presentation adaptation) - not as an already-working feature. The demo should use clearly conceptual, non-functional visualization for the four-recipient split.

## Scene 12 - Education

System: Adaptive, multi-perspective educational delivery over a shared knowledge structure.
Source files: No dedicated education-product module found. Real supporting pieces: granite-cognitive-roles.js (Council roles could plausibly model teacher/challenger/peer functions), the Resonance prototype (Scene 6), and the World Tree relationship-proposal mechanics (Scene 10).
Relevant tests: None applicable.
Status: PARTIALLY INTEGRATED - exactly matching the manifest's own claim: real, adjacent components exist (adaptive presentation, structured roadmaps, artifact generation, multi-perspective reasoning, knowledge relationships), but no dedicated, working education product or test exists.
Scene classification: PARTIALLY INTEGRATED. Present as a real composition of already-proven pieces applied to a new domain, not as a built education feature.

## Scene 13 - The Human Network

System: Permissioned, bounded sharing between multiple people's Golden Seeds.
Source files: granite-relationship-proposals.js is real, but operates within a single Seed (linking that person's own artifacts to each other) - it is not a cross-user, cross-Seed sharing mechanism. No code implementing permissioned sharing between distinct Golden Seeds was found anywhere in the uploaded source.
Relevant tests: None applicable to cross-user sharing specifically.
Status: DESIGNED - matching the manifest's own claim exactly. Do not present bounded multi-user sharing as built; the real, proven relationship-proposal mechanism is single-Seed only.
Scene classification: DESIGNED. The demo must be explicit that this scene visualizes a network model that has not been implemented, using the single-Seed relationship-proposal mechanism only as evidence that the underlying pattern (structured, human-approved connections rather than automatic discovery) is real and already working at the individual level.

## Scene 14 - Communication Infrastructure

System: None - long-range historical/conceptual framing.
Status: FUTURE IMPLICATION - matching the manifest's own explicit label for this section. No source files apply.
Scene classification: FUTURE IMPLICATION, labeled unmistakably throughout, exactly as the manifest itself insists.

## Scene 15 - Cognitive Continuity

System: None - a governance-gated future concept, explicitly not implemented.
Status: FUTURE IMPLICATION - matching the manifest's own explicit label. No source files apply; the manifest itself lists the required governance primitives (consent, provenance, inheritance policy, deletion rights, posthumous access rules) as prerequisites that do not yet exist.
Scene classification: FUTURE IMPLICATION. This scene requires the most careful narration in the entire demonstration - the directive's own constraints (no avatar, no "your father says," explicit distinction between recorded evidence and inference) must be followed precisely, and the demo must not imply any part of this is built.

## Final Scene - Beyond the Prompt

Synthesis of the above; no new status claim. The closing visual (Seed -> Context -> Council -> Search -> Simulation -> Artifacts -> Resonance -> Knowledge Tree -> People -> Organizations -> Network) should visually distinguish PROVEN elements (Seed, Context, Council structure, Artifacts, Resonance prototype, Guided Life, Business Optimization, Simulation) from DESIGNED/FUTURE elements (the fuller Knowledge Tree relationship graph, People/Organizations/Network) using the same status-indicator convention used throughout, not uniform visual weight.

---

## Summary Table

| Scene | System | Status |
|---|---|---|
| 2 - Golden Seed | Persistence, branches | PROVEN + PARTIALLY INTEGRATED |
| 3 - Context Packaging | Package assembly | PROVEN + PARTIALLY INTEGRATED |
| 4 - Council | Cognitive roles, tier orchestration | PROVEN (structure) + DESIGNED (full live orchestration) |
| 5 - Artifacts | Registry, versioning, Candidate-Confirm-Commit | PROVEN + PARTIALLY INTEGRATED |
| 6 - Resonance | Presentation adaptation | PROVEN (prototype) + PARTIALLY INTEGRATED (enforcement) |
| 7 - Guided Life | Full pipeline | PROVEN + PARTIALLY INTEGRATED - most rigorously tested scene |
| 8 - Business Optimization | Full pipeline | PROVEN + PARTIALLY INTEGRATED - second most rigorously tested |
| 9 - Monte Carlo | Simulation engine | PROVEN + PARTIALLY INTEGRATED |
| 10 - Knowledge Tree | Versioning proven; relationship graph reserved, not populated | PROVEN (versioning) + DESIGNED (relationship graph) |
| 11 - Many Interfaces | Cross-user role-based sharing | DESIGNED |
| 12 - Education | Adaptive multi-perspective learning | PARTIALLY INTEGRATED |
| 13 - Human Network | Cross-Seed permissioned sharing | DESIGNED |
| 14 - Communication Infrastructure | (none) | FUTURE IMPLICATION |
| 15 - Cognitive Continuity | (none) | FUTURE IMPLICATION |

No status was upgraded to make any scene more impressive. Where the manifest's own claim and my independent code inspection agreed, that agreement is noted. Where inspection surfaced a more precise distinction than the manifest states (Scene 10's relationship graph specifically), the more conservative, precise finding is used.
