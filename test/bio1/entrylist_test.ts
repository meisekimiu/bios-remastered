import {expect} from "chai";
import "mocha";

import * as Bio1 from "../../data/bio1.json";
import Bio1EntryList, {BioEntry} from "../../src/bio1/entrylist";

describe("Bio1 Entry List", () => {
    let testBio: BioEntry[];
    beforeEach(() => {
        testBio = [
            {
                content: "meow",
                date: 0,
                title: "Floopy.txt",
            },
            {
                content: "meow",
                date: 0,
                title: "flippy.txt",
            },
            {
                content: "meow",
                date: 0,
                title: "apple.txt",
            },
        ];
    });
    it("should exist", () => {
        const list = new Bio1EntryList(Bio1.bio1);
        expect(list).to.not.be.null;
    });
    it("should sort all entries added", () => {
        const list = new Bio1EntryList(testBio);
        expect(list.entries[0].title).to.eq("apple.txt");
    });
    it("should get list of entry nodes", () => {
        const list = new Bio1EntryList(testBio);
        const nodeList = list.getEntryListNodes();
        expect(nodeList).to.have.lengthOf(3);
        expect(nodeList[0].querySelector("a").innerText).to.eq("apple.txt");
        expect(nodeList[0].querySelector("a").href).to.eq("javascript:;");
    });
    it("should dispatch custom event on entry read", () => {
        const list = new Bio1EntryList(testBio);
        let destEntry: BioEntry;
        list.addEventListener("readEntry", (event: CustomEvent) => {
            destEntry = event.detail;
        });
        const nodeList = list.getEntryListNodes();
        nodeList[0].querySelector("a").click();
        expect(destEntry.title).to.eq("apple.txt");
    });
    it("should have configurable hidden entries", () => {
        const list = new Bio1EntryList(testBio);
        list.addHiddenEntry("flippy.txt", (count: number) => {
            return count >= 2;
        });
        const nodeList = list.getEntryListNodes();
        expect(nodeList[1].innerText).to.eq("[entry locked]");
    });
    it("should update count variable passed to hidden entry callbacks", () => {
        const list = new Bio1EntryList(testBio);
        list.addHiddenEntry("flippy.txt", (count: number) => {
            return count >= 2;
        });
        let nodeList = list.getEntryListNodes();
        expect(nodeList[1].innerText).to.eq("[entry locked]");
        nodeList[0].querySelector("a").click();
        nodeList[2].querySelector("a").click();
        nodeList = list.getEntryListNodes();
        expect(nodeList[1].innerText).to.not.eq("[entry locked]");
    });
    it("should also update read dictionary passed to hidden entry callbacks", () => {
        const list = new Bio1EntryList(testBio);
        list.addHiddenEntry("flippy.txt", (count: number, readEntriesDict: Map<string, boolean>) => {
            return readEntriesDict.get("Floopy.txt");
        });
        let nodeList = list.getEntryListNodes();
        expect(nodeList[1].innerText).to.eq("[entry locked]");
        nodeList[2].querySelector("a").click();
        nodeList = list.getEntryListNodes();
        expect(nodeList[1].innerText).to.not.eq("[entry locked]");
    });
    it("should rerender if hidden entry becomes visible", () => {
        const renderTarget = document.createElement("ul");
        const list = new Bio1EntryList(testBio);
        list.addHiddenEntry("flippy.txt", (count: number, readEntriesDict: Map<string, boolean>) => {
            return readEntriesDict.get("Floopy.txt");
        });
        list.setRenderTarget(renderTarget);
        expect(renderTarget.children.length).to.eq(0);
        let nodeList = list.getEntryListNodes();
        expect(nodeList[1].innerText).to.eq("[entry locked]");
        nodeList[2].querySelector("a").click();
        nodeList = list.getEntryListNodes();
        expect(renderTarget.children.length).to.eq(3);
    });
});
