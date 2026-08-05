import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AddProductPage } from './pages/AddProductPage';
import { EditProductPage } from './pages/EditProductPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { WishlistPage } from './pages/WishlistPage';
import { RequestsPage } from './pages/RequestsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SellerProfilePage } from './pages/SellerProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminReportsPage } from './pages/AdminReportsPage';
import { NotFound } from './pages/NotFound';

export default function App() {
    return (
        <AppProvider>
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
        </AppProvider>
    );
}
