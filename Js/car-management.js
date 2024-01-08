const BASE_URL = "http://localhost:8080";

const inputLicensePlate = document.getElementById("license-plate");
const inputRepairDate = document.getElementById("repair-date");
const inputCustomerName = document.getElementById("customer-name");
const inputCatalog = document.getElementById("catalog");
const inputCarMaker = document.getElementById("car-maker");
const form = document.getElementById("car-update-form");
const tbody = document.getElementById("cars");
const loading = document.getElementById("loading");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    await update();
    findAll();
    this.reset();
});

findAll();

async function findAll() {
    showLoading();
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            }   
        });
        const body = await response.json();
        console.log(body);

        showAllCars(body.content);
        hideLoading();
}

async function showAllCars(cars) {
    tbody.innerHTML = "";
    for (const car of cars) {
        const row = tbody.insertRow();

// Cách 1
        const licensePlate = document.createTextNode(car.licensePlate);
        row.insertCell().appendChild(licensePlate);
// Cách 2
        const repairDate = car.repairDate;
        row.insertCell().innerText = repairDate;

        const customerName = car.customerName;
        row.insertCell().innerText = customerName;

        const catalog = car.catalogs;
        row.insertCell().innerText = catalog;

        const carMaker = car.carMaker;
        row.insertCell().innerText = carMaker;

        const btnEdit = document.createElement("button");
        btnEdit.innerText = "✏";
        btnEdit.addEventListener("click", function () {
            inputLicensePlate.value = car.licensePlate;
            inputRepairDate.value = car.repairDate;
            inputCustomerName.value = car.customerName;
            inputCatalog.value = car.catalogs;
            inputCarMaker.value = car.carMaker;
        });
        const btnDelete = document.createElement("button");
        btnDelete.innerText = "❌"; 
        btnDelete.addEventListener("click", async function() {
            const confirmed = confirm("Do you want delete this car");
            if(confirmed) {
                showLoading();
                await deleteById(car.licensePlate, car.repairDate);
                tbody.removeChild(row);
                hideLoading();
            }
         });
         row.insertCell().append(btnEdit, btnDelete);
    }
}

async function update() {
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            licensePlate: inputLicensePlate.value,
            repairDate: inputRepairDate.value,
            customerName: inputCustomerName.value,
            catalogs: inputCatalog.value,
            carMaker: inputCarMaker.value
        })
    });
    const body = await response.json();
    console.log(body);
}

async function deleteById(licensePlate, repairDate) {
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            licensePlate: licensePlate,
            repairDate: repairDate
        })
    });
}

function showLoading() {
    loading.style.display = "flex";
}

function hideLoading() {
    setTimeout(function () {
    loading.style.display = "none";
    }, Math.random() * 200);
}

