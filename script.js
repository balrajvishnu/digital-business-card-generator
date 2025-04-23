// Handle download button click
downloadBtn.addEventListener('click', function() {
    const nameField = document.getElementById('name');
    if (nameField.value.trim()) {
        const card = document.getElementById('businessCard');
        const cardContainer = card.parentElement;
        
        // Store original styles
        const originalCardStyle = card.style.cssText;
        const originalContainerStyle = cardContainer.style.cssText;
        
        // Set dimensions with bleed area
        cardContainer.style.width = '1074px';
        cardContainer.style.height = '624px';
        cardContainer.style.padding = '0';
        cardContainer.style.margin = '0';
        cardContainer.style.overflow = 'hidden';
        
        // Add bleed area to the card itself
        card.style.width = '1074px';
        card.style.height = '624px';
        card.style.transform = 'none';
        card.style.margin = '0';
        card.style.padding = '86px 86px 96px 106px';
        
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

        html2canvas(card, {
            width: 1074,
            height: 624,
            scale: 2,
            useCORS: true,
            backgroundColor: null,
            logging: false,
            onclone: function(clonedDoc) {
                const clonedCard = clonedDoc.getElementById('businessCard');
                
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
        }).then(canvas => {
            // Restore original styles
            card.style.cssText = originalCardStyle;
            cardContainer.style.cssText = originalContainerStyle;
            
            // Create download link
            const link = document.createElement('a');
            link.download = `${nameField.value.trim()}-business-card.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        });
    }
});