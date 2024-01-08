const BASE_URL = "http://localhost:8080";

const inputLicensePlate = document.getElementById("license-plate");
const inputRepairDate = document.getElementById("repair-date");
const inputCustomerName = document.getElementById("customer-name");
const inputCatalog = document.getElementById("catalog");
const inputCarMaker = document.getElementById("car-maker");
const form = document.getElementById("car-create-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    await create();
    this.reset();
});

async function create() {
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "POST",
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
