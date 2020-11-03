import * as Bio2 from "../data/bio2.json";
import "./bio2/bio2.css";
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
    const entryList = new Bio1EntryList(Bio2.bio2);
    entryList.addEventListener("readEntry", (e: CustomEvent) => openEntry(e.detail as BioEntry));

    entryList.addHiddenEntry("z.GARRISON {}.txt", (count, readEntries) => count >= 5);

    entryList.setRenderTarget(document.querySelector(".entries-list ul"));
    entryList.renderListNodes();
});
