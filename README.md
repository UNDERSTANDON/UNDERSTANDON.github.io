# Computer Sales System

A static multi-page computer sales website built with HTML, CSS, and JavaScript. This project demonstrates a complete e-commerce system with authentication, product browsing, shopping cart, and user profile management.

## 🎯 Project Overview

This is a fully functional computer sales platform featuring:
- **Authentication**: User login and registration with form validation
- **Product Catalog**: Browse and view detailed product information
- **Shopping Cart**: Add/remove items and manage purchases
- **User Profile**: View and manage user account information
- **Contact System**: Customer support contact form
- **Responsive Design**: Mobile-friendly interface

## 📁 Project Structure

```
├── index.html              # Main homepage
├── css/
│   ├── global.css          # Global styles
│   ├── home.css            # Homepage styles
│   ├── auth.css            # Authentication pages styles
│   ├── cart.css            # Shopping cart styles
│   ├── contact.css         # Contact page styles
│   ├── detail.css          # Product detail styles
│   └── profile.css         # Profile page styles
├── js/
│   ├── main.js             # Main application logic
│   ├── auth.js             # Authentication functions
│   ├── cart.js             # Cart management
│   ├── data.js             # Data handling
│   └── detail.js           # Product detail page logic
├── auth/
│   ├── login.html          # Login page
│   └── register.html       # Registration page
├── detail/
│   └── index.html          # Product detail page
├── cart/
│   └── index.html          # Shopping cart page
├── profile/
│   └── index.html          # User profile page
├── contact/
│   └── index.html          # Contact page
├── data/
│   └── data.json           # Product and user data
├── resources/              # Product detail documents
└── References/             # Reference materials
```

## 🚀 Features

### Pages
1. **Home Page (index.html)**: Landing page with product listings
2. **Login Page (auth/login.html)**: User authentication with form validation
3. **Register Page (auth/register.html)**: New user registration with validation
4. **Product Detail (detail/index.html)**: Detailed product information and reviews
5. **Shopping Cart (cart/index.html)**: View, manage, and checkout cart items
6. **User Profile (profile/index.html)**: User account and order history
7. **Contact Page (contact/index.html)**: Customer support contact form

### Core Functionality
- **Form Validation**: JavaScript-based client-side validation for login and registration
- **Cart Management**: Add/remove items, update quantities, calculate totals
- **Local Storage**: Persistent user data and cart information
- **Product Management**: Dynamic product loading from JSON data
- **User Authentication**: Login/logout functionality with session management

## 🛠 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling with responsive design
- **JavaScript (ES6)**: Core application logic and interactivity
- **JSON**: Data storage and product catalog
- **Local Storage API**: Client-side data persistence
- **Git Pages**: Hosting and deployment

## 💾 Data Storage

The application uses:
- **LocalStorage**: For session management and user data
- **JSON File**: For product catalog (data/data.json)
- **Text Files**: Product detail information (resources/)

## 🔧 Development Guidelines

### Code Organization
- **Single Responsibility**: Each file handles one specific feature
- **Modularity**: Functions are reusable and well-documented
- **Readability**: Clear naming conventions and comments
- **DRY Principle**: Avoid code duplication

### Naming Conventions
- **CSS**: Follows BEM (Block Element Modifier) methodology where applicable
- **JavaScript**: camelCase for variables and functions, PascalCase for classes
- **HTML**: semantic tags, kebab-case for IDs and classes

## 📋 Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. Navigate through pages using the header/footer navigation
4. Test all features including authentication, product browsing, and cart management

## 🧪 Testing

A comprehensive 60-test plan is provided in `test-plan.csv` covering:
- UI/UX testing
- Functionality validation
- Form validation
- Cart operations
- User authentication
- Responsive design
- Cross-page navigation

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📧 Contact

For support or questions, use the Contact page in the application.

---

**Status**: Complete and ready for deployment on GitHub Pages

