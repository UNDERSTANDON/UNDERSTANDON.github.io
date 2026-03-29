/**
 * Main application logic used across all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize data fetching on load
    initDataStorage();
    
    // 2. Render Header & Footer dynamically across static HTML pages 
    //    (to avoid copy/pasting large chunks in every file)
    renderLayout();

    // 3. Update Auth/Cart UI based on localStorage
    updateMainNavUI();
});

async function initDataStorage() {
    // If we haven't loaded products into local storage yet, fetch from data.json
    if (!localStorage.getItem('kp_products')) {
        try {
            // Adjust path depending on what directory level we are at
            const depth = window.location.pathname.split('/').length - 2;
            const upDirs = Array(Math.max(0, depth)).fill('..').join('/');
            const pathPrefix = upDirs ? upDirs + '/' : './';
            
            // Note: direct fetch to data.json
            const res = await fetch(pathPrefix + 'data/data.json');
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('kp_products', JSON.stringify(data.products));
            }
        } catch (e) {
            console.error('Failed to load initial products', e);
        }
    }
}

function renderLayout() {
    const depth = window.location.pathname.split('/').length - 2;
    const isRoot = window.location.pathname.endsWith('index.html') && depth <= 0;
    
    // Simple way to route back to root depending on subdirectory depth
    const rootPath = (depth > 0) ? '../' : './';
    
    const headerHTML = `
        <div class="container header-container">
            <a href="${rootPath}index.html" class="brand-logo">Kinetic Precision</a>
            <ul class="nav-links">
                <li><a href="${rootPath}index.html" class="${window.location.pathname.includes('index') && depth <= 0 ? 'active' : ''}">Products</a></li>
                <li><a href="${rootPath}contact/index.html">Contact</a></li>
                <li id="nav-profile" class="auth-hidden"><a href="${rootPath}profile/index.html">Profile</a></li>
            </ul>
            <div class="header-actions">
                <a href="${rootPath}cart/index.html" id="nav-cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    MY CART <span id="cart-counter">(0)</span>
                </a>
                <a href="${rootPath}auth/login.html" id="nav-login" class="btn btn-primary" style="color: white; padding: 0.5rem 1rem;">Login</a>
                <button id="nav-logout" class="btn btn-secondary auth-hidden" style="padding: 0.5rem 1rem;" onclick="logout()">Logout</button>
            </div>
        </div>
    `;

    const footerHTML = `
        <div class="container footer-container">
            <div>
                <div class="brand-logo" style="margin-bottom: 1rem; font-size: 1rem;">Kinetic<br/>Precision</div>
                <div style="font-size: 0.75rem; color: var(--color-dark-muted);">&copy; 2026 KINETIC PRECISION FRAMEWORK. ALL RIGHTS RESERVED.</div>
            </div>
            <ul class="footer-links">
                <li><a href="#">HARDWARE SUPPORT</a></li>
                <li><a href="#">PRIVACY POLICY</a></li>
                <li><a href="#">TERMS OF SERVICE</a></li>
                <li><a href="#">SUSTAINABILITY</a></li>
            </ul>
        </div>
    `;

    const headerTarget = document.getElementById('site-header');
    if (headerTarget) headerTarget.innerHTML = headerHTML;
    
    const footerTarget = document.getElementById('site-footer');
    if (footerTarget) footerTarget.innerHTML = footerHTML;
}

function updateMainNavUI() {
    const activeUser = localStorage.getItem('kp_active_user');
    const profileLink = document.getElementById('nav-profile');
    const loginBtn = document.getElementById('nav-login');
    const logoutBtn = document.getElementById('nav-logout');
    
    if (activeUser) {
        if(profileLink) profileLink.classList.remove('auth-hidden');
        if(loginBtn) loginBtn.classList.add('auth-hidden');
        if(logoutBtn) logoutBtn.classList.remove('auth-hidden');
    } else {
        if(profileLink) profileLink.classList.add('auth-hidden');
        if(loginBtn) loginBtn.classList.remove('auth-hidden');
        if(logoutBtn) logoutBtn.classList.add('auth-hidden');
    }

    // Update Cart counter
    const cart = JSON.parse(localStorage.getItem('kp_cart')) || [];
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const counterEl = document.getElementById('cart-counter');
    if (counterEl) counterEl.textContent = `(${count})`;
}

function logout() {
    localStorage.removeItem('kp_active_user');
    window.location.href = window.location.pathname.split('/').length > 2 ? '../index.html' : './index.html';
}
