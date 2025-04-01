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
    
    // Initialize QR code with default options
    let qrcode = new QRCode(qrcodeElement, {
        width: 110,
        height: 110,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Clear initial QR code
    qrcodeElement.innerHTML = '';
    document.querySelector('.qr-code').style.display = 'none';
    
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
            
            // Set exact dimensions for capture
            cardContainer.style.width = '1050px';
            cardContainer.style.height = '600px';
            cardContainer.style.padding = '0';
            cardContainer.style.margin = '0';
            cardContainer.style.overflow = 'hidden';
            
            card.style.width = '1050px';
            card.style.height = '600px';
            card.style.transform = 'none';
            card.style.margin = '0';
            card.style.padding = '35px';
            
            html2canvas(card, {
                width: 1050,
                height: 600,
                scale: 2,
                useCORS: true,
                backgroundColor: null,
                logging: false,
                onclone: function(clonedDoc) {
                    const clonedCard = clonedDoc.getElementById('businessCard');
                    const clonedContainer = clonedCard.parentElement;
                    
                    // Apply exact styles to cloned elements
                    clonedContainer.style.width = '1050px';
                    clonedContainer.style.height = '600px';
                    clonedContainer.style.padding = '0';
                    clonedContainer.style.margin = '0';
                    clonedContainer.style.overflow = 'hidden';
                    
                    clonedCard.style.width = '1050px';
                    clonedCard.style.height = '600px';
                    clonedCard.style.transform = 'none';
                    clonedCard.style.margin = '0';
                    clonedCard.style.padding = '35px';
                    
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
                    
                    // Ensure QR code is rendered properly
                    const clonedQR = clonedDoc.getElementById('qrcode');
                    if (clonedQR && website) {
                        clonedQR.innerHTML = '';
                        new QRCode(clonedQR, {
                            width: 100,
                            height: 100,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        }).makeCode(website);
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
            
            document.getElementById('previewAddress').textContent = 
                document.getElementById('address').value.trim() || 'Address';
            
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
            
            document.getElementById('previewPhone').textContent = 
                document.getElementById('phone').value.trim() || 'Phone Number';
                
            // Only show and update QR code if website is provided
            const qrCodeContainer = document.querySelector('.qr-code');
            if (website) {
                qrCodeContainer.style.display = 'flex';
                updateQRCode(website);
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
            // Clear previous QR code
            qrcodeElement.innerHTML = '';
            // Generate new QR code
            qrcode = new QRCode(qrcodeElement, {
                width: 110,
                height: 110,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
            qrcode.makeCode(website);
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