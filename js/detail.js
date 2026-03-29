/**
 * Detail Page Execution Logic
 */

let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the '?id=' from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.getElementById('d-title').textContent = "Product Not Found";
        document.getElementById('d-desc').textContent = "No valid tracking ID provided in uniform resource locator.";
        return;
    }

    // 2. We need to ensure DataService has loaded data into localStorage.
    // Since main.js fetches it asynchronously if missing, we poll briefly.
    const attemptLoad = setInterval(() => {
        const products = DataService.getProducts();
        if(products.length > 0) {
            clearInterval(attemptLoad);
            hydrateDetailPage(productId);
        }
    }, 50);

    // Timeout after 2 seconds
    setTimeout(() => clearInterval(attemptLoad), 2000);
});

function hydrateDetailPage(id) {
    const product = DataService.getProductById(id);
    
    if(!product || !product.isActive) {
        document.getElementById('d-title').textContent = "Asset Unavailable";
        document.getElementById('d-desc').textContent = "The requested hardware is no longer available in the central repository.";
        return;
    }

    currentProduct = product;

    // Inject Image (Fallback handled by HTML onerror)
    // Note paths might need resolving depending on if the site is nested.
    const imgEl = document.getElementById('d-main-image');
    if(product.image.startsWith('http')) {
        imgEl.src = product.image;
    } else {
        imgEl.src = '../' + product.image; // Resolve upwards from /detail
    }

    // Inject Text Content
    document.getElementById('d-sku').textContent = `SKU: ${product.id.toUpperCase()}`;
    document.getElementById('d-title').textContent = product.name;
    
    // Favor longDescription if we added it into data.json for Phase 2!
    document.getElementById('d-desc').textContent = product.longDescription || product.description;

    document.getElementById('d-price').textContent = `$${product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('d-reviews-count').textContent = `(${product.reviews} Reviews)`;

    if (product.tag) {
        const t = document.getElementById('d-tag');
        t.textContent = product.tag;
        t.style.display = 'inline-block';
        if(product.tag.includes('LOW')) t.style.backgroundColor = '#fecaca';
    }

    // Inject Specs iteratively
    const specsContainer = document.getElementById('d-specs-container');
    if(product.specs) {
        let specsHtml = '';
        for (const [key, value] of Object.entries(product.specs)) {
            // Friendly formatted key e.g. "storageSupport" -> "storage support" -> "STORAGE SUPPORT"
            const prettyKey = key.replace(/([A-Z])/g, ' $1').toUpperCase();
            specsHtml += `
                <div class="spec-card">
                    <div class="spec-title">${prettyKey}</div>
                    <div class="spec-val">${value}</div>
                </div>
            `;
        }
        specsContainer.innerHTML = specsHtml;
    } else {
        specsContainer.innerHTML = '<p style="color: gray;">System architecture specs restricted.</p>';
    }
}

function addCurrentToCart() {
    if(!currentProduct) return;
    DataService.addToCart(currentProduct.id, 1);
    alert('Hardware allocated to workspace configuration.');
}

function buyNow() {
    if(!currentProduct) return;
    const activeUser = localStorage.getItem('kp_active_user');
    if (!activeUser) {
        alert('You must initialize a terminal profile (login) before checking out.');
        window.location.href = '../auth/login.html';
        return;
    }

    alert(`IMMEDIATE DEPLOYMENT INITIATED.\n\nThank you for purchasing the ${currentProduct.name}.`);
}
