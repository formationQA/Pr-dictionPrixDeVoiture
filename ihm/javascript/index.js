document.addEventListener("DOMContentLoaded", () => {
    const marqueSelect = document.getElementById("marque");
    const modeleSelect = document.getElementById("modele");
    const anneeSelect = document.getElementById("annee");
    const kilometrageInput = document.getElementById("kilometrage");
    const boiteSelect = document.getElementById("boite");
    const carburantSelect = document.getElementById("carburant");
    const predictButton = document.getElementById("predictButton");
    const resultDiv = document.getElementById("result");

    // Remplir les années dynamiquement
    const currentYear = new Date().getFullYear();
    for (let year = 1980; year <= currentYear; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        anneeSelect.appendChild(option);
    }

    // Charger les marques depuis l'API
    fetch("http://127.0.0.1:8002/api/formulaire/marques")
        .then((response) => response.json())
        .then((data) => {
            console.log("Données reçues :", data);
            if (data.marques && Array.isArray(data.marques)) {
                data.marques.forEach((marque) => {
                    const option = document.createElement("option");
                    option.value = marque;
                    option.textContent = marque;
                    marqueSelect.appendChild(option);
                });
            } else {
                console.error("Structure inattendue des données :", data);
            }
        })
        .catch((error) => console.error("Erreur lors de la récupération des marques :", error));

    // Charger les modèles en fonction de la marque sélectionnée
    marqueSelect.addEventListener("change", () => {
        const marque = marqueSelect.value;
        modeleSelect.innerHTML = '<option value="" disabled selected>Choisissez un modèle</option>';

        fetch(`http://127.0.0.1:8002/api/formulaire/modeles?marque=${encodeURIComponent(marque)}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Données reçues pour modèles :", data);
                if (data.modeles && Array.isArray(data.modeles)) {
                    data.modeles.forEach((modele) => {
                        const option = document.createElement("option");
                        option.value = modele;
                        option.textContent = modele;
                        modeleSelect.appendChild(option);
                    });
                } else {
                    console.error("Structure inattendue des données pour modèles :", data);
                }
            })
            .catch((error) => console.error("Erreur lors de la récupération des modèles :", error));
    });

    // Prédiction du prix
    predictButton.addEventListener("click", () => {
        const requestData = {
            marque: marqueSelect.value,
            modele: modeleSelect.value,
            annee: parseInt(anneeSelect.value),
            kilometrage: parseInt(kilometrageInput.value),
            boite_vitesse: boiteSelect.value,
            carburant: carburantSelect.value,
        };

        fetch("http://127.0.0.1:8002/api/prediction/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.predicted_price) {
                    resultDiv.textContent = `Le prix estimé est : ${data.predicted_price} €`;
                } else {
                    resultDiv.textContent = "Erreur lors de l'estimation.";
                    console.error("Erreur lors de l'estimation :", data);
                }
            })
            .catch((error) => {
                resultDiv.textContent = "Erreur lors de la communication avec le serveur.";
                console.error("Erreur lors de la prédiction :", error);
            });
    });
});
