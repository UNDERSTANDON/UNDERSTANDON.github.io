/**
 * Authentication Validation Logic
 */

function handleLogin(event) {
    event.preventDefault();
    
    // Clear previous errors
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    let hasError = false;
    
    // Basic validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        hasError = true;
    }
    
    if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Access key must be at least 6 characters.';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Simulated DB Check against localStorage users
    const users = JSON.parse(localStorage.getItem('kp_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Success
        localStorage.setItem('kp_active_user', JSON.stringify({ email: user.email, name: user.name }));
        window.location.href = '../index.html'; // Redirect to home
    } else {
        document.getElementById('password-error').textContent = 'Invalid credentials. Please verify your keys.';
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    // Clear errors
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('confirm-password-error').textContent = '';
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    let hasError = false;
    
    if (name.length < 2) {
        document.getElementById('name-error').textContent = 'Name is required.';
        hasError = true;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        hasError = true;
    }
    
    if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Access key must be at least 6 characters.';
        hasError = true;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'Access keys do not match.';
        hasError = true;
    }
    
    if (hasError) return;
    
    // Simulating LocalStorage User Registration
    const users = JSON.parse(localStorage.getItem('kp_users')) || [];
    
    // Check existing
    if (users.find(u => u.email === email)) {
        document.getElementById('email-error').textContent = 'This email is already registered to a terminal.';
        return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('kp_users', JSON.stringify(users));
    
    // Auto login
    localStorage.setItem('kp_active_user', JSON.stringify({ email, name }));
    
    alert('Terminal allocated successfully. Redirecting to dashboard.');
    window.location.href = '../index.html';
}
