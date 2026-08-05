import { useState, useEffect, createContext } from 'react';

// ==========================================
// LOCALSTORAGE PERSISTENCE HELPERS (swapit360 prefix)
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

const INITIAL_USERS = [
    {
        id: 1,
        fullName: "Rahul Sharma",
        email: "student@swapit360.com",
        password: "student123",
        rollNumber: "CSE202601",
        department: "CSE",
        academicYear: "Third Year",
        campusLocation: "Block A Hostel",
        role: "student",
        status: "Active",
        joinedAt: "2026-07-20"
    },
    {
        id: 2,
        fullName: "Priya Patel",
        email: "buyer@swapit360.com",
        password: "buyer123",
        rollNumber: "ECE202602",
        department: "ECE",
        academicYear: "Second Year",
        campusLocation: "Library Block",
        role: "student",
        status: "Active",
        joinedAt: "2026-07-21"
    },
    {
        id: 3,
        fullName: "Admin Officer",
        email: "admin@swapit360.com",
        password: "admin123",
        rollNumber: "ADM001",
        department: "Other",
        academicYear: "Fourth Year",
        campusLocation: "Administration Block",
        role: "admin",
        status: "Active",
        joinedAt: "2026-07-15"
    }
];

const INITIAL_PRODUCTS = [
    {
        id: 1,
        sellerId: 1,
        name: "Engineering Mathematics Book",
        description: "Standard textbook for 1st and 2nd year engineering students. Minor highlighting.",
        category: "Books",
        originalPrice: 650,
        sellingPrice: 400,
        condition: "Good",
        productAge: "1 Year",
        transactionType: "Buy",
        campusLocation: "Block A Hostel",
        images: ["https://placehold.co/400x300/16a34a/ffffff?text=Maths+Book"],
        status: "Available",
        approvalStatus: "Approved",
        featured: true,
        rejectionReason: "",
        createdAt: "2026-07-20",
        updatedAt: "2026-07-20"
    },
    {
        id: 2,
        sellerId: 1,
        name: "Python Programming Book",
        description: "Comprehensive guide for data structures and algorithms in Python.",
        category: "Books",
        originalPrice: 550,
        sellingPrice: 300,
        condition: "Like New",
        productAge: "3 Months",
        transactionType: "Buy",
        campusLocation: "Library Block",
        images: ["https://placehold.co/400x300/16a34a/ffffff?text=Python+Book"],
        status: "Available",
        approvalStatus: "Approved",
        featured: true,
        rejectionReason: "",
        createdAt: "2026-07-20",
        updatedAt: "2026-07-20"
    },
    {
        id: 3,
        sellerId: 2,
        name: "Data Structures Notes",
        description: "Complete handwritten semester notes with diagrams and code snippets.",
        category: "Books",
        originalPrice: 300,
        sellingPrice: 150,
        condition: "Good",
        productAge: "6 Months",
        transactionType: "Buy",
        campusLocation: "Block B Hostel",
        images: ["https://placehold.co/400x300/16a34a/ffffff?text=DS+Notes"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-21",
        updatedAt: "2026-07-21"
    },
    {
        id: 4,
        sellerId: 1,
        name: "Scientific Calculator",
        description: "Casio FX-991EX calculator in excellent condition with solar panel.",
        category: "Calculators",
        originalPrice: 1300,
        sellingPrice: 850,
        condition: "Like New",
        productAge: "6 Months",
        transactionType: "Buy",
        campusLocation: "Library Block",
        images: ["https://placehold.co/400x300/2563eb/ffffff?text=Calculator"],
        status: "Available",
        approvalStatus: "Approved",
        featured: true,
        rejectionReason: "",
        createdAt: "2026-07-20",
        updatedAt: "2026-07-20"
    },
    {
        id: 5,
        sellerId: 2,
        name: "Used Laptop",
        description: "Dell Latitude i5 8th Gen, 8GB RAM, 256GB SSD. Good battery backup for coding.",
        category: "Electronics",
        originalPrice: 35000,
        sellingPrice: 18000,
        condition: "Good",
        productAge: "2 Years",
        transactionType: "Buy",
        campusLocation: "CSE Department",
        images: ["https://placehold.co/400x300/2563eb/ffffff?text=Laptop"],
        status: "Available",
        approvalStatus: "Approved",
        featured: true,
        rejectionReason: "",
        createdAt: "2026-07-21",
        updatedAt: "2026-07-21"
    },
    {
        id: 6,
        sellerId: 1,
        name: "Bluetooth Headphones",
        description: "Over-ear wireless headphones with active noise cancellation.",
        category: "Electronics",
        originalPrice: 2999,
        sellingPrice: 1500,
        condition: "Good",
        productAge: "1 Year",
        transactionType: "Buy",
        campusLocation: "Block A Hostel",
        images: ["https://placehold.co/400x300/2563eb/ffffff?text=Headphones"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    },
    {
        id: 7,
        sellerId: 2,
        name: "Arduino Starter Kit",
        description: "Includes breadboard, jumper wires, LCD display, and various sensors.",
        category: "Lab Equipment",
        originalPrice: 2200,
        sellingPrice: 1400,
        condition: "Like New",
        productAge: "4 Months",
        transactionType: "Rent",
        campusLocation: "EEE Department Lab",
        images: ["https://placehold.co/400x300/7c3aed/ffffff?text=Arduino+Kit"],
        status: "Available",
        approvalStatus: "Approved",
        featured: true,
        rejectionReason: "",
        createdAt: "2026-07-21",
        updatedAt: "2026-07-21"
    },
    {
        id: 8,
        sellerId: 1,
        name: "Electronics Lab Kit",
        description: "Multimeter, soldering iron, breadboard, and resistors set for ECE labs.",
        category: "Lab Equipment",
        originalPrice: 1500,
        sellingPrice: 900,
        condition: "Good",
        productAge: "1 Year",
        transactionType: "Exchange",
        campusLocation: "ECE Block",
        images: ["https://placehold.co/400x300/7c3aed/ffffff?text=Lab+Kit"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    },
    {
        id: 9,
        sellerId: 2,
        name: "Drawing Tools Set",
        description: "Mini drafter, scale set, T-square for mechanical engineering drawing.",
        category: "Other",
        originalPrice: 800,
        sellingPrice: 400,
        condition: "Good",
        productAge: "1 Year",
        transactionType: "Buy",
        campusLocation: "Mechanical Block",
        images: ["https://placehold.co/400x300/64748b/ffffff?text=Drawing+Tools"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    },
    {
        id: 10,
        sellerId: 2,
        name: "Bicycle",
        description: "Sturdy geared mountain bicycle with 21-speed gears and smooth brakes.",
        category: "Bicycles",
        originalPrice: 7500,
        sellingPrice: 4500,
        condition: "Used",
        productAge: "2 Years",
        transactionType: "Buy",
        campusLocation: "Main Gate Cycle Stand",
        images: ["https://placehold.co/400x300/f97316/ffffff?text=Bicycle"],
        status: "Available",
        approvalStatus: "Approved",
        featured: true,
        rejectionReason: "",
        createdAt: "2026-07-21",
        updatedAt: "2026-07-21"
    },
    {
        id: 11,
        sellerId: 1,
        name: "Study Table",
        description: "Compact wooden study table with pull-out drawer. Ideal for hostel rooms.",
        category: "Furniture",
        originalPrice: 4000,
        sellingPrice: 2200,
        condition: "Good",
        productAge: "1.5 Years",
        transactionType: "Buy",
        campusLocation: "Block B Hostel",
        images: ["https://placehold.co/400x300/f97316/ffffff?text=Study+Table"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    },
    {
        id: 12,
        sellerId: 1,
        name: "Hostel Mattress",
        description: "Comfortable single-bed memory foam mattress. Clean washable cover.",
        category: "Hostel Essentials",
        originalPrice: 3500,
        sellingPrice: 1800,
        condition: "Good",
        productAge: "1 Year",
        transactionType: "Exchange",
        campusLocation: "Block C Hostel",
        images: ["https://placehold.co/400x300/0f172a/ffffff?text=Mattress"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    },
    {
        id: 13,
        sellerId: 2,
        name: "Electric Kettle",
        description: "1.5L fast boiling electric kettle for midnight hostel coffee and noodles.",
        category: "Hostel Essentials",
        originalPrice: 1200,
        sellingPrice: 650,
        condition: "Like New",
        productAge: "5 Months",
        transactionType: "Buy",
        campusLocation: "Block A Hostel",
        images: ["https://placehold.co/400x300/0f172a/ffffff?text=Kettle"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    },
    {
        id: 14,
        sellerId: 1,
        name: "Table Lamp",
        description: "LED study desk lamp with adjustable brightness modes.",
        category: "Hostel Essentials",
        originalPrice: 900,
        sellingPrice: 450,
        condition: "Like New",
        productAge: "4 Months",
        transactionType: "Buy",
        campusLocation: "Block D Hostel",
        images: ["https://placehold.co/400x300/0f172a/ffffff?text=Table+Lamp"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    },
    {
        id: 15,
        sellerId: 2,
        name: "College Backpack",
        description: "Water-resistant spacious laptop backpack with multiple compartments.",
        category: "Other",
        originalPrice: 1800,
        sellingPrice: 950,
        condition: "Good",
        productAge: "8 Months",
        transactionType: "Buy",
        campusLocation: "Main Gate",
        images: ["https://placehold.co/400x300/64748b/ffffff?text=Backpack"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    },
    {
        id: 16,
        sellerId: 1,
        name: "Mini Fan",
        description: "USB rechargeable portable table fan for hot summer hostel days.",
        category: "Hostel Essentials",
        originalPrice: 750,
        sellingPrice: 350,
        condition: "Good",
        productAge: "1 Year",
        transactionType: "Buy",
        campusLocation: "Block B Hostel",
        images: ["https://placehold.co/400x300/0f172a/ffffff?text=Mini+Fan"],
        status: "Available",
        approvalStatus: "Approved",
        featured: false,
        rejectionReason: "",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    }
];

const INITIAL_WISHLISTS = [
    { userId: 1, productIds: [5, 7] },
    { userId: 2, productIds: [1, 4] }
];

const INITIAL_REQUESTS = [
    {
        id: 1,
        productId: 4,
        buyerId: 2,
        sellerId: 1,
        type: "Buy",
        message: "Is this calculator available for pickup near the library today?",
        status: "Accepted",
        createdAt: "2026-07-22",
        updatedAt: "2026-07-22"
    }
];

const INITIAL_REVIEWS = [
    {
        id: 1,
        requestId: 99,
        buyerId: 2,
        sellerId: 1,
        rating: 5,
        comment: "Very smooth transaction and polite seller!",
        createdAt: "2026-07-21"
    }
];

const INITIAL_REPORTS = [];
const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        userId: 1,
        type: "request",
        message: "Priya Patel sent a request for your Scientific Calculator.",
        read: false,
        createdAt: "2026-07-22"
    }
];

const initializeApplicationData = () => {
    if (!localStorage.getItem("swapit360Users")) saveStoredData("swapit360Users", INITIAL_USERS);
    if (!localStorage.getItem("swapit360Products")) saveStoredData("swapit360Products", INITIAL_PRODUCTS);
    if (!localStorage.getItem("swapit360Wishlists")) saveStoredData("swapit360Wishlists", INITIAL_WISHLISTS);
    if (!localStorage.getItem("swapit360Requests")) saveStoredData("swapit360Requests", INITIAL_REQUESTS);
    if (!localStorage.getItem("swapit360Reviews")) saveStoredData("swapit360Reviews", INITIAL_REVIEWS);
    if (!localStorage.getItem("swapit360Reports")) saveStoredData("swapit360Reports", INITIAL_REPORTS);
    if (!localStorage.getItem("swapit360Notifications")) saveStoredData("swapit360Notifications", INITIAL_NOTIFICATIONS);
};

initializeApplicationData();

export const CATEGORIES = [
    { name: "Books", icon: "📚" },
    { name: "Electronics", icon: "💻" },
    { name: "Calculators", icon: "🧮" },
    { name: "Lab Equipment", icon: "🔬" },
    { name: "Bicycles", icon: "🚲" },
    { name: "Hostel Essentials", icon: "🛏️" },
    { name: "Furniture", icon: "🪑" },
    { name: "Other", icon: "📦" }
];

export const DEPARTMENTS = ["CSE", "CSE-AI", "CSE-DS", "ECE", "EEE", "Mechanical", "Civil", "Other"];
export const ACADEMIC_YEARS = ["First Year", "Second Year", "Third Year", "Fourth Year"];

export const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [users, setUsers] = useState(() => getStoredData("swapit360Users", INITIAL_USERS));
    const [currentUser, setCurrentUser] = useState(() => getStoredData("swapit360CurrentUser", null));
    const [products, setProducts] = useState(() => getStoredData("swapit360Products", INITIAL_PRODUCTS));
    const [wishlists, setWishlists] = useState(() => getStoredData("swapit360Wishlists", INITIAL_WISHLISTS));
    const [requests, setRequests] = useState(() => getStoredData("swapit360Requests", INITIAL_REQUESTS));
    const [reviews, setReviews] = useState(() => getStoredData("swapit360Reviews", INITIAL_REVIEWS));
    const [reports, setReports] = useState(() => getStoredData("swapit360Reports", INITIAL_REPORTS));
    const [notifications, setNotifications] = useState(() => getStoredData("swapit360Notifications", INITIAL_NOTIFICATIONS));
    
    const [toast, setToast] = useState(null); 
    const [confirmModal, setConfirmModal] = useState(null); 

    // Persistence Sync
    useEffect(() => { saveStoredData("swapit360Users", users); }, [users]);
    useEffect(() => { saveStoredData("swapit360CurrentUser", currentUser); }, [currentUser]);
    useEffect(() => { saveStoredData("swapit360Products", products); }, [products]);
    useEffect(() => { saveStoredData("swapit360Wishlists", wishlists); }, [wishlists]);
    useEffect(() => { saveStoredData("swapit360Requests", requests); }, [requests]);
    useEffect(() => { saveStoredData("swapit360Reviews", reviews); }, [reviews]);
    useEffect(() => { saveStoredData("swapit360Reports", reports); }, [reports]);
    useEffect(() => { saveStoredData("swapit360Notifications", notifications); }, [notifications]);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const addNotification = (userId, type, message) => {
        const newNotif = {
            id: Date.now() + Math.random(),
            userId,
            type,
            message,
            read: false,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const logout = () => {
        localStorage.removeItem("swapit360CurrentUser");
        setCurrentUser(null);
        showToast("Logged out successfully.", "info");
    };

    return (
        <AppContext.Provider value={{
            users, setUsers,
            currentUser, setCurrentUser,
            products, setProducts,
            wishlists, setWishlists,
            requests, setRequests,
            reviews, setReviews,
            reports, setReports,
            notifications, setNotifications,
            showToast,
            addNotification,
            logout,
            confirmModal, setConfirmModal
        }}>
            {children}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 animate-bounce">
                    <div className={`px-4 py-3 rounded-xl shadow-lg text-white text-xs font-semibold flex items-center space-x-2 ${
                        toast.type === 'error' ? 'bg-red-600' : toast.type === 'warning' ? 'bg-amber-600' : toast.type === 'info' ? 'bg-blue-600' : 'bg-emerald-600'
                    }`}>
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
            {confirmModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
                        <h3 className="text-base font-bold text-slate-900">{confirmModal.title}</h3>
                        <p className="text-xs text-slate-600">{confirmModal.message}</p>
                        <div className="flex space-x-3 pt-2">
                            <button 
                                onClick={() => setConfirmModal(null)}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-semibold transition">
                                Cancel
                            </button>
                            <button 
                                onClick={() => { confirmModal.onConfirm(); setConfirmModal(null); }}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-xs font-semibold transition">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppContext.Provider>
    );
}
