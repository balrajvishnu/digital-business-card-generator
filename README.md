# Digital Business Card Generator

A modern, responsive web application that allows users to create and customize professional digital business cards with real-time preview.

## Live Demo

Access the live application here: [Digital Business Card Generator](https://balrajvishnu.github.io/digital-business-card-generator/)

## Features

- Real-time preview of business card as you type
- Customizable design elements:
  - Multiple color schemes and gradients
  - Custom color picker
  - Company logo upload
  - QR code generation for website
- Professional layout with:
  - Name and job title
  - Business unit
  - Contact details (address, email, phone)
  - Company logo
  - Website with QR code
- High-quality PNG download
- Mobile responsive design
- Clean and modern user interface

## How to Use

1. Visit [https://balrajvishnu.github.io/digital-business-card-generator/](https://balrajvishnu.github.io/digital-business-card-generator/)
2. Fill in your details in the form on the left:
   - Full Name (required)
   - Job Title
   - Business Unit (optional)
   - Address
   - Website (will generate QR code)
   - Email
   - Phone
   - Company Logo (upload image)
3. Customize the card design:
   - Choose from predefined color schemes
   - Or create your own using the custom color picker
4. Preview your card in real-time on the right
5. Click "Download Card" to save your business card as a high-quality PNG file

## Local Development

If you want to run this project locally:

1. Clone the repository:
```bash
git clone https://github.com/balrajvishnu/digital-business-card-generator.git
```

2. Navigate to the project directory:
```bash
cd digital-business-card-generator
```

3. Start a local server (you can use Python's built-in server):
```bash
python -m http.server 8000
```

4. Open your browser and visit:
```
http://localhost:8000
```

## Technologies Used

- HTML5
- CSS3
- JavaScript
- QRCode.js for QR code generation
- html2canvas for card download