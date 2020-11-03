import {BioEntry} from "./entrylist";

export default function OpenBioEntry(entry: BioEntry): void {
    const titleNode = document.querySelector(".entry .title") as HTMLElement;
    const contentNode = document.querySelector(".entry .content") as HTMLElement;
    const mdateNode = document.querySelector(".entry .mdate") as HTMLElement;
    mdateNode.innerText = new Date(entry.date * 1000).toLocaleString("ja-JA");
    titleNode.innerText = entry.title + ":";
    contentNode.innerText = entry.content;
}
