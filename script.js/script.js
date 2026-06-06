document.getElementById("startBtn").addEventListener("click", function () {

    document.getElementById("welcome-screen").style.display = "none";

    document.getElementById("home-screen").style.display = "block";

});
document.getElementById("devicesBtn").addEventListener("click", function () {

    document.getElementById("home-screen").style.display = "none";

    document.getElementById("devices-screen").style.display = "block";

});
document.getElementById("saveBtn").addEventListener("click", function () {

    let deviceName = document.getElementById("deviceName").value;
    let brand = document.getElementById("brand").value;
    let model = document.getElementById("model").value;

    let imei = document.getElementById("imei").value;
let serial = document.getElementById("serial").value;
let purchaseDate = document.getElementById("purchaseDate").value;

let deviceInfo = `
<div class="saved-device">

    <h3>${deviceName}</h3>

    <p><strong>Brand:</strong> ${brand}</p>

    <p><strong>Model:</strong> ${model}</p>

    <p><strong>IMEI:</strong> ${imei}</p>

    <p><strong>Serial:</strong> ${serial}</p>

    <p><strong>Purchase Date:</strong> ${purchaseDate}</p>

<button class="delete-btn">Delete</button>

</div>
`;

    document.getElementById("deviceList").innerHTML += deviceInfo;
    let devices = JSON.parse(localStorage.getItem("devices")) || [];

devices.push(deviceInfo);

localStorage.setItem("devices", JSON.stringify(devices));

updateStats();

});
let savedDevices = JSON.parse(localStorage.getItem("devices")) || [];

savedDevices.forEach(function(device) {
    document.getElementById("deviceList").innerHTML += device;
});
document.addEventListener("click", function(event) {

    if(event.target.classList.contains("delete-btn")) {

        event.target.parentElement.remove();

    }

});

document.getElementById("stolenBtn").addEventListener("click", function () {

    document.getElementById("home-screen").style.display = "none";

    document.getElementById("stolen-screen").style.display = "block";

    let select = document.getElementById("deviceSelect");

select.innerHTML = "";

let devices = JSON.parse(localStorage.getItem("devices")) || [];

devices.forEach(function(device, index) {

    let option = document.createElement("option");

    option.value = index;

    option.textContent = "Device " + (index + 1);

    select.appendChild(option);

});


    if (devices.length > 0) {

        let latestDevice = devices[devices.length - 1];

        document.getElementById("stolenDeviceInfo").innerHTML = `
            <h2>Your Most Recent Device</h2>

            ${latestDevice}
        `;
    }

});

document.getElementById("backToDashboard1").addEventListener("click", function () {

    document.getElementById("devices-screen").style.display = "none";

    document.getElementById("home-screen").style.display = "block";

});

document.getElementById("backToDashboard2").addEventListener("click", function () {

    document.getElementById("stolen-screen").style.display = "none";

    document.getElementById("home-screen").style.display = "block";

});

document.getElementById("loadDeviceBtn").addEventListener("click", function () {

    let devices = JSON.parse(localStorage.getItem("devices")) || [];

    let selectedIndex = document.getElementById("deviceSelect").value;

    if (devices.length > 0) {

        document.getElementById("stolenDeviceInfo").innerHTML = `
            <h2>Selected Device</h2>

            ${devices[selectedIndex]}
        `;

    }

});

document.getElementById("generateReportBtn").addEventListener("click", function () {

    let devices = JSON.parse(localStorage.getItem("devices")) || [];

    let selectedIndex = document.getElementById("deviceSelect").value;

    if (devices.length > 0) {

        let today = new Date().toLocaleDateString();

        document.getElementById("reportArea").innerHTML = `
            <div class="saved-device">

                <h2>📄 STOLEN DEVICE REPORT</h2>

                <p><strong>Date Reported:</strong> ${today}</p>

                ${devices[selectedIndex]}

                <p>
                This report can be used when contacting police,
                network providers, or insurance services.
                </p>

            </div>
        `;
    }

});

document.getElementById("printReportBtn").addEventListener("click", function () {

    let reportContent = document.getElementById("reportArea").innerHTML;

    let printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <html>
        <head>
            <title>OMNIBACKUP Theft Report</title>
        </head>
        <body>
            ${reportContent}
        </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.print();

});

document.getElementById("searchDevice").addEventListener("keyup", function () {

    let searchText = this.value.toLowerCase();

    let devices = document.querySelectorAll(".saved-device");

    devices.forEach(function(device) {

        let deviceText = device.textContent.toLowerCase();

        if (deviceText.includes(searchText)) {
            device.style.display = "block";
        } else {
            device.style.display = "none";
        }

    });

});

function updateStats() {

    let devices = JSON.parse(localStorage.getItem("devices")) || [];

    document.getElementById("totalDevices").textContent = devices.length;

}

updateStats();