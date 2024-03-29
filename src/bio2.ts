import Bio2 from "../data/bio2_refined.json";
import Bio1EntryList, {BioEntry} from "./bio1/entrylist";
import OpenBioEntry from "./bio1/openbioentry";
import "./bio2/bio2.css";

document.addEventListener("DOMContentLoaded", () => {
    const entryList = new Bio1EntryList(Bio2.bio2);
    entryList.addEventListener("readEntry", (e: CustomEvent) => OpenBioEntry(e.detail as BioEntry));

    entryList.addHiddenEntry("z.GARRISON {}.txt", (count) => count >= 5);

    entryList.setRenderTarget(document.querySelector(".entries-list ul"));
    entryList.renderListNodes();
});
