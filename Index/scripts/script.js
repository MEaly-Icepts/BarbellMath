const imperialPlates = [2.5, 5, 10, 15, 25, 35, 45];
const metricPlates = [2.5, 5, 10, 15, 20, 25];

let unit = "imperial"; // Default unit

function updateUnitSelection() {
    const selectedUnit = document.getElementById('unit').value;
    unit = selectedUnit;

    // Show/hide relevant input fields based on unit
    if (unit === "imperial") {
        document.getElementById('imperialInputs').style.display = "block";
        document.getElementById('metricInputs').style.display = "none";
    } else {
        document.getElementById('imperialInputs').style.display = "none";
        document.getElementById('metricInputs').style.display = "block";
    }
}

function calculatePlates() {
    const desiredWeight = parseFloat(document.getElementById('desiredWeight').value);
    let barbellWeight = 0;

    if (unit === "imperial") {
        barbellWeight = parseFloat(document.getElementById('barbellWeightImperial').value);
    } else {
        barbellWeight = parseFloat(document.getElementById('barbellWeightMetric').value);
    }

    if (isNaN(desiredWeight) || isNaN(barbellWeight)) {
        alert("Please enter valid values for both barbell weight and desired weight.");
        return;
    }

    const weightToAdd = desiredWeight - barbellWeight;
    if (weightToAdd < 0) {
        alert("Desired weight cannot be less than the current barbell weight.");
        return;
    }

    let platesNeeded = [];
    let plates = unit === "imperial" ? imperialPlates : metricPlates;
    let remainingWeight = weightToAdd / 2; // Plates are added to both sides

    // Initialize an object to count the number of each type of plate
    let plateCount = {};

    // Calculate plates needed
    for (let i = plates.length - 1; i >= 0; i--) {
        while (remainingWeight >= plates[i]) {
            // If the plate is not in the plateCount object, add it
            if (!plateCount[plates[i]]) {
                plateCount[plates[i]] = 0;
            }
            plateCount[plates[i]]++;
            remainingWeight -= plates[i];
        }
    }

    if (remainingWeight > 0) {
        alert("It is not possible to reach the desired weight with the available plates.");
    } else {
        displayResult(plateCount);
    }
}

function displayResult(plateCount) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<h2>Plates Needed (per side):</h2>";

    if (Object.keys(plateCount).length === 0) {
        resultDiv.innerHTML += "<p>No plates needed.</p>";
    } else {
        for (let plate in plateCount) {
            resultDiv.innerHTML += `<p>${plateCount[plate]} x ${plate} ${unit === 'imperial' ? 'lbs' : 'kg'} plate(s)</p>`;
        }
    }
}

// Initialize the unit selection based on the default value
updateUnitSelection();
