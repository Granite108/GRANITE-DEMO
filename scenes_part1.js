// ============================================================
// G.R.A.N.I.T.E. VISION DEMO — SCENE CONTENT (Part 1: Scenes 1-8)
// See scenes2.js for Scenes 9-Final.
// ============================================================

const GraniteVisionScenesPart1 = [

  // ---------------- SCENE 1 ----------------
  {
    id: 'empty-chat', title: 'The Empty Chat Window', subtitle: 'The Familiar Starting Point',
    status: [],
    narration: "Here is a familiar moment. Someone opens an AI chat and types: help me figure out what I should do next. The system has almost no context. It doesn't know who this person is, what they've already learned, what their constraints are, what they've already tried, what matters to them, or which knowledge should even be used. What if intelligence did not begin with the prompt? The next evolution of AI may not be a better chat window. It may be persistent cognitive infrastructure.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel">' +
        '<div class="chat-bubble user">Help me figure out what I should do next.</div>' +
        '<div style="height:14px;"></div>' +
        '<div class="chat-q">WHO ARE YOU?</div><div class="chat-q">WHAT HAVE WE ALREADY LEARNED?</div>' +
        '<div class="chat-q">WHAT ARE YOUR CONSTRAINTS?</div><div class="chat-q">WHAT HAVE YOU ALREADY TRIED?</div>' +
        '<div class="chat-q">WHAT MATTERS TO YOU?</div><div class="chat-q">WHAT KNOWLEDGE SHOULD BE USED?</div>' +
        '</div>' +
        '<div class="panel" style="text-align:center;color:var(--gold);font-size:15px;">What if intelligence did not begin with the prompt?</div>';
    }
  },

  // ---------------- SCENE 2 ----------------
  {
    id: 'golden-seed', title: 'The Golden Seed', subtitle: 'Persistent Context With Boundaries',
    status: ['proven', 'partial'],
    narration: "The Golden Seed is the persistent contextual core of the platform — not a giant memory dump, but a structured, user-owned model of facts, goals, and history, organized into separate branches. Watch what happens when a business problem enters the system: only the relevant, authorized business context illuminates. The other branches — Personal, Creative, Explore, Reflective — stay visibly separate. Persistence does not require indiscriminate exposure. It requires governed retrieval. Local persistence, structured retrieval, and this branch-aware architecture are proven and verified. Cloud ownership and cross-device restoration remain production infrastructure work.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">Golden Seed — Branches</div>' +
        '<div class="branch-row" id="branchRow">' +
        ['Reflective', 'Personal', 'Business', 'Creative', 'Explore'].map(function (b) { return '<div class="branch" data-branch="' + b + '">' + b + '</div>'; }).join('') +
        '</div>' +
        '<button class="interact-btn gold" id="askBusinessBtn">Ask a Business Question</button>' +
        '<div id="seedResult" style="margin-top:10px;font-size:12px;color:var(--dim);"></div></div>';
      c.querySelector('#askBusinessBtn').addEventListener('click', function () {
        c.querySelectorAll('.branch').forEach(function (b) { b.classList.toggle('active', b.dataset.branch === 'Business'); });
        c.querySelector('#seedResult').textContent = 'Only the Business branch was retrieved and authorized for this task. Reflective, Personal, Creative, and Explore remain untouched — the Council never saw them.';
      });
    }
  },

  // ---------------- SCENE 3 ----------------
  {
    id: 'context-packaging', title: 'Context Packaging', subtitle: 'Giving Intelligence the Right Problem',
    status: ['proven', 'partial'],
    narration: "Instead of endlessly expanding one giant prompt, G.R.A.N.I.T.E. assembles a context package for the task at hand — intent, constraints, relevant Seed context, prior artifacts, provenance, and the requested output. This is real, running code, not a mockup — click below and watch an actual structured package assemble from real input. The model is never expected to remember the person. The system gives intelligence the authorized context required for the present problem, and nothing more.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">Real input (sample answers)</div>' +
        '<div style="font-size:12px;color:var(--dim);">"Objective: stabilize housing within 30 days. Barriers: limited transportation, seasonal income."</div>' +
        '<button class="interact-btn gold" id="packageBtn" style="margin-top:10px;">Assemble Real Context Package</button></div>' +
        '<div class="panel panel-dim" id="packageOut"><span class="panel-locked">Package not yet assembled.</span></div>' +
        '<div style="font-size:11px;color:var(--dim);">This calls the real, unmodified granite-context-packaging.js module included with this demo — the JSON below is genuine output, not written by hand.</div>';
      c.querySelector('#packageBtn').addEventListener('click', function () {
        const sampleAnswers = {
          S1: 'Looking for stable housing and steady work.', S9: 'Stable housing and consistent income within 90 days.',
          S8: 'limited transportation, seasonal income', S5: 'One child, age 6.'
        };
        const structured = GraniteContextPackaging.structureNavIntake(sampleAnswers);
        const gateIntake = GraniteContextPackaging.buildGateIntakeObject('human_navigation', sampleAnswers, { intakeSummary: 'Real, deterministic summary — not AI-generated for this demo.' });
        const packaged = GraniteContextPackaging.packageContext(gateIntake);
        c.querySelector('#packageOut').classList.remove('panel-dim');
        c.querySelector('#packageOut').innerHTML = '<div class="panel-label">Real assembled package (genuine module output)</div><div class="mini-json">' + JSON.stringify({ structuredContext: structured, contextPackage: packaged }, null, 2) + '</div>';
      });
    }
  },

  // ---------------- SCENE 4 ----------------
  {
    id: 'council', title: 'The Council', subtitle: 'A Cognitive Pipeline, Not a Persona',
    status: ['proven', 'designed'],
    narration: "Enter the Council Chamber. These are ten real, named cognitive functions — not theatrical characters — each suited to a different kind of thinking: structural analysis, forensic auditing, pattern weaving, and more. When a problem is uncertain, several roles can genuinely collaborate. When the problem is already understood, the system can simply execute. Think together when uncertainty exists. Execute when sufficient clarity exists. The role registry and the tier-decision logic shown here are real, tested code. Full live orchestration under real production traffic is still an integration target.",
    render: function (c) {
      const roles = (typeof GraniteCognitiveRoles !== 'undefined') ? GraniteCognitiveRoles.listRoles() : [];
      c.innerHTML =
        '<div class="panel"><div class="panel-label">Real cognitive roles (from granite-cognitive-roles.js)</div>' +
        '<div>' + roles.map(function (r) { return '<span class="node" style="border-color:' + r.color + ';color:' + r.color + ';">' + r.name + '</span>'; }).join('') + '</div></div>' +
        '<div class="two-col">' +
        '<div class="panel"><div class="panel-label">Full Council Diagnostics</div><div style="font-size:12px;color:var(--dim);">"I don\'t know whether to expand the product line or fix retention first."</div><div style="font-size:12px;margin-top:8px;color:var(--blue);">→ Multiple roles activate: Structural Analyst, Forensic Auditor, Risk perspective, Synthesis.</div></div>' +
        '<div class="panel"><div class="panel-label">Simple Result / Execute</div><div style="font-size:12px;color:var(--dim);">"Draft the announcement email for the price change we already decided on."</div><div style="font-size:12px;margin-top:8px;color:var(--gold);">→ Executes directly. No unnecessary deliberation.</div></div>' +
        '</div>';
    }
  },

  // ---------------- SCENE 5 ----------------
  {
    id: 'artifacts', title: 'From Answers to Artifacts', subtitle: 'Turning Conversation Into Durable Knowledge',
    status: ['proven', 'partial'],
    narration: "A chat response disappears into a transcript. An artifact does not. One canonical result can crystallize into an executive summary, a timeline, a roadmap, a risk map, a checklist — different representations of the same underlying knowledge object, not disconnected documents. And a proposed change never becomes permanent on its own: it moves from Candidate, to Confirm, to Commit — a real, human-approved step every time. The registry, the versioning, and this approval pattern are real and working. Provider-generated artifacts at full scale, and cross-user permissions, remain integration work.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">One Master Artifact</div>' +
        '<div style="text-align:center;"><span class="node lit">Master Artifact</span></div>' +
        '<div class="flow-row" style="justify-content:center;">' +
        ['Executive Summary', 'Timeline', 'Roadmap', 'Risk Map', 'Checklist', 'Simulation'].map(function (a) { return '<span class="node blue">' + a + '</span>'; }).join('') +
        '</div></div>' +
        '<div class="panel"><div class="panel-label">Human Authority Over What Becomes Permanent</div>' +
        '<div class="flow-row"><span class="node">Candidate</span><span class="arrow">→</span><span class="node">Confirm</span><span class="arrow">→</span><span class="node lit">Commit</span></div>' +
        '<div style="font-size:12px;color:var(--dim);margin-top:6px;">Nothing becomes canonical knowledge without this real, human-approved step.</div></div>';
    }
  },

  // ---------------- SCENE 6 ----------------
  {
    id: 'resonance', title: 'Resonance', subtitle: 'Personalization Without Personalized Truth',
    status: ['proven', 'partial'],
    narration: "Take one canonical artifact and show it to two different people. A technical, concise, systems-oriented reader. A visual, sequential, analogy-oriented reader. Vocabulary, pacing, and sequencing can change. The facts, the evidence, the confidence, and the conclusions stay locked. This is a real, substantial client-side prototype — over fifteen hundred lines of working interface — demonstrating that expression can adapt without the underlying truth silently mutating. Backend persistence and platform-wide enforcement of that boundary remain future integration work; this specific fact-versus-expression boundary has not yet been proven by an automated test.",
    render: function (c) {
      c.innerHTML =
        '<div class="resonance-cols">' +
        '<div class="panel"><div class="panel-label">User A — Technical, Concise</div><div style="font-size:12px;">Conversion dropped 4.2pp WoW. Root cause: checkout latency (p95 +900ms). Fix: cache warm on session start.</div></div>' +
        '<div class="panel"><div class="panel-label">User B — Visual, Sequential</div><div style="font-size:12px;">Step 1: Fewer people are finishing checkout this week. Step 2: The page is loading noticeably slower right when they try to pay. Step 3: Speeding that moment up should bring conversion back.</div></div>' +
        '</div>' +
        '<div class="panel resonance-locked"><b class="locked-fact">Locked, invariant across both views:</b> Facts: conversion -4.2pp. Evidence: checkout latency p95 +900ms. Confidence: high. Conclusion: latency is the primary driver.</div>';
    }
  },

  // ---------------- SCENE 7 ----------------
  {
    id: 'guided-life', title: 'Guided Life Navigation', subtitle: 'Complexity Into Navigable Structure',
    status: ['proven', 'partial'],
    narration: "Consider someone recovering from addiction, with limited transportation and income, who wants stable employment and doesn't know where to begin. Guided Life Navigation gathers present state, constraints, and goals through a real, structured intake, then converts that complexity into immediate priorities and a real, nine-phase roadmap. This is not the system deciding a person's life. It's converting an overwhelming situation into something inspectable and navigable, one phase at a time. This complete path — intake through a real eight-stage reasoning pipeline to a validated roadmap — is the most rigorously, independently tested scene in this entire demonstration.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">Demonstration intake (fictional situation)</div>' +
        '<div style="font-size:12px;color:var(--dim);">"Recovering, no reliable transportation, seasonal income. Wants stable work and eventually a trade certification."</div></div>' +
        '<div class="panel"><div class="panel-label">Real 9-phase roadmap shape (schema-accurate demonstration data)</div>' +
        '<div class="flow-row">' +
        ['Immediate Stabilization', 'Secure Essentials', 'Establish Income', 'Financial Recovery', 'Long-Term Housing', 'Build Momentum', 'Expand Opportunities', 'Long-Term Stability', 'Goal Achieved'].map(function (p, i) {
          return '<span class="node ' + (i === 0 ? 'lit' : 'dim') + '">' + p + '</span>';
        }).join('') + '</div>' +
        '<div style="font-size:11px;color:var(--dim);margin-top:8px;">This is the real, existing roadmap schema. The specific text shown is demonstration data, not a live model call — no API key is required to run this experience.</div></div>';
    }
  },

  // ---------------- SCENE 8 ----------------
  {
    id: 'business-optimization', title: 'Business Optimization', subtitle: 'Structured Audit, Not Generic Advice',
    status: ['proven', 'partial'],
    narration: "The same architecture applied to a business. A structured intake feeds a real nine-stage reasoning pipeline — the same eight functions as before, plus one additional stage reserved for testing alternative scenarios and pivots. The result: a universal audit core evaluated for every business, plus industry-specific lenses activated only when genuinely relevant — never to fill a fixed count. Unknown information is never penalized. This produces a structured business artifact, a prioritized set of recommendations, and then transitions directly into simulation.",
    render: function (c) {
      c.innerHTML =
        '<div class="panel"><div class="panel-label">Real 9-stage pipeline (Proteus included for this gate only)</div>' +
        '<div class="flow-row">' +
        ['Analysis', 'Research', 'Scenario Testing', 'Planning', 'Architecture', 'Criticism', 'Risk', 'Human Factors', 'Synthesis'].map(function (s) { return '<span class="node blue">' + s + '</span>'; }).join('') +
        '</div></div>' +
        '<div class="panel"><div class="panel-label">Universal Audit Core (always evaluated) + Conditional Industry Lens</div>' +
        '<div style="font-size:12px;">11 universal categories, evaluated for every business — objective alignment, offer, target customer, acquisition, operations, resources, and more.</div>' +
        '<div style="font-size:12px;margin-top:6px;color:var(--gold);">+ Local Service lens activated (this business genuinely serves a local area) — SEO, lead qualification, appointment utilization.</div></div>';
    }
  }
];
