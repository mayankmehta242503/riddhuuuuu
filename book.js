document.addEventListener("DOMContentLoaded", () => {
    const book = document.getElementById("book");
    let firstPage = null;
    let lastPage = null;
    let currentPage = null;

    // **Your Chapter Content (Supports Paragraphs & Formatting)**
    const chapterData = {
        chapter1: `<p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>Once upon a time, a love story began...</p><p>It was a cold winter night...</p><p>They met under the moonlight...</p>`.repeat(3),
        chapter2: `<p>More beautiful moments in the journey...</p><p>They traveled the world together...</p><p>Love grew stronger...</p>`.repeat(3),
        chapter3: `<p>And they lived happily ever after...</p><p>Forever in love...</p>`.repeat(3)
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

            // **Show Chapter Title Only on the First Page of Each Chapter**
            if (isFirstOfChapter) {
                const chapterTitle = document.createElement("h2");
                chapterTitle.innerText = title;
                this.element.appendChild(chapterTitle);
            }

            this.textContainer = document.createElement("div");
            this.textContainer.classList.add("text-content");
            this.element.appendChild(this.textContainer);
        }

        addText(content) {
            this.textContainer.innerHTML = content;
        }
    }

    // **Create Static Pages (Cover, Index, Overview)**
    const coverPage = new Page("cover");
    coverPage.addText(`
        <img src="./assets/m.jpg" alt="Book Cover" class="cover-img">
        <h2>📖 Welcome to Your Special Book! ❤️</h2>
    `);

    const indexPage = new Page("index");
    indexPage.addText(`
        <h2>📜 Index</h2>
        <div class="menu">
            <div class="menu-item" data-chapter="overview">Overview</div>
            <div class="menu-item" data-chapter="chapter1">Chapter 1</div>
            <div class="menu-item" data-chapter="chapter2">Chapter 2</div>
            <div class="menu-item" data-chapter="chapter3">Chapter 3</div>
        </div>
    `);

    const overviewPage = new Page("overview");
    overviewPage.addText("<h2>📝 Summary of the Book...</h2>");

    // **Create Multi-Page Chapters**
    Object.keys(chapterData).forEach(chapter => {
        let paragraphs = chapterData[chapter].split("</p>").map(p => p + "</p>").filter(p => p.trim() !== "</p>");
        let tempPage = new Page(chapter, `📖 ${chapter.replace("chapter", "Chapter ")}`, true);
        let tempText = "";
        let isFirstPage = true;

        // **Hidden Test Page for Checking Overflow**
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

    // **Set Initial Page**
    currentPage = firstPage;
    currentPage.element.style.display = "block";

    // **Page Flipping (Arrow Keys)**
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") flipPage("next");
        else if (event.key === "ArrowLeft") flipPage("prev");
    });

    // **Function to Flip Pages**
    function flipPage(direction) {
        if (direction === "next" && currentPage.next) {
            currentPage.element.style.display = "none";
            currentPage = currentPage.next;
            currentPage.element.style.display = "block";
        } else if (direction === "prev" && currentPage.previous) {
            currentPage.element.style.display = "none";
            currentPage = currentPage.previous;
            currentPage.element.style.display = "block";
        }
    }

    // **Touch Events for Mobile Swiping**
    let startX = 0;
    let endX = 0;

    book.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
    });

    book.addEventListener("touchmove", (event) => {
        endX = event.touches[0].clientX;
    });

    book.addEventListener("touchend", () => {
        let distance = startX - endX;
        if (distance > 50) flipPage("next"); // Swipe Left → Next Page
        if (distance < -50) flipPage("prev"); // Swipe Right → Previous Page
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
