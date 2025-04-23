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
        width: 120,
        height: 120,
        colorDark: '#2c3e50',
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
            background: white;
            padding: 4px;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
            margin-right: 25px !important;
            border: 1px solid rgba(0,0,0,0.1);
            width: 120px;
            height: 120px;
        }
        #qrcode {
            border-radius: 3px;
            overflow: hidden;
        }
        #qrcode img {
            border-radius: 3px;
            width: 112px !important;
            height: 112px !important;
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
            updatePreview();
            downloadBtn.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Handle download button click
    downloadBtn.addEventListener('click', function() {
        const nameField = document.getElementById('name');
        if (nameField.value.trim()) {
            const card = document.getElementById('businessCard');
            const cardContainer = card.parentElement;
            
            // Store original styles
            const originalCardStyle = card.style.cssText;
            const originalContainerStyle = cardContainer.style.cssText;
            
            // Set dimensions with bleed area (adding 24px total - 12px on each side)
            cardContainer.style.width = '1074px';  // 1050px + 24px
            cardContainer.style.height = '624px';  // 600px + 24px
            cardContainer.style.padding = '0';
            cardContainer.style.margin = '0';
            cardContainer.style.overflow = 'hidden';
            
            // Add bleed area to the card itself
            card.style.width = '1074px';
            card.style.height = '624px';
            card.style.transform = 'none';
            card.style.margin = '0';
            // Keep the content within safe area by adjusting padding
            card.style.padding = '86px 86px 96px 106px';  // Increased bottom padding
            
            // Adjust QR code and logo positioning
            const qrCode = card.querySelector('.qr-code');
            if (qrCode) {
                qrCode.style.marginRight = '20px';
            }
            
            const logo = card.querySelector('.company-logo');
            if (logo) {
                logo.style.marginRight = '20px';
            }

            // Ensure footer stays within safe area
            const cardBody = card.querySelector('.card-body');
            if (cardBody) {
                cardBody.style.paddingBottom = '15px';
            }

            const cardFooter = card.querySelector('.card-footer');
            if (cardFooter) {
                cardFooter.style.paddingTop = '15px';
            }
            
            html2canvas(card, {
                width: 1074,
                height: 624,
                scale: 2,
                useCORS: true,
                backgroundColor: null,
                logging: false,
                onclone: function(clonedDoc) {
                    const clonedCard = clonedDoc.getElementById('businessCard');
                    const clonedContainer = clonedCard.parentElement;
                    
                    // Apply exact styles to cloned elements with bleed
                    clonedContainer.style.width = '1074px';
                    clonedContainer.style.height = '624px';
                    clonedContainer.style.padding = '0';
                    clonedContainer.style.margin = '0';
                    clonedContainer.style.overflow = 'hidden';
                    
                    clonedCard.style.width = '1074px';
                    clonedCard.style.height = '624px';
                    clonedCard.style.transform = 'none';
                    clonedCard.style.margin = '0';
                    clonedCard.style.padding = '86px 86px 96px 106px';
                    
                    // Ensure footer stays within safe area in cloned version
                    const clonedCardBody = clonedCard.querySelector('.card-body');
                    if (clonedCardBody) {
                        clonedCardBody.style.paddingBottom = '15px';
                    }

                    const clonedCardFooter = clonedCard.querySelector('.card-footer');
                    if (clonedCardFooter) {
                        clonedCardFooter.style.paddingTop = '15px';
                    }
                    
                    // Ensure text styles are preserved
                    const elements = clonedCard.getElementsByTagName('*');
                    for (let el of elements) {
                        el.style.textShadow = 'none';
                        el.style.webkitTextStroke = '0';
                        el.style.textStroke = '0';
                        el.style.textDecoration = 'none';
                        el.style.webkitFontSmoothing = 'antialiased';
                        el.style.mozOsxFontSmoothing = 'grayscale';
                    }
                    
                    // Get the website URL and format it properly
                    const websiteInput = document.getElementById('website');
                    let website = websiteInput.value.trim();
                    if (website) {
                        if (!website.startsWith('http://') && !website.startsWith('https://')) {
                            website = 'https://' + website;
                        }
                        
                        // Get the card's background gradient for QR code color
                        const cardBackground = clonedCard.style.background;
                        let qrColor = '#2c3e50'; // Default elegant dark blue
                        if (cardBackground.includes('white')) {
                            qrColor = '#2c3e50'; // Dark blue for white background
                        } else {
                            qrColor = '#34495e'; // Lighter blue for colored backgrounds
                        }
                        
                        // Ensure QR code is rendered properly with formatted URL
                        const clonedQR = clonedDoc.getElementById('qrcode');
                        if (clonedQR) {
                            clonedQR.innerHTML = '';
                            new QRCode(clonedQR, {
                                width: 120,
                                height: 120,
                                colorDark: qrColor,
                                colorLight: '#ffffff',
                                correctLevel: QRCode.CorrectLevel.H
                            }).makeCode(website);
                            
                            // Apply elegant styling to the cloned QR code
                            const clonedQRContainer = clonedDoc.querySelector('.qr-code');
                            if (clonedQRContainer) {
                                clonedQRContainer.style.cssText = `
                                    background: white;
                                    padding: 4px;
                                    border-radius: 4px;
                                    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                                    margin-right: 25px;
                                    border: 1px solid rgba(0,0,0,0.1);
                                    width: 120px;
                                    height: 120px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    flex-shrink: 0;
                                `;
                            }
                            
                            // Style the QR code element
                            const clonedQRElement = clonedQR;
                            if (clonedQRElement) {
                                clonedQRElement.style.cssText = `
                                    border-radius: 3px;
                                    overflow: hidden;
                                    width: 112px;
                                    height: 112px;
                                `;
                            }
                            
                            // Style the QR code image
                            const qrImage = clonedQR.querySelector('img');
                            if (qrImage) {
                                qrImage.style.cssText = `
                                    border-radius: 3px;
                                    width: 112px !important;
                                    height: 112px !important;
                                    display: block;
                                `;
                            }
                        }
                    }
                }
            }).then(canvas => {
                // Restore original styles
                card.style.cssText = originalCardStyle;
                cardContainer.style.cssText = originalContainerStyle;
                
                // Create download link with high quality
                const link = document.createElement('a');
                link.download = `${nameField.value.trim()}-business-card.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                link.click();
            });
        }
    });
    
    function updatePreview() {
        try {
            const name = document.getElementById('name').value.trim();
            if (!name) return; // Don't update if name is empty

            // Update each field in the preview
            document.getElementById('previewName').textContent = name;
            
            document.getElementById('previewTitle').textContent = 
                document.getElementById('title').value.trim() || 'Position';
            
            const businessUnit = document.getElementById('businessUnit').value.trim();
            document.getElementById('previewBusinessUnit').textContent = businessUnit;
            // Hide business unit element if empty
            document.getElementById('previewBusinessUnit').style.display = businessUnit ? 'block' : 'none';
            
            const address = document.getElementById('address').value.trim();
            const addressElement = document.getElementById('previewAddress');
            addressElement.textContent = address;
            // Hide address element if empty
            addressElement.style.display = address ? 'block' : 'none';
            
            const websiteInput = document.getElementById('website');
            const website = websiteInput.value.trim();
            const websiteDisplay = website || 'www.example.com';
            const websiteElement = document.getElementById('previewWebsite');
            websiteElement.textContent = websiteDisplay;
            websiteElement.style.display = 'block';
            websiteElement.style.visibility = 'visible';
            document.querySelector('.card-footer').style.display = 'block';
            
            // Format website URL for QR code
            const formattedWebsite = website ? (!website.startsWith('http://') && !website.startsWith('https://') ? 'https://' + website : website) : '';
            
            document.getElementById('previewEmail').textContent = 
                document.getElementById('email').value.trim() || 'email@example.com';
            
            previewPhone.textContent = phone.value ? `Ph: ${phone.value}` : 'Ph: +1 234 567 890';
            
            // Only show and update QR code if website is provided
            const qrCodeContainer = document.querySelector('.qr-code');
            if (website) {
                qrCodeContainer.style.display = 'flex';
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
        } catch (error) {
            console.error('Error generating QR code:', error);
            qrcodeElement.innerHTML = '';
            document.querySelector('.qr-code').style.display = 'none';
        }
    }
    
    function initializeQRCode() {
        qrcodeElement = document.getElementById('qrcode');
        qrcode = new QRCode(qrcodeElement, {
            width: 120,
            height: 120,
            colorDark: '#2c3e50',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        document.querySelector('.qr-code').style.display = 'none';
    }
    
    // Initialize preview with placeholder data
    updatePreview();
}); 