// ============================================================
// GRANITE CONTEXT PACKAGING
// v1.0 (temporary layer) — extracted from granite-design-os.html
//
// WHAT THIS IS
// The handoff layer between Intake and the Loki pipeline. An Intake
// module collects raw answers (keyed by stage id — S1, Q1, etc.); this
// module turns that into (a) a labeled, structured intake object and
// (b) the actual ReferenceObject text the pipeline consumes. Nothing
// about the pipeline needs to change to accept this — it already reads
// a plain ReferenceObject the same way it reads an uploaded document.
//
// WHY THIS EXISTS AS ITS OWN LAYER (not folded into Intake or Pipeline)
// This is explicitly the seam where the future Golden Seed builder
// plugs in. Right now packageContext() does one job: raw answers in,
// pipeline-ready text out. Once persistence exists, Golden Seed
// construction (saving a portable context object across sessions) can
// be added *inside this layer* — building on the same structured intake
// this module already produces — without the Intake module or the
// Pipeline module needing to change at all. That's the whole reason
// this is a separate file instead of just two functions living wherever
// was convenient.
//
// This module assumes a global GATE_REGISTRY exists (currently defined
// in granite-intake.js) by the time its functions are actually CALLED —
// not by the time this file loads, which is fine, since nothing here
// runs at load time.
// ============================================================

const GraniteContextPackaging = (function () {

  // Raw answers are stored keyed by stage id (S1, S2, ...) — accurate,
  // but not self-explanatory to anything reading them later (a report,
  // an audit view, a future Golden Seed). This maps each Guided Life
  // Navigation stage onto a named field. Covers all 7 fields required
  // for the Golden Path demo (objective, currentSituation, constraints,
  // resources, desiredOutcome, timeline, supportRequirements) plus two
  // extra fields GLN already collects that aren't in that required list
  // (personalContext, deliveryPreference) — kept, not dropped, just
  // labeled as bonus context.
  const NAV_INTAKE_FIELD_MAP = {
    S1: 'objective',            // Signal
    S2: 'personalContext',      // Trust (extra, not one of the 7 required)
    S3: 'currentSituation',     // Context
    S4: 'timeline',             // Timeline
    S5: 'supportRequirements',  // Environment
    S6: 'resources',            // Resources
    S7: 'deliveryPreference',   // Learning Profile (extra, not one of the 7 required)
    S8: 'constraints',          // Friction
    S9: 'desiredOutcome'        // Direction
  };

  function structureNavIntake(answers) {
    const structured = {};
    for (const [stageId, field] of Object.entries(NAV_INTAKE_FIELD_MAP)) {
      structured[field] = answers[stageId] || null;
    }
    return structured;
  }

  // Same idea, for Business Optimization's Q1-Q16. Added alongside the
  // GLN mapping specifically so both gates produce a consistent
  // structured shape — this is what was actually missing before: Business
  // Optimization collected zero identity/preference data and had nothing
  // equivalent to structureNavIntake() to make what little context it did
  // collect (like the new Q16 communication preference) usable downstream.
  const BIZ_INTAKE_FIELD_MAP = {
    Q1: 'businessIdentity',
    Q5: 'targetAudience',
    Q7: 'currentChallenges',
    Q8: 'resources',
    Q12: 'objectives',
    Q13: 'successDefinition',
    Q14: 'constraints',
    Q16: 'communicationPreference'
  };

  function structureBizIntake(answers) {
    const structured = {};
    for (const [stageId, field] of Object.entries(BIZ_INTAKE_FIELD_MAP)) {
      structured[field] = answers[stageId] || null;
    }
    return structured;
  }

  // The handoff object itself. `status` is not decorative: both source
  // documents (Business Optimization Trust Layer v1.0, Human Navigation
  // Intake v2.2) explicitly say operational work must not begin on an
  // unconfirmed Reflective Mirror. Carrying that as a real field means
  // that rule can actually be enforced in code later, not just in the
  // document describing it.
  function buildGateIntakeObject(gateId, answers, opts = {}) {
    const gate = GATE_REGISTRY[gateId];
    if (!gate) throw new Error(`Unknown gate "${gateId}" — register it in GATE_REGISTRY first.`);
    return {
      gateId,
      gateVersion: gate.version,
      timestamp: new Date().toISOString(),
      answers: answers || {},                     // { stageId: answerText }
      intakeSummary: opts.intakeSummary || null,   // the Reflective Mirror text, once confirmed
      status: opts.status || 'draft'               // 'draft' | 'mirror_confirmed'
    };
  }

  // Converts a confirmed gate intake into the same ReferenceObject shape
  // as every uploaded file. This is the actual handoff: the pipeline,
  // the advisor loop, and Synthesis all already read obj.content.text —
  // none of them need to change to accept gate output. (Was named
  // gateIntakeToReferenceObject before this extraction — kept as an
  // alias below so nothing calling the old name silently breaks.)
  function packageContext(gateIntake) {
    const gate = GATE_REGISTRY[gateIntake.gateId];
    const answerLines = Object.entries(gateIntake.answers)
      .map(([stage, answer]) => `${stage}: ${answer}`)
      .join('\n');

    // Guided Life Navigation gets a labeled structured block ahead of the
    // raw answers — this is the "intake mapped to structured data" piece:
    // objective / currentSituation / constraints / resources /
    // desiredOutcome / timeline / supportRequirements, named plainly
    // instead of left as opaque stage ids.
    let structuredBlock = '';
    if (gateIntake.gateId === 'human_navigation') {
      const structured = structureNavIntake(gateIntake.answers);
      structuredBlock = 'STRUCTURED INTAKE:\n' + Object.entries(structured)
        .map(([field, value]) => `${field}: ${value ?? '(not answered)'}`)
        .join('\n') + '\n\n';
    } else if (gateIntake.gateId === 'business_optimization') {
      const structured = structureBizIntake(gateIntake.answers);
      structuredBlock = 'STRUCTURED INTAKE:\n' + Object.entries(structured)
        .map(([field, value]) => `${field}: ${value ?? '(not answered)'}`)
        .join('\n') + '\n\n';
    }

    const text = gateIntake.intakeSummary
      ? `${structuredBlock}REFLECTIVE MIRROR (confirmed):\n${gateIntake.intakeSummary}\n\nRAW ANSWERS:\n${answerLines}`
      : `${structuredBlock}RAW ANSWERS (mirror not yet confirmed):\n${answerLines}`;

    return {
      id: 'obj_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      name: `${gate ? gate.label : gateIntake.gateId} intake — ${new Date(gateIntake.timestamp).toLocaleDateString()}`,
      extension: '.gateintake',
      category: 'gate_intake',
      content: { text: text.slice(0, 40000), dataUrl: null },
      metadata: {
        sizeBytes: text.length,
        uploadedAt: gateIntake.timestamp,
        gateId: gateIntake.gateId,
        gateVersion: gateIntake.gateVersion,
        answerCount: Object.keys(gateIntake.answers).length,
        mirrorStatus: gateIntake.status
      },
      status: 'ready', error: null
    };
  }

  return {
    structureNavIntake,
    structureBizIntake,
    buildGateIntakeObject,
    packageContext,
    gateIntakeToReferenceObject: packageContext, // alias, old name
    NAV_INTAKE_FIELD_MAP,
    BIZ_INTAKE_FIELD_MAP
  };
})();
