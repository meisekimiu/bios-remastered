import Bio3Data from "../data/bio3.json";
import Bio3Censor from "../data/bio3_censored.json";
import Bio3Entry from "./bio3/bio3entry";
import * as NewLogo from "./bio3/new2.gif";
import "./bio3/bio3.css";

document.addEventListener("DOMContentLoaded", () => {
  Bio3Entry.gifUrl = NewLogo.default;
  // This line is for debugging date stuff:
  // Bio3Entry.currentTime = new Date("2021-08-22");

  const year = Bio3Entry.currentTime.getFullYear().toString();
  const uncensored = (new Date("2013-08-21").getDay()) === (new Date(year + "-08-21").getDay())
  const source = uncensored ? Bio3Data : Bio3Censor;
  const bio3 = Bio3Entry.sort(source.bio3.map((entry) => {
    return new Bio3Entry(entry.title, entry.content);
  }));

  let activeEntries = 0;
  for (const entry of bio3) {
    if (entry.isVisible()) {
      activeEntries++;
    } else {
      break;
    }
  }
  const isFinal = bio3[bio3.length - 1].isNew();
  const isActive = activeEntries > 0 && activeEntries < bio3.length;
  if (isFinal) {
    document.getElementById("content").appendChild(bio3.pop().getHTML());
    const antimoonLink = document.createElement("div");
    antimoonLink.innerHTML = `<br /><br /><a href="end.html">end&gt;</a>`;
    document.getElementById("content").appendChild(antimoonLink);
  } else if (isActive) {
    const toc = document.createElement("ul");
    for (const entry of bio3) {
      if (entry.isVisible()) {
        const link = document.createElement("a");
        link.href = "#" + entry.getAnchorId();
        link.innerText = entry.title;
        const li = document.createElement("li");
        li.appendChild(link);
        toc.prepend(li);

        document.getElementById("content").prepend(entry.getHTML());
      } else {
        break;
      }
    }

    const toc_dropdown = document.createElement("details");
    toc_dropdown.innerHTML = "<summary>Table of Contents</summary>";
    toc_dropdown.appendChild(toc);
    document.getElementById("content").prepend(toc_dropdown);

    const blurb = document.createElement("p");
    blurb.innerHTML = "bio3 runs between August 21<sup>st</sup> and October 31<sup>st</sup> every year. Check back every day to see if there are new entries.";
    if (uncensored) {
      blurb.innerHTML += " This year, a special &quot;preserved&quot; version of bio3 is being run, where all [ENTRY LOST] entries have been restored to their original entries."
    }
    if (activeEntries === 1) {
      blurb.innerHTML = "bio3 runs between August 21<sup>st</sup> and October 31<sup>st</sup> every year. The prologue entry &quot;001-INTRO&quot; has been posted in preparation for the starting date.";
      if (uncensored) {
        blurb.innerHTML += " This year, a special &quot;preserved&quot; version of bio3 will be run, where all [ENTRY LOST] entries are restored to their original entries."
      }
    }
    document.getElementById("content").prepend(blurb);
  } else {
    document.getElementById("content").innerHTML = "<p>bio3 runs between August 21<sup>st</sup> and October 31<sup>st</sup> every year, with entries showing up on the date they were originally written. Please come back when it is running.</p>";
  }
});
