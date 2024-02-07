const wrapper = document.querySelector(".wrapper");
const fullNameInput = document.getElementById("fullName");
const serialNumberInput = document.getElementById("serialNumber");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");
const generateBtn = document.querySelector("#generateQRCode");
const qrImg = wrapper.querySelector(".qr-code img");
const downloadLink = document.getElementById("downloadLink");
const downloadButton = document.getElementById("downloadButton");
let preValue;

generateBtn.addEventListener("click", () => {
    const fullName = fullNameInput.value.trim();
    const serialNumber = serialNumberInput.value.trim();
    const date = dateInput.value.trim();
    const description = descriptionInput.value.trim();
    
    // You can validate each input field as needed.

    const qrValue = `Full Name: ${fullName}\nSerial Number or ID: ${serialNumber}\nDate: ${date}\nDescription: ${description}`;
    
    if (preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        downloadLink.style.display = "block"; // Show the download button
    });
});

downloadButton.addEventListener("click", () => {
    const qrCodeDataURL = qrImg.src;
    const a = document.createElement("a");
    a.href = qrCodeDataURL;
    a.download = "qrcode.png";
    a.click();
});

fullNameInput.addEventListener("input", clearQRCode);
serialNumberInput.addEventListener("input", clearQRCode);
dateInput.addEventListener("input", clearQRCode);
descriptionInput.addEventListener("input", clearQRCode);

function clearQRCode() {
    wrapper.classList.remove("active");
    preValue = "";
    downloadLink.style.display = "none"; // Hide the download button
}
