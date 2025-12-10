import './GlassCard.css';

export default function GlassCard({ children, className = '', onClick }) {
  return (
    <div className={`glass-card-component ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
