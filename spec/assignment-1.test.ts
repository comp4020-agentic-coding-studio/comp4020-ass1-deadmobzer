import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// This week's spec: "the visitor does something that changes what they see —
// state the core interaction plainly enough to write a test for it." The
// convention below is that plain statement: mark your primary interactive
// control with data-testid="interaction". Once it exists, replace this test
// with a real assertion about what actually changes when it's used.
//
// Not testable here, and worth naming instead: "it works at both marking
// viewports" (a person has to look at 1920x1080 and 390x844) and "one strong
// idea, and nothing else" (a person judges scope, not a test).

describe("assignment 1: core interaction", () => {
  it("has a primary interactive control", () => {
    const distPath = resolve("dist/index.html");
    const doc = new JSDOM(readFileSync(distPath, "utf8")).window.document;

    expect(
      doc.querySelector('[data-testid="interaction"]'),
      'no [data-testid="interaction"] element in dist/index.html yet — mark ' +
        "your core interactive control with that attribute, then replace this " +
        "test with an assertion about what it actually changes on the page.",
    ).toBeTruthy();
  });
});
