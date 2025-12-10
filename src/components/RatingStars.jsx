import { Star } from 'lucide-react';
import { useState } from 'react';
import './RatingStars.css';

export default function RatingStars({ rating = 0, interactive = false, onRate, size = 20 }) {
    const [hoverRating, setHoverRating] = useState(0);

    const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

    return (
        <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`star ${star <= displayRating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
                    fill={star <= displayRating ? '#FFD700' : 'none'}
                    stroke={star <= displayRating ? '#FFD700' : '#CBD5E0'}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    onClick={() => interactive && onRate && onRate(star)}
                />
            ))}
        </div>
    );
}
