import './Avatar.css';

export default function Avatar({ name, src, size = 'md' }) {
    // Check if src is an emoji (single character)
    const isEmoji = src && src.length <= 2;

    // Get user data for avatar background color
    const userData = JSON.parse(localStorage.getItem('snackifyUser') || '{}');
    const avatarBg = userData.avatarBg || '#FFB84D';

    const getInitials = (name) => {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className={`avatar avatar-${size}`}>
            {isEmoji ? (
                <div className="avatar-illustrated" style={{ background: avatarBg }}>
                    <span className="avatar-emoji">{src}</span>
                </div>
            ) : src ? (
                <img src={src} alt={name} className="avatar-image" />
            ) : (
                <div className="avatar-initials" style={{ background: avatarBg }}>
                    {getInitials(name)}
                </div>
            )}
        </div>
    );
}
