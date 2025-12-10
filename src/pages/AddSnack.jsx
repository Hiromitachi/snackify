import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import RatingStars from '../components/RatingStars';
import { categories } from '../data/mockData';
import './AddSnack.css';

export default function AddSnack() {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: 'Sweet',
        rating: 0,
        review: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get current user data
        const userData = JSON.parse(localStorage.getItem('snackifyUser') || '{}');

        // Create new snack object
        const newSnack = {
            id: Date.now(), // Simple ID generation
            name: formData.name,
            brand: formData.brand || 'Unknown Brand',
            category: formData.category,
            rating: formData.rating,
            reviewCount: 1,
            image: imagePreview || '/snack_chips_1765382741382.png', // Default image if none uploaded
            description: formData.review,
            addedBy: userData.name,
            addedAt: new Date().toISOString()
        };

        // Get existing user snacks from localStorage
        const userSnacks = JSON.parse(localStorage.getItem('userSnacks') || '[]');
        userSnacks.unshift(newSnack); // Add to beginning
        localStorage.setItem('userSnacks', JSON.stringify(userSnacks));

        // Update user stats
        userData.stats.reviewed = (userData.stats.reviewed || 0) + 1;
        if (userData.stats.avgRating === 0) {
            userData.stats.avgRating = formData.rating;
        } else {
            // Calculate new average
            const totalReviews = userData.stats.reviewed;
            userData.stats.avgRating = ((userData.stats.avgRating * (totalReviews - 1)) + formData.rating) / totalReviews;
            userData.stats.avgRating = Math.round(userData.stats.avgRating * 10) / 10; // Round to 1 decimal
        }
        localStorage.setItem('snackifyUser', JSON.stringify(userData));

        // Show success message
        setShowSuccess(true);

        // Navigate to profile after 2 seconds
        setTimeout(() => {
            navigate('/profile');
        }, 2000);
    };

    return (
        <div className="add-snack-page">
            <div className="container">
                <GlassCard className="add-snack-card fade-in">
                    <h1 className="page-title">Add a New Snack 🍿</h1>
                    <p className="page-subtitle">Share your favorite snack with the community</p>

                    {showSuccess && (
                        <div className="success-message">
                            <span className="success-icon">✅</span>
                            <span>Snack added successfully! Redirecting to your profile...</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="snack-form">
                        {/* Image Upload */}
                        <div className="form-section">
                            <label className="form-label">Snack Photo</label>
                            <div className="image-upload-area">
                                {imagePreview ? (
                                    <div className="image-preview-wrapper">
                                        <img src={imagePreview} alt="Preview" className="image-preview" />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setFormData({ ...formData, image: null });
                                            }}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="upload-placeholder">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="file-input"
                                        />
                                        <Upload size={40} />
                                        <span>Click to upload snack photo</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Snack Name */}
                        <div className="form-section">
                            <label className="form-label">Snack Name *</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g., Rainbow Chips"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        {/* Brand */}
                        <div className="form-section">
                            <label className="form-label">Brand (Optional)</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g., CrunchCo"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            />
                        </div>

                        {/* Category */}
                        <div className="form-section">
                            <label className="form-label">Category *</label>
                            <select
                                className="form-select"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                {categories.filter(c => c.name !== 'All').map((cat) => (
                                    <option key={cat.name} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rating */}
                        <div className="form-section">
                            <label className="form-label">Your Rating *</label>
                            <RatingStars
                                rating={formData.rating}
                                interactive={true}
                                size={32}
                                onRate={(rating) => setFormData({ ...formData, rating })}
                            />
                        </div>

                        {/* Review */}
                        <div className="form-section">
                            <label className="form-label">Your Review *</label>
                            <textarea
                                className="form-textarea"
                                placeholder="Share your thoughts about this snack..."
                                rows={5}
                                value={formData.review}
                                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
                                Cancel
                            </button>
                            <button type="submit" className="submit-btn" disabled={showSuccess}>
                                {showSuccess ? 'Saving...' : 'Add Snack'}
                            </button>
                        </div>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
}
