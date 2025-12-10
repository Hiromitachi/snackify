import './PillButton.css';

export default function PillButton({ children, active = false, onClick }) {
    return (
        <button
            className={`pill-button ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
