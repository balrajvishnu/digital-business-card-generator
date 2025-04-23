document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...

    // Handle download button click
    downloadBtn.addEventListener('click', async function() {
        console.log('Download button clicked');
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

                console.log('Generating canvas...');
                const canvas = await html2canvas(card, {
                    width: 1074,
                    height: 624,
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    logging: true,
                    onclone: function(clonedDoc) {
                        console.log('Cloning document...');
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
                });

                console.log('Canvas generated, creating download link...');
                // Create download link
                const link = document.createElement('a');
                link.download = `${nameField.value.trim()}-business-card.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                document.body.appendChild(link); // Append link to body
                link.click();
                document.body.removeChild(link); // Clean up

                // Restore original styles
                card.style.cssText = originalCardStyle;
                cardContainer.style.cssText = originalContainerStyle;
                
                console.log('Download initiated successfully');
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

    // ... rest of the existing code ...
});