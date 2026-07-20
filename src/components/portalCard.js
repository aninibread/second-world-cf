import Link from 'next/link';

export default function PortalCard({
  href,
  title,
  subtitle,
  variant,
  imageUrl,
  preview,
}) {
  return (
    <Link href={href} className={`portal-card portal-card--${variant}`}>
      <div className="portal-card-body">
        <div className="portal-card-text">
          <span className="portal-card-title">{title}</span>
          <span className="portal-card-subtitle">{subtitle}</span>
        </div>

        <span className="portal-card-arrow" aria-hidden="true">
          →
        </span>
      </div>

      {variant === 'cat' && imageUrl && (
        <div className="portal-card-visual">
          <img src={imageUrl} alt="" className="portal-card-image" />
        </div>
      )}

      {variant === 'board' && preview && (
        <div className="portal-card-note" aria-hidden="true">
          <p className="portal-card-note-text">{preview.text}</p>
          <span className="portal-card-note-author">— {preview.name}</span>
        </div>
      )}
    </Link>
  );
}
