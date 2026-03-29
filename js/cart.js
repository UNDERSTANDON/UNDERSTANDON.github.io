/**
 * Cart Rendering and Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Wait for data init
    setTimeout(() => {
        renderCartItems();
    }, 100);
});

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const cart = DataService.getCart();
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="padding: 3rem; text-align: center; background: white; border-radius: 8px; border: 1px dashed #cbd5e1;">
                <p style="color: #64748b; margin-bottom: 1.5rem;">Your configuration cart is empty.</p>
                <a href="../index.html" class="btn btn-primary">Browse Hardware</a>
            </div>
        `;
        updateSummary(0);
        return;
    }

    let cartHtml = '';
    let subtotal = 0;

    cart.forEach(item => {
        const product = DataService.getProductById(item.productId);
        if(!product) return; // Skip if product was removed from DB

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        cartHtml += `
            <div class="cart-item">
                <div class="cart-item-img">IMG</div>
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${product.name}</h3>
                    <div class="cart-item-tag">SKU: ${product.id.toUpperCase()}</div>
                    <div class="cart-item-controls">
                        <div style="display: flex; align-items: center; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                            <button class="qty-btn" onclick="updateQty('${product.id}', -1)" style="border:none; border-right: 1px solid #e2e8f0;">-</button>
                            <input type="text" readonly class="qty-input" value="${item.quantity}">
                            <button class="qty-btn" onclick="updateQty('${product.id}', 1)" style="border:none; border-left: 1px solid #e2e8f0;">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeItem('${product.id}')">Remove</button>
                    </div>
                </div>
                <div class="cart-item-price">$${itemTotal.toLocaleString()}</div>
            </div>
        `;
    });

    container.innerHTML = cartHtml;
    updateSummary(subtotal);
}

function updateQty(productId, change) {
    const cart = DataService.getCart();
    const item = cart.find(i => i.productId === productId);
    if(item) {
        let newQty = item.quantity + change;
        if(newQty < 1) return removeItem(productId);
        DataService.updateCartItemQuantity(productId, newQty);
        renderCartItems();
    }
}

function removeItem(productId) {
    DataService.removeFromCart(productId);
    renderCartItems();
}

function clearCartUI() {
    if(confirm('Are you sure you want to clear your entire configuration?')) {
        DataService.clearCart();
        renderCartItems();
    }
}

function updateSummary(subtotal) {
    const taxRate = 0.10; // 10% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    document.getElementById('summary-subtotal').textContent = `$${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('summary-tax').textContent = `$${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('summary-total').textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function checkout() {
    const cart = DataService.getCart();
    if(cart.length === 0) {
        alert('Cart is empty.');
        return;
    }

    const activeUser = localStorage.getItem('kp_active_user');
    if (!activeUser) {
        // Must login first
        alert('You must initialize a terminal profile (login) before checking out.');
        window.location.href = '../auth/login.html';
        return;
    }

    // Process order mock
    alert('SECURE CHECKOUT INITIATED. \n\nThank you for choosing Kinetic Precision framework. Your hardware configuration order has been submitted for assembly.');
    DataService.clearCart();
    renderCartItems();
}
