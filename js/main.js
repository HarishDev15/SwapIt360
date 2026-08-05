// ==========================================
// LOCALSTORAGE PERSISTENCE HELPERS
// ==========================================
const getStoredData = (key, fallback) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        console.error("Error reading localStorage key:", key, e);
        return fallback;
    }
};

const saveStoredData = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error("Error saving localStorage key:", key, e);
    }
};

// ==========================================
// MOCK DATA (Matches Original React Prototype)
// ==========================================
const INITIAL_USERS = [
    { id: 1, fullName: "Rahul Sharma", email: "student@swapit360.com", password: "student123", rollNumber: "CSE202601", department: "CSE", academicYear: "Third Year", campusLocation: "Block A Hostel", role: "student", status: "Active", joinedAt: "2026-07-20" },
    { id: 2, fullName: "Priya Patel", email: "buyer@swapit360.com", password: "buyer123", rollNumber: "ECE202602", department: "ECE", academicYear: "Second Year", campusLocation: "Library Block", role: "student", status: "Active", joinedAt: "2026-07-21" },
    { id: 3, fullName: "Admin Officer", email: "admin@swapit360.com", password: "admin123", rollNumber: "ADM001", department: "Other", academicYear: "Fourth Year", campusLocation: "Administration Block", role: "admin", status: "Active", joinedAt: "2026-07-15" }
];

const INITIAL_PRODUCTS = [
    { id: 1, sellerId: 1, name: "Engineering Mathematics Book", description: "Standard textbook for 1st and 2nd year engineering students. Minor highlighting.", category: "Books", originalPrice: 650, sellingPrice: 400, condition: "Good", productAge: "1 Year", transactionType: "Buy", campusLocation: "Block A Hostel", images: ["https://placehold.co/400x300/16a34a/ffffff?text=Maths+Book"], status: "Available", approvalStatus: "Approved", featured: true, createdAt: "2026-07-20" },
    { id: 2, sellerId: 1, name: "Python Programming Book", description: "Comprehensive guide for data structures and algorithms in Python.", category: "Books", originalPrice: 550, sellingPrice: 300, condition: "Like New", productAge: "3 Months", transactionType: "Buy", campusLocation: "Library Block", images: ["https://placehold.co/400x300/16a34a/ffffff?text=Python+Book"], status: "Available", approvalStatus: "Approved", featured: true, createdAt: "2026-07-20" },
    { id: 5, sellerId: 2, name: "Used Laptop", description: "Dell Latitude i5 8th Gen, 8GB RAM, 256GB SSD. Good battery backup for coding.", category: "Electronics", originalPrice: 35000, sellingPrice: 18000, condition: "Good", productAge: "2 Years", transactionType: "Buy", campusLocation: "CSE Department", images: ["https://placehold.co/400x300/2563eb/ffffff?text=Laptop"], status: "Available", approvalStatus: "Approved", featured: true, createdAt: "2026-07-21" }
];

const INITIAL_WISHLISTS = [{ userId: 1, productIds: [5] }, { userId: 2, productIds: [1] }];
const INITIAL_REQUESTS = [{ id: 1, productId: 1, buyerId: 2, sellerId: 1, type: "Buy", message: "Is this book available today?", status: "Pending", createdAt: "2026-07-22" }];
const INITIAL_NOTIFICATIONS = [];
const INITIAL_REVIEWS = [];

// ==========================================
// STATE MANAGEMENT
// ==========================================
const AppState = {
    users: getStoredData("swapit360Users", INITIAL_USERS),
    currentUser: getStoredData("swapit360CurrentUser", null),
    products: getStoredData("swapit360Products", INITIAL_PRODUCTS),
    wishlists: getStoredData("swapit360Wishlists", INITIAL_WISHLISTS),
    requests: getStoredData("swapit360Requests", INITIAL_REQUESTS),
    notifications: getStoredData("swapit360Notifications", INITIAL_NOTIFICATIONS),
    reviews: getStoredData("swapit360Reviews", INITIAL_REVIEWS),

    save(key) {
        saveStoredData("swapit360" + key.charAt(0).toUpperCase() + key.slice(1), this[key]);
        renderNavbar(); // Always update navbar when state changes
    },
    
    login(user) {
        this.currentUser = user;
        this.save("currentUser");
        showToast("Logged in successfully!");
        window.location.hash = "#/";
    },

    logout() {
        this.currentUser = null;
        this.save("currentUser");
        showToast("Logged out.", "info");
        window.location.hash = "#/login";
    }
};

// Initialize if empty
if (!localStorage.getItem("swapit360Users")) {
    ['users', 'products', 'wishlists', 'requests', 'notifications', 'reviews'].forEach(k => AppState.save(k));
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const bg = type === 'error' ? 'bg-red-600' : type === 'warning' ? 'bg-amber-600' : type === 'info' ? 'bg-blue-600' : 'bg-emerald-600';
    toast.className = `px-4 py-3 rounded-xl shadow-lg text-white text-xs font-semibold flex items-center space-x-2 ${bg} animate-bounce`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

// ==========================================
// COMPONENTS
// ==========================================
function getStatusBadge(status, type) {
    let classes = "px-2 py-0.5 rounded-full text-[10px] font-semibold ";
    if (type === 'tx') {
        if (status === 'Buy') classes += "bg-emerald-100 text-emerald-800";
        else if (status === 'Rent') classes += "bg-orange-100 text-orange-800";
        else if (status === 'Exchange') classes += "bg-purple-100 text-purple-800";
    } else {
        if (status === 'Available' || status === 'Active' || status === 'Approved') classes += "bg-emerald-100 text-emerald-800";
        else if (status === 'Pending') classes += "bg-amber-100 text-amber-800";
        else classes += "bg-slate-100 text-slate-700";
    }
    return `<span class="${classes}">${status}</span>`;
}

function getProductCardHTML(product) {
    const isWishlisted = AppState.currentUser && AppState.wishlists.find(w => w.userId === AppState.currentUser.id)?.productIds.includes(product.id);
    const fill = isWishlisted ? 'fill-rose-500' : 'fill-none';
    
    return `
        <div class="bg-white rounded-2xl border border-slate-200 card-hover overflow-hidden flex flex-col justify-between relative shadow-sm">
            <div class="relative h-48 bg-slate-100">
                <img src="${product.images[0]}" class="w-full h-full object-cover" />
                <div class="absolute top-2 left-2 flex gap-1 flex-wrap">
                    ${getStatusBadge(product.transactionType, 'tx')}
                </div>
            </div>
            <div class="p-4 space-y-1.5">
                <div class="flex justify-between items-center text-[11px] text-slate-500 font-semibold">
                    <span class="uppercase tracking-wider">${product.category}</span>
                </div>
                <h3 class="font-bold text-slate-900 text-sm line-clamp-1">${product.name}</h3>
                <div class="flex items-center justify-between pt-1">
                    <span class="text-base font-extrabold text-blue-600">₹${product.sellingPrice}</span>
                    <span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">${product.condition}</span>
                </div>
            </div>
            <div class="p-4 pt-0">
                <a href="#/product/${product.id}" class="block w-full text-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-xl text-xs font-bold transition">
                    View Details
                </a>
            </div>
        </div>
    `;
}

// ==========================================
// VIEWS
// ==========================================
const views = {
    home: () => `
        <div class="bg-gradient-to-r from-blue-700 to-indigo-800 text-white overflow-hidden relative">
            <div class="max-w-7xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
                <span class="bg-white/20 text-blue-100 px-3 py-1 rounded-full text-xs font-bold mb-6 backdrop-blur-sm border border-white/10 uppercase tracking-widest">Only for College Students</span>
                <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">The Campus <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Marketplace</span></h1>
                <p class="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">Buy, sell, rent or exchange books, electronics, and hostel essentials securely within your campus network.</p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="#/products" class="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 rounded-2xl font-bold transition shadow-xl shadow-blue-900/20 text-sm">Browse Items</a>
                    <a href="${AppState.currentUser ? '#/add-product' : '#/login'}" class="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-white px-8 py-3.5 rounded-2xl font-bold transition backdrop-blur-md text-sm">Start Selling</a>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 py-16 space-y-12">
            <div>
                <h2 class="text-2xl font-extrabold text-slate-900 mb-6">Featured Items</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${AppState.products.filter(p => p.featured && p.approvalStatus === 'Approved').slice(0, 4).map(getProductCardHTML).join('')}
                </div>
            </div>
        </div>
    `,

    login: () => `
        <div class="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <div class="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <h2 class="text-2xl font-extrabold text-slate-900 text-center mb-6">Welcome Back</h2>
                <form id="loginForm" class="space-y-4">
                    <div><label class="block text-xs font-bold text-slate-700 mb-1">Email</label><input type="email" id="email" class="w-full border p-3 rounded-xl text-sm" value="student@swapit360.com"></div>
                    <div><label class="block text-xs font-bold text-slate-700 mb-1">Password</label><input type="password" id="password" class="w-full border p-3 rounded-xl text-sm" value="student123"></div>
                    <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded-xl font-bold text-sm">Login</button>
                </form>
            </div>
        </div>
    `,
    
    products: () => `
        <div class="max-w-7xl mx-auto px-4 py-8 space-y-6">
            <h1 class="text-2xl font-extrabold text-slate-900">Marketplace</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${AppState.products.filter(p => p.approvalStatus === 'Approved').map(getProductCardHTML).join('')}
            </div>
        </div>
    `,
    
    productDetails: (id) => {
        const p = AppState.products.find(p => p.id === parseInt(id));
        if (!p) return `<div class="p-8 text-center">Product not found.</div>`;
        return `
            <div class="max-w-5xl mx-auto px-4 py-8">
                <div class="bg-white rounded-3xl p-6 border shadow-sm flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-1/2">
                        <img src="${p.images[0]}" class="w-full h-80 object-cover rounded-2xl">
                    </div>
                    <div class="w-full md:w-1/2 space-y-4">
                        ${getStatusBadge(p.transactionType, 'tx')}
                        <h1 class="text-2xl font-extrabold text-slate-900">${p.name}</h1>
                        <div class="text-3xl font-extrabold text-blue-600">₹${p.sellingPrice}</div>
                        <p class="text-sm text-slate-600 leading-relaxed">${p.description}</p>
                        <div class="bg-slate-50 p-4 rounded-xl border text-sm space-y-2">
                            <div class="flex justify-between"><span class="text-slate-500">Condition</span><span class="font-bold">${p.condition}</span></div>
                            <div class="flex justify-between"><span class="text-slate-500">Location</span><span class="font-bold">${p.campusLocation}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// ==========================================
// RENDERERS
// ==========================================
function renderNavbar() {
    const nav = document.getElementById('navbar-container');
    const userHTML = AppState.currentUser ? `
        <div class="flex space-x-4">
            <a href="#/products" class="hover:text-blue-600">Marketplace</a>
            <button onclick="AppState.logout()" class="text-red-600 hover:underline">Logout</button>
        </div>
    ` : `
        <div class="flex space-x-4">
            <a href="#/login" class="text-blue-600 font-bold">Login</a>
        </div>
    `;

    nav.innerHTML = `
        <div class="bg-white shadow-sm border-b px-4 py-3">
            <div class="max-w-7xl mx-auto flex justify-between items-center text-sm font-semibold text-slate-700">
                <a href="#/" class="text-lg font-extrabold text-blue-600">SwapIt360</a>
                ${userHTML}
            </div>
        </div>
    `;
}

function renderFooter() {
    document.getElementById('footer-container').innerHTML = `
        <footer class="bg-slate-900 py-12 border-t border-slate-800 text-center">
            <p class="text-slate-400 text-xs">© 2026 SwapIt360. Campus Marketplace.</p>
        </footer>
    `;
}

// ==========================================
// ROUTER
// ==========================================
function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash || '#/';
    
    // Cleanup previous event listeners if necessary
    
    if (hash === '#/') {
        app.innerHTML = views.home();
    } else if (hash === '#/login') {
        app.innerHTML = views.login();
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const pwd = document.getElementById('password').value;
            const user = AppState.users.find(u => u.email === email && u.password === pwd);
            if (user) {
                if (user.status === 'Inactive') showToast("Account is inactive.", "error");
                else AppState.login(user);
            } else {
                showToast("Invalid credentials", "error");
            }
        });
    } else if (hash === '#/products') {
        app.innerHTML = views.products();
    } else if (hash.startsWith('#/product/')) {
        const id = hash.split('/')[2];
        app.innerHTML = views.productDetails(id);
    } else {
        app.innerHTML = `<div class="p-8 text-center text-2xl font-bold">404 Not Found</div>`;
    }
    
    window.scrollTo(0, 0);
}

// Initialization
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    router();
});
