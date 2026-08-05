const { useState, useEffect, useContext, createContext } = React;
        const { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } = ReactRouterDOM;

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

        const CATEGORIES = [
            { name: "Books", icon: "📚" },
            { name: "Electronics", icon: "💻" },
            { name: "Calculators", icon: "🧮" },
            { name: "Lab Equipment", icon: "🔬" },
            { name: "Bicycles", icon: "🚲" },
            { name: "Hostel Essentials", icon: "🛏️" },
            { name: "Furniture", icon: "🪑" },
            { name: "Other", icon: "📦" }
        ];

        const DEPARTMENTS = ["CSE", "CSE-AI", "CSE-DS", "ECE", "EEE", "Mechanical", "Civil", "Other"];
        const ACADEMIC_YEARS = ["First Year", "Second Year", "Third Year", "Fourth Year"];

        // ==========================================
        // APP CONTEXT
        // ==========================================
        const AppContext = createContext(null);

        function AppProvider({ children }) {
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

            // Persistence Sync with swapit360 prefix
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

        // ==========================================
        // REUSABLE COMPONENTS
        // ==========================================
        function StatusBadge({ status, type }) {
            let classes = "px-2 py-0.5 rounded-full text-[10px] font-semibold ";
            if (type === 'tx') {
                if (status === 'Buy') classes += "bg-emerald-100 text-emerald-800";
                else if (status === 'Rent') classes += "bg-orange-100 text-orange-800";
                else if (status === 'Exchange') classes += "bg-purple-100 text-purple-800";
            } else if (type === 'approval') {
                if (status === 'Approved') classes += "bg-emerald-100 text-emerald-800";
                else if (status === 'Pending') classes += "bg-amber-100 text-amber-800";
                else if (status === 'Rejected') classes += "bg-red-100 text-red-800";
            } else if (type === 'general') {
                if (status === 'Available' || status === 'Active' || status === 'Resolved') classes += "bg-emerald-100 text-emerald-800";
                else if (status === 'Sold' || status === 'Inactive') classes += "bg-slate-100 text-slate-700";
                else classes += "bg-blue-100 text-blue-800";
            }
            return <span className={classes}>{status}</span>;
        }

        function ProductCard({ product }) {
            const { currentUser, wishlists, setWishlists, showToast, reviews } = useContext(AppContext);
            const userWishlist = wishlists.find(w => w.userId === currentUser?.id)?.productIds || [];
            const isWishlisted = userWishlist.includes(product.id);

            const discount = product.originalPrice > product.sellingPrice 
                ? Math.round(((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100)
                : 0;

            const sellerReviews = reviews.filter(r => r.sellerId === product.sellerId);
            const sellerAvgRating = sellerReviews.length > 0 ? (sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length).toFixed(1) : "4.8";

            const toggleWishlist = (e) => {
                e.preventDefault();
                if (!currentUser) {
                    showToast("Please login to manage wishlist.", "warning");
                    return;
                }
                let updated;
                const existing = wishlists.find(w => w.userId === currentUser.id);
                if (existing) {
                    const newIds = existing.productIds.includes(product.id)
                        ? existing.productIds.filter(id => id !== product.id)
                        : [...existing.productIds, product.id];
                    updated = wishlists.map(w => w.userId === currentUser.id ? { ...w, productIds: newIds } : w);
                } else {
                    updated = [...wishlists, { userId: currentUser.id, productIds: [product.id] }];
                }
                setWishlists(updated);
                showToast(isWishlisted ? "Removed from wishlist" : "Wishlist updated");
            };

            return (
                <div className="bg-white rounded-2xl border border-slate-200 card-hover overflow-hidden flex flex-col justify-between relative shadow-sm">
                    {product.status === "Sold" && (
                        <div className="absolute inset-0 bg-slate-900/40 z-10 flex items-center justify-center backdrop-blur-[1px]">
                            <span className="bg-slate-900 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">Sold Out</span>
                        </div>
                    )}
                    <div>
                        <div className="relative h-48 bg-slate-100">
                            <img 
                                src={product.images[0] || "https://placehold.co/400x300/e2e8f0/64748b?text=SwapIt360"} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                                onError={(e)=>{e.target.src='https://placehold.co/400x300/e2e8f0/64748b?text=SwapIt360'}} 
                            />
                            <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                                <StatusBadge status={product.transactionType} type="tx" />
                                {product.featured && <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">Featured</span>}
                                {discount > 0 && <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">{discount}% OFF</span>}
                            </div>
                            <button 
                                onClick={toggleWishlist}
                                className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow hover:bg-white transition text-rose-500">
                                <svg className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 space-y-1.5">
                            <div className="flex justify-between items-center text-[11px] text-slate-500 font-semibold">
                                <span className="uppercase tracking-wider">{product.category}</span>
                                <span>⭐ {sellerAvgRating}</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{product.name}</h3>
                            <div className="flex items-center justify-between pt-1">
                                <div>
                                    <span className="text-base font-extrabold text-blue-600">₹{product.sellingPrice}</span>
                                    {product.originalPrice > product.sellingPrice && (
                                        <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.originalPrice}</span>
                                    )}
                                </div>
                                <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">{product.condition}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 flex items-center pt-1">
                                <svg className="w-3.5 h-3.5 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                {product.campusLocation}
                            </p>
                        </div>
                    </div>
                    <div className="p-4 pt-0">
                        <Link to={`/product/${product.id}`} className="block w-full text-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-xl text-xs font-bold transition">
                            View Details
                        </Link>
                    </div>
                </div>
            );
        }

        // ==========================================
        // NAVIGATION BAR & FOOTER (SwapIt360 Branded)
        // ==========================================
        function Navbar() {
            const { currentUser, logout, notifications, wishlists, requests, setNotifications } = useContext(AppContext);
            const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
            const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
            const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

            const userNotifs = notifications.filter(n => n.userId === currentUser?.id);
            const unreadNotifCount = userNotifs.filter(n => !n.read).length;
            const userWishlistCount = wishlists.find(w => w.userId === currentUser?.id)?.productIds?.length || 0;
            const pendingReqCount = requests.filter(r => (currentUser?.role === 'admin' || r.sellerId === currentUser?.id) && r.status === 'Pending').length;

            const markAllRead = () => {
                const updated = notifications.map(n => n.userId === currentUser.id ? { ...n, read: true } : n);
                setNotifications(updated);
            };

            return (
                <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
                    <div className="bg-blue-600 text-white text-[11px] py-1.5 px-4 text-center font-medium flex justify-between items-center max-w-7xl mx-auto">
                        <span>Buy • Sell • Rent • Exchange — Everything Students Need</span>
                        <span className="hidden sm:inline bg-blue-700 px-2 py-0.5 rounded text-[10px]">Trusted Student Marketplace</span>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/* Logo */}
                            <Link to="/" className="flex items-center space-x-2.5">
                                <div className="bg-blue-600 text-white p-2 rounded-xl font-extrabold text-sm tracking-wide shadow-sm">S360</div>
                                <span className="font-extrabold text-slate-900 text-base tracking-tight">SwapIt360</span>
                            </Link>

                            {/* Desktop Nav */}
                            <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-700">
                                <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                                <Link to="/products" className="hover:text-blue-600 transition">Marketplace</Link>
                                <Link to="/products" className="hover:text-blue-600 transition">Categories</Link>
                                
                                {currentUser?.role === 'student' && (
                                    <>
                                        <Link to="/add-product" className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl shadow-sm transition">Sell Item</Link>
                                        
                                        <Link to="/wishlist" className="relative hover:text-blue-600 transition flex items-center">
                                            <span>Wishlist</span>
                                            {userWishlistCount > 0 && (
                                                <span className="absolute -top-2 -right-3 bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                                    {userWishlistCount}
                                                </span>
                                            )}
                                        </Link>

                                        <Link to="/requests" className="relative hover:text-blue-600 transition flex items-center">
                                            <span>Requests</span>
                                            {pendingReqCount > 0 && (
                                                <span className="absolute -top-2 -right-3 bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                                    {pendingReqCount}
                                                </span>
                                            )}
                                        </Link>
                                    </>
                                )}

                                {currentUser?.role === 'admin' && (
                                    <Link to="/admin-dashboard" className="text-blue-600 font-bold">Admin Dashboard</Link>
                                )}
                            </nav>

                            {/* Right Actions */}
                            <div className="hidden md:flex items-center space-x-4">
                                {currentUser && (
                                    <div className="relative">
                                        <button 
                                            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                                            className="relative p-2 text-slate-600 hover:text-blue-600 transition">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                            {unreadNotifCount > 0 && (
                                                <span className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                                                    {unreadNotifCount}
                                                </span>
                                            )}
                                        </button>

                                        {notifDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                                                <div className="px-4 py-2 border-b flex justify-between items-center text-xs font-bold text-slate-800">
                                                    <span>Notifications</span>
                                                    <span className="text-[10px] text-blue-600 cursor-pointer hover:underline" onClick={markAllRead}>Mark all read</span>
                                                </div>
                                                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                                                    {userNotifs.length === 0 ? (
                                                        <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                                                    ) : (
                                                        userNotifs.map(n => (
                                                            <div key={n.id} className={`p-3 text-xs text-slate-700 hover:bg-slate-50 transition ${!n.read ? 'bg-blue-50/50' : ''}`}>
                                                                <p>{n.message}</p>
                                                                <span className="text-[10px] text-slate-400 mt-1 block">{n.createdAt}</span>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {currentUser ? (
                                    <div className="relative">
                                        <button 
                                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                            className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition">
                                            <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                {currentUser.fullName[0]}
                                            </div>
                                            <span className="text-xs font-bold text-slate-800">{currentUser.fullName.split(' ')[0]}</span>
                                        </button>

                                        {profileDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-semibold text-slate-700">
                                                {currentUser.role === 'student' ? (
                                                    <>
                                                        <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">My Profile</Link>
                                                        <Link to="/my-listings" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">My Listings</Link>
                                                        <Link to="/requests" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">My Requests</Link>
                                                        <Link to="/wishlist" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Wishlist</Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link to="/admin-dashboard" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Admin Dashboard</Link>
                                                        <Link to="/admin-products" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Product Approvals</Link>
                                                        <Link to="/admin-users" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Student Management</Link>
                                                        <Link to="/admin-reports" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Reports Management</Link>
                                                    </>
                                                )}
                                                <div className="border-t my-1"></div>
                                                <button onClick={() => { logout(); setProfileDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Logout</button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex space-x-2">
                                        <Link to="/login" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition">Login</Link>
                                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition">Register</Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Hamburger */}
                            <div className="md:hidden flex items-center">
                                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 p-2">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white border-b px-4 py-4 space-y-3 text-xs font-semibold">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Home</Link>
                            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Marketplace</Link>
                            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Categories</Link>
                            {currentUser?.role === 'student' && (
                                <>
                                    <Link to="/add-product" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Sell Item</Link>
                                    <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Wishlist</Link>
                                    <Link to="/requests" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Requests</Link>
                                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Profile</Link>
                                    <Link to="/my-listings" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">My Listings</Link>
                                </>
                            )}
                            {currentUser?.role === 'admin' && (
                                <Link to="/admin-dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-blue-600">Admin Dashboard</Link>
                            )}
                            <div className="pt-3 border-t flex justify-between items-center">
                                {currentUser ? (
                                    <>
                                        <span className="text-slate-600">{currentUser.fullName}</span>
                                        <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-red-600 font-bold">Logout</button>
                                    </>
                                ) : (
                                    <div className="flex space-x-2 w-full">
                                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center bg-slate-100 py-2 rounded-xl">Login</Link>
                                        <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center bg-blue-600 text-white py-2 rounded-xl">Register</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        function Footer() {
            return (
                <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2.5 mb-3">
                                <div className="bg-blue-600 text-white p-1.5 rounded-lg font-bold text-xs">S360</div>
                                <span className="text-sm font-extrabold text-white">SwapIt360</span>
                            </div>
                            <p className="text-xs text-slate-400">India's trusted student marketplace for buying, selling, renting and exchanging college essentials.</p>
                            <div className="flex space-x-3 mt-4 text-xs font-bold text-blue-400">
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Marketplace</h4>
                            <ul className="space-y-2 text-xs">
                                <li><Link to="/products" className="hover:text-white transition">Categories</Link></li>
                                <li><Link to="/add-product" className="hover:text-white transition">Sell Product</Link></li>
                                <li><Link to="/products" className="hover:text-white transition">Browse All</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">About & Help</h4>
                            <ul className="space-y-2 text-xs">
                                <li><Link to="/" className="hover:text-white transition">About</Link></li>
                                <li><Link to="/" className="hover:text-white transition">Contact</Link></li>
                                <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
                                <li><Link to="/" className="hover:text-white transition">Terms</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Campus Safety</h4>
                            <p className="text-xs text-slate-400 mb-2">Always meet in secure public campus areas such as libraries or student unions for exchanges.</p>
                            <p className="text-xs text-slate-500 pt-2">© 2026 SwapIt360. All Rights Reserved.</p>
                        </div>
                    </div>
                </footer>
            );
        }

        // ==========================================
        // PAGES
        // ==========================================
        function Home() {
            const { products } = useContext(AppContext);
            const [searchQuery, setSearchQuery] = useState("");
            const navigate = useNavigate();

            const approvedProducts = products.filter(p => p.approvalStatus === "Approved" && p.status === "Available");
            const featuredProducts = approvedProducts.filter(p => p.featured);
            const under500 = approvedProducts.filter(p => p.sellingPrice <= 500);
            const under1000 = approvedProducts.filter(p => p.sellingPrice <= 1000);
            const electronicDeals = approvedProducts.filter(p => p.category === 'Electronics');
            const bookDeals = approvedProducts.filter(p => p.category === 'Books');
            const hostelDeals = approvedProducts.filter(p => p.category === 'Hostel Essentials');

            const handleSearchSubmit = (e) => {
                e.preventDefault();
                navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            };

            return (
                <div className="space-y-12 pb-12">
                    {/* Hero Section */}
                    <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white max-w-[1280px] mx-auto mt-4 shadow-md flex flex-col items-center text-center relative overflow-hidden" style={{ padding: '36px 20px', borderRadius: '24px' }}>
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-600/30 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-600/30 rounded-full blur-2xl"></div>
                        
                        <span className="bg-blue-600/60 border border-blue-400/30 text-blue-100 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                            India's Student Marketplace
                        </span>
                        
                        <h1 className="font-extrabold tracking-tight" style={{ fontSize: '32px', lineHeight: '1.15', maxWidth: '780px', marginBottom: '12px' }}>
                            Buy, Sell, Rent & Exchange Everything Students Need.
                        </h1>
                        <p className="text-blue-100" style={{ fontSize: '14px', lineHeight: '1.4', maxWidth: '620px', marginBottom: '20px' }}>
                            Connect with verified students and save money by giving products a second life.
                        </p>
                        
                        <div className="flex flex-row justify-center" style={{ gap: '12px', marginBottom: '24px' }}>
                            <Link to="/products" className="bg-white text-blue-700 font-semibold shadow hover:bg-blue-50 transition" style={{ padding: '10px 22px', fontSize: '13px', borderRadius: '12px' }}>
                                Explore Marketplace
                            </Link>
                            <Link to="/add-product" className="bg-blue-800 text-white font-semibold shadow hover:bg-blue-900 border border-blue-600 transition" style={{ padding: '10px 22px', fontSize: '13px', borderRadius: '12px' }}>
                                Sell Your Item
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearchSubmit} className="flex bg-white shadow-xl w-full" style={{ maxWidth: '620px', height: '48px', borderRadius: '14px', padding: '3px' }}>
                            <input 
                                type="text" 
                                placeholder="Search books, laptops, calculators, hostel essentials..." 
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="flex-grow outline-none text-slate-800 bg-transparent" 
                                style={{ padding: '12px 16px', fontSize: '13px' }}
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold transition flex items-center justify-center shadow" style={{ padding: '8px 24px', fontSize: '13px', borderRadius: '11px' }}>Search</button>
                        </form>

                        {/* Animated Counters */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-blue-600/40 w-full max-w-4xl text-center">
                            <div>
                                <h4 className="text-xl font-extrabold text-white">15K+</h4>
                                <span className="text-xs text-blue-200">Students</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-extrabold text-white">5000+</h4>
                                <span className="text-xs text-blue-200">Products</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-extrabold text-white">250+</h4>
                                <span className="text-xs text-blue-200">Campuses</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-extrabold text-white">99%</h4>
                                <span className="text-xs text-blue-200">Trusted Transactions</span>
                            </div>
                        </div>
                    </section>

                    {/* Popular Categories */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900">Popular Categories</h2>
                            <Link to="/products" className="text-blue-600 hover:text-blue-700 text-xs font-bold">View All →</Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                            {CATEGORIES.map((cat, idx) => {
                                const count = approvedProducts.filter(p => p.category === cat.name).length;
                                return (
                                    <Link key={idx} to={`/products?category=${cat.name}`} className="bg-white p-4 rounded-2xl border border-slate-200 card-hover text-center group">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition text-xl">
                                            {cat.icon}
                                        </div>
                                        <span className="font-bold text-slate-800 text-xs block">{cat.name}</span>
                                        <span className="text-[10px] text-slate-400 mt-0.5 block">{count} items</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Featured Deals & Recently Added */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900">Featured Deals</h2>
                            <Link to="/products" className="text-blue-600 hover:text-blue-700 text-xs font-bold">Marketplace →</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {approvedProducts.slice(0, 4).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>

                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900">Recently Added</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {approvedProducts.slice(4, 8).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>

                    {/* Products Under ₹500 and ₹1000 */}
                    {under500.length > 0 && (
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Products Under ₹500</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {under500.slice(0, 4).map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {under1000.length > 0 && (
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Products Under ₹1000</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {under1000.slice(0, 4).map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Trending Electronics & Best Selling Books */}
                    {electronicDeals.length > 0 && (
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Trending Electronics</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {electronicDeals.slice(0, 4).map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {bookDeals.length > 0 && (
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Best Selling Books</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {bookDeals.slice(0, 4).map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {hostelDeals.length > 0 && (
                        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Hostel Essentials</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {hostelDeals.slice(0, 4).map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            );
        }

        function ProductsPage() {
            const { products } = useContext(AppContext);
            const location = useLocation();
            const queryParams = new URLSearchParams(location.search);

            const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || "");
            const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || "All");
            const [selectedTxType, setSelectedTxType] = useState(queryParams.get('transactionType') || "All");
            const [selectedCondition, setSelectedCondition] = useState("All");
            const [minPrice, setMinPrice] = useState("");
            const [maxPrice, setMaxPrice] = useState("");
            const [showSold, setShowSold] = useState(false);
            const [sortBy, setSortBy] = useState("newest");
            const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

            const filtered = products.filter(p => {
                if (p.approvalStatus !== "Approved") return false;
                if (!showSold && p.status === "Sold") return false;
                if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description.toLowerCase().includes(searchQuery.toLowerCase()) && !p.campusLocation.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
                if (selectedTxType !== "All" && p.transactionType !== selectedTxType) return false;
                if (selectedCondition !== "All" && p.condition !== selectedCondition) return false;
                if (minPrice && p.sellingPrice < parseFloat(minPrice)) return false;
                if (maxPrice && p.sellingPrice > parseFloat(maxPrice)) return false;
                return true;
            });

            if (sortBy === "price-low") filtered.sort((a,b) => a.sellingPrice - b.sellingPrice);
            if (sortBy === "price-high") filtered.sort((a,b) => b.sellingPrice - a.sellingPrice);
            if (sortBy === "newest") filtered.sort((a,b) => b.id - a.id);
            if (sortBy === "oldest") filtered.sort((a,b) => a.id - b.id);

            const clearAllFilters = () => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedTxType("All");
                setSelectedCondition("All");
                setMinPrice("");
                setMaxPrice("");
                setShowSold(false);
                setSortBy("newest");
            };

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900">SwapIt360 Marketplace</h1>
                            <p className="text-xs text-slate-500 mt-1">Showing {filtered.length} verified student listings</p>
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            <select 
                                value={sortBy} 
                                onChange={e => setSortBy(e.target.value)}
                                className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold outline-none shadow-sm">
                                <option value="newest">Sort by: Newest</option>
                                <option value="oldest">Sort by: Oldest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                            <button 
                                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                                className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">
                                Filters
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Filter Sidebar */}
                        <div className={`md:block bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
                            <div className="flex justify-between items-center border-b pb-3">
                                <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
                                <button onClick={clearAllFilters} className="text-xs text-blue-600 font-bold hover:underline">Clear All</button>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Search</label>
                                <input 
                                    type="text" 
                                    placeholder="Name, location..." 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                                <select 
                                    value={selectedCategory} 
                                    onChange={e => setSelectedCategory(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs outline-none">
                                    <option value="All">All Categories</option>
                                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Transaction Type</label>
                                <select 
                                    value={selectedTxType} 
                                    onChange={e => setSelectedTxType(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs outline-none">
                                    <option value="All">All Types</option>
                                    <option value="Buy">Buy</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Exchange">Exchange</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Condition</label>
                                <select 
                                    value={selectedCondition} 
                                    onChange={e => setSelectedCondition(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs outline-none">
                                    <option value="All">All Conditions</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Good">Good</option>
                                    <option value="Used">Used</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Price Range (₹)</label>
                                <div className="flex space-x-2">
                                    <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-1/2 bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs" />
                                    <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-1/2 bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs" />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <input type="checkbox" id="showSold" checked={showSold} onChange={e => setShowSold(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                                <label htmlFor="showSold" className="text-xs font-semibold text-slate-700">Include Sold Items</label>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="md:col-span-3">
                            {filtered.length === 0 ? (
                                <div className="bg-white p-12 rounded-2xl border text-center space-y-3">
                                    <p className="text-sm font-bold text-slate-700">No products found matching your filters.</p>
                                    <button onClick={clearAllFilters} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Clear Filters</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filtered.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        function ProductDetailsPage() {
            const { id } = useParams();
            const { products, users, currentUser, wishlists, setWishlists, requests, setRequests, reports, setReports, reviews, addNotification, showToast } = useContext(AppContext);
            
            const [requestType, setRequestType] = useState("Buy");
            const [requestMessage, setRequestMessage] = useState("");
            const [reportModalOpen, setReportModalOpen] = useState(false);
            const [reportReason, setReportReason] = useState("Wrong information");
            const [reportDesc, setReportDesc] = useState("");
            const [activeImageIdx, setActiveImageIdx] = useState(0);

            const product = products.find(p => p.id === parseInt(id));
            if (!product) return <div className="text-center py-20 text-slate-600">Product not found.</div>;

            const seller = users.find(u => u.id === product.sellerId) || { fullName: "Unknown Student", department: "General", academicYear: "N/A" };
            const userWishlist = wishlists.find(w => w.userId === currentUser?.id)?.productIds || [];
            const isWishlisted = userWishlist.includes(product.id);

            const sellerReviews = reviews.filter(r => r.sellerId === seller.id);
            const sellerAvgRating = sellerReviews.length > 0 ? (sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length).toFixed(1) : "4.8";

            const existingRequest = requests.find(r => r.productId === product.id && r.buyerId === currentUser?.id && r.status !== 'Cancelled' && r.status !== 'Rejected');

            const handleSendRequest = (e) => {
                e.preventDefault();
                if (!currentUser) {
                    showToast("Please login to send requests.", "warning");
                    return;
                }
                if (currentUser.id === product.sellerId) {
                    showToast("You cannot request your own product.", "error");
                    return;
                }
                if (currentUser.status === "Inactive") {
                    showToast("Your account is inactive. Action not allowed.", "error");
                    return;
                }
                if (product.status === "Sold") {
                    showToast("This product is already sold.", "error");
                    return;
                }
                if (existingRequest) {
                    showToast("You already have an active request for this product.", "warning");
                    return;
                }

                const newReq = {
                    id: Date.now(),
                    productId: product.id,
                    buyerId: currentUser.id,
                    sellerId: product.sellerId,
                    type: requestType,
                    message: requestMessage,
                    status: "Pending",
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0]
                };

                setRequests([newReq, ...requests]);
                addNotification(product.sellerId, "request", `${currentUser.fullName} sent a request for your ${product.name}.`);
                showToast("Request sent successfully!");
                setRequestMessage("");
            };

            const handleReportSubmit = (e) => {
                e.preventDefault();
                if (!currentUser) {
                    showToast("Please login to report products.", "warning");
                    return;
                }
                if (currentUser.id === product.sellerId) {
                    showToast("You cannot report your own product.", "error");
                    return;
                }

                const duplicateOpen = reports.some(r => r.productId === product.id && r.reportedBy === currentUser.id && r.status === 'Open');
                if (duplicateOpen) {
                    showToast("You already have an open report for this product.", "warning");
                    setReportModalOpen(false);
                    return;
                }

                const newRep = {
                    id: Date.now(),
                    productId: product.id,
                    reportedBy: currentUser.id,
                    reason: reportReason,
                    description: reportDesc,
                    status: "Open",
                    createdAt: new Date().toISOString().split('T')[0]
                };

                setReports([newRep, ...reports]);
                setReportModalOpen(false);
                setReportDesc("");
                showToast("Report submitted to moderators.");
            };

            const toggleWishlist = () => {
                if (!currentUser) {
                    showToast("Please login to manage wishlist.", "warning");
                    return;
                }
                let updated;
                const existing = wishlists.find(w => w.userId === currentUser.id);
                if (existing) {
                    const newIds = existing.productIds.includes(product.id)
                        ? existing.productIds.filter(pid => pid !== product.id)
                        : [...existing.productIds, product.id];
                    updated = wishlists.map(w => w.userId === currentUser.id ? { ...w, productIds: newIds } : w);
                } else {
                    updated = [...wishlists, { userId: currentUser.id, productIds: [product.id] }];
                }
                setWishlists(updated);
                showToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
            };

            return (
                <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
                        {/* Images */}
                        <div className="space-y-4">
                            <div className="h-80 bg-slate-100 rounded-2xl overflow-hidden border">
                                <img src={product.images[activeImageIdx] || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            {product.images.length > 1 && (
                                <div className="flex space-x-2">
                                    {product.images.map((img, i) => (
                                        <button key={i} onClick={() => setActiveImageIdx(i)} className={`w-16 h-16 rounded-xl border overflow-hidden ${activeImageIdx === i ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'}`}>
                                            <img src={img} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-between space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs uppercase bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">{product.category}</span>
                                    <StatusBadge status={product.transactionType} type="tx" />
                                    <StatusBadge status={product.status} type="general" />
                                </div>
                                <h1 className="text-2xl font-extrabold text-slate-900">{product.name}</h1>
                                <div className="flex items-baseline space-x-3">
                                    <span className="text-2xl font-extrabold text-blue-600">₹{product.sellingPrice}</span>
                                    {product.originalPrice > product.sellingPrice && (
                                        <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.description}</p>
                                
                                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600 border-t border-b py-3">
                                    <div><span className="font-bold">Condition:</span> {product.condition}</div>
                                    <div><span className="font-bold">Age:</span> {product.productAge}</div>
                                    <div><span className="font-bold">Location:</span> {product.campusLocation}</div>
                                    <div><span className="font-bold">Posted:</span> {product.createdAt}</div>
                                </div>
                            </div>

                            {/* Seller Card & Actions */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                                <div>
                                    <div className="flex items-center space-x-1.5">
                                        <h4 className="font-bold text-slate-900 text-xs">{seller.fullName}</h4>
                                        <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-bold">Verified</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500">{seller.department} • Member since {seller.joinedAt} • ⭐ {sellerAvgRating}</p>
                                </div>
                                <Link to={`/seller/${seller.id}`} className="text-xs font-bold text-blue-600 hover:underline">View Profile →</Link>
                            </div>

                            <div className="flex space-x-3">
                                <button 
                                    onClick={toggleWishlist}
                                    className={`flex-1 py-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center space-x-2 ${
                                        isWishlisted ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                    }`}>
                                    <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                                </button>
                                <button 
                                    onClick={() => setReportModalOpen(true)}
                                    className="px-4 py-3 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-2xl text-xs font-bold transition">
                                    Report Listing
                                </button>
                            </div>

                            {/* Request Form */}
                            <div>
                                {!currentUser ? (
                                    <Link to="/login" className="block w-full text-center bg-blue-600 text-white py-3 rounded-2xl text-xs font-bold">Login to Send Request</Link>
                                ) : currentUser.id === product.sellerId ? (
                                    <Link to="/my-listings" className="block w-full text-center bg-slate-800 text-white py-3 rounded-2xl text-xs font-bold">Manage Your Listing</Link>
                                ) : product.status === "Sold" ? (
                                    <div className="bg-slate-100 text-slate-600 text-center py-3 rounded-2xl text-xs font-bold">Product Sold</div>
                                ) : existingRequest ? (
                                    <div className="bg-amber-50 text-amber-800 text-center py-3 rounded-2xl text-xs font-bold border border-amber-200">Request Already Sent ({existingRequest.status})</div>
                                ) : (
                                    <form onSubmit={handleSendRequest} className="space-y-3 pt-2 border-t">
                                        <div className="flex space-x-3">
                                            <select value={requestType} onChange={e => setRequestType(e.target.value)} className="bg-slate-50 border p-2.5 rounded-xl text-xs font-bold outline-none">
                                                <option value="Buy">Buy</option>
                                                <option value="Rent">Rent</option>
                                                <option value="Exchange">Exchange</option>
                                            </select>
                                            <input 
                                                type="text" 
                                                placeholder="Message to seller..." 
                                                value={requestMessage} 
                                                onChange={e => setRequestMessage(e.target.value)} 
                                                required 
                                                className="flex-grow bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" 
                                            />
                                        </div>
                                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-xs font-bold transition">Send Request</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Report Modal */}
                    {reportModalOpen && (
                        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                                <h3 className="text-base font-bold text-slate-900">Report Product</h3>
                                <form onSubmit={handleReportSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Reason</label>
                                        <select value={reportReason} onChange={e => setReportReason(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none">
                                            <option value="Fake product">Fake product</option>
                                            <option value="Incorrect information">Incorrect information</option>
                                            <option value="Suspicious seller">Suspicious seller</option>
                                            <option value="Duplicate listing">Duplicate listing</option>
                                            <option value="Inappropriate content">Inappropriate content</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                                        <textarea rows="3" value={reportDesc} onChange={e => setReportDesc(e.target.value)} placeholder="Provide details..." required className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" />
                                    </div>
                                    <div className="flex space-x-3 pt-2">
                                        <button type="button" onClick={() => setReportModalOpen(false)} className="flex-1 bg-slate-100 py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                        <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-xs font-bold">Submit Report</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        function LoginPage() {
            const { users, setCurrentUser, showToast } = useContext(AppContext);
            const navigate = useNavigate();
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");

            const handleLogin = (e) => {
                e.preventDefault();
                const user = users.find(u => u.email === email && u.password === password);
                if (!user) {
                    showToast("Invalid email or password.", "error");
                    return;
                }
                if (user.status === "Inactive") {
                    showToast("Your account has been deactivated by admin.", "error");
                    return;
                }
                setCurrentUser(user);
                showToast("Login successful!");
                if (user.role === 'admin') navigate('/admin-dashboard');
                else navigate('/');
            };

            return (
                <div className="max-w-md mx-auto px-4 py-16">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                        <div className="text-center space-y-1">
                            <h2 className="text-xl font-extrabold text-slate-900">Welcome Back</h2>
                            <p className="text-xs text-slate-500">Log in to your SwapIt360 account</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">College Email</label>
                                <input type="email" placeholder="student@swapit360.com" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition shadow">Login</button>
                        </form>
                        <p className="text-center text-xs text-slate-500 pt-2">
                            Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
                        </p>
                    </div>
                </div>
            );
        }

        function RegisterPage() {
            const { users, setUsers, setCurrentUser, showToast, addNotification } = useContext(AppContext);
            const navigate = useNavigate();
            const [form, setForm] = useState({
                fullName: "", email: "", rollNumber: "", department: "CSE", academicYear: "First Year", campusLocation: "", password: "", confirmPassword: "", terms: false
            });

            const handleRegister = (e) => {
                e.preventDefault();
                if (form.password.length < 6) {
                    showToast("Password must be at least 6 characters.", "error");
                    return;
                }
                if (form.password !== form.confirmPassword) {
                    showToast("Passwords do not match.", "error");
                    return;
                }
                if (!form.terms) {
                    showToast("Please accept the terms and conditions.", "error");
                    return;
                }
                if (users.some(u => u.email === form.email)) {
                    showToast("Email is already registered.", "error");
                    return;
                }
                if (users.some(u => u.rollNumber === form.rollNumber)) {
                    showToast("Roll number is already registered.", "error");
                    return;
                }

                const newUser = {
                    id: Date.now(),
                    fullName: form.fullName,
                    email: form.email,
                    password: form.password,
                    rollNumber: form.rollNumber,
                    department: form.department,
                    academicYear: form.academicYear,
                    campusLocation: form.campusLocation,
                    role: "student",
                    status: "Active",
                    joinedAt: new Date().toISOString().split('T')[0]
                };

                setUsers([...users, newUser]);
                setCurrentUser(newUser);
                addNotification(newUser.id, "system", "Welcome to SwapIt360!");
                showToast("Registration successful!");
                navigate('/');
            };

            return (
                <div className="max-w-xl mx-auto px-4 py-10">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                        <div className="text-center space-y-1">
                            <h2 className="text-xl font-extrabold text-slate-900">Student Registration</h2>
                            <p className="text-xs text-slate-500">Join the SwapIt360 campus e-commerce community</p>
                        </div>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                                    <input type="text" placeholder="Rahul Sharma" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">College Email</label>
                                    <input type="email" placeholder="student@swapit360.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Roll Number</label>
                                    <input type="text" placeholder="CSE202601" value={form.rollNumber} onChange={e => setForm({...form, rollNumber: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                                    <input type="text" placeholder="Block A Hostel" value={form.campusLocation} onChange={e => setForm({...form, campusLocation: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                                    <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                                    <select value={form.academicYear} onChange={e => setForm({...form, academicYear: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                        {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                                    <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                                    <input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <input type="checkbox" id="terms" checked={form.terms} onChange={e => setForm({...form, terms: e.target.checked})} className="w-4 h-4 text-blue-600 rounded" />
                                <label htmlFor="terms" className="text-xs font-semibold text-slate-700">I accept the campus safety terms and conditions.</label>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition shadow">Register Account</button>
                        </form>
                    </div>
                </div>
            );
        }

        function AddProductPage() {
            const { currentUser, products, setProducts, showToast, addNotification } = useContext(AppContext);
            const navigate = useNavigate();

            if (!currentUser || currentUser.role !== 'student') {
                return <Navigate to="/login" />;
            }

            const [form, setForm] = useState({
                name: "", description: "", category: "Books", originalPrice: "", sellingPrice: "", condition: "Good", productAge: "6 Months", transactionType: "Buy", campusLocation: currentUser.campusLocation || "", image: ""
            });

            const calculateSuggestedPrice = (orig, cond) => {
                const p = parseFloat(orig) || 0;
                if (cond === "Like New") return Math.round(p * 0.8);
                if (cond === "Good") return Math.round(p * 0.65);
                if (cond === "Used") return Math.round(p * 0.5);
                return 0;
            };

            const computedSuggestion = calculateSuggestedPrice(form.originalPrice, form.condition);

            const handleSubmit = (e) => {
                e.preventDefault();
                if (parseFloat(form.sellingPrice) > parseFloat(form.originalPrice)) {
                    if (!confirm("Selling price is higher than original price. Proceed?")) return;
                }

                const newProduct = {
                    id: Date.now(),
                    sellerId: currentUser.id,
                    name: form.name,
                    description: form.description,
                    category: form.category,
                    originalPrice: parseFloat(form.originalPrice),
                    sellingPrice: parseFloat(form.sellingPrice),
                    condition: form.condition,
                    productAge: form.productAge,
                    transactionType: form.transactionType,
                    campusLocation: form.campusLocation,
                    images: [form.image || "https://placehold.co/400x300/2563eb/ffffff?text=SwapIt360+Item"],
                    status: "Available",
                    approvalStatus: "Pending",
                    featured: false,
                    rejectionReason: "",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                setProducts([newProduct, ...products]);
                addNotification(currentUser.id, "product", `Your product "${form.name}" was submitted for admin approval.`);
                showToast("Product submitted for admin approval.");
                navigate('/my-listings');
            };

            return (
                <div className="max-w-2xl mx-auto px-4 py-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-900">Sell an Item</h2>
                            <p className="text-xs text-slate-500">List an academic or hostel essential for campus students</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                                    <input type="text" placeholder="Scientific Calculator" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Description ({form.description.length} chars)</label>
                                    <textarea rows="3" placeholder="Provide details..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                        {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Type</label>
                                    <select value={form.transactionType} onChange={e => setForm({...form, transactionType: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                        <option value="Buy">Buy</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Exchange">Exchange</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Original Price (₹)</label>
                                    <input type="number" placeholder="1000" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                                    <input type="number" placeholder="700" value={form.sellingPrice} onChange={e => setForm({...form, sellingPrice: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                    {form.originalPrice && <span className="text-[10px] text-blue-600 mt-1 block font-semibold">Recommended selling price: ₹{computedSuggestion}</span>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                                    <select value={form.condition} onChange={e => setForm({...form, condition: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                        <option value="Like New">Like New</option>
                                        <option value="Good">Good</option>
                                        <option value="Used">Used</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Age</label>
                                    <input type="text" placeholder="6 Months" value={form.productAge} onChange={e => setForm({...form, productAge: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                                    <input type="text" placeholder="Library Block" value={form.campusLocation} onChange={e => setForm({...form, campusLocation: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                                    <input type="url" placeholder="https://..." value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="reset" onClick={() => setForm({ name: "", description: "", category: "Books", originalPrice: "", sellingPrice: "", condition: "Good", productAge: "6 Months", transactionType: "Buy", campusLocation: currentUser.campusLocation || "", image: "" })} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold transition">Reset</button>
                                <button type="submit" className="flex-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition shadow">Submit Listing for Approval</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        function EditProductPage() {
            const { id } = useParams();
            const { currentUser, products, setProducts, showToast } = useContext(AppContext);
            const navigate = useNavigate();

            const product = products.find(p => p.id === parseInt(id));

            if (!currentUser || !product || product.sellerId !== currentUser.id) {
                return <div className="text-center py-20 text-slate-600">Unauthorized or product not found.</div>;
            }

            const [form, setForm] = useState({
                name: product.name,
                description: product.description,
                category: product.category,
                originalPrice: product.originalPrice,
                sellingPrice: product.sellingPrice,
                condition: product.condition,
                productAge: product.productAge,
                transactionType: product.transactionType,
                campusLocation: product.campusLocation,
                image: product.images[0]
            });

            const handleSubmit = (e) => {
                e.preventDefault();
                const updated = products.map(p => p.id === product.id ? {
                    ...p,
                    ...form,
                    originalPrice: parseFloat(form.originalPrice),
                    sellingPrice: parseFloat(form.sellingPrice),
                    images: [form.image],
                    approvalStatus: "Pending",
                    updatedAt: new Date().toISOString()
                } : p);

                setProducts(updated);
                showToast("Product updated and requires admin re-approval.");
                navigate('/my-listings');
            };

            return (
                <div className="max-w-2xl mx-auto px-4 py-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-900">Edit Listing</h2>
                            <p className="text-xs text-amber-600 font-semibold">Editing an approved listing will set its status back to Pending approval.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                                    <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                                    <input type="number" value={form.sellingPrice} onChange={e => setForm({...form, sellingPrice: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                                    <input type="text" value={form.campusLocation} onChange={e => setForm({...form, campusLocation: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition shadow">Save Changes</button>
                        </form>
                    </div>
                </div>
            );
        }

        function MyListingsPage() {
            const { currentUser, products, setProducts, requests, setConfirmModal, showToast } = useContext(AppContext);

            if (!currentUser || currentUser.role !== 'student') return <Navigate to="/login" />;

            const myListings = products.filter(p => p.sellerId === currentUser.id);
            const total = myListings.length;
            const available = myListings.filter(p => p.status === "Available" && p.approvalStatus === "Approved").length;
            const pending = myListings.filter(p => p.approvalStatus === "Pending").length;
            const sold = myListings.filter(p => p.status === "Sold").length;

            const handleDelete = (id) => {
                setConfirmModal({
                    title: "Delete Listing",
                    message: "Are you sure you want to delete this product?",
                    onConfirm: () => {
                        setProducts(products.filter(p => p.id !== id));
                        showToast("Product deleted successfully.");
                    }
                });
            };

            const toggleStatus = (id, currentStatus) => {
                const nextStatus = currentStatus === "Available" ? "Sold" : "Available";
                setConfirmModal({
                    title: `Mark as ${nextStatus}`,
                    message: `Are you sure you want to mark this product as ${nextStatus}?`,
                    onConfirm: () => {
                        setProducts(products.map(p => p.id === id ? { ...p, status: nextStatus } : p));
                        showToast(`Product marked as ${nextStatus}.`);
                    }
                });
            };

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900">My Listings</h1>
                            <p className="text-xs text-slate-500 mt-1">Manage your academic and hostel items</p>
                        </div>
                        <Link to="/add-product" className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold">+ Sell Product</Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200">
                            <span className="text-xs text-slate-500 font-bold">Total Listings</span>
                            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{total}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200">
                            <span className="text-xs text-emerald-600 font-bold">Available</span>
                            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{available}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200">
                            <span className="text-xs text-amber-600 font-bold">Pending Approval</span>
                            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{pending}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200">
                            <span className="text-xs text-slate-600 font-bold">Sold</span>
                            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{sold}</h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        {myListings.length === 0 ? (
                            <div className="p-12 text-center text-xs text-slate-400">You haven't listed any products yet.</div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {myListings.map(p => {
                                    const reqCount = requests.filter(r => r.productId === p.id).length;
                                    return (
                                        <div key={p.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="flex items-center space-x-4">
                                                <img src={p.images[0]} className="w-16 h-16 rounded-2xl object-cover border" />
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <StatusBadge status={p.approvalStatus} type="approval" />
                                                        <StatusBadge status={p.status} type="general" />
                                                    </div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                                                    <p className="text-xs text-blue-600 font-bold">₹{p.sellingPrice} • {reqCount} requests</p>
                                                    {p.approvalStatus === 'Rejected' && p.rejectionReason && (
                                                        <p className="text-[11px] text-red-600">Reason: {p.rejectionReason}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                                <Link to={`/product/${p.id}`} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold">View</Link>
                                                <Link to={`/edit-product/${p.id}`} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold">Edit</Link>
                                                <button onClick={() => toggleStatus(p.id, p.status)} className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold">
                                                    {p.status === 'Available' ? 'Mark Sold' : 'Mark Available'}
                                                </button>
                                                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold">Delete</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        function WishlistPage() {
            const { currentUser, wishlists, products } = useContext(AppContext);
            if (!currentUser) return <Navigate to="/login" />;

            const userWishlistIds = wishlists.find(w => w.userId === currentUser.id)?.productIds || [];
            const wishlistedProducts = products.filter(p => userWishlistIds.includes(p.id));

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">My Wishlist</h1>
                        <p className="text-xs text-slate-500 mt-1">{wishlistedProducts.length} saved campus items</p>
                    </div>
                    {wishlistedProducts.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl border text-center space-y-3">
                            <p className="text-xs text-slate-500">Your wishlist is currently empty.</p>
                            <Link to="/products" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Browse Marketplace</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {wishlistedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            );
        }

        function RequestsPage() {
            const { currentUser, requests, setRequests, products, setProducts, users, reviews, setReviews, addNotification, showToast, setConfirmModal } = useContext(AppContext);
            const [activeTab, setActiveTab] = useState("sent");
            const [reviewModalReq, setReviewModalReq] = useState(null);
            const [rating, setRating] = useState(5);
            const [comment, setComment] = useState("");

            if (!currentUser) return <Navigate to="/login" />;

            const sentRequests = requests.filter(r => r.buyerId === currentUser.id);
            const receivedRequests = requests.filter(r => r.sellerId === currentUser.id);

            const handleCancel = (id) => {
                setConfirmModal({
                    title: "Cancel Request",
                    message: "Are you sure you want to cancel this request?",
                    onConfirm: () => {
                        setRequests(requests.map(r => r.id === id ? { ...r, status: "Cancelled", updatedAt: new Date().toISOString().split('T')[0] } : r));
                        showToast("Request cancelled.");
                    }
                });
            };

            const handleStatusChange = (id, newStatus) => {
                const req = requests.find(r => r.id === id);
                if (newStatus === "Completed") {
                    setConfirmModal({
                        title: "Complete Transaction",
                        message: "Completing this transaction will mark the product as sold. Proceed?",
                        onConfirm: () => {
                            setRequests(requests.map(r => r.id === id ? { ...r, status: "Completed", updatedAt: new Date().toISOString().split('T')[0] } : r));
                            setProducts(products.map(p => p.id === req.productId ? { ...p, status: "Sold" } : p));
                            addNotification(req.buyerId, "request", `Your transaction for request #${req.id} was marked completed.`);
                            showToast("Transaction completed and product marked sold.");
                        }
                    });
                } else if (newStatus === "Accepted") {
                    const otherPending = requests.filter(r => r.productId === req.productId && r.id !== req.id && r.status === 'Pending');
                    if (otherPending.length > 0) {
                        setConfirmModal({
                            title: "Accept Request",
                            message: `Accepting this request will automatically reject ${otherPending.length} other pending request(s) for this product. Proceed?`,
                            onConfirm: () => {
                                setRequests(requests.map(r => {
                                    if (r.id === id) return { ...r, status: "Accepted", updatedAt: new Date().toISOString().split('T')[0] };
                                    if (r.productId === req.productId && r.status === 'Pending') return { ...r, status: "Rejected", updatedAt: new Date().toISOString().split('T')[0] };
                                    return r;
                                }));
                                addNotification(req.buyerId, "request", `Your request for product #${req.productId} was accepted!`);
                                showToast("Request accepted and other pending requests rejected.");
                            }
                        });
                    } else {
                        setRequests(requests.map(r => r.id === id ? { ...r, status: "Accepted", updatedAt: new Date().toISOString().split('T')[0] } : r));
                        addNotification(req.buyerId, "request", `Your request for product #${req.productId} was accepted!`);
                        showToast("Request accepted.");
                    }
                } else {
                    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : r));
                    addNotification(req.buyerId, "request", `Your request status changed to ${newStatus}.`);
                    showToast(`Request ${newStatus.toLowerCase()}.`);
                }
            };

            const handleReviewSubmit = (e) => {
                e.preventDefault();
                const duplicateReview = reviews.some(rev => rev.requestId === reviewModalReq.id);
                if (duplicateReview) {
                    showToast("You have already reviewed this completed request.", "error");
                    setReviewModalReq(null);
                    return;
                }

                const newRev = {
                    id: Date.now(),
                    requestId: reviewModalReq.id,
                    buyerId: currentUser.id,
                    sellerId: reviewModalReq.sellerId,
                    rating: parseInt(rating),
                    comment,
                    createdAt: new Date().toISOString().split('T')[0]
                };
                setReviews([...reviews, newRev]);
                addNotification(reviewModalReq.sellerId, "review", `You received a ${rating}-star review for completed request #${reviewModalReq.id}.`);
                setReviewModalReq(null);
                setComment("");
                showToast("Review submitted successfully!");
            };

            return (
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-extrabold text-slate-900">Transaction Requests</h1>
                        <div className="flex bg-slate-200 p-1 rounded-2xl text-xs font-bold">
                            <button onClick={() => setActiveTab("sent")} className={`px-4 py-2 rounded-xl transition ${activeTab === 'sent' ? 'bg-white shadow text-blue-600' : 'text-slate-600'}`}>
                                Requests Sent ({sentRequests.length})
                            </button>
                            <button onClick={() => setActiveTab("received")} className={`px-4 py-2 rounded-xl transition ${activeTab === 'received' ? 'bg-white shadow text-blue-600' : 'text-slate-600'}`}>
                                Requests Received ({receivedRequests.length})
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'sent' && (
                            sentRequests.length === 0 ? (
                                <div className="bg-white p-12 rounded-3xl border text-center text-xs text-slate-400">No requests sent yet.</div>
                            ) : (
                                sentRequests.map(r => {
                                    const prod = products.find(p => p.id === r.productId) || { name: "Product", images: [] };
                                    const seller = users.find(u => u.id === r.sellerId) || { fullName: "Seller" };
                                    const hasReviewed = reviews.some(rev => rev.requestId === r.id);
                                    return (
                                        <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="flex items-center space-x-4">
                                                <img src={prod.images?.[0]} className="w-16 h-16 rounded-2xl object-cover border" />
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <StatusBadge status={r.status} type="general" />
                                                        <span className="text-xs font-bold text-blue-600">{r.type}</span>
                                                    </div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                                                    <p className="text-xs text-slate-600">Seller: {seller.fullName} • "{r.message}"</p>
                                                    <span className="text-[10px] text-slate-400 block">{r.createdAt}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                                {r.status === 'Pending' && (
                                                    <button onClick={() => handleCancel(r.id)} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-xl text-xs font-bold">Cancel</button>
                                                )}
                                                {r.status === 'Completed' && !hasReviewed && (
                                                    <button onClick={() => setReviewModalReq(r)} className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold">Rate Seller</button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )
                        )}

                        {activeTab === 'received' && (
                            receivedRequests.length === 0 ? (
                                <div className="bg-white p-12 rounded-3xl border text-center text-xs text-slate-400">No requests received yet.</div>
                            ) : (
                                receivedRequests.map(r => {
                                    const prod = products.find(p => p.id === r.productId) || { name: "Product", images: [] };
                                    const buyer = users.find(u => u.id === r.buyerId) || { fullName: "Buyer" };
                                    return (
                                        <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="flex items-center space-x-4">
                                                <img src={prod.images?.[0]} className="w-16 h-16 rounded-2xl object-cover border" />
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <StatusBadge status={r.status} type="general" />
                                                        <span className="text-xs font-bold text-blue-600">{r.type}</span>
                                                    </div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                                                    <p className="text-xs text-slate-600">Buyer: {buyer.fullName} • "{r.message}"</p>
                                                    <span className="text-[10px] text-slate-400 block">{r.createdAt}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                                {r.status === 'Pending' && (
                                                    <>
                                                        <button onClick={() => handleStatusChange(r.id, 'Accepted')} className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">Accept</button>
                                                        <button onClick={() => handleStatusChange(r.id, 'Rejected')} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-xl text-xs font-bold">Reject</button>
                                                    </>
                                                )}
                                                {r.status === 'Accepted' && (
                                                    <button onClick={() => handleStatusChange(r.id, 'Completed')} className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold">Mark Completed</button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )
                        )}
                    </div>

                    {reviewModalReq && (
                        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                                <h3 className="text-base font-bold text-slate-900">Rate Seller</h3>
                                <form onSubmit={handleReviewSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
                                        <select value={rating} onChange={e => setRating(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none">
                                            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                                            <option value="4">⭐⭐⭐⭐ (4/5)</option>
                                            <option value="3">⭐⭐⭐ (3/5)</option>
                                            <option value="2">⭐⭐ (2/5)</option>
                                            <option value="1">⭐ (1/5)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Comment</label>
                                        <textarea rows="3" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your feedback..." required className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" />
                                    </div>
                                    <div className="flex space-x-3 pt-2">
                                        <button type="button" onClick={() => setReviewModalReq(null)} className="flex-1 bg-slate-100 py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                        <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        function ProfilePage() {
            const { currentUser, setUsers, products, wishlists, requests, reviews, showToast } = useContext(AppContext);
            if (!currentUser) return <Navigate to="/login" />;

            const [isEditing, setIsEditing] = useState(false);
            const [form, setForm] = useState({
                fullName: currentUser.fullName,
                department: currentUser.department,
                academicYear: currentUser.academicYear,
                campusLocation: currentUser.campusLocation
            });

            const userListings = products.filter(p => p.sellerId === currentUser.id);
            const availableListings = userListings.filter(p => p.status === 'Available').length;
            const soldListings = userListings.filter(p => p.status === 'Sold').length;
            const wishlistCount = wishlists.find(w => w.userId === currentUser.id)?.productIds?.length || 0;
            const sentReqCount = requests.filter(r => r.buyerId === currentUser.id).length;
            const receivedReqCount = requests.filter(r => r.sellerId === currentUser.id).length;

            const userReviews = reviews.filter(r => r.sellerId === currentUser.id);
            const avgRating = userReviews.length > 0 ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1) : "5.0";

            const handleSave = (e) => {
                e.preventDefault();
                const updatedUser = { ...currentUser, ...form };
                const allUsers = getStoredData("swapit360Users", []);
                const newUsers = allUsers.map(u => u.id === currentUser.id ? updatedUser : u);
                saveStoredData("swapit360Users", newUsers);
                setUsers(newUsers);
                localStorage.setItem("swapit360CurrentUser", JSON.stringify(updatedUser));
                setIsEditing(false);
                showToast("Profile updated successfully!");
            };

            return (
                <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl font-extrabold shadow-lg">
                            {currentUser.fullName[0]}
                        </div>
                        <div className="flex-grow text-center sm:text-left space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.fullName}</h1>
                                <button onClick={() => setIsEditing(!isEditing)} className="bg-slate-100 hover:bg-slate-200 px-4 py-1.5 rounded-xl text-xs font-bold">
                                    {isEditing ? "Cancel" : "Edit Profile"}
                                </button>
                            </div>
                            <p className="text-xs text-slate-500">{currentUser.email} • Roll: {currentUser.rollNumber}</p>
                            <p className="text-xs text-slate-700 font-semibold">{currentUser.department} • {currentUser.academicYear} • {currentUser.campusLocation}</p>
                            <div className="flex items-center space-x-4 pt-2 justify-center sm:justify-start text-xs font-bold text-slate-600">
                                <span>⭐ {avgRating} Rating</span>
                                <span>📦 {userReviews.length} Reviews</span>
                                <span>Status: <span className="text-emerald-600">{currentUser.status}</span></span>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                            <h3 className="font-bold text-slate-900 text-sm">Update Profile Details</h3>
                            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                                    <input type="text" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                                    <input type="text" value={form.campusLocation} onChange={e => setForm({...form, campusLocation: e.target.value})} required className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                                    <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none">
                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                                    <select value={form.academicYear} onChange={e => setForm({...form, academicYear: e.target.value})} className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none">
                                        {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl border">
                            <span className="text-xs text-slate-500 font-bold">Total Listings</span>
                            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{userListings.length}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border">
                            <span className="text-xs text-emerald-600 font-bold">Available Listings</span>
                            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{availableListings}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border">
                            <span className="text-xs text-slate-600 font-bold">Sold Products</span>
                            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{soldListings}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border">
                            <span className="text-xs text-rose-600 font-bold">Wishlist Count</span>
                            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{wishlistCount}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border">
                            <span className="text-xs text-blue-600 font-bold">Requests Sent</span>
                            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{sentReqCount}</h3>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border">
                            <span className="text-xs text-purple-600 font-bold">Requests Received</span>
                            <h3 className="text-xl font-extrabold text-slate-900 mt-1">{receivedReqCount}</h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                        <h3 className="text-base font-bold text-slate-900">Seller Reviews ({userReviews.length})</h3>
                        {userReviews.length === 0 ? (
                            <p className="text-xs text-slate-400">No reviews received yet.</p>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {userReviews.map(rev => (
                                    <div key={rev.id} className="py-3 space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-amber-500">{"⭐".repeat(rev.rating)}</span>
                                            <span className="text-xs text-slate-400">{rev.createdAt}</span>
                                        </div>
                                        <p className="text-xs text-slate-700">"{rev.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        function SellerProfilePage() {
            const { id } = useParams();
            const { users, products, reviews } = useContext(AppContext);

            const seller = users.find(u => u.id === parseInt(id));
            if (!seller) return <div className="text-center py-20 text-slate-600">Seller not found.</div>;

            const sellerProducts = products.filter(p => p.sellerId === seller.id && p.approvalStatus === 'Approved' && p.status === 'Available');
            const sellerReviews = reviews.filter(r => r.sellerId === seller.id);
            const avgRating = sellerReviews.length > 0 ? (sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length).toFixed(1) : "5.0";

            return (
                <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl font-extrabold shadow-lg">
                            {seller.fullName[0]}
                        </div>
                        <div className="flex-grow text-center sm:text-left space-y-1">
                            <h1 className="text-2xl font-extrabold text-slate-900">{seller.fullName}</h1>
                            <p className="text-xs text-slate-500">{seller.department} • {seller.academicYear} • Location: {seller.campusLocation}</p>
                            <p className="text-xs text-slate-400">Member since {seller.joinedAt}</p>
                            <div className="flex items-center space-x-4 pt-2 justify-center sm:justify-start text-xs font-bold text-slate-700">
                                <span>⭐ {avgRating} Rating</span>
                                <span>📦 {sellerReviews.length} Reviews</span>
                                <span>🛒 {sellerProducts.length} Active Listings</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Active Listings by {seller.fullName}</h2>
                        {sellerProducts.length === 0 ? (
                            <div className="bg-white p-8 rounded-2xl border text-center text-xs text-slate-400">No active products from this seller.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {sellerProducts.map(p => <ProductCard key={p.id} product={p} />)}
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                        <h3 className="text-base font-bold text-slate-900">Reviews ({sellerReviews.length})</h3>
                        {sellerReviews.length === 0 ? (
                            <p className="text-xs text-slate-400">No reviews yet.</p>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {sellerReviews.map(rev => (
                                    <div key={rev.id} className="py-3 space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-amber-500">{"⭐".repeat(rev.rating)}</span>
                                            <span className="text-xs text-slate-400">{rev.createdAt}</span>
                                        </div>
                                        <p className="text-xs text-slate-700">"{rev.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // ==========================================
        // ADMIN PAGES
        // ==========================================
        function AdminDashboard() {
            const { currentUser, users, products, reports, requests } = useContext(AppContext);
            if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

            const totalStudents = users.filter(u => u.role === 'student').length;
            const activeStudents = users.filter(u => u.role === 'student' && u.status === 'Active').length;
            const pendingApprovals = products.filter(p => p.approvalStatus === 'Pending').length;
            const approvedProducts = products.filter(p => p.approvalStatus === 'Approved').length;
            const openReports = reports.filter(r => r.status === 'Open').length;

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
                        <p className="text-xs text-slate-500 mt-1">Platform overview and campus moderation</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-slate-500 font-bold">Total Students</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalStudents}</h3></div>
                        <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-emerald-600 font-bold">Active Students</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{activeStudents}</h3></div>
                        <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-amber-600 font-bold">Pending Approvals</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{pendingApprovals}</h3></div>
                        <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-blue-600 font-bold">Approved Products</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{approvedProducts}</h3></div>
                        <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-red-600 font-bold">Open Reports</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{openReports}</h3></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link to="/admin-products" className="bg-white p-6 rounded-2xl border border-slate-200 card-hover flex justify-between items-center">
                            <div><h3 className="font-bold text-slate-900 text-sm">Product Approvals</h3><p className="text-xs text-slate-500 mt-1">{pendingApprovals} items waiting</p></div>
                            <span className="text-xl">→</span>
                        </Link>
                        <Link to="/admin-users" className="bg-white p-6 rounded-2xl border border-slate-200 card-hover flex justify-between items-center">
                            <div><h3 className="font-bold text-slate-900 text-sm">Student Management</h3><p className="text-xs text-slate-500 mt-1">{totalStudents} students registered</p></div>
                            <span className="text-xl">→</span>
                        </Link>
                        <Link to="/admin-reports" className="bg-white p-6 rounded-2xl border border-slate-200 card-hover flex justify-between items-center">
                            <div><h3 className="font-bold text-slate-900 text-sm">Reports Management</h3><p className="text-xs text-slate-500 mt-1">{openReports} open reports</p></div>
                            <span className="text-xl">→</span>
                        </Link>
                    </div>
                </div>
            );
        }

        function AdminProductsPage() {
            const { currentUser, products, setProducts, users, addNotification, showToast, setConfirmModal } = useContext(AppContext);
            if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

            const pendingProducts = products.filter(p => p.approvalStatus === 'Pending');

            const handleApprove = (id) => {
                setProducts(products.map(p => p.id === id ? { ...p, approvalStatus: 'Approved' } : p));
                const prod = products.find(p => p.id === id);
                if (prod) addNotification(prod.sellerId, 'product', `Your product "${prod.name}" was approved by admin!`);
                showToast("Product approved successfully.");
            };

            const handleReject = (id) => {
                const reason = prompt("Enter rejection reason:");
                if (!reason) return;
                setConfirmModal({
                    title: "Reject Product",
                    message: `Are you sure you want to reject this product? Reason: "${reason}"`,
                    onConfirm: () => {
                        setProducts(products.map(p => p.id === id ? { ...p, approvalStatus: 'Rejected', rejectionReason: reason } : p));
                        const prod = products.find(p => p.id === id);
                        if (prod) addNotification(prod.sellerId, 'product', `Your product "${prod.name}" was rejected. Reason: ${reason}`);
                        showToast("Product rejected.");
                    }
                });
            };

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">Product Approvals</h1>
                        <p className="text-xs text-slate-500 mt-1">{pendingProducts.length} listings awaiting moderation</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        {pendingProducts.length === 0 ? (
                            <div className="p-12 text-center text-xs text-slate-400">No pending products to approve.</div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {pendingProducts.map(p => {
                                    const seller = users.find(u => u.id === p.sellerId) || { fullName: "Student" };
                                    return (
                                        <div key={p.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="flex items-center space-x-4">
                                                <img src={p.images[0]} className="w-16 h-16 rounded-2xl object-cover border" />
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                                                    <p className="text-xs text-slate-500">Seller: {seller.fullName} • ₹{p.sellingPrice} • {p.category}</p>
                                                    <span className="text-[10px] text-slate-400">Submitted: {p.createdAt.split('T')[0]}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Link to={`/product/${p.id}`} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">View</Link>
                                                <button onClick={() => handleApprove(p.id)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">Approve</button>
                                                <button onClick={() => handleReject(p.id)} className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold">Reject</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        function AdminUsersPage() {
            const { currentUser, users, setUsers, products, showToast, setConfirmModal } = useContext(AppContext);
            if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

            const studentUsers = users.filter(u => u.role === 'student');

            const toggleStatus = (id, currentStatus) => {
                const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
                setConfirmModal({
                    title: `${nextStatus === 'Active' ? 'Activate' : 'Deactivate'} Student`,
                    message: `Are you sure you want to change student status to ${nextStatus}?`,
                    onConfirm: () => {
                        const updated = users.map(u => u.id === id ? { ...u, status: nextStatus } : u);
                        setUsers(updated);
                        saveStoredData("swapit360Users", updated);
                        showToast(`Student status changed to ${nextStatus}.`);
                    }
                });
            };

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">Student Management</h1>
                        <p className="text-xs text-slate-500 mt-1">{studentUsers.length} registered students</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {studentUsers.map(u => {
                                const count = products.filter(p => p.sellerId === u.id).length;
                                return (
                                    <div key={u.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <h4 className="font-bold text-slate-900 text-sm">{u.fullName}</h4>
                                                <StatusBadge status={u.status} type="general" />
                                            </div>
                                            <p className="text-xs text-slate-500">{u.email} • Roll: {u.rollNumber} • {u.department}</p>
                                            <span className="text-[10px] text-slate-400">{count} listings • Joined {u.joinedAt}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link to={`/seller/${u.id}`} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">Profile</Link>
                                            <button onClick={() => toggleStatus(u.id, u.status)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${u.status === 'Active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                                {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }

        function AdminReportsPage() {
            const { currentUser, reports, setReports, products, setProducts, showToast, setConfirmModal, addNotification } = useContext(AppContext);
            if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

            const handleResolve = (id) => {
                setReports(reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
                showToast("Report resolved.");
            };

            const handleDismiss = (id) => {
                setReports(reports.map(r => r.id === id ? { ...r, status: 'Dismissed' } : r));
                showToast("Report dismissed.");
            };

            const handleRemoveProduct = (productId, reportId) => {
                setConfirmModal({
                    title: "Remove Suspicious Product",
                    message: "Are you sure you want to remove this suspicious product?",
                    onConfirm: () => {
                        const targetProd = products.find(p => p.id === productId);
                        setProducts(products.filter(p => p.id !== productId));
                        setReports(reports.map(r => r.id === reportId ? { ...r, status: 'Resolved' } : r));
                        if (targetProd) {
                            addNotification(targetProd.sellerId, 'product', `Your product "${targetProd.name}" was removed by admin due to a report.`);
                        }
                        showToast("Product removed and report resolved.");
                    }
                });
            };

            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900">Reports Management</h1>
                        <p className="text-xs text-slate-500 mt-1">{reports.filter(r => r.status === 'Open').length} open reports</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        {reports.length === 0 ? (
                            <div className="p-12 text-center text-xs text-slate-400">No reports submitted.</div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {reports.map(r => {
                                    const prod = products.find(p => p.id === r.productId) || { name: "Removed Product" };
                                    return (
                                        <div key={r.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <StatusBadge status={r.status} type="general" />
                                                    <span className="text-xs font-bold text-red-600">{r.reason}</span>
                                                </div>
                                                <h4 className="font-bold text-slate-900 text-sm">Product: {prod.name}</h4>
                                                <p className="text-xs text-slate-600">"{r.description}"</p>
                                                <span className="text-[10px] text-slate-400">Submitted: {r.createdAt}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Link to={`/product/${r.productId}`} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">View Product</Link>
                                                {r.status === 'Open' && (
                                                    <>
                                                        <button onClick={() => handleResolve(r.id)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">Resolve</button>
                                                        <button onClick={() => handleDismiss(r.id)} className="px-3 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-bold">Dismiss</button>
                                                        <button onClick={() => handleRemoveProduct(r.productId, r.id)} className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold">Remove Product</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        function NotFound() {
            return (
                <div className="text-center py-24 space-y-4">
                    <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
                    <p className="text-sm text-slate-600">Page not found or requested resource does not exist.</p>
                    <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold">Go to Home</Link>
                </div>
            );
        }

        // ==========================================
        // APP ROUTER & ROOT
        // ==========================================
        function App() {
            return (
                <AppProvider>
                    <HashRouter>
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/products" element={<ProductsPage />} />
                                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/add-product" element={<AddProductPage />} />
                                    <Route path="/edit-product/:id" element={<EditProductPage />} />
                                    <Route path="/my-listings" element={<MyListingsPage />} />
                                    <Route path="/wishlist" element={<WishlistPage />} />
                                    <Route path="/requests" element={<RequestsPage />} />
                                    <Route path="/profile" element={<ProfilePage />} />
                                    <Route path="/seller/:id" element={<SellerProfilePage />} />
                                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                                    <Route path="/admin-products" element={<AdminProductsPage />} />
                                    <Route path="/admin-users" element={<AdminUsersPage />} />
                                    <Route path="/admin-reports" element={<AdminReportsPage />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </HashRouter>
                </AppProvider>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
