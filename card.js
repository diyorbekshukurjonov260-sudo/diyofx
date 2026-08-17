/* =========================================================
   DIYOFX — CARD / PRESET DETAIL
========================================================= */

console.log("CARD JS IS WORKING");


/* =========================================================
   GET PRESET ID
========================================================= */

const params = new URLSearchParams(
    window.location.search
);

const presetId = params.get("id");

console.log("Preset ID:", presetId);


/* =========================================================
   ELEMENTS
========================================================= */

const presetThumbnail =
    document.getElementById("presetThumbnail");

const presetLabel =
    document.getElementById("presetLabel");

const presetTitle =
    document.getElementById("presetTitle");

const presetDescription =
    document.getElementById("presetDescription");

const xmlDownload =
    document.getElementById("xmlDownload");

const qrButton =
    document.getElementById("qrButton");

const qrModal =
    document.getElementById("qrModal");

const qrClose =
    document.getElementById("qrClose");

const qrTitle =
    document.getElementById("qrTitle");

const qrImage =
    document.getElementById("qrImage");

const alightLink =
    document.getElementById("alightLink");

const materialsLink =
    document.getElementById("materialsLink");


/* =========================================================
   CHECK ID
========================================================= */

if (!presetId) {

    console.error("No preset ID found in URL.");

    showError(
        "Preset not found",
        "No preset ID was provided."
    );

} else {

    loadPreset();

}


/* =========================================================
   LOAD PRESET
========================================================= */

function loadPreset() {

    fetch("presets.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }

            return response.json();

        })

        .then(presets => {

            console.log(
                "Presets loaded:",
                presets
            );


            const preset = presets.find(
                item =>
                    String(item.id) ===
                    String(presetId)
            );


            if (!preset) {

                throw new Error(
                    `Preset "${presetId}" was not found.`
                );

            }


            console.log(
                "Loaded preset:",
                preset
            );


            renderPreset(preset);

        })

        .catch(error => {

            console.error(
                "Failed to load preset:",
                error
            );

            showError(
                "Failed to load preset",
                "Something went wrong while loading this preset."
            );

        });

}


/* =========================================================
   RENDER PRESET
========================================================= */

function renderPreset(preset) {


    /* ---------- PAGE TITLE ---------- */

    document.title =
        `DiyoFX — ${preset.title}`;


    /* ---------- THUMBNAIL ---------- */

    if (
        presetThumbnail &&
        preset.thumbnail
    ) {

        presetThumbnail.src =
            preset.thumbnail;

        presetThumbnail.alt =
            preset.title;

    }


    /* ---------- LABEL ---------- */

    if (presetLabel) {

        presetLabel.textContent =
            preset.label || "PRESET";

    }


    /* ---------- TITLE ---------- */

    if (presetTitle) {

        presetTitle.textContent =
            preset.title;

    }


    /* ---------- DESCRIPTION ---------- */

    if (presetDescription) {

        presetDescription.textContent =
            preset.description || "";

    }


    /* ---------- XML ---------- */

    if (
        xmlDownload &&
        preset.xml &&
        preset.xml !== "#"
    ) {

        xmlDownload.href =
            preset.xml;

        xmlDownload.setAttribute(
            "download",
            ""
        );

    } else {

        disableButton(
            xmlDownload
        );

    }


    /* ---------- QR ---------- */

    if (
        qrImage &&
        preset.qr &&
        preset.qr !== "#"
    ) {

        qrImage.src =
            preset.qr;

        qrImage.alt =
            `${preset.title} QR Code`;

    } else {

        disableButton(
            qrButton
        );

    }


    if (qrTitle) {

        qrTitle.textContent =
            preset.title;

    }


    /* ---------- ALIGHT MOTION ---------- */

    if (
        alightLink &&
        preset.alightLink &&
        preset.alightLink !== "#"
    ) {

        alightLink.href =
            preset.alightLink;

        alightLink.target =
            "_blank";

        alightLink.rel =
            "noopener noreferrer";

    } else {

        disableButton(
            alightLink
        );

    }


    /* ---------- MATERIALS ---------- */

    if (materialsLink) {

        materialsLink.href =
            `material.html?id=${preset.id}`;

    }

}


/* =========================================================
   ERROR STATE
========================================================= */

function showError(title, description) {

    if (presetTitle) {

        presetTitle.textContent =
            title;

    }

    if (presetDescription) {

        presetDescription.textContent =
            description;

    }

    if (presetThumbnail) {

        presetThumbnail.removeAttribute(
            "src"
        );

        presetThumbnail.alt =
            title;

    }

    disableButton(
        xmlDownload
    );

    disableButton(
        qrButton
    );

    disableButton(
        alightLink
    );

}


/* =========================================================
   DISABLE BUTTON
========================================================= */

function disableButton(element) {

    if (!element) {
        return;
    }

    element.removeAttribute("href");

    element.setAttribute(
        "aria-disabled",
        "true"
    );

    element.classList.add(
        "disabled"
    );

}


/* =========================================================
   QR MODAL
========================================================= */

if (
    qrButton &&
    qrModal
) {

    qrButton.addEventListener(
        "click",
        () => {

            if (
                !qrImage ||
                !qrImage.src ||
                qrImage.src.endsWith("/")
            ) {

                return;

            }

            qrModal.classList.add(
                "active"
            );

            qrModal.setAttribute(
                "aria-hidden",
                "false"
            );

        }
    );

}


/* ---------- CLOSE BUTTON ---------- */

if (
    qrClose &&
    qrModal
) {

    qrClose.addEventListener(
        "click",
        closeQrModal
    );

}


/* ---------- CLICK OUTSIDE ---------- */

if (qrModal) {

    qrModal.addEventListener(
        "click",
        event => {

            if (
                event.target === qrModal
            ) {

                closeQrModal();

            }

        }
    );

}


/* ---------- ESC KEY ---------- */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            qrModal &&
            qrModal.classList.contains("active")
        ) {

            closeQrModal();

        }

    }
);


/* =========================================================
   CLOSE QR
========================================================= */

function closeQrModal() {

    if (!qrModal) {
        return;
    }

    qrModal.classList.remove(
        "active"
    );

    qrModal.setAttribute(
        "aria-hidden",
        "true"
    );

}