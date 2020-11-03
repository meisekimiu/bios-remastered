export interface BioEntry {
    title: string;
    content: string;
    date: number;
}

interface HiddenBioEntry {
    filename: string;
    showCallback: (count: number, readEntries: Map<string, boolean>) => boolean;
}

export default class Bio1EntryList extends EventTarget {
    public entries: BioEntry[];
    protected hiddenEntries: HiddenBioEntry[];
    protected readCount: number;
    protected readEntriesDict: Map<string, boolean>;
    protected renderTarget: HTMLElement;

    constructor(entries: BioEntry[]) {
        super();
        this.entries = entries.sort((a, b) => a.title.localeCompare(b.title, "en-US", {sensitivity: "base"}));
        this.hiddenEntries = [];
        this.readCount = 0;
        this.readEntriesDict = new Map<string, boolean>();
        for (const entry of this.entries) {
            this.readEntriesDict.set(entry.title, false);
        }
    }

    public getEntryListNodes(): HTMLLIElement[] {
        return this.entries.map((entry) => {
            if (this.isEntryHidden(entry.title)) {
                const listNode = document.createElement("li");
                listNode.innerText = "[entry locked]";
                return listNode;
            } else {
                const node = document.createElement("a");
                node.innerText = entry.title;
                node.setAttribute("href", "javascript:;");
                node.addEventListener("click", () => {
                    this.setEntryRead(entry);
                    this.dispatchEvent(new CustomEvent("readEntry", {detail: entry}));
                });
                const listNode = document.createElement("li");
                listNode.appendChild(node);
                return listNode;
            }
        });
    }

    public setRenderTarget(target: HTMLElement): void {
        this.renderTarget = target;
    }

    public renderListNodes(): void {
        const nodes = this.getEntryListNodes();
        this.renderTarget.innerHTML = "";
        for (const node of nodes) {
            this.renderTarget.appendChild(node);
        }
    }

    public addHiddenEntry(filename: string, showCallback: (count: number, readEntries: Map<string, boolean>) => boolean): void {
        this.hiddenEntries.push({filename, showCallback});
    }

    protected setEntryRead(entry: BioEntry): void {
        const preHiddenStatus = this.hiddenEntries.map((e) => e.showCallback(this.readCount, this.readEntriesDict));
        this.readCount++;
        this.readEntriesDict.set(entry.title, true);
        const postHiddenStatus = this.hiddenEntries.map((e) => e.showCallback(this.readCount, this.readEntriesDict));
        for (let i = 0; i < preHiddenStatus.length; i++) {
            if (preHiddenStatus[i] !== postHiddenStatus[i] && this.renderTarget) {
                this.renderListNodes();
            }
        }
    }

    protected isEntryHidden(title: string): boolean {
        for (const entry of this.hiddenEntries) {
            if (entry.filename === title) {
                return !entry.showCallback(this.readCount, this.readEntriesDict);
            }
        }
        return false;
    }
}
