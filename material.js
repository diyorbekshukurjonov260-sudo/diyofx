/* =========================================================
   DIYOFX — MATERIALS
========================================================= */

console.log("MATERIALS JS IS WORKING");


/* =========================================================
   ELEMENTS
========================================================= */

const materialsGrid =
    document.getElementById("materials-grid");


/* =========================================================
   CHECK GRID
========================================================= */

if (!materialsGrid) {

    console.error(
        "Materials grid not found."
    );

} else {

    loadMaterials();

}


/* =========================================================
   LOAD MATERIALS
========================================================= */

function loadMaterials() {

    fetch("material.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }

            return response.json();

        })

        .then(materials => {

            console.log(
                "Materials loaded:",
                materials
            );


            /* Clear test/static cards */

            materialsGrid.innerHTML = "";


            /* Empty state */

            if (
                !Array.isArray(materials) ||
                materials.length === 0
            ) {

                showEmptyState();

                return;

            }


            /* Create cards */

            materials.forEach(
                material => {

                    createMaterialCard(
                        material
                    );

                }
            );

        })

        .catch(error => {

            console.error(
                "Failed to load materials:",
                error
            );

            showErrorState();

        });

}


/* =========================================================
   CREATE MATERIAL CARD
========================================================= */

function createMaterialCard(material) {

    const card =
        document.createElement("a");


    /* Card link */

    card.href =
        `material-detailed.html?id=${material.id}`;


    card.className =
        "material-card";


    /* Card content */

    card.innerHTML = `

        <div class="material-thumbnail">

            <img
                src="${material.thumbnail}"
                alt="${material.title}"
                loading="lazy"
            >

        </div>


        <div class="material-card-info">

            <span>
                ${material.label || "MATERIAL"}
            </span>


            <h2>
                ${material.title}
            </h2>


            <p>
                ${material.description || ""}
            </p>


            <strong>
                View Materials →
            </strong>

        </div>

    `;


    /* Add to grid */

    materialsGrid.appendChild(
        card
    );

}


/* =========================================================
   EMPTY STATE
========================================================= */

function showEmptyState() {

    materialsGrid.innerHTML = `

        <div class="materials-empty">

            <h2>
                No materials yet.
            </h2>

            <p>
                New materials will be added soon.
            </p>

        </div>

    `;

}


/* =========================================================
   ERROR STATE
========================================================= */

function showErrorState() {

    materialsGrid.innerHTML = `

        <div class="materials-empty">

            <h2>
                Failed to load materials.
            </h2>

            <p>
                Please try again later.
            </p>

        </div>

    `;

}