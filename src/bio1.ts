import * as Bio1 from "../data/bio1.json";
import "./bio1/bio1.css";
import Bio1EntryList, {BioEntry} from "./bio1/entrylist";
import OpenBioEntry from "./bio1/openbioentry";

const openEntry = (entry: BioEntry) => {
    function deleteElement(element: Element) {
        if (!element) {
            return;
        }
        element.parentNode.removeChild(element);
    }
    OpenBioEntry(entry);
    if (entry.title === "the final.txt") {
        deleteElement(document.querySelector(".entries-list"));
        deleteElement( document.querySelector("header p"));
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const entryList = new Bio1EntryList(Bio1.bio1);
    entryList.addEventListener("readEntry", (e: CustomEvent) => openEntry(e.detail as BioEntry));

    entryList.addHiddenEntry("emi.txt", (count) => count >= 1);
    entryList.addHiddenEntry("z.final peak {}.txt", (count) => count >= 9);
    entryList.addHiddenEntry("[penultimate].txt", (count, readEntries) => readEntries.get("z.final peak {}.txt"));
    entryList.addHiddenEntry("the final.txt", (count, readEntries) => readEntries.get("[penultimate].txt"));

    entryList.setRenderTarget(document.querySelector(".entries-list ul"));
    entryList.renderListNodes();
});
