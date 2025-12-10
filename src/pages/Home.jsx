import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import PillButton from '../components/PillButton';
import RatingStars from '../components/RatingStars';
import Badge from '../components/Badge';
import { mockSnacks, categories } from '../data/mockData';
import './Home.css';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredSnacks = mockSnacks.filter(snack => {
        const matchesCategory = selectedCategory === 'All' || snack.category === selectedCategory;
        const matchesSearch = snack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snack.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="home-page">
            <div className="container">
                {/* Hero Section */}
                <div className="hero-section fade-in">
                    <h1 className="hero-title">Discover Your Next<br />Favorite Snack 🍿</h1>
                    <p className="hero-subtitle">Join the community of snack lovers</p>

                    {/* Search Bar */}
                    <div className="search-bar">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for snacks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="categories-section">
                    <h2 className="section-title">Categories</h2>
                    <div className="categories-scroll">
                        {categories.map((category) => (
                            <PillButton
                                key={category.name}
                                active={selectedCategory === category.name}
                                onClick={() => setSelectedCategory(category.name)}
                            >
                                {category.name}
                            </PillButton>
                        ))}
                    </div>
                </div>

                {/* Trending Snacks */}
                <div className="snacks-section">
                    <h2 className="section-title">
                        {selectedCategory === 'All' ? 'Trending Snacks' : `${selectedCategory} Snacks`}
                    </h2>
                    <div className="snacks-grid">
                        {filteredSnacks.map((snack) => (
                            <GlassCard
                                key={snack.id}
                                className="snack-card scale-in"
                                onClick={() => navigate(`/snack/${snack.id}`)}
                            >
                                <div className="snack-image-wrapper">
                                    <img src={snack.image} alt={snack.name} className="snack-image" />
                                </div>
                                <div className="snack-info">
                                    <div className="snack-header">
                                        <h3 className="snack-name">{snack.name}</h3>
                                        <Badge>{snack.category}</Badge>
                                    </div>
                                    <p className="snack-brand">{snack.brand}</p>
                                    <div className="snack-footer">
                                        <RatingStars rating={snack.rating} size={16} />
                                        <span className="review-count">{snack.reviewCount} reviews</span>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                    {filteredSnacks.length === 0 && (
                        <div className="no-results">
                            <p>No snacks found. Try a different search or category!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
