export default class Bio3Entry {
  public static gifUrl: string = "new2.gif";
  public static sort(entries: Bio3Entry[]): Bio3Entry[] {
    return entries.sort((a, b) => {
      const compare = a.date.getTime() - b.date.getTime();
      if (compare === 0) {
        return -a.title.localeCompare(b.title);
      } else {
        return compare;
      }
    });
  }

  public static currentTime: Date = new Date((new Date()).toISOString().substr(0,10));
  public date: Date;

  constructor(public title: string, public content: string) {
    this.date = new Date(title.substr(0, 10));
    if (Number.isNaN(this.date.getTime())) {
      this.date = new Date("2013-08-14");
    }
  }

  public isVisible(): boolean {
    return Bio3Entry.currentTime.getMonth() > this.date.getMonth() ||
     (Bio3Entry.currentTime.getMonth() === this.date.getMonth() && Bio3Entry.currentTime.getDate() >= this.date.getDate());
  }

  public isNew(): boolean {
    return Bio3Entry.currentTime.getMonth() === this.date.getMonth() && Bio3Entry.currentTime.getDate() === this.date.getDate();
  }

  public getHTML(): HTMLDivElement {
    const node = document.createElement("div");
    const title = document.createElement("h3");
    title.innerText = this.title;
    title.id = this.getAnchorId();
    if (this.isNew()) {
      title.innerText += " ";
      const newImg = document.createElement("img");
      newImg.alt = "NEW";
      newImg.title = "New Entry";
      newImg.src = Bio3Entry.gifUrl;
      title.appendChild(newImg);
    }
    node.appendChild(title);
    const content = document.createElement("pre");
    content.innerText = this.content;
    node.appendChild(content);
    node.appendChild(document.createElement("hr"));
    return node;
  }

  public getAnchorId(): string {
    return this.title.split(/\s/).shift();
  }
}
