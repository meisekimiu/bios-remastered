import {expect} from "chai";
import "mocha";

import * as Bio3 from "../../data/bio3.json";
import Bio3Entry from "../../src/bio3/bio3entry";

describe("Bio3 Entry", () => {
  let entry: Bio3Entry;
  beforeEach(() => {
    entry = new Bio3Entry('2021-07-04a', 'Test');
  });
  it("should exist", () => {
    expect(entry).to.not.be.null;
    expect(entry.title).to.eq('2021-07-04a');
    expect(entry.content).to.eq('Test');
  });
  it("should generate a date object", () => {
    expect(entry.date.getTime()).to.eq(new Date('2021-07-04').getTime());
  });
  it("should set default date for prologue entry", () => {
    entry = new Bio3Entry('001-INTRO', 'Flippy');
    expect(entry.date.getTime()).to.eq(new Date('2013-08-14').getTime());
  });
  it("should have isVisible function", () => {
    entry = new Bio3Entry((new Date()).toISOString().substr(0,10) + 'a', 'Test');
    expect(entry.isVisible()).to.be.true;
    entry.date = new Date(new Date().getTime() + 86400000);
    expect(entry.isVisible()).to.be.false;
  });
  it("should have isNew function", () => {
    entry = new Bio3Entry((new Date()).toISOString().substr(0,10) + 'a', 'Test');
    expect(entry.isNew()).to.be.true;
    entry.date = new Date(entry.date.getTime() - 86400000);
    expect(entry.isNew()).to.be.false;
  });
  it("can sort entries", () => {
    const entries = Bio3.bio3.map((entry) => new Bio3Entry(entry.title, entry.content));
    const sorted = Bio3Entry.sort(entries);
    expect(sorted[0].title).to.eq('001-INTRO');
    expect(sorted[1].title).to.eq('2013-08-21b');
    expect(sorted[2].title).to.eq('2013-08-21a');
    expect(sorted[3].title).to.eq('2013-08-22b');
  });
  it("can generate HTML nodes", () => {
    const node = entry.getHTML();
    expect(node.querySelector("h3")).to.not.be.null;
    expect(node.querySelector("h3").innerText).to.include("2021-07-04");
    expect(node.querySelector("pre").innerText).to.include("Test");
  });
  it("generates valid id for title element", () => {
    let node = entry.getHTML();
    expect(node.querySelector("h3").id).to.eq("2021-07-04a");
    entry.title = "2021-07-04b \"test entry\"";
    node = entry.getHTML();
    expect(node.querySelector("h3").id).to.eq("2021-07-04b");
  });
  it("shows new icon if the entry is new", () => {
    entry = new Bio3Entry((new Date()).toISOString().substr(0,10) + 'a', 'Test');
    let node = entry.getHTML();
    expect(node.querySelector("h3 img")).to.not.be.null;
  });
});
