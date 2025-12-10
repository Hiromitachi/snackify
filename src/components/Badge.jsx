import './Badge.css';

export default function Badge({ children, icon }) {
    return (
        <div className="badge">
            {icon && <span className="badge-icon">{icon}</span>}
            <span>{children}</span>
        </div>
    );
}
