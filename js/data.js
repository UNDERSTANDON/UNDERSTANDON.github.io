/**
 * Data Service Wrapper
 * Handles CRUD operations over the locally simulated database (localStorage)
 */

const DataService = {
    // PRODUCTS
    getProducts: () => {
        return JSON.parse(localStorage.getItem('kp_products')) || [];
    },
    
    getProductById: (id) => {
        const products = DataService.getProducts();
        return products.find(p => p.id === id);
    },

    saveProducts: (products) => {
        localStorage.setItem('kp_products', JSON.stringify(products));
    },

    addProduct: (product) => {
        const p = DataService.getProducts();
        p.push(product);
        DataService.saveProducts(p);
    },

    updateProduct: (id, updates) => {
        const p = DataService.getProducts();
        const idx = p.findIndex(item => item.id === id);
        if (idx !== -1) {
            p[idx] = { ...p[idx], ...updates };
            DataService.saveProducts(p);
        }
    },

    deleteProduct: (id) => {
        let p = DataService.getProducts();
        p = p.filter(item => item.id !== id);
        DataService.saveProducts(p);
    },

    hideProduct: (id) => {
        DataService.updateProduct(id, { isActive: false });
    },

    // CART
    getCart: () => {
        return JSON.parse(localStorage.getItem('kp_cart')) || [];
    },

    addToCart: (productId, quantity = 1) => {
        const cart = DataService.getCart();
        const existing = cart.find(item => item.productId === productId);
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }
        
        localStorage.setItem('kp_cart', JSON.stringify(cart));
        
        // Refresh UI globally if function exists
        if(typeof updateMainNavUI === 'function') updateMainNavUI();
    },

    removeFromCart: (productId) => {
        let cart = DataService.getCart();
        cart = cart.filter(item => item.productId !== productId);
        localStorage.setItem('kp_cart', JSON.stringify(cart));
        if(typeof updateMainNavUI === 'function') updateMainNavUI();
    },
    
    updateCartItemQuantity: (productId, quantity) => {
        let cart = DataService.getCart();
        const item = cart.find(i => i.productId === productId);
        if (item) {
            item.quantity = quantity;
            if(item.quantity <= 0) {
                DataService.removeFromCart(productId);
                return;
            }
            localStorage.setItem('kp_cart', JSON.stringify(cart));
            if(typeof updateMainNavUI === 'function') updateMainNavUI();
        }
    },

    clearCart: () => {
        localStorage.setItem('kp_cart', JSON.stringify([]));
        if(typeof updateMainNavUI === 'function') updateMainNavUI();
    }
};