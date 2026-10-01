document.addEventListener("DOMContentLoaded", function () {

    const pages = document.querySelectorAll(".page");

    const music = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicButton");
    const surpriseButton = document.getElementById("surpriseButton");


    /* =========================================
       SHOW PAGE
    ========================================== */

    function showPage(pageId) {

        pages.forEach(function (page) {
            page.style.display = "none";
        });

        const selectedPage =
            document.getElementById(pageId);

        if (!selectedPage) {
            console.error("Page not found:", pageId);
            return;
        }

        if (
            pageId === "home" ||
            pageId === "final"
        ) {
            selectedPage.style.display = "flex";
        } else {
            selectedPage.style.display = "block";
        }

        window.scrollTo(0, 0);

    }


    /* =========================================
       HOME → GIFTS
    ========================================== */

    if (surpriseButton) {

        surpriseButton.addEventListener("click", function () {

            if (music) {

                music.volume = 0.45;

                music.play()
                    .then(function () {

                        if (musicButton) {
                            musicButton.textContent = "❚❚";
                        }

                    })
                    .catch(function (error) {

                        console.log(
                            "Music requires browser permission:",
                            error
                        );

                    });
            }

            showPage("gifts");

        });

    }


    /* =========================================
       ALL NAVIGATION
    ========================================== */

    document.addEventListener("click", function (event) {

        const button =
            event.target.closest("[data-page]");

        if (!button) {
            return;
        }

        event.preventDefault();

        const destination =
            button.getAttribute("data-page");

        if (!destination) {
            return;
        }

        showPage(destination);

    });


    /* =========================================
       MUSIC BUTTON
    ========================================== */

    if (musicButton && music) {

        musicButton.addEventListener(
            "click",
            function () {

                if (music.paused) {

                    music.play()
                        .then(function () {

                            musicButton.textContent = "❚❚";

                        })
                        .catch(function (error) {

                            console.log(
                                "Music error:",
                                error
                            );

                        });

                } else {

                    music.pause();

                    musicButton.textContent = "♫";

                }

            }
        );

    }


    /* =========================================
       MEMORIES — AUTO SCROLL
    ========================================== */

    const filmStrips =
        document.querySelectorAll(".film-strip");

    filmStrips.forEach(function (strip, index) {

        let scrollPosition = 0;

        let direction =
            index === 0 ? 1 : -1;

        function autoScroll() {

            if (
                strip.style.display === "none" ||
                !document.getElementById("memories")
            ) {
                requestAnimationFrame(autoScroll);
                return;
            }

            scrollPosition += 0.5 * direction;

            const maxScroll =
                strip.scrollWidth - strip.clientWidth;

            if (scrollPosition >= maxScroll) {
                scrollPosition = maxScroll;
                direction = -1;
            }

            if (scrollPosition <= 0) {
                scrollPosition = 0;
                direction = 1;
            }

            strip.scrollLeft = scrollPosition;

            requestAnimationFrame(autoScroll);
        }

        autoScroll();

    });


    /* =========================================
       START AT HOME
    ========================================== */

    showPage("home");

});