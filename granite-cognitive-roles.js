// ============================================================
// GRANITE COGNITIVE ROLES — v1.0
//
// The 10 canonical cognitive functions, standing independently. Per
// the resolved architecture decision: these do NOT map onto LOKI's
// Pantheon codenames. Hermes stays Hermes. Athena stays Athena. LOKI
// stays LOKI, completely untouched, reserved for Tier 3. These 10
// roles are a genuinely separate, honest implementation - not an
// attempt to force equivalence where none exists.
// ============================================================

const GraniteCognitiveRoles = (function () {
  // Voice profiles: real rate/pitch differentiation over a small pool
  // of base voices (2-3, alternating gendered), not ten distinct
  // voices. This is the actual agreed design — tempo and inflection
  // carrying the character, since voice availability varies by device
  // but rate/pitch apply to whatever voice is actually there. voiceIndex
  // is a preference (alternates even/odd across roles); the real
  // selection logic degrades gracefully if fewer voices exist.
  const ROLES = {
    structural_analyst: {
      id: 'structural_analyst', name: 'Structural Analyst',
      focus: 'Breaks systems into components and relationships. Architecture, dependencies, frameworks.',
      color: '#5b8def',
      voice: { rate: 0.95, pitch: 0.9, voiceIndex: 0 }
    },
    forensic_auditor: {
      id: 'forensic_auditor', name: 'Forensic Auditor',
      focus: 'Looks for inconsistencies, blind spots, errors. Falsifiability, risk, hidden assumptions.',
      color: '#f87171',
      voice: { rate: 0.85, pitch: 0.8, voiceIndex: 1 } // slower, lower — measured, careful, not overclaiming
    },
    diagnostic_scanner: {
      id: 'diagnostic_scanner', name: 'Diagnostic Scanner',
      focus: 'Identifies failure modes and root causes. Troubleshooting, technical issues, debugging.',
      color: '#fb923c',
      voice: { rate: 1.1, pitch: 0.95, voiceIndex: 0 } // clipped, efficient
    },
    signal_scout: {
      id: 'signal_scout', name: 'Signal Scout',
      focus: 'Separates noise from meaningful signal. Trends, early indicators, weak signals.',
      color: '#4ade80',
      voice: { rate: 1.15, pitch: 1.1, voiceIndex: 1 } // quick, alert, scanning
    },
    pattern_weaver: {
      id: 'pattern_weaver', name: 'Pattern Weaver',
      focus: 'Connects ideas across domains. Interdisciplinary synthesis.',
      color: '#c084fc',
      voice: { rate: 1.0, pitch: 1.05, voiceIndex: 0 }
    },
    narrative_synthesizer: {
      id: 'narrative_synthesizer', name: 'Narrative Synthesizer',
      focus: 'Turns complexity into coherent stories. Messaging, teaching, communication.',
      color: '#f472b6',
      voice: { rate: 0.95, pitch: 1.0, voiceIndex: 1 } // warm, even
    },
    conceptual_blender: {
      id: 'conceptual_blender', name: 'Conceptual Blender',
      focus: 'Merges opposing ideas into usable hybrids. Paradox resolution, innovation.',
      color: '#a78bfa',
      voice: { rate: 1.05, pitch: 1.1, voiceIndex: 0 }
    },
    systems_designer: {
      id: 'systems_designer', name: 'Systems Designer',
      focus: 'Builds actionable frameworks and workflows. Tools, processes, implementation.',
      color: '#c9a84c',
      voice: { rate: 0.9, pitch: 0.85, voiceIndex: 1 } // steady, structured
    },
    strategy_mapper: {
      id: 'strategy_mapper', name: 'Strategy Mapper',
      focus: 'Translates insight into decisions and direction. Planning, leverage points, tradeoffs.',
      color: '#14b8a6',
      voice: { rate: 1.0, pitch: 0.9, voiceIndex: 0 } // confident, forward
    },
    clarity_translator: {
      id: 'clarity_translator', name: 'Clarity Translator',
      focus: 'Adapts ideas for different audiences. Simplification, reframing, accessibility.',
      color: '#e8e6d8',
      voice: { rate: 0.9, pitch: 1.0, voiceIndex: 1 } // gentle, clear
    }
  };

  // A real, initial presentation grouping — explicitly a UI convenience
  // over the 10 real roles, not a redefinition of them. Kept separate
  // from the role definitions themselves, so it can be revised without
  // touching what the roles actually are.
  const VOICE_GROUPING = {
    explorer: ['signal_scout', 'structural_analyst', 'pattern_weaver'],
    auditor: ['forensic_auditor', 'diagnostic_scanner'],
    synthesizer: ['conceptual_blender', 'systems_designer', 'strategy_mapper', 'narrative_synthesizer', 'clarity_translator']
  };

  function listRoles() {
    return Object.values(ROLES);
  }

  function getRole(id) {
    return ROLES[id] || null;
  }

  function isValidRoleId(id) {
    return id in ROLES;
  }

  // Real, simple direct-address detection - "Structural Analyst, ..."
  // Checks whether the message plainly opens by naming a real role.
  // Deliberately conservative: only matches at the start of the
  // message, so a question that merely mentions a role's name mid-
  // sentence doesn't accidentally trigger an override.
  function detectExplicitRoleAddress(text) {
    if (!text) return null;
    const trimmed = text.trim();
    for (const role of Object.values(ROLES)) {
      const pattern = new RegExp('^' + role.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*[,:]', 'i');
      if (pattern.test(trimmed)) return role.id;
    }
    return null;
  }

  // Real Web Speech API usage, degrading honestly when unsupported or
  // when fewer voices exist than voiceIndex would prefer - never
  // claims a specific voice will always be there.
  function pickVoiceForRole(role) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    // Prefer alternating between two real, distinct voices if the
    // device has at least two; otherwise just use whatever exists.
    const idx = Math.min(role.voice.voiceIndex, voices.length - 1);
    return voices[idx];
  }

  function speakAsRole(text, roleId) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { spoke: false, reason: 'Speech synthesis is not supported in this browser.' };
    }
    const role = getRole(roleId);
    if (!role) return { spoke: false, reason: `"${roleId}" is not a real cognitive role.` };

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = role.voice.rate;
    utterance.pitch = role.voice.pitch;
    const voice = pickVoiceForRole(role);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
    return { spoke: true, reason: null };
  }

  return { listRoles, getRole, isValidRoleId, VOICE_GROUPING, detectExplicitRoleAddress, speakAsRole };
})();
