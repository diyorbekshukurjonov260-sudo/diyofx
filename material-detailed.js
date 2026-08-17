/* =========================================================
   DIYOFX — MATERIAL DETAIL
========================================================= */

console.log("MATERIAL DETAIL JS IS WORKING");


/* =========================================================
   GET MATERIAL ID
========================================================= */

const params = new URLSearchParams(
    window.location.search
);

const materialId = params.get("id");

console.log("Material ID:", materialId);


/* =========================================================
   ELEMENTS
========================================================= */

const materialThumbnail =
    document.getElementById("materialThumbnail");

const materialLabel =
    document.getElementById("materialLabel");

const materialTitle =
    document.getElementById("materialTitle");

const materialDescription =
    document.getElementById("materialDescription");

const ccButton =
    document.getElementById("ccButton");

const audioButton =
    document.getElementById("audioButton");

const overlayButton =
    document.getElementById("overlayButton");

const assetsButton =
    document.getElementById("assetsButton");

const presetLink =
    document.getElementById("presetLink");


/* =========================================================
   START
========================================================= */

if (!materialId) {

    showError(
        "Material not found",
        "No material ID was provided."
    );

} else {

    loadMaterial();

}


/* =========================================================
   LOAD MATERIALS JSON
========================================================= */

function loadMaterial() {

    fetch("material.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Failed to load materials.json (${response.status})`
                );

            }

            return response.json();

        })

        .then(materials => {

            console.log(
                "Materials JSON loaded:",
                materials
            );


            const material = materials.find(
                item =>
                    String(item.id) ===
                    String(materialId)
            );


            if (!material) {

                throw new Error(
                    `Material with ID "${materialId}" not found.`
                );

            }


            console.log(
                "Selected material:",
                material
            );


            renderMaterial(material);

        })

        .catch(error => {

            console.error(
                "Material loading error:",
                error
            );

            showError(
                "Failed to load material",
                error.message
            );

        });

}


/* =========================================================
   RENDER MATERIAL
========================================================= */

function renderMaterial(material) {


    /* PAGE TITLE */

    document.title =
        `DiyoFX — ${material.title}`;


    /* THUMBNAIL */

    if (
        materialThumbnail &&
        material.thumbnail
    ) {

        materialThumbnail.src =
            material.thumbnail;

        materialThumbnail.alt =
            material.title;

    }


    /* LABEL */

    if (materialLabel) {

        materialLabel.textContent =
            material.label || "MATERIALS";

    }


    /* TITLE */

    if (materialTitle) {

        materialTitle.textContent =
            material.title || "Untitled Material";

    }


    /* DESCRIPTION */

    if (materialDescription) {

        materialDescription.textContent =
            material.description || "";

    }


    /* =====================================================
       MATERIAL BUTTONS
    ===================================================== */

    setupMaterialButton(
        ccButton,
        material.cc
    );

    setupMaterialButton(
        audioButton,
        material.audio
    );

    setupMaterialButton(
        overlayButton,
        material.overlay
    );

    setupMaterialButton(
        assetsButton,
        material.assets
    );


    /* =====================================================
       PRESET LINK
    ===================================================== */

    if (
        presetLink &&
        material.presetId
    ) {

        presetLink.href =
            `card.html?id=${material.presetId}`;

    } else if (presetLink) {

        presetLink.removeAttribute(
            "href"
        );

        presetLink.classList.add(
            "disabled"
        );

    }

}


/* =========================================================
   MATERIAL BUTTON
========================================================= */

function setupMaterialButton(
    element,
    material
) {

    if (!element) {
        return;
    }


    const text =
        element.querySelector(
            "span:last-child"
        );


    /* =====================================================
       RESET
    ===================================================== */

    element.removeAttribute("href");

    element.removeAttribute("download");

    element.removeAttribute(
        "aria-disabled"
    );

    element.classList.remove(
        "disabled",
        "premium"
    );


    /* =====================================================
       NO DATA
    ===================================================== */

    if (
        material === null ||
        material === undefined
    ) {

        disableMaterialButton(
            element,
            text,
            "Available Soon"
        );

        return;
    }


    /* =====================================================
       SUPPORT STRING FORMAT
       
       Example:
       "audio": "materials/audio/audio.zip"
    ===================================================== */

    let file = "";
    let premium = false;


    if (
        typeof material === "string"
    ) {

        file = material;

    }


    /* =====================================================
       SUPPORT OBJECT FORMAT
       
       Example:
       "audio": {
           "file": "materials/audio/audio.zip",
           "premium": true
       }
    ===================================================== */

    else if (
        typeof material === "object"
    ) {

        file =
            material.file || "";

        premium =
            material.premium === true;

    }


    /* =====================================================
       FILE NOT AVAILABLE
    ===================================================== */

    if (
        !file ||
        file === "#"
    ) {

        disableMaterialButton(
            element,
            text,
            premium
                ? "🔒 Premium"
                : "Available Soon"
        );

        return;
    }


    /* =====================================================
       PREMIUM MATERIAL
    ===================================================== */

    if (premium) {

        element.classList.add(
            "premium"
        );

        element.setAttribute(
            "aria-disabled",
            "true"
        );


        if (text) {

            text.textContent =
                "🔒 Get Premium";

        }


        return;
    }


    /* =====================================================
       FREE DOWNLOAD
    ===================================================== */

    element.href =
        file;

    element.setAttribute(
        "download",
        ""
    );


    if (text) {

        text.textContent =
            "Download";

    }

}


/* =========================================================
   DISABLE MATERIAL BUTTON
========================================================= */

function disableMaterialButton(
    element,
    text,
    label
) {

    element.removeAttribute(
        "href"
    );

    element.removeAttribute(
        "download"
    );

    element.classList.add(
        "disabled"
    );

    element.setAttribute(
        "aria-disabled",
        "true"
    );


    if (text) {

        text.textContent =
            label;

    }

}


/* =========================================================
   ERROR STATE
========================================================= */

function showError(
    title,
    description
) {

    if (materialTitle) {

        materialTitle.textContent =
            title;

    }


    if (materialDescription) {

        materialDescription.textContent =
            description;

    }


    if (materialThumbnail) {

        materialThumbnail.removeAttribute(
            "src"
        );

        materialThumbnail.alt =
            title;

    }


    disableMaterialButton(
        ccButton,
        ccButton?.querySelector(
            "span:last-child"
        ),
        "Unavailable"
    );

    disableMaterialButton(
        audioButton,
        audioButton?.querySelector(
            "span:last-child"
        ),
        "Unavailable"
    );

    disableMaterialButton(
        overlayButton,
        overlayButton?.querySelector(
            "span:last-child"
        ),
        "Unavailable"
    );

    disableMaterialButton(
        assetsButton,
        assetsButton?.querySelector(
            "span:last-child"
        ),
        "Unavailable"
    );

}