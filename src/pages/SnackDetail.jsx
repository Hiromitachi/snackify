import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import RatingStars from '../components/RatingStars';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import { mockSnacks, mockReviews } from '../data/mockData';
import './SnackDetail.css';

export default function SnackDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showReviewModal, setShowReviewModal] = useState(false);

    const snack = mockSnacks.find(s => s.id === parseInt(id));
    const reviews = mockReviews.filter(r => r.snackId === parseInt(id));

    if (!snack) {
        return (
            <div className="snack-detail-page">
                <div className="container">
                    <p>Snack not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="snack-detail-page">
            <div className="container">
                {/* Back Button */}
                <button className="back-button glass-card" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                {/* Snack Hero */}
                <GlassCard className="snack-hero fade-in">
                    <div className="hero-content">
                        <div className="hero-image-wrapper">
                            <img src={snack.image} alt={snack.name} className="hero-image" />
                        </div>
                        <div className="hero-info">
                            <div className="hero-header">
                                <div>
                                    <h1 className="hero-title">{snack.name}</h1>
                                    <p className="hero-brand">{snack.brand}</p>
                                </div>
                                <Badge>
                                    {snack.category}
                                </Badge>
                            </div>
                            <p className="hero-description">{snack.description}</p>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <RatingStars rating={snack.rating} size={24} />
                                    <span className="stat-value">{snack.rating} / 5</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <MessageCircle size={20} />
                                    <span className="stat-value">{snack.reviewCount} reviews</span>
                                </div>
                            </div>
                            <button className="add-review-btn" onClick={() => setShowReviewModal(true)}>
                                Add Your Review
                            </button>
                        </div>
                    </div>
                </GlassCard>

                {/* Reviews Section */}
                <div className="reviews-section">
                    <h2 className="section-title">Community Reviews</h2>
                    <div className="reviews-list">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <GlassCard key={review.id} className="review-card scale-in">
                                    <div className="review-header">
                                        <Avatar name={review.userName} src={review.userAvatar} size="md" />
                                        <div className="review-user-info">
                                            <h4 className="review-user-name">{review.userName}</h4>
                                            <span className="review-date">{review.createdAt}</span>
                                        </div>
                                        <RatingStars rating={review.rating} size={16} />
                                    </div>
                                    <p className="review-text">{review.text}</p>
                                    <div className="review-footer">
                                        <button className="like-button">
                                            <Heart size={16} />
                                            <span>{review.likes}</span>
                                        </button>
                                    </div>
                                </GlassCard>
                            ))
                        ) : (
                            <div className="no-reviews">
                                <p>No reviews yet. Be the first to review this snack!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {showReviewModal && (
                <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
                    <GlassCard className="review-modal" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Add Your Review</h3>
                        <div className="modal-content">
                            <div className="form-group">
                                <label>Your Rating</label>
                                <RatingStars rating={0} interactive={true} size={28} />
                            </div>
                            <div className="form-group">
                                <label>Your Review</label>
                                <textarea
                                    className="review-textarea"
                                    placeholder="Share your thoughts about this snack..."
                                    rows={5}
                                ></textarea>
                            </div>
                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={() => setShowReviewModal(false)}>
                                    Cancel
                                </button>
                                <button className="submit-btn">
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            )}
        </div>
    );
}
