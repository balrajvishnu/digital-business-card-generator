document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const form = document.getElementById('businessCardForm');
    const inputs = form.querySelectorAll('input, textarea');
    const downloadBtn = document.getElementById('downloadCard');
    const qrcodeElement = document.getElementById('qrcode');
    const businessCard = document.getElementById('businessCard');
    const colorPalettes = document.querySelectorAll('.color-palette');
    const startColorPicker = document.getElementById('startColor');
    const endColorPicker = document.getElementById('endColor');
    const companyLogoInput = document.getElementById('companyLogo');
    const previewLogo = document.getElementById('previewLogo');
    const phone = document.getElementById('phone');
    const previewPhone = document.getElementById('previewPhone');
    
    console.log('Elements initialized');
    
    // Initialize QR code with default options
    let qrcode = new QRCode(qrcodeElement, {
        width: 112,
        height: 112,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Clear initial QR code
    qrcodeElement.innerHTML = '';
    document.querySelector('.qr-code').style.display = 'none';
    
    // Add QR code styling
    const style = document.createElement('style');
    style.textContent = `
        .qr-code {
            width: 120px !important;
            height: 120px !important;
            background: white;
            padding: 4px;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
            margin-right: 25px;
            border: 1px solid rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        #qrcode {
            border-radius: 2px;
            overflow: hidden;
            width: 112px !important;
            height: 112px !important;
        }
        #qrcode img {
            width: 112px !important;
            height: 112px !important;
            display: block;
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);
    
    console.log('QR code initialized');
    
    // Handle logo upload
    companyLogoInput.addEventListener('change', function(e) {
        console.log('Logo upload triggered');
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    // Clear previous logo
                    previewLogo.innerHTML = '';
                    // Add new logo with proper styling
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    img.style.objectFit = 'contain';
                    previewLogo.appendChild(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Update preview in real-time as user types
    inputs.forEach(input => {
        if (input.id !== 'companyLogo') { // Exclude file input from this listener
            input.addEventListener('input', updatePreview);
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        console.log('Form submitted');
        e.preventDefault();
        const nameField = document.getElementById('name');
        if (nameField.value.trim()) {
            console.log('Name field is valid, updating preview');
            // Force update the preview and QR code
            updatePreview();
            
            // Show the preview section
            const previewSection = document.querySelector('.preview-section');
            previewSection.style.display = 'flex';
            previewSection.style.opacity = '1';
            previewSection.style.visibility = 'visible';
            
            // Show the business card
            businessCard.style.display = 'block';
            
            // Update QR code if website is provided
            const website = document.getElementById('website').value.trim();
            if (website) {
                console.log('Updating QR code with website:', website);
                const formattedWebsite = !website.startsWith('http://') && !website.startsWith('https://') ? 'https://' + website : website;
                updateQRCode(formattedWebsite);
            }
            
            // Scroll to the preview section
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('Preview section should be visible now');
        } else {
            console.log('Name field is empty');
            alert('Please enter your name to generate the card.');
        }
    });
    
    function updatePreview() {
        console.log('Updating preview');
        try {
            const name = document.getElementById('name').value.trim();
            if (!name) {
                console.log('Name is empty, skipping update');
                return;
            }

            console.log('Updating preview fields');
            // Update each field in the preview
            document.getElementById('previewName').textContent = name;
            
            document.getElementById('previewTitle').textContent = 
                document.getElementById('title').value.trim() || 'Position';
            
            const businessUnit = document.getElementById('businessUnit').value.trim();
            document.getElementById('previewBusinessUnit').textContent = businessUnit;
            document.getElementById('previewBusinessUnit').style.display = businessUnit ? 'block' : 'none';
            
            const address = document.getElementById('address').value.trim();
            const addressElement = document.getElementById('previewAddress');
            addressElement.textContent = address;
            addressElement.style.display = address ? 'block' : 'none';
            
            const websiteInput = document.getElementById('website');
            const website = websiteInput.value.trim();
            const websiteDisplay = website || 'www.example.com';
            const websiteElement = document.getElementById('previewWebsite');
            websiteElement.textContent = websiteDisplay;
            websiteElement.style.display = 'block';
            websiteElement.style.visibility = 'visible';
            document.querySelector('.card-footer').style.display = 'block';
            
            document.getElementById('previewEmail').textContent = 
                document.getElementById('email').value.trim() || 'email@example.com';
            
            previewPhone.textContent = phone.value ? `Ph: ${phone.value}` : 'Ph: +1 234 567 890';
            
            // Only show and update QR code if website is provided
            const qrCodeContainer = document.querySelector('.qr-code');
            if (website) {
                qrCodeContainer.style.display = 'flex';
                const formattedWebsite = !website.startsWith('http://') && !website.startsWith('https://') ? 'https://' + website : website;
                updateQRCode(formattedWebsite);
            } else {
                qrCodeContainer.style.display = 'none';
                qrcodeElement.innerHTML = '';
            }
            
            console.log('Preview updated successfully');
        } catch (error) {
            console.error('Error updating preview:', error);
        }
    }
    
    function updateQRCode(website) {
        console.log('Updating QR code with website:', website);
        try {
            if (!website) {
                qrcodeElement.innerHTML = '';
                document.querySelector('.qr-code').style.display = 'none';
                return;
            }

            // Format the URL properly
            let formattedUrl = website;
            if (!website.startsWith('http://') && !website.startsWith('https://')) {
                formattedUrl = 'https://' + website;
            }

            // Clear previous QR code
            qrcodeElement.innerHTML = '';
            
            // Get the card's background gradient
            const cardBackground = businessCard.style.background;
            let qrColor = '#2c3e50'; // Default elegant dark blue
            
            // If card has a dark background, use a lighter QR code color
            if (cardBackground.includes('white')) {
                qrColor = '#2c3e50'; // Dark blue for white background
            } else {
                qrColor = '#34495e'; // Lighter blue for colored backgrounds
            }

            // Generate new QR code
            qrcode = new QRCode(qrcodeElement, {
                width: 120,
                height: 120,
                colorDark: qrColor,
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            qrcode.makeCode(formattedUrl);
            document.querySelector('.qr-code').style.display = 'flex';
            console.log('QR code updated successfully');
        } catch (error) {
            console.error('Error generating QR code:', error);
            qrcodeElement.innerHTML = '';
            document.querySelector('.qr-code').style.display = 'none';
        }
    }
    
    // Rest of the code remains the same...
    
    // Initialize preview with placeholder data
    console.log('Initializing preview');
    updatePreview();
    console.log('Initialization complete');
});