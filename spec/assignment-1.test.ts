import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// This week's spec: "the visitor does something that changes what they see —
// state the core interaction plainly enough to write a test for it." The
// core interaction here is the Sections nav: picking a link jumps to a real
// section, which drives the camera/highlight state (see main.js). This test
// checks the static contract that interaction depends on — that the nav
// exists and that every link actually resolves to a section on the page.
//
// Not testable here, and worth naming instead: "it works at both marking
// viewports" (a person has to look at 1920x1080 and 390x844), "the 3D scene
// actually renders and responds to scroll/drag" (needs a real browser), and
// "one strong idea, and nothing else" (a person judges scope, not a test).

describe("assignment 1: core interaction", () => {
  it("has a primary interactive control that links to real sections", () => {
    const distPath = resolve("dist/index.html");
    const doc = new JSDOM(readFileSync(distPath, "utf8")).window.document;

    const nav = doc.querySelector('[data-testid="interaction"]');
    expect(
      nav,
      'no [data-testid="interaction"] element in dist/index.html',
    ).toBeTruthy();
    expect(nav?.tagName.toLowerCase()).toBe("nav");

    const links = [
      ...doc.querySelectorAll('[data-testid="interaction"] a[href^="#"]'),
    ];
    expect(
      links.length,
      "expected one nav link per section (18 total)",
    ).toBeGreaterThan(10);

    for (const a of links) {
      const id = a.getAttribute("href")!.slice(1);
      expect(
        doc.getElementById(id),
        `nav links to #${id} but no element on the page has that id`,
      ).toBeTruthy();
    }
  });
});
