console.log("PRESETS JS IS WORKING");
const presetGrid = document.getElementById("preset-grid");

fetch("presets.json")
    .then(response => response.json())
    .then(presets => {

        presetGrid.innerHTML = "";

        presets.forEach(preset => {

            const card = document.createElement("a");

            card.href = `card.html?id=${preset.id}`;
            card.className = "preset-card";

            card.innerHTML = `
                <div class="preset-thumbnail">

                    <img
                        src="${preset.thumbnail}"
                        alt="${preset.title}"
                    >

                </div>

                <div class="preset-card-info">

                    <span>
                        ${preset.label}
                    </span>

                    <h2>
                        ${preset.title}
                    </h2>

                    <p>
                        ${preset.description}
                    </p>

                    <strong>
                        View Preset →
                    </strong>

                </div>
            `;

            presetGrid.appendChild(card);

        });

    })
    .catch(error => {

        console.error(
            "Failed to load presets:",
            error
        );

    });