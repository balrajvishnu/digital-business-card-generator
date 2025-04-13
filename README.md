## Digital Business Card Generator

A web application that allows users to create and customize professional digital business cards with real-time preview and export functionality.

## Features

### Real-time Preview
- Instantly see how your business card looks as you make changes
- Accurate representation of the final output

### Customizable Design
- Choose from a selection of professional color schemes
- Customize text content and styling
- Adjust layout and spacing

### Professional Elements
- Company logo placement
- Contact information formatting
- Social media links
- QR code integration

### Export Options
- Download as high-quality PNG
- Print-ready format
- FedEx Office integration for professional printing

## Technical Specifications

### Print Specifications
- Size: 3.5" x 2" (standard business card)
- Resolution: 300 DPI
- Color Mode: CMYK
- Bleed Area: 0.125"
- Safe Area: 0.125" from edges

### Web Technologies
- HTML5
- CSS3
- JavaScript (ES6+)
- Responsive Design
- Cross-browser compatible

## Getting Started

### Online Usage
1. Visit the website: [Digital Business Card Generator](https://balrajvishnu.github.io/digital-business-card-generator/)
2. Start customizing your business card
3. Preview changes in real-time
4. Export or print when satisfied

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/balrajvishnu/digital-business-card-generator.git
   cd digital-business-card-generator
   ```

2. Project Structure:
   ```
   digital-business-card-generator/
   ├── index.html          # Main HTML file
   ├── styles.css          # Stylesheet
   ├── script.js           # JavaScript functionality
   ├── README.md          # Documentation
   └── privacy.html       # Privacy policy
   ```

3. Dependencies:
   - No build tools or package manager required
   - Uses CDN-hosted libraries:
     - QR Code Generator (qrcodejs)
     - HTML2Canvas for card export
   
4. Running Locally:
   - Open `index.html` in a modern web browser
   - For development, use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - Access the site at `http://localhost:8000`

5. Making Changes:
   - Edit `styles.css` for styling changes
   - Modify `script.js` for functionality updates
   - Update `index.html` for structure changes
   - Test thoroughly in different browsers

## Usage

1. Enter your information in the input fields
2. Upload your company logo
3. Choose a color scheme
4. Adjust layout if needed
5. Preview the result
6. Download or print

## Customization

### Available Options
- Text content
- Font styles
- Color schemes
- Layout adjustments
- Logo placement
- QR code inclusion

### Color Schemes
- Professional
- Modern
- Classic
- Custom

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

```
MIT License

Copyright (c) 2024 Balraj Vishnu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```