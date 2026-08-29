// ============================================================
// G.R.A.N.I.T.E. VISION DEMO — CORE ENGINE
//
// Isolated, self-contained. Does not import, call, or depend on any
// live canonical G.R.A.N.I.T.E. runtime beyond the three unmodified,
// copied modules in assets/granite-modules/ (used for genuine local
// computation in specific scenes — never a network call, never a
// live production dependency).
// ============================================================

const GraniteVisionDemo = (function () {

  // Real, minimal dependency granite-context-packaging.js itself
  // documents needing (its own header comment: "assumes a global
  // GATE_REGISTRY exists, currently defined in granite-intake.js").
  // Rather than import that large, unrelated file into an isolated
  // demo, this is the same real, tiny registry content, defined here
  // - the canonical module itself is untouched.
  window.GATE_REGISTRY = window.GATE_REGISTRY || {
    business_optimization: { label: 'Business Optimization', version: 'v1.0' },
    human_navigation: { label: 'Guided Life Navigation', version: 'v2.2' }
  };

  const STATUS_META = {
    proven: { label: 'PROVEN', cls: 'proven' },
    partial: { label: 'PARTIALLY INTEGRATED', cls: 'partial' },
    designed: { label: 'DESIGNED', cls: 'designed' },
    future: { label: 'FUTURE IMPLICATION', cls: 'future' }
  };

  function badgeHtml(statuses) {
    return '<div class="scene-badges">' + statuses.map(function (s) {
      const m = STATUS_META[s];
      return '<span class="badge ' + m.cls + '">' + m.label + '</span>';
    }).join('') + '</div>';
  }

  let currentIndex = 0;
  let isPaused = false;
  let isMuted = false;
  let autoplayEnabled = true;
  let speechEnabled = true;
  let manualMode = false;
  let currentUtterance = null;
  let sceneTimer = null;

  function el(id) { return document.getElementById(id); }

  function speakAvailable() {
    return speechEnabled && !isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  function speak(text, onDone) {
    window.speechSynthesis && window.speechSynthesis.cancel();
    if (!speakAvailable()) { if (onDone) setTimeout(onDone, autoplayEnabled ? Math.min(9000, 1400 + text.length * 35) : 0); return; }
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.98;
      u.onend = onDone || null;
      u.onerror = onDone || null;
      currentUtterance = u;
      window.speechSynthesis.speak(u);
    } catch (e) {
      if (onDone) setTimeout(onDone, 1500);
    }
  }

  function stopSpeech() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (sceneTimer) { clearTimeout(sceneTimer); sceneTimer = null; }
  }

  function renderStatusLegend() {
    el('statusLegend').innerHTML = Object.values(STATUS_META).map(function (m) {
      return '<span><span class="dot" style="background:var(--' + m.cls + ')"></span>' + m.label + '</span>';
    }).join('');
  }

  function renderScene() {
    stopSpeech();
    const scene = GraniteVisionScenes[currentIndex];
    el('sceneStage').innerHTML =
      badgeHtml(scene.status) +
      '<div class="scene-title">' + scene.title + '</div>' +
      '<div class="scene-sub">' + scene.subtitle + '</div>' +
      '<div id="sceneBody"></div>';
    scene.render(el('sceneBody'));

    el('progressFill').style.width = (((currentIndex + 1) / GraniteVisionScenes.length) * 100) + '%';
    el('sceneCounter').textContent = 'SCENE ' + (currentIndex + 1) + ' / ' + GraniteVisionScenes.length;
    el('captionText').textContent = scene.narration.split('. ')[0] + (scene.narration.includes('. ') ? '.' : '');
    renderTranscriptHighlight();

    el('prevBtn').disabled = currentIndex === 0;
    el('nextBtn').textContent = currentIndex === GraniteVisionScenes.length - 1 ? 'Restart ▶' : 'Next ▶';

    if (!manualMode) narrateCurrentScene();
  }

  function narrateCurrentScene() {
    const scene = GraniteVisionScenes[currentIndex];
    const sentences = scene.narration.split(/(?<=[.!?])\s+/);
    let i = 0;
    function nextSentence() {
      if (isPaused) return;
      if (i >= sentences.length) {
        if (autoplayEnabled && !manualMode) sceneTimer = setTimeout(goNext, 1800);
        return;
      }
      el('captionText').textContent = sentences[i];
      const s = sentences[i];
      i++;
      speak(s, nextSentence);
    }
    nextSentence();
  }

  function renderTranscriptHighlight() {
    el('transcriptBody').innerHTML = GraniteVisionScenes.map(function (s, i) {
      return '<p class="' + (i === currentIndex ? 't-current' : '') + '"><b>' + s.title + '</b><br>' + s.narration + '</p>';
    }).join('');
  }

  function goNext() {
    stopSpeech();
    currentIndex = (currentIndex + 1) % GraniteVisionScenes.length;
    renderScene();
  }
  function goPrev() {
    if (currentIndex === 0) return;
    stopSpeech();
    currentIndex--;
    renderScene();
  }
  function goTo(i) { stopSpeech(); currentIndex = i; renderScene(); }
  function replayScene() { renderScene(); }
  function skipNarration() { stopSpeech(); if (autoplayEnabled && !manualMode) goNext(); }

  function togglePause() {
    isPaused = !isPaused;
    el('pauseBtn').textContent = isPaused ? '▶ Resume' : '⏸ Pause';
    if (isPaused) { window.speechSynthesis && window.speechSynthesis.pause(); if (sceneTimer) clearTimeout(sceneTimer); }
    else { window.speechSynthesis && window.speechSynthesis.resume(); narrateCurrentScene(); }
  }
  function toggleMute() {
    isMuted = !isMuted;
    el('muteBtn').textContent = isMuted ? '🔇 Muted' : '🔊 Sound';
    if (isMuted) window.speechSynthesis && window.speechSynthesis.cancel();
  }
  function toggleManualMode() {
    manualMode = !manualMode;
    el('manualModeBtn').classList.toggle('active-toggle', manualMode);
    stopSpeech();
    if (manualMode) el('captionText').textContent = GraniteVisionScenes[currentIndex].narration;
  }
  function toggleTranscript() {
    const panel = el('transcriptPanel');
    panel.hidden = !panel.hidden;
    if (!panel.hidden) renderTranscriptHighlight();
  }

  function start() {
    autoplayEnabled = el('autoplayToggle').checked;
    speechEnabled = el('speechToggle').checked;
    el('startScreen').classList.remove('active');
    el('demoScreen').classList.add('active');
    renderStatusLegend();
    currentIndex = 0;
    renderScene();
  }

  function init() {
    el('startBtn').addEventListener('click', start);
    el('nextBtn').addEventListener('click', goNext);
    el('prevBtn').addEventListener('click', goPrev);
    el('replayBtn').addEventListener('click', replayScene);
    el('pauseBtn').addEventListener('click', togglePause);
    el('skipBtn').addEventListener('click', skipNarration);
    el('muteBtn').addEventListener('click', toggleMute);
    el('manualModeBtn').addEventListener('click', toggleManualMode);
    el('transcriptBtn').addEventListener('click', toggleTranscript);
    el('closeTranscriptBtn').addEventListener('click', toggleTranscript);

    document.addEventListener('keydown', function (e) {
      if (!el('demoScreen').classList.contains('active')) return;
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === ' ') { e.preventDefault(); togglePause(); }
      else if (e.key === 'm' || e.key === 'M') toggleMute();
      else if (e.key === 'Escape') { const p = el('transcriptPanel'); if (!p.hidden) toggleTranscript(); }
    });
  }

  return { init, goTo, STATUS_META };
})();

document.addEventListener('DOMContentLoaded', GraniteVisionDemo.init);
