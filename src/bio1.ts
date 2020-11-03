import * as Bio1 from "../data/bio1.json";
import "./bio1/bio1.css";
import Bio1EntryList, {BioEntry} from "./bio1/entrylist";

const openEntry = (entry: BioEntry) => {
    const titleNode = document.querySelector(".entry .title") as HTMLElement;
    const contentNode = document.querySelector(".entry .content") as HTMLElement;
    const mdateNode = document.querySelector(".entry .mdate") as HTMLElement;
    mdateNode.innerText = new Date(entry.date * 1000).toLocaleString("ja-JA");
    titleNode.innerText = entry.title + ":";
    contentNode.innerText = entry.content;
};

document.addEventListener("DOMContentLoaded", () => {
    const entryList = new Bio1EntryList(Bio1.bio1);
    entryList.addEventListener("readEntry", (e: CustomEvent) => openEntry(e.detail as BioEntry));

    entryList.addHiddenEntry("emi.txt", (count, readEntries) => count >= 1);
    entryList.addHiddenEntry("z.final peak {}.txt", (count) => count >= 9);
    entryList.addHiddenEntry("[penultimate].txt", (count, readEntries) => readEntries.get("z.final peak {}.txt"));
    entryList.addHiddenEntry("the final.txt", (count, readEntries) => readEntries.get("[penultimate].txt"));

    entryList.setRenderTarget(document.querySelector(".entries-list ul"));
    entryList.renderListNodes();
});
