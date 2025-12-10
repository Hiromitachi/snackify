import { Award, Heart, Star, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import RatingStars from '../components/RatingStars';
import { mockSnacks, userBadges } from '../data/mockData';
import './Profile.css';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('reviewed');
    const [user, setUser] = useState(null);
    const [userSnacks, setUserSnacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load user data from localStorage
        const userData = localStorage.getItem('snackifyUser');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Load user's added snacks
        const snacks = localStorage.getItem('userSnacks');
        if (snacks) {
            setUserSnacks(JSON.parse(snacks));
        }
    }, []);

    // Mock liked snacks (subset of mockSnacks)
    const likedSnacks = mockSnacks.slice(2, 5);

    if (!user) {
        return <div className="profile-page">Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="container">
                {/* Profile Header - New Design */}
                <div className="profile-header-new fade-in">
                    <GlassCard className="profile-card">
                        {/* Profile Content Container */}
                        <div className="profile-content-wrapper">
                            {/* Left Side - Avatar */}
                            <div className="profile-left">
                                <div className={`profile-avatar-container ${user.gender}`}>
                                    <Avatar name={user.name} src={user.avatar} size="xl" />
                                </div>
                            </div>

                            {/* Right Side - Info */}
                            <div className="profile-right">
                                <h1 className="profile-name-large">{user.name}</h1>
                                <p className="profile-tagline">{user.tagline}</p>
                                <p className="profile-username-new">{user.username}</p>
                                <p className="profile-bio-new">{user.bio}</p>
                            </div>
                        </div>

                        {/* Stats Cards Below */}
                        <div className="stats-cards-container">
                            <div className="stat-card-new">
                                <Star size={20} className="stat-icon-new" />
                                <div className="stat-content">
                                    <span className="stat-number-new">{user.stats.reviewed}</span>
                                    <span className="stat-label-new">Reviews</span>
                                </div>
                            </div>

                            <div className="stat-card-new highlight">
                                <TrendingUp size={20} className="stat-icon-new" />
                                <div className="stat-content">
                                    <span className="stat-number-new">{user.stats.avgRating || '0.0'}</span>
                                    <span className="stat-label-new">Avg Rating</span>
                                </div>
                            </div>

                            <div className="stat-card-new">
                                <Heart size={20} className="stat-icon-new" />
                                <div className="stat-content">
                                    <span className="stat-number-new">{user.stats.likes}</span>
                                    <span className="stat-label-new">Likes</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Badges Section */}
                <div className="badges-section">
                    <h2 className="section-title">Achievements 🏆</h2>
                    <div className="badges-grid">
                        {userBadges.map((badge, index) => (
                            <GlassCard key={index} className="badge-card scale-in">
                                <div className="badge-icon-large">{badge.icon}</div>
                                <h3 className="badge-name">{badge.name}</h3>
                                <p className="badge-description">{badge.description}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="tabs-section">
                    <div className="tabs-header">
                        <button
                            className={`tab-button ${activeTab === 'reviewed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviewed')}
                        >
                            My Snacks ({userSnacks.length})
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'liked' ? 'active' : ''}`}
                            onClick={() => setActiveTab('liked')}
                        >
                            Liked Snacks
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'reviewed' && (
                            <div className="snacks-grid">
                                {userSnacks.length > 0 ? (
                                    userSnacks.map((snack) => (
                                        <GlassCard
                                            key={snack.id}
                                            className="snack-card"
                                            onClick={() => navigate(`/snack/${snack.id}`)}
                                        >
                                            <div className="snack-image-wrapper">
                                                <img src={snack.image} alt={snack.name} className="snack-image" />
                                            </div>
                                            <div className="snack-info">
                                                <h3 className="snack-name">{snack.name}</h3>
                                                <p className="snack-brand">{snack.brand}</p>
                                                <div className="snack-footer">
                                                    <RatingStars rating={snack.rating} size={14} />
                                                    <Badge>{snack.category}</Badge>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p className="empty-icon">🍿</p>
                                        <p className="empty-text">You haven't added any snacks yet!</p>
                                        <button className="add-snack-btn" onClick={() => navigate('/add-snack')}>
                                            Add Your First Snack
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'liked' && (
                            <div className="snacks-grid">
                                {likedSnacks.map((snack) => (
                                    <GlassCard
                                        key={snack.id}
                                        className="snack-card"
                                        onClick={() => navigate(`/snack/${snack.id}`)}
                                    >
                                        <div className="snack-image-wrapper">
                                            <img src={snack.image} alt={snack.name} className="snack-image" />
                                        </div>
                                        <div className="snack-info">
                                            <h3 className="snack-name">{snack.name}</h3>
                                            <div className="snack-footer">
                                                <RatingStars rating={snack.rating} size={14} />
                                                <Badge>{snack.category}</Badge>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
