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
    let lastSeenLocation =
    document.getElementById("lastSeenLocation").value;

        let photoInput = document.getElementById("devicePhoto");

        let photoURL = "";

if (photoInput.files.length > 0) {
    photoURL = URL.createObjectURL(photoInput.files[0]);
}

    let imei = document.getElementById("imei").value;
let serial = document.getElementById("serial").value;
let purchaseDate = document.getElementById("purchaseDate").value;

let score = 0;

if (deviceName) score += 20;
if (imei) score += 20;
if (serial) score += 20;
if (purchaseDate) score += 20;
if (photoURL) score += 20;

let deviceInfo = `
<div class="saved-device">

    <h3>${deviceName}</h3>

    <div class="score-badge">
    ${score}%
</div>

    <p><strong>Brand:</strong> ${brand}</p>

    <p><strong>Model:</strong> ${model}</p>

    <p><strong>IMEI:</strong> ${imei}</p>

    <p><strong>Serial:</strong> ${serial}</p>

    <p><strong>Purchase Date:</strong> ${purchaseDate}</p>

    <p><strong>Security Score:</strong> ${score}%</p>

    <p><strong>Last Seen Location:</strong> ${lastSeenLocation}</p>

    <img src="${photoURL}" class="device-photo">

<button class="delete-btn">Delete</button>

</div>
`;

    document.getElementById("deviceList").innerHTML += deviceInfo;
    let devices = JSON.parse(localStorage.getItem("devices")) || [];

devices.push(deviceInfo);

localStorage.setItem("devices", JSON.stringify(devices));

updateStats();

addActivity("Device Added: " + deviceName);

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

        let reportId =
        "OB-" +
        Math.floor(Math.random() * 100000);

        document.getElementById("reportArea").innerHTML = `

            <div class="saved-device">

                <h2>📄 STOLEN DEVICE REPORT</h2>

                <p>
                    <strong>Report ID:</strong> ${reportId}
                </p>

                <p>
                    <strong>Date Reported:</strong> ${today}
                </p>

                ${devices[selectedIndex]}

                <p>
                    This report can be used when contacting police,
                    network providers, or insurance services.
                </p>

            </div>

        `;

addActivity("Theft Report Generated");

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

document.getElementById("exportBtn").addEventListener("click", function () {

    let devices = document.getElementById("deviceList").innerHTML;

    document.getElementById("reportDevices").innerHTML = devices;

    document.getElementById("reportDate").innerHTML =
        "Generated: " + new Date().toLocaleString();

    let printContents = document.getElementById("printArea").innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    addActivity("Devices Exported");

    window.print();

    location.reload();

});

function addActivity(message) {

    let activityLog =
    document.getElementById("activityLog");

    let newActivity =
    document.createElement("p");

    newActivity.innerHTML =
    "✓ " + message;

    activityLog.prepend(newActivity);

}