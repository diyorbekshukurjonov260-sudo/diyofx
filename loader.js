/* =========================================================
   DIYOFX — UNIVERSAL LOADER
========================================================= */

const loader =
    document.getElementById("diyofx-loader");

const progress =
    document.getElementById("loader-progress");

const percent =
    document.getElementById("loader-percent");

const status =
    document.getElementById("loader-status");


if (
    loader &&
    progress &&
    percent &&
    status
) {

    let loadingProgress = 0;


    const loaderInterval =
        setInterval(() => {

            loadingProgress +=
                Math.floor(
                    Math.random() * 7
                ) + 2;


            if (loadingProgress >= 100) {

                loadingProgress = 100;

                clearInterval(
                    loaderInterval
                );

                status.textContent =
                    "READY";


                setTimeout(() => {

                    loader.classList.add(
                        "hidden"
                    );

                }, 350);

            }


            progress.style.width =
                loadingProgress + "%";


            percent.textContent =
                loadingProgress + "%";


            if (
                loadingProgress >= 20 &&
                loadingProgress < 55
            ) {

                status.textContent =
                    "LOADING ASSETS";

            }


            if (
                loadingProgress >= 55 &&
                loadingProgress < 80
            ) {

                status.textContent =
                    "INITIALIZING";

            }


            if (
                loadingProgress >= 80 &&
                loadingProgress < 100
            ) {

                status.textContent =
                    "ALMOST READY";

            }

        }, 100);

}