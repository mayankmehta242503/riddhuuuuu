document.addEventListener("DOMContentLoaded", () => {
    const book = document.getElementById("book");
    let firstPage = null;
    let lastPage = null;
    let currentPage = null;
    let startX = 0; // For mobile swiping

    const chapterData = {
       "The First Chapter Of US":`<p>Once upon a time, a love story began...</p><p>It was a cold winter night...</p>`.repeat(10),
       "From Fear To Feelings": `<p>More beautiful moments in the journey...</p><p>They traveled the world together...</p>`.repeat(10),
       "A Forever Unwritten": `<p>And they lived happily ever after...</p><p>Forever in love...</p>`.repeat(10)
    };

    class Page {
        constructor(chapter = "", title = "", isFirstOfChapter = false) {
            this.element = document.createElement("div");
            this.element.classList.add("page");
            this.element.dataset.chapter = chapter;
            this.element.style.display = "none";
            book.appendChild(this.element);

            this.previous = null;
            this.next = null;

            if (!firstPage) firstPage = this;
            if (lastPage) {
                lastPage.next = this;
                this.previous = lastPage;
            }
            lastPage = this;

            if (isFirstOfChapter) {
                const chapterTitle = document.createElement("h2");
                chapterTitle.innerText = title;
                this.element.appendChild(chapterTitle);
            }

            this.textContainer = document.createElement("div");
            this.element.appendChild(this.textContainer);
        }

        addText(content) {
            this.textContainer.innerHTML = content;
        }
    }
    
    // Cover Page
    const coverPage = new Page("cover");
    coverPage.addText(`<img src="./assets/cover.jpg" alt="Book Cover" class="cover-img"><h2></h2>`);
    // Index Page
    const indexPage = new Page("Chapters Of US");
    indexPage.addText(`
        <h2 class="chapter-title">Chapters Of US</h2>
        <div class="menu">
            <div class="menu-item" data-chapter="Before You Begin">Before You Begin</div>
            <div class="menu-item" data-chapter="The First Chapter Of US">The First Chapter Of US</div>
            <div class="menu-item" data-chapter="From Fear To Feelings">From Fear To Feelings</div>
            <div class="menu-item" data-chapter="A Forever Unwritten">A Forever Unwritten</div>
        </div>

    `); 

    // Before You Begin
    const overviewPage = new Page("#Before You Begin"); //
    overviewPage.addText(`
    <h2>Before You Begin</h2>
    <p>This isn’t really a book, and I’m not a writer. But this is our story—the way I remember it, the way it felt, and the way it still lives in my heart. I’ve tried to capture every little moment, from how it all began to everything that led us here. You know my memory isn’t the best, but I’ve written down as much as I could recall. Maybe I missed some details, but what matters most is that every word comes straight from me to you. I hope you’ll like it.</p>
`);


    // Create Pages for Each Chapter
    Object.keys(chapterData).forEach(chapter => {
        let paragraphs = chapterData[chapter].split("</p>").map(p => p + "</p>").filter(p => p.trim() !== "</p>");
        let tempPage = new Page(chapter, `📖 ${chapter.replace("chapter", "Chapter ")}`, true);
        let tempText = "";

        const testPage = document.createElement("div");
        testPage.classList.add("page", "hidden-page");
        book.appendChild(testPage);

        paragraphs.forEach(paragraph => {
            tempText += paragraph;
            testPage.innerHTML = tempText;

            if (testPage.scrollHeight > testPage.clientHeight) {
                tempText = paragraph;
                tempPage = new Page(chapter, "", false);
            }

            tempPage.addText(tempText);
        });

        book.removeChild(testPage);
    });

    // Set Initial Page
    currentPage = firstPage;
    currentPage.element.style.display = "block";

    // Keyboard Navigation
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" && currentPage.next) {
            currentPage.element.style.display = "none";
            currentPage = currentPage.next;
            currentPage.element.style.display = "block";
        } else if (event.key === "ArrowLeft" && currentPage.previous) {
            currentPage.element.style.display = "none";
            currentPage = currentPage.previous;
            currentPage.element.style.display = "block";
        }
    });

    // Mobile Swipe Navigation
    book.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
    });

    book.addEventListener("touchend", (event) => {
        let endX = event.changedTouches[0].clientX;
        if (startX - endX > 50 && currentPage.next) {
            currentPage.element.style.display = "none";
            currentPage = currentPage.next;
            currentPage.element.style.display = "block";
        } else if (endX - startX > 50 && currentPage.previous) {
            currentPage.element.style.display = "none";
            currentPage = currentPage.previous;
            currentPage.element.style.display = "block";
        }
    });
     // **Jump to Specific Chapter from Menu**
     document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
            let targetChapter = item.dataset.chapter;
            let targetPage = firstPage;

            while (targetPage) {
                if (targetPage.element.dataset.chapter === targetChapter) {
                    break;
                }
                targetPage = targetPage.next;
            }

            if (targetPage) {
                currentPage.element.style.display = "none";
                currentPage = targetPage;
                currentPage.element.style.display = "block";
            }
        });
    });
});
 

document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");

    pages.forEach((page, index) => {
        if (index !== 0) {  // Skip the first page (cover)
            page.setAttribute("data-page", index);
        }
    });
});

if (isFirstOfChapter) {
    const chapterTitle = document.createElement("h2");
    chapterTitle.innerText = title;
    chapterTitle.classList.add("chapter-heading");  // Apply the class
    this.element.appendChild(chapterTitle);
}
let tempPage = new Page(chapter, `📖 ${chapter.replace("chapter", "Chapter ")}`, true);
//page no
document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");

    pages.forEach((page, index) => {
        if (index !== 0) {  // Skip the first page (cover)
            page.setAttribute("data-page", index);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page:not(:first-child)");
    
    pages.forEach((page, index) => {
      page.setAttribute("data-page", index + 1); // Starts from Page 1 (excluding cover)
    });
  });
  
