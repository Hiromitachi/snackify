import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import './Welcome.css';

export default function Welcome({ onComplete }) {
    const navigate = useNavigate();
    const [step, setStep] = useState('form'); // 'form' or 'landing'
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'female'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Move to landing page after form submission
        setStep('landing');

        // Auto-navigate after 3 seconds of landing page
        setTimeout(() => {
            // Save user data to localStorage
            const userData = {
                name: formData.name,
                age: formData.age,
                gender: formData.gender,
                // Use illustrated emoji avatar (will be rendered as styled component)
                avatar: formData.gender === 'female' ? '👩' : '👨',
                avatarBg: formData.gender === 'female' ? '#FFB84D' : '#9B7EDE', // Yellow for female, Purple for male
                username: `@${formData.name.toLowerCase().replace(/\s+/g, '')}`,
                bio: 'Snack enthusiast 🍿 | Food lover',
                tagline: 'Snack Explorer',
                stats: {
                    reviewed: 0,
                    likes: 0,
                    avgRating: 0
                }
            };

            localStorage.setItem('snackifyUser', JSON.stringify(userData));

            // Trigger custom event to notify App component
            window.dispatchEvent(new Event('userDataUpdated'));

            // Call onComplete callback if provided
            if (onComplete) {
                onComplete();
            }

            // Navigate to home
            navigate('/', { replace: true });
        }, 3000);
    };

    return (
        <div className="welcome-page">
            {/* Step 1: Onboarding Form */}
            {step === 'form' && (
                <div className="onboarding-screen active">
                    <div className="container">
                        <div className="welcome-content fade-in">
                            <div className="welcome-header">
                                <h1 className="welcome-title">Welcome to Snackify! 🍿</h1>
                                <p className="welcome-subtitle">Let's get to know you better</p>
                            </div>

                            <GlassCard className="welcome-card">
                                <form onSubmit={handleSubmit} className="welcome-form">
                                    {/* Avatar Preview */}
                                    <div className="avatar-preview-section">
                                        <div className={`avatar-preview-illustrated ${formData.gender}`}>
                                            <div className="illustrated-avatar-face">
                                                {formData.gender === 'female' ? '👩' : '👨'}
                                            </div>
                                        </div>
                                        <p className="avatar-label">Your Avatar</p>
                                    </div>

                                    {/* Name Input */}
                                    <div className="form-group">
                                        <label className="form-label">What's your name?</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    {/* Age Input */}
                                    <div className="form-group">
                                        <label className="form-label">How old are you?</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="Enter your age"
                                            min="13"
                                            max="120"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            required
                                        />
                                    </div>

                                    {/* Gender Selection */}
                                    <div className="form-group">
                                        <label className="form-label">Select your gender</label>
                                        <div className="gender-options">
                                            <button
                                                type="button"
                                                className={`gender-button ${formData.gender === 'female' ? 'active' : ''}`}
                                                onClick={() => setFormData({ ...formData, gender: 'female' })}
                                            >
                                                <span className="gender-icon">👩</span>
                                                <span>Female</span>
                                            </button>
                                            <button
                                                type="button"
                                                className={`gender-button ${formData.gender === 'male' ? 'active' : ''}`}
                                                onClick={() => setFormData({ ...formData, gender: 'male' })}
                                            >
                                                <span className="gender-icon">👨</span>
                                                <span>Male</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="welcome-submit-btn">
                                        Continue
                                    </button>
                                </form>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Landing Screen */}
            {step === 'landing' && (
                <div className="landing-screen active">
                    <div className="food-pattern">
                        {/* Food Icons Pattern */}
                        <div className="food-icons">
                            {['🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍩', '🍪', '🍫', '🍬', '🥤', '🍦', '🌮', '🥨', '🍕', '🍔', '🍟', '🌭', '🍿', '🧁'].map((icon, index) => (
                                <span key={index} className="food-icon" style={{
                                    animationDelay: `${index * 0.1}s`,
                                    left: `${(index % 5) * 20}%`,
                                    top: `${Math.floor(index / 5) * 20}%`
                                }}>
                                    {icon}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="landing-content">
                        <h1 className="landing-title">SNACKIFY!</h1>
                        <p className="landing-tagline">May the best taste bud win!</p>
                        <p className="landing-message">Now you can rate, review, and discover the trendiest, hottest snacks!</p>
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
