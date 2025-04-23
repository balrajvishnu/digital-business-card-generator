document.addEventListener('DOMContentLoaded', function() {
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
    
    // Handle logo upload
    companyLogoInput.addEventListener('change', function(e) {
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
    
    // Handle color palette selection
    colorPalettes.forEach(palette => {
        palette.addEventListener('click', () => {
            // Remove active class from all palettes
            colorPalettes.forEach(p => p.classList.remove('active'));
            // Add active class to selected palette
            palette.classList.add('active');
            // Update card background
            const gradient = palette.getAttribute('data-gradient');
            businessCard.style.background = `linear-gradient(${gradient})`;
            
            // If white palette is selected, update text colors
            if (palette.classList.contains('white-palette')) {
                businessCard.style.color = '#333';
                document.querySelector('.card-name').style.color = '#333';
                document.querySelector('.card-title').style.color = 'rgba(0, 0, 0, 0.9)';
                document.querySelector('.card-business-unit').style.color = 'rgba(0, 0, 0, 0.8)';
                document.querySelector('.card-details').style.color = 'rgba(0, 0, 0, 0.8)';
            } else {
                businessCard.style.color = 'white';
                document.querySelector('.card-name').style.color = 'white';
                document.querySelector('.card-title').style.color = 'rgba(255, 255, 255, 0.9)';
                document.querySelector('.card-business-unit').style.color = 'rgba(255, 255, 255, 0.8)';
                document.querySelector('.card-details').style.color = 'rgba(255, 255, 255, 0.8)';
            }
        });
    });

    // Handle custom color picker changes
    function updateCustomGradient() {
        const startColor = startColorPicker.value;
        const endColor = endColorPicker.value;
        businessCard.style.background = `linear-gradient(135deg, ${startColor}, ${endColor})`;
        
        // Remove active class from all palettes
        colorPalettes.forEach(p => p.classList.remove('active'));
        
        // Update text color based on start color brightness
        const brightness = getBrightness(startColor);
        if (brightness > 128) {
            businessCard.style.color = '#333';
            document.querySelector('.card-name').style.color = '#333';
            document.querySelector('.card-title').style.color = 'rgba(0, 0, 0, 0.9)';
            document.querySelector('.card-business-unit').style.color = 'rgba(0, 0, 0, 0.8)';
            document.querySelector('.card-details').style.color = 'rgba(0, 0, 0, 0.8)';
        } else {
            businessCard.style.color = 'white';
            document.querySelector('.card-name').style.color = 'white';
            document.querySelector('.card-title').style.color = 'rgba(255, 255, 255, 0.9)';
            document.querySelector('.card-business-unit').style.color = 'rgba(255, 255, 255, 0.8)';
            document.querySelector('.card-details').style.color = 'rgba(255, 255, 255, 0.8)';
        }
    }

    // Calculate color brightness
    function getBrightness(color) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    startColorPicker.addEventListener('input', updateCustomGradient);
    endColorPicker.addEventListener('input', updateCustomGradient);

    // Set initial active palette
    colorPalettes[0].classList.add('active');
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nameField = document.getElementById('name');
        if (nameField.value.trim()) {
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
                const formattedWebsite = !website.startsWith('http://') && !website.startsWith('https://') ? 'https://' + website : website;
                updateQRCode(formattedWebsite);
            }
            
            // Scroll to the preview section
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alert('Please enter your name to generate the card.');
        }
    });
    
    // Handle download button click
    downloadBtn.addEventListener('click', async function() {
        const nameField = document.getElementById('name');
        if (nameField.value.trim()) {
            try {
                // Show loading state
                downloadBtn.textContent = 'Generating...';
                downloadBtn.disabled = true;

                const card = document.getElementById('businessCard');
                const cardContainer = card.parentElement;
                
                // Store original styles
                const originalCardStyle = card.style.cssText;
                const originalContainerStyle = cardContainer.style.cssText;
                
                // Set dimensions with bleed area
                cardContainer.style.cssText = `
                    width: 1074px;
                    height: 624px;
                    padding: 0;
                    margin: 0;
                    overflow: hidden;
                    position: relative;
                `;
                
                // Add bleed area to the card itself
                card.style.cssText = `
                    width: 1074px;
                    height: 624px;
                    transform: none;
                    margin: 0;
                    padding: 86px 86px 96px 106px;
                    position: relative;
                    ${card.style.background}
                `;
                
                // Ensure QR code styling is consistent
                const qrCode = card.querySelector('.qr-code');
                if (qrCode) {
                    qrCode.style.cssText = `
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
                    `;
                }
                
                const qrCodeElement = card.querySelector('#qrcode');
                if (qrCodeElement) {
                    qrCodeElement.style.cssText = `
                        border-radius: 2px;
                        overflow: hidden;
                        width: 112px !important;
                        height: 112px !important;
                    `;
                }
                
                const qrCodeImg = card.querySelector('#qrcode img');
                if (qrCodeImg) {
                    qrCodeImg.style.cssText = `
                        width: 112px !important;
                        height: 112px !important;
                        display: block;
                        border-radius: 2px;
                    `;
                }

                const canvas = await html2canvas(card, {
                    width: 1074,
                    height: 624,
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    logging: true,
                    onclone: function(clonedDoc) {
                        const clonedCard = clonedDoc.getElementById('businessCard');
                        clonedCard.style.background = card.style.background;
                        
                        // Apply same QR code styling to cloned version
                        const clonedQR = clonedDoc.querySelector('.qr-code');
                        if (clonedQR) {
                            clonedQR.style.cssText = `
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
                            `;
                        }
                        
                        const clonedQRElement = clonedDoc.querySelector('#qrcode');
                        if (clonedQRElement) {
                            clonedQRElement.style.cssText = `
                                border-radius: 2px;
                                overflow: hidden;
                                width: 112px !important;
                                height: 112px !important;
                            `;
                        }
                        
                        const clonedQRImg = clonedDoc.querySelector('#qrcode img');
                        if (clonedQRImg) {
                            clonedQRImg.style.cssText = `
                                width: 112px !important;
                                height: 112px !important;
                                display: block;
                                border-radius: 2px;
                            `;
                        }
                    }
                });

                // Create download link
                const link = document.createElement('a');
                link.download = `${nameField.value.trim()}-business-card.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Restore original styles
                card.style.cssText = originalCardStyle;
                cardContainer.style.cssText = originalContainerStyle;
            } catch (error) {
                console.error('Error during download:', error);
                alert('There was an error generating your business card. Please try again.');
            } finally {
                // Reset button state
                downloadBtn.textContent = 'Download Card';
                downloadBtn.disabled = false;
            }
        } else {
            alert('Please enter your name to download the card.');
        }
    });
    
    function updatePreview() {
        try {
            const name = document.getElementById('name').value.trim();
            if (!name) return;

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
        } catch (error) {
            console.error('Error updating preview:', error);
        }
    }
    
    function updateQRCode(website) {
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
            let qrColor = '#2c3e50';
            
            // If card has a dark background, use a lighter QR code color
            if (cardBackground.includes('white')) {
                qrColor = '#2c3e50';
            } else {
                qrColor = '#34495e';
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
        } catch (error) {
            console.error('Error generating QR code:', error);
            qrcodeElement.innerHTML = '';
            document.querySelector('.qr-code').style.display = 'none';
        }
    }
    
    // Initialize preview with placeholder data
    updatePreview();
});