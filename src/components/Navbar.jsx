import { Home, Search, PlusCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/search', icon: Search, label: 'Search' },
        { path: '/add-snack', icon: PlusCircle, label: 'Add' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="navbar glass-card">
            <div className="navbar-content">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={24} />
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
