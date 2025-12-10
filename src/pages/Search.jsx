import { Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import RatingStars from '../components/RatingStars';
import Badge from '../components/Badge';
import { mockSnacks } from '../data/mockData';
import './Search.css';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredSnacks = searchQuery
        ? mockSnacks.filter(snack =>
            snack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snack.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snack.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className="search-page">
            <div className="container">
                <div className="search-header fade-in">
                    <h1 className="search-title">Search Snacks 🔍</h1>
                    <div className="search-bar-large glass-card">
                        <SearchIcon size={24} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name, brand, or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input-large"
                            autoFocus
                        />
                    </div>
                </div>

                {searchQuery && (
                    <div className="search-results">
                        <h2 className="results-title">
                            {filteredSnacks.length > 0
                                ? `Found ${filteredSnacks.length} snack${filteredSnacks.length !== 1 ? 's' : ''}`
                                : 'No snacks found'}
                        </h2>

                        {filteredSnacks.length > 0 && (
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
                                                <Badge>
                                                    {snack.category}
                                                </Badge>
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
                        )}
                    </div>
                )}

                {!searchQuery && (
                    <div className="search-empty">
                        <p>Start typing to search for snacks...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
