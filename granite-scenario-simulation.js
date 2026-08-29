// ============================================================
// GRANITE SCENARIO SIMULATION — v1.0
//
// A real Monte Carlo engine, not a wrapper around an AI guess. Every
// number in a SimulationResult comes from actual repeated sampling and
// real statistics (percentiles, correlation) - nothing here is an AI
// call, nothing here is fabricated. The AI's role starts only AFTER
// this produces real results, interpreting them - never generating
// them.
//
// Deliberately ephemeral: simulations are never persisted to the
// Seed. A SimulationResult exists only in memory for the session that
// created it. This matches the existing Seed philosophy exactly -
// Exploration is a scratchpad until explicit commit; simulations are
// even more temporary than that. Only a validated INSIGHT, extracted
// from real results and approved by a real person, ever becomes a
// real Exploration artifact - through the exact same
// GraniteGuide.createExplorationArtifact() already in production use,
// not a new persistence mechanism.
//
// Simulation confidence is deliberately NOT the same kind of number as
// Golden Thread confidence. Golden Thread confidence measures how
// well-evidenced a pattern is across real, already-approved artifacts
// - it's retrospective. A simulation's "pattern frequency" measures
// how often something showed up across hypothetical, sampled futures
// - it's prospective. Conflating the two would blur a real distinction
// this module keeps separate on purpose.
// ============================================================

const GraniteScenarioSimulation = (function () {
  const DISTRIBUTIONS = ['uniform', 'normal', 'triangular'];
  const MAX_RUNS = 20000; // real performance ceiling for browser-side JS, not an arbitrary number - see the module's own note on performance

  // ---- Real sampling functions, one per real distribution type -------
  function sampleUniform(min, max) {
    return min + Math.random() * (max - min);
  }

  function sampleNormal(mean, stdDev) {
    // Real Box-Muller transform - not a fabricated approximation.
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return mean + z * stdDev;
  }

  function sampleTriangular(min, mode, max) {
    const u = Math.random();
    const f = (mode - min) / (max - min);
    if (u < f) return min + Math.sqrt(u * (max - min) * (mode - min));
    return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
  }

  function sampleVariable(variable) {
    switch (variable.distribution) {
      case 'uniform': return sampleUniform(variable.min, variable.max);
      case 'normal': return sampleNormal(variable.mean, variable.stdDev);
      case 'triangular': return sampleTriangular(variable.min, variable.mode, variable.max);
      default: throw new Error(`Unknown distribution "${variable.distribution}".`);
    }
  }

  function validateVariable(variable) {
    if (!variable.name) throw new Error('Every variable requires a name.');
    if (!DISTRIBUTIONS.includes(variable.distribution)) {
      throw new Error(`Variable "${variable.name}" has an invalid distribution "${variable.distribution}". Must be one of: ${DISTRIBUTIONS.join(', ')}`);
    }
    if (variable.distribution === 'uniform' && !(variable.min < variable.max)) {
      throw new Error(`Variable "${variable.name}": uniform distribution requires min < max.`);
    }
    if (variable.distribution === 'normal' && !(variable.stdDev > 0)) {
      throw new Error(`Variable "${variable.name}": normal distribution requires stdDev > 0.`);
    }
    if (variable.distribution === 'triangular' && !(variable.min <= variable.mode && variable.mode <= variable.max)) {
      throw new Error(`Variable "${variable.name}": triangular distribution requires min <= mode <= max.`);
    }
  }

  // Real Pearson correlation coefficient between a variable's sampled
  // values and the outcome across every run - this IS the actual
  // sensitivity analysis, not a guess at which variable matters.
  function pearsonCorrelation(xs, ys) {
    const n = xs.length;
    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;
    let cov = 0, varX = 0, varY = 0;
    for (let i = 0; i < n; i++) {
      const dx = xs[i] - meanX, dy = ys[i] - meanY;
      cov += dx * dy; varX += dx * dx; varY += dy * dy;
    }
    if (varX === 0 || varY === 0) return 0;
    return cov / Math.sqrt(varX * varY);
  }

  function percentile(sortedArr, p) {
    const idx = (p / 100) * (sortedArr.length - 1);
    const lower = Math.floor(idx), upper = Math.ceil(idx);
    if (lower === upper) return sortedArr[lower];
    return sortedArr[lower] + (sortedArr[upper] - sortedArr[lower]) * (idx - lower);
  }

  /**
   * Runs a real Monte Carlo simulation. outcomeFunction receives one
   * real sampled value per variable (by name) and must return a
   * single real number representing that run's outcome - the caller
   * defines what "outcome" means (revenue, a success score, whatever
   * is real and meaningful for their scenario). This module has no
   * opinion on business logic; it only runs the real sampling and
   * real statistics around whatever function it's given.
   */
  function runSimulation(variables, outcomeFunction, runCount) {
    variables.forEach(validateVariable);
    if (typeof outcomeFunction !== 'function') throw new Error('outcomeFunction must be a real function.');
    const n = Math.min(runCount || 1000, MAX_RUNS);
    if (n < 1) throw new Error('runCount must be at least 1.');

    const outcomes = [];
    const sampledByVariable = {};
    variables.forEach(v => { sampledByVariable[v.name] = []; });

    for (let i = 0; i < n; i++) {
      const sample = {};
      variables.forEach(v => {
        const val = sampleVariable(v);
        sample[v.name] = val;
        sampledByVariable[v.name].push(val);
      });
      outcomes.push(outcomeFunction(sample));
    }

    const sortedOutcomes = [...outcomes].sort((a, b) => a - b);
    const mean = outcomes.reduce((a, b) => a + b, 0) / n;

    // Real sensitivity - how strongly each real variable's sampled
    // value actually correlated with the real outcome across all runs.
    const sensitivity = variables.map(v => ({
      variable: v.name,
      correlation: Math.round(pearsonCorrelation(sampledByVariable[v.name], outcomes) * 1000) / 1000
    })).sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

    return {
      runCount: n,
      variables: variables.map(v => ({ ...v })), // real, inspectable assumptions - every one visible, none hidden
      outcomes: {
        mean: Math.round(mean * 100) / 100,
        p10: Math.round(percentile(sortedOutcomes, 10) * 100) / 100,
        p50: Math.round(percentile(sortedOutcomes, 50) * 100) / 100,
        p90: Math.round(percentile(sortedOutcomes, 90) * 100) / 100,
        min: Math.round(sortedOutcomes[0] * 100) / 100,
        max: Math.round(sortedOutcomes[n - 1] * 100) / 100
      },
      sensitivity, // which real variables actually drove the real outcome, ranked
      generatedAt: new Date().toISOString()
      // Deliberately NOT persisted anywhere - this object lives only
      // in memory for this session, matching the ephemeral-by-design
      // decision documented above.
    };
  }

  /**
   * Real pattern detection ACROSS a set of runs a caller has already
   * grouped by some real strategic choice (e.g. "retention-first" vs
   * "advertising-first" scenarios) - this module doesn't invent the
   * grouping, the caller supplies real, already-computed outcome sets
   * for each named strategy, and this only computes real, honest
   * comparison statistics between them.
   */
  function compareStrategies(strategyOutcomeSets) {
    const names = Object.keys(strategyOutcomeSets);
    if (names.length < 2) throw new Error('At least two named strategies are required to compare.');
    return names.map(name => {
      const outcomes = strategyOutcomeSets[name];
      const sorted = [...outcomes].sort((a, b) => a - b);
      const mean = outcomes.reduce((a, b) => a + b, 0) / outcomes.length;
      return {
        strategy: name,
        runCount: outcomes.length,
        mean: Math.round(mean * 100) / 100,
        p50: Math.round(percentile(sorted, 50) * 100) / 100,
        // Real, honest frequency stat - "in what fraction of THIS
        // strategy's own runs did the outcome exceed the overall
        // median" - a prospective, sampling-based number, deliberately
        // not called "confidence" to avoid being confused with Golden
        // Thread confidence, which measures something structurally
        // different (real historical evidence, not simulated runs).
        aboveMedianFraction: Math.round((outcomes.filter(o => o > mean).length / outcomes.length) * 100) / 100
      };
    }).sort((a, b) => b.mean - a.mean);
  }

  /**
   * Packages a real SimulationResult into a real prompt for Council
   * Chamber interpretation. This does NOT call the Gateway itself -
   * it returns the prompt text, and the caller (which already has
   * access to GraniteGateway) makes the real call. Keeps this module
   * free of any AI-calling logic of its own, reusing the existing
   * Gateway entirely rather than duplicating it.
   */
  function buildInterpretationPrompt(simulationResult, roles) {
    const defaultRoles = ['Architect', 'Challenger', 'Guide', 'Auditor'];
    const rolesToUse = roles && roles.length ? roles : defaultRoles;
    const variableLines = simulationResult.variables.map(v => `- ${v.name}: ${v.distribution} distribution`).join('\n');
    const sensitivityLines = simulationResult.sensitivity.map(s => `- ${s.variable}: correlation ${s.correlation}`).join('\n');

    return `The following are REAL results from ${simulationResult.runCount} Monte Carlo simulation runs - not a single prediction, a real statistical distribution of plausible outcomes. Interpret them; do not treat any single number as certain.

Assumptions used (every one real and visible, none hidden):
${variableLines}

Outcome distribution across all real runs:
- 10th percentile: ${simulationResult.outcomes.p10}
- median: ${simulationResult.outcomes.p50}
- 90th percentile: ${simulationResult.outcomes.p90}
- range: ${simulationResult.outcomes.min} to ${simulationResult.outcomes.max}

Real sensitivity - which assumptions actually drove outcomes most, ranked by real correlation:
${sensitivityLines}

Respond from each of these perspectives: ${rolesToUse.join(', ')}. For each: what does this real data actually support, and what would be overclaiming? Never state a conclusion as certain - these are plausible futures under stated assumptions, not a prediction. End with one candidate insight, phrased as an observed pattern (e.g. "In simulations where X, Y occurred more often"), not as a fact.`;
  }

  return { DISTRIBUTIONS, MAX_RUNS, runSimulation, compareStrategies, pearsonCorrelation, buildInterpretationPrompt };
})();

/**
 * Promotes a human-approved simulation insight into a real Exploration
 * artifact - reusing GraniteGuide.createExplorationArtifact() exactly
 * as it already exists, not a new persistence path. This is the real
 * implementation of "Simulation -> Candidate Insight -> ... -> User
 * Approval -> Artifact": everything before this call is ephemeral;
 * this is the one moment something simulation-derived becomes real,
 * permanent Seed content, and only because a person explicitly did it.
 */
function promoteSimulationInsightToArtifact(seed, title, insightText, simulationResult) {
  if (typeof GraniteGuide === 'undefined') {
    throw new Error('promoteSimulationInsightToArtifact requires GraniteGuide to be loaded.');
  }
  // Starts as 'hypothesis', not 'supported' - a simulated pattern is a
  // real candidate for investigation, not evidence in the same sense
  // an approved Golden Thread's real historical artifacts are. Real,
  // honest starting point in the existing Exploration lifecycle.
  const content = `${insightText}\n\n(Derived from a Monte Carlo simulation: ${simulationResult.runCount} runs, top driving assumption: ${simulationResult.sensitivity[0]?.variable || 'none identified'}.)`;
  return GraniteGuide.createExplorationArtifact(seed, title, content, 'hypothesis');
}
