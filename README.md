# G.R.A.N.I.T.E. Vision Demo — README

An isolated, self-contained interactive demonstration of the G.R.A.N.I.T.E. platform's built and long-range architecture. Does not modify, import as a live dependency, or destabilize any canonical G.R.A.N.I.T.E. runtime file.

## How to run it locally

```
cd granite-vision-demo
python3 -m http.server 8080
```

Then open http://localhost:8080/index.html. A local static server is required - do not open index.html directly as a file:// URL; browsers restrict local script loading under file:// in ways that will produce confusing errors unrelated to the demo itself. Any static server works (npx serve, php -S localhost:8080, etc.) - Python's built-in server is used here because it needs no installation.

No external APIs, no API keys, and no network access are required to run the full experience. Every real computation performed live (Monte Carlo simulation, context packaging, cognitive-role listing) runs entirely in the browser using the three unmodified module copies in assets/granite-modules/.

## Navigation controls

- Start Experience - begins the walkthrough from the start screen.
- Previous / Next - move between scenes (also: Left/Right arrow keys).
- Pause / Resume - pauses narration and auto-advance (also: Spacebar).
- Replay - replays the current scene's narration from the start.
- Skip - skips remaining narration for the current scene and advances immediately (in autoplay mode).
- Sound / Muted - toggles spoken narration (also: M key).
- Transcript - opens a full, scrollable text transcript of every scene's narration, with the current scene highlighted (also: Escape to close).
- Explore - toggles Manual Exploration mode: narration and auto-advance stop; the viewer reads captions/transcript and navigates entirely at their own pace.

## Autoplay vs. manual mode

Two checkboxes on the start screen: Autoplay narration & auto-advance (on by default - the demo reads each scene's narration aloud where possible, shows synced captions, and advances automatically when narration finishes) and Spoken narration (on by default - controls whether the browser's speech synthesis is used at all). Manual Exploration mode can be toggled at any time during playback, overriding autoplay.

## Audio behavior

Narration uses the browser's native Speech Synthesis API (window.speechSynthesis) where available. This is genuinely optional: the experience never depends on it. Every word of narration is always visible as synced captions at the bottom of the screen and in the full transcript panel - muting or an unsupported browser only removes the audio, never the content. If speech synthesis is unavailable or disabled, the demo advances using a real, calculated reading-pace timer instead of a fixed delay.

## Dependencies

None beyond a modern browser. No build step, no bundler, no node_modules, no package manager. Every file is loaded directly via script src tags - vanilla HTML, CSS, and JavaScript.

## How to screen-record the presentation

Use your operating system's or browser's built-in screen recorder (macOS: Cmd+Shift+5; Windows: Xbox Game Bar, Win+Alt+R; most browsers also support tab-capture recording extensions). For best results: enable Autoplay, use a browser with working speech synthesis (Chrome and Edge have the most reliable support), and let the demo run start-to-finish without manual intervention - the built-in captions will also appear in the recording, which is useful if the recording's own audio track is later muted or replaced.

## How to package it for another developer

The entire granite-vision-demo/ directory is portable and self-contained - copy or zip it as-is. See GRANITE_VISION_DEMO_TRANSFER.zip (built alongside this README) for a verified, ready-to-share package with checksums and a fresh-extraction test already performed.

## Which assets came from canonical G.R.A.N.I.T.E.

Three files in assets/granite-modules/ are unmodified, byte-for-byte copies of real canonical G.R.A.N.I.T.E. source files, confirmed by checksum before packaging:

- granite-scenario-simulation.js - the real Monte Carlo simulation engine.
- granite-context-packaging.js - the real context-packaging module (structureNavIntake, buildGateIntakeObject, packageContext).
- granite-cognitive-roles.js - the real 10-role Council cognitive-function registry.

These are called live, for real computation, in Scenes 3, 4, and 9 - see VISION_DEMO_STATUS_MATRIX.md for exactly what each real call does and returns.

## Which elements are demonstration-only

Everything else - the HTML structure, CSS visual language, the scene engine (demo.js), and all scene content and narration (scenes_part1.js, scenes_part2.js) - was written specifically for this demonstration. Where a scene shows sample data (a fictional business, a fictional Guided Life situation, a fictional CEO document), that data is clearly framed in the narration and on-screen text as demonstration data, schema-accurate where a real schema exists, but never presented as a live model output. See VISION_DEMO_SOURCE_MAP.md for the full, scene-by-scene audit distinguishing proven engineering from architectural design from long-range implication.

## Real-device and browser QA — a disclosed limitation

Every check performed on this demonstration was a real, direct syntax check and a real, executed integration test of the three live-module call sites (confirmed genuine, deterministic Monte Carlo reruns; confirmed genuine structureNavIntake/packageContext output; confirmed the real 10-role registry loads). No real browser rendering, visual QA, or device testing was performed - the development environment this demo was built in has no working headless browser (a real, prior, disclosed limitation carried over from this project's other packaging work: every attempt to install one was blocked by network restrictions). This is stated plainly rather than implied away. Test the demo in a real browser before presenting it.
