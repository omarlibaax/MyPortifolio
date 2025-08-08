# Omar - Graphic Designer Portfolio

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features a clean, minimalist design with Oxford Blue (#0A174E) as the primary color and Maize (#F5D042) as the accent color.

## 🎨 Features

### Design & Layout
- **Modern Minimalist Design**: Clean, professional layout with strategic use of white space
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Color Scheme**: Oxford Blue (#0A174E) primary, Maize (#F5D042) accent
- **Typography**: Inter font family for modern, readable text
- **Smooth Animations**: CSS transitions and hover effects throughout

### Sections
1. **Hero Section**: Full-width introduction with animated visual element
2. **About Me**: Professional bio with statistics and profile image
3. **Skills**: Interactive skill bars with animated progress indicators
4. **Portfolio**: Grid layout with hover effects and modal popups
5. **Testimonials**: Auto-rotating carousel with client feedback
6. **Contact**: Contact form with validation and social media links

### Interactive Features
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Portfolio Modal**: Click portfolio items to view detailed information
- **Testimonial Slider**: Auto-rotating testimonials with manual navigation
- **Skill Bar Animations**: Animated progress bars triggered on scroll
- **Form Validation**: Contact form with email validation and notifications
- **Scroll Effects**: Parallax effects and scroll-triggered animations

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. The portfolio is ready to use!

### File Structure
```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 🎯 Customization

### Personal Information
Update the following in `index.html`:
- Name and title in the hero section
- About me content and statistics
- Contact information
- Social media links

### Portfolio Projects
1. **Add New Projects**: Duplicate the portfolio item structure in `index.html`
2. **Update Images**: Replace image URLs with your project images
3. **Project Details**: Add project information to the `portfolioData` object in `script.js`

### Colors
Modify the CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #0A174E;    /* Oxford Blue */
    --accent-color: #F5D042;     /* Maize */
    --text-light: #ffffff;
    --text-dark: #333333;
    --text-gray: #666666;
    --bg-light: #f8f9fa;
}
```

### Skills
Update skills in `index.html`:
- Modify skill names and descriptions
- Adjust skill percentages in `data-percent` attributes
- Change skill icons (using Font Awesome classes)

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

### Mobile Features
- Hamburger navigation menu
- Optimized layouts for small screens
- Touch-friendly interactions
- Reduced animations for better performance

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Font Awesome**: Icons for skills and social media
- **Google Fonts**: Inter font family

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Features
- Optimized images with responsive sizing
- CSS animations using transform and opacity
- Efficient JavaScript with event delegation
- Minimal external dependencies

## 📧 Contact Form

The contact form includes:
- Form validation (required fields, email format)
- Success/error notifications
- Simulated form submission
- Responsive design

**Note**: The form currently simulates submission. To make it functional, you'll need to:
1. Set up a backend service (PHP, Node.js, etc.)
2. Configure email sending functionality
3. Update the form submission handler in `script.js`

## 🎨 Design Principles

### Color Psychology
- **Oxford Blue**: Professional, trustworthy, sophisticated
- **Maize**: Creative, energetic, attention-grabbing
- **White/Gray**: Clean, modern, readable

### Typography
- **Inter Font**: Modern, highly readable, professional
- **Hierarchy**: Clear visual hierarchy with different font weights and sizes
- **Spacing**: Generous whitespace for better readability

### User Experience
- **Intuitive Navigation**: Clear menu structure and smooth scrolling
- **Visual Feedback**: Hover effects and transitions
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Loading States**: Smooth page transitions and loading animations

## 🔄 Updates and Maintenance

### Regular Updates
- Keep portfolio projects current
- Update testimonials and client feedback
- Refresh profile image and bio
- Monitor and update contact information

### Performance Optimization
- Compress images for faster loading
- Minify CSS and JavaScript for production
- Use a CDN for external resources
- Implement lazy loading for images

## 📄 License

This portfolio template is free to use and modify for personal and commercial projects.

## 🤝 Support

For questions or customization help:
- Review the code comments for guidance
- Check browser console for any JavaScript errors
- Ensure all files are in the same directory
- Verify that external resources (fonts, icons) are loading correctly

---

**Built with ❤️ for creative professionals** 