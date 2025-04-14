// Function to initialize form fields with placeholder data
function initializeFormWithPlaceholderData() {
    document.getElementById('name').value = 'John Doe';
    document.getElementById('title').value = 'Software Engineer';
    document.getElementById('company').value = 'Tech Solutions Inc.';
    document.getElementById('email').value = 'john.doe@example.com';
    document.getElementById('phone').value = '+1 (555) 123-4567';
    document.getElementById('website').value = 'www.example.com';
    document.getElementById('address').value = '123 Business Street\nSuite 456\nTech City, TC 12345';
    document.getElementById('background-color').value = '#ffffff';
    document.getElementById('text-color').value = '#000000';
    document.getElementById('accent-color').value = '#0066cc';
    updatePreview();
}

// Function to update the preview with current form data
function updatePreview() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;
    const address = document.getElementById('address').value;
    const backgroundColor = document.getElementById('background-color').value;
    const textColor = document.getElementById('text-color').value;
    const accentColor = document.getElementById('accent-color').value;

    // Update the preview card with the form data
    const previewCard = document.querySelector('.preview-card');
    previewCard.style.backgroundColor = backgroundColor;
    previewCard.style.color = textColor;

    document.getElementById('preview-name').textContent = name;
    document.getElementById('preview-title').textContent = title;
    document.getElementById('preview-company').textContent = company;
    
    const emailLink = document.getElementById('preview-email');
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
    emailLink.style.color = accentColor;

    const phoneLink = document.getElementById('preview-phone');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    phoneLink.style.color = accentColor;

    const websiteLink = document.getElementById('preview-website');
    websiteLink.href = website.startsWith('http') ? website : `https://${website}`;
    websiteLink.textContent = website;
    websiteLink.style.color = accentColor;

    document.getElementById('preview-address').innerHTML = address.replace(/\n/g, '<br>');

    // Update QR code with vCard data
    updateQRCode();
}

// Function to generate vCard format string
function generateVCard() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;
    const address = document.getElementById('address').value;

    // Split address into parts
    const addressParts = address.split('\n');
    const street = addressParts[0] || '';
    const cityStateZip = addressParts[addressParts.length - 1] || '';

    // Create vCard format string
    const vCard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name}`,
        `TITLE:${title}`,
        `ORG:${company}`,
        `EMAIL:${email}`,
        `TEL:${phone}`,
        `URL:${website}`,
        `ADR:;;${street};${cityStateZip};;;`,
        'END:VCARD'
    ].join('\n');

    return vCard;
}

// Function to update QR code
function updateQRCode() {
    const vCardData = generateVCard();
    const qrcodeElement = document.querySelector('.qr-code');
    
    // Clear previous QR code
    qrcodeElement.innerHTML = '';
    
    // Generate new QR code
    new QRCode(qrcodeElement, {
        text: vCardData,
        width: 180,
        height: 180,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Function to download the business card as PDF
function downloadCard() {
    const cardElement = document.querySelector('.preview-card');
    const backgroundColor = document.getElementById('background-color').value;
    
    // Configure PDF options
    const opt = {
        margin: 0,
        filename: 'business-card.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2,
            backgroundColor: backgroundColor
        },
        jsPDF: { 
            unit: 'in',
            format: [3.5, 2],
            orientation: 'landscape'
        }
    };

    // Generate PDF
    html2pdf().set(opt).from(cardElement).save();
}

// Function to handle FedEx printing
function printAtFedex() {
    // Show disclaimer modal
    const modal = document.getElementById('disclaimerModal');
    modal.style.display = 'block';
}

// Function to close the disclaimer modal
function closeModal() {
    const modal = document.getElementById('disclaimerModal');
    modal.style.display = 'none';
}

// Function to proceed to FedEx website
function proceedToFedex() {
    // Close the modal
    closeModal();
    
    // Open FedEx website in a new tab
    window.open('https://www.fedex.com/en-us/printing.html', '_blank');
}

// Function to handle color palette selection
function selectColorPalette(backgroundColor, textColor, accentColor) {
    document.getElementById('background-color').value = backgroundColor;
    document.getElementById('text-color').value = textColor;
    document.getElementById('accent-color').value = accentColor;
    updatePreview();
}

// Function to initialize QR code
function initializeQRCode() {
    qrcodeElement = document.getElementById('qrcode');
    qrcode = new QRCode(qrcodeElement, {
        width: 180,
        height: 180,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    document.querySelector('.qr-code').style.display = 'none';
}

// Initialize preview with placeholder data
document.addEventListener('DOMContentLoaded', function() {
    initializeFormWithPlaceholderData();
    
    // Add event listeners to form inputs
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Initialize color palette buttons
    document.querySelectorAll('.color-palette').forEach(button => {
        button.addEventListener('click', function() {
            const backgroundColor = this.getAttribute('data-background');
            const textColor = this.getAttribute('data-text');
            const accentColor = this.getAttribute('data-accent');
            selectColorPalette(backgroundColor, textColor, accentColor);
        });
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('disclaimerModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}