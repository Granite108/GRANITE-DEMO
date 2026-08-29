// ============================================================
// G.R.A.N.I.T.E. VISION DEMO — SCENE CONTENT (Part 2: Scenes 9-Final)
// ============================================================

// Real, small, standard seeded PRNG (mulberry32) - used ONLY to
// temporarily substitute Math.random() for the duration of a single
// real GraniteScenarioSimulation.runSimulation() call, then restored
// immediately after. This achieves genuine, deterministic reruns
// without modifying the canonical, unmodified copy of
// granite-scenario-simulation.js at all - that file's own source is
// byte-for-byte untouched; only the demo's own call site controls
// which random source is active during its own call.
function graniteDemoSeededRandom(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function runRealSeededSimulation(variables, outcomeFn, runCount, seed) {
  const originalRandom = Math.random;
  Math.random = graniteDemoSeededRandom(seed);
  let result;
  try {
    result = GraniteScenarioSimulation.runSimulation(variables, outcomeFn, runCount);
  } finally {
    Math.random = originalRandom;
  }
  return result;
}

const GraniteVisionScenesPart2 = [

  // ---------------- SCENE 9 ----------------
  {
    id: 'monte-carlo', title: 'Monte Carlo', subtitle: 'Reasoning in Distributions, Not False Certainty',
    status: ['proven', 'partial'],
    narration: "Take an uncertain variable from that business strategy — say, monthly revenue from a new service line. Instead of one confident prediction, the real simulation engine included with this demonstration runs two thousand seeded trials and shows a distribution: a likely range, a downside, an upside, and which assumptions matter most. This is not an animation. It's the actual engine, running locally in your browser right now. Change one assumption below and watch it genuinely, deterministically rerun. When reality is uncertain, intelligence should not manufacture certainty.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">Real variable: Monthly revenue from new service (triangular distribution)</div>' +
        '<label style="font-size:12px;color:var(--dim);">Most likely value ($)</label>' +
        '<input type="range" id="modeSlider" min="800" max="3000" value="1500" style="width:100%;">' +
        '<div id="modeVal" style="font-size:12px;color:var(--gold);">$1,500</div>' +
        '<button class="interact-btn gold" id="runSimBtn" style="margin-top:8px;">Run Real Simulation (2,000 seeded trials)</button></div>' +
        '<div class="panel panel-dim" id="simOut"><span class="panel-locked">Not yet run.</span></div>' +
        '<div style="font-size:11px;color:var(--dim);">This calls the real, unmodified granite-scenario-simulation.js. Determinism for this demo comes from a temporary, local seeded random source used only for this one call — the canonical file itself is never modified.</div>';

      const modeSlider = c.querySelector('#modeSlider');
      modeSlider.addEventListener('input', function () { c.querySelector('#modeVal').textContent = '$' + Number(modeSlider.value).toLocaleString(); });

      c.querySelector('#runSimBtn').addEventListener('click', function () {
        const mode = Number(modeSlider.value);
        const variables = [{ name: 'monthly_revenue', distribution: 'triangular', min: mode * 0.5, mode: mode, max: mode * 1.8 }];
        const outcomeFn = function (sample) { return sample.monthly_revenue; };
        const result = runRealSeededSimulation(variables, outcomeFn, 2000, 42);
        c.querySelector('#simOut').classList.remove('panel-dim');
        c.querySelector('#simOut').innerHTML =
          '<div class="panel-label">Real result (seed 42, 2,000 real trials)</div>' +
          '<div class="bar-row"><span class="bar-label">P10</span><div class="bar-track"><div class="bar-fill" style="width:' + Math.min(100, (result.outcomes.p10 / (mode * 2)) * 100) + '%;"></div></div><span>$' + result.outcomes.p10.toLocaleString() + '</span></div>' +
          '<div class="bar-row"><span class="bar-label">Median</span><div class="bar-track"><div class="bar-fill gold" style="width:' + Math.min(100, (result.outcomes.p50 / (mode * 2)) * 100) + '%;"></div></div><span>$' + result.outcomes.p50.toLocaleString() + '</span></div>' +
          '<div class="bar-row"><span class="bar-label">P90</span><div class="bar-track"><div class="bar-fill" style="width:' + Math.min(100, (result.outcomes.p90 / (mode * 2)) * 100) + '%;"></div></div><span>$' + result.outcomes.p90.toLocaleString() + '</span></div>' +
          '<div style="font-size:11px;color:var(--dim);margin-top:8px;">Real min/max: $' + result.outcomes.min.toLocaleString() + ' – $' + result.outcomes.max.toLocaleString() + '. Same slider value always reproduces this exact result — genuine determinism, not a canned animation.</div>';
      });
    }
  },

  // ---------------- SCENE 10 ----------------
  {
    id: 'knowledge-tree', title: 'Knowledge Becomes a Tree', subtitle: 'An Evolving Structure, Not a Vanishing Transcript',
    status: ['proven', 'designed'],
    narration: "Individual artifacts can accumulate into something larger: a Tree of Knowledge. Real version and revision history already exists — every change to an artifact is tracked, not overwritten. What's designed but not yet built is the fuller relationship graph: edges showing what one piece of knowledge supports, contradicts, or derives from another. That structure is architected, and space is already reserved for it in the real data model — but it is not populated by any code today. Knowledge evolves rather than disappearing into conversation history.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">PROVEN — Real version history</div>' +
        '<div class="flow-row"><span class="node dim">v1</span><span class="arrow">→</span><span class="node dim">v2</span><span class="arrow">→</span><span class="node lit">v3 (current)</span></div>' +
        '<div style="font-size:12px;color:var(--dim);">Every revision is real, tracked, and inspectable — nothing here is invented for this demo.</div></div>' +
        '<div class="panel panel-dim"><div class="panel-label">DESIGNED — Relationship graph (not yet populated)</div>' +
        '<div class="flow-row"><span class="node purple">Artifact A</span><span class="arrow">- - contradicts - -&gt;</span><span class="node purple">Artifact B</span></div>' +
        '<div style="font-size:12px;color:var(--dim);">The schema reserves space for this. No code populates it yet — shown here as architecture, not a working feature.</div></div>';
    }
  },

  // ---------------- SCENE 11 ----------------
  {
    id: 'many-interfaces', title: 'One Document, Many Human Interfaces', subtitle: 'The Information Changes Form. The Meaning Does Not.',
    status: ['designed'],
    narration: "A CEO shares one canonical strategy document. Finance needs margins and cash implications. Engineering needs dependencies and constraints. A frontline employee needs priorities and immediate actions. Today, those translations happen manually and inconsistently. This scene composes two things that are individually real — versioned artifacts, and Resonance's presentation adaptation — into something not yet built: authenticated, role-based translation across different people. This is architecturally designed, not a working feature today.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">One canonical artifact</div><div style="text-align:center;"><span class="node lit">CEO Strategy Document</span></div></div>' +
        '<div class="two-col">' +
        ['CEO — strategic implications, decision points, risk', 'Finance — margins, assumptions, cash implications', 'Engineering — dependencies, constraints, acceptance criteria', 'Frontline — priorities, sequence, immediate actions'].map(function (t) {
          return '<div class="panel panel-dim" style="font-size:12px;">' + t + '</div>';
        }).join('') + '</div>' +
        '<div style="text-align:center;color:var(--dim);font-size:12px;margin-top:6px;">DESIGNED — a real composition of two proven capabilities, not yet built as cross-user functionality.</div>';
    }
  },

  // ---------------- SCENE 12 ----------------
  {
    id: 'education', title: 'Education', subtitle: 'One Curriculum, Many Paths to Understanding',
    status: ['partial'],
    narration: "The same weakness shows up clearly in education. Two students can receive the identical, correct explanation and walk away with radically different understanding, because they differ in prior knowledge, pacing, and preferred representation. A canonical lesson could stay fixed while Resonance changes the route into it, the Council models teacher and peer-like functions, and the Knowledge Tree makes conceptual relationships visible. The adjacent pieces are real. A dedicated, working education product is not yet built.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">One concept</div><div style="text-align:center;"><span class="node lit">Newton\'s Third Law</span></div></div>' +
        '<div class="flow-row" style="justify-content:center;">' +
        ['Visual diagram', 'Technical derivation', 'Step-by-step sequence', 'Everyday analogy', 'Applied exercise'].map(function (r) { return '<span class="node blue">' + r + '</span>'; }).join('') +
        '</div>' +
        '<div style="text-align:center;color:var(--dim);font-size:12px;margin-top:6px;">PARTIALLY INTEGRATED — real adaptive/artifact/reasoning components exist; no dedicated education product yet.</div>';
    }
  },

  // ---------------- SCENE 13 ----------------
  {
    id: 'human-network', title: 'The Human Network', subtitle: 'Organized Around Context, Not Feeds',
    status: ['designed'],
    narration: "Pull outward. Multiple Golden Seeds, connected through explicitly permissioned relationships — never universal access. This is not a claim of a working social network. The real, proven piece is smaller and more honest: within one person's own Seed, connecting two artifacts already requires a structured, human-approved proposal — never automatic discovery. The larger network, organized around authorized context rather than engagement, is a designed direction built on that same real pattern.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">Real, today: within one Seed</div>' +
        '<div class="flow-row"><span class="node">Research artifact</span><span class="arrow">→ proposed →</span><span class="node">Marketing plan</span></div>' +
        '<div style="font-size:12px;color:var(--dim);">A structured proposal, requiring real human approval — never automatic pattern discovery.</div></div>' +
        '<div class="panel panel-dim"><div class="panel-label">Designed, not built: across people</div>' +
        '<div class="flow-row">' + ['Personal', 'Social', 'Professional', 'Public'].map(function (r) { return '<span class="node purple">' + r + '</span>'; }).join('') + '</div>' +
        '<div style="font-size:12px;color:var(--dim);">Distinct permission contexts, bounded sharing — a real direction, not yet a working multi-user network.</div></div>';
    }
  },

  // ---------------- SCENE 14 ----------------
  {
    id: 'communication-infrastructure', title: 'A New Layer of Communication Infrastructure', subtitle: 'The Long-Range Consequence',
    status: ['future'],
    narration: "Zoom out further. Speech. Writing. Printing. Telecommunications. The internet. Search. Each reduced a different cost — of preserving, reproducing, transmitting, retrieving information. Generative intelligence may reduce another: the cost of interpretation. If one semantic source could branch into many human-compatible representations while remaining connected to its origin, communication would no longer have to choose between one standardized message and many manually rewritten ones. This is a future implication of the architecture — not a claim that this infrastructure exists today.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="flow-row" style="justify-content:center;flex-wrap:wrap;">' +
        ['Speech', 'Writing', 'Printing', 'Telecom', 'Internet', 'Search', 'Adaptive Semantic Communication'].map(function (s, i, arr) {
          return '<span class="node ' + (i === arr.length - 1 ? 'purple' : 'dim') + '">' + s + '</span>';
        }).join('<span class="arrow">→</span>') + '</div></div>';
    }
  },

  // ---------------- SCENE 15 ----------------
  {
    id: 'cognitive-continuity', title: 'Cognitive Continuity', subtitle: 'A Governance-Gated Future Concept',
    status: ['future'],
    narration: "One respectful, hypothetical example. A woman opens her late father's preserved Seed and asks what he might have thought about her marrying a particular person. The responsible system does not make an avatar speak. It does not say your father says. It retrieves real evidence — his writings, his expressed values, his prior decisions — and generates an explicitly labeled, evidence-grounded cognitive simulation: based on the preserved record, he frequently prioritized such-and-such, with real, shown uncertainty. This is not the deceased person speaking. It is a model of how that person might have reasoned, grounded only in evidence they chose to preserve. This entire capability requires consent, provenance, inheritance policy, deletion rights, and posthumous access rules that do not exist today.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">Evidence retrieved (hypothetical)</div>' +
        '<div style="font-size:12px;color:var(--dim);">Writings · Expressed values · Prior decisions · Recurring reasoning patterns</div></div>' +
        '<div class="panel"><div class="panel-label">Evidence-Grounded Cognitive Simulation (hypothetical output)</div>' +
        '<div style="font-size:13px;">"Based on the preserved record, he frequently prioritized [a stated value]. Confidence: moderate. Significant uncertainty remains where the record is incomplete."</div></div>' +
        '<div class="panel" style="border-color:var(--future);"><div class="panel-label" style="color:var(--future);">Required governance, none of which exists today</div>' +
        '<div class="flow-row">' + ['Consent', 'Provenance', 'Inheritance', 'Deletion Rights', 'Posthumous Access', 'Uncertainty', 'Identity Boundaries'].map(function (g) { return '<span class="node purple">' + g + '</span>'; }).join('') + '</div></div>';
    }
  },

  // ---------------- FINAL SCENE ----------------
  {
    id: 'final', title: 'Beyond the Prompt', subtitle: 'The Chat Window Becomes One Interface Among Many',
    status: [],
    narration: "Return to that original empty chat window. Shrink it, and pull outward: Golden Seed, Context, Council, Search, Simulation, Artifacts, Resonance, Knowledge Tree, People, Organizations, Network. G.R.A.N.I.T.E. is not ultimately an attempt to build a more elaborate chatbot. It is an attempt to change the fundamental unit of human-AI interaction. Today, that unit is the prompt. G.R.A.N.I.T.E. proposes that the unit become the person — their persistent context, their relationships, their artifacts, their intentions, and the evolving structure of knowledge around them. The chat window becomes only one interface into something much larger. Persistent context. Governed intelligence. Human authority.",
    render: function (c) {
      c.innerHTML =
        '<div class="final-tree">' +
        '<div><span class="lit">Golden Seed</span></div><div>↓</div>' +
        '<div><span class="lit2">Context</span> → <span class="lit2">Council</span></div><div>↓</div>' +
        '<div><span class="lit">Simulation</span> → <span class="lit">Artifacts</span> → <span class="lit">Resonance</span></div><div>↓</div>' +
        '<div><span class="lit3">Knowledge Tree</span> → <span class="lit3">People</span> → <span class="lit3">Organizations</span> → <span class="lit3">Network</span></div>' +
        '</div>' +
        '<div class="panel" style="text-align:center;margin-top:20px;">' +
        '<div style="font-size:28px;letter-spacing:0.15em;font-weight:200;">G.R.A.N.I.T.E.</div>' +
        '<div style="color:var(--gold);font-size:13px;margin-top:8px;">Persistent Context. Governed Intelligence. Human Authority.</div></div>';
    }
  }
];

const GraniteVisionScenes = GraniteVisionScenesPart1.concat(GraniteVisionScenesPart2);
