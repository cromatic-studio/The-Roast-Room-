import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Coffee } from 'lucide-react';
import './RatingArea.css';

// Official Google 'G' 4-color SVG Icon
export const GoogleGIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={{ flexShrink: 0 }}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Google Star Icon (Amber filled or outlined)
export const RatingStar: React.FC<{ filled?: boolean; size?: number }> = ({ filled = true, size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? '#FAAF00' : 'none'}
    stroke={filled ? '#FAAF00' : '#D1D5DB'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Review Data Interface
export interface GoogleReviewItem {
  id: string;
  name: string;
  timeAgo: string;
  rating: number; // 1-5
  comment: string;
  avatarType: 'image' | 'letter';
  avatarSrc?: string;
  avatarBg?: string;
}

const REVIEWS_DATA: GoogleReviewItem[] = [
  {
    id: 'sohini-yadav',
    name: 'sohini yadav',
    timeAgo: 'a month ago',
    rating: 5,
    comment:
      'Amazing coffee and such a calm vibe! The iced pour-over and flat white were brewed to absolute perfection. One of the best specialty coffee spots in Lucknow.',
    avatarType: 'letter',
    avatarBg: '#34A853',
  },
  {
    id: 'gaurvi',
    name: 'Gaurvi',
    timeAgo: 'a month ago',
    rating: 4,
    comment:
      'Loved the aesthetic atmosphere and the smell of freshly roasted beans. The pistachio latte was smooth and velvety without being overly sweet. Great place to catch up or unwind.',
    avatarType: 'image',
    avatarSrc: '/images/reviewer_gaurvi.jpg',
  },
  {
    id: 'shivanshu-mishra',
    name: 'SHIVANSHU MISHRA',
    timeAgo: '4 months ago',
    rating: 5,
    comment:
      'A coffee break that turned into an experience. Visited Overflow Coffee, Lucknow and loved the combination of specialty coffee, calm ambiance, and great food. A must-visit spot for anyone who truly appreciates a good brew!',
    avatarType: 'image',
    avatarSrc: '/images/reviewer_shivanshu.jpg',
  },
  {
    id: 'rohan-kapoor',
    name: 'Rohan Kapoor',
    timeAgo: '2 months ago',
    rating: 5,
    comment:
      'Hands down the finest specialty coffee in the city. You can genuinely taste the precision in the roasting profiles. Rich body, thick crema, and subtle chocolate notes.',
    avatarType: 'letter',
    avatarBg: '#8E24AA',
  },
  {
    id: 'ananya-saxena',
    name: 'Ananya Saxena',
    timeAgo: '3 months ago',
    rating: 5,
    comment:
      'Such a welcoming space with warm lighting and good music. Their beans are noticeably fresher than commercial chains. The Spanish latte is easily my favorite.',
    avatarType: 'letter',
    avatarBg: '#E65100',
  },
  {
    id: 'vikramaditya-singh',
    name: 'Vikramaditya S.',
    timeAgo: '5 months ago',
    rating: 5,
    comment:
      'Real third-wave specialty roastery standards right in Lucknow. SCA-level precision, friendly baristas who know origin profiles, and consistent espresso.',
    avatarType: 'letter',
    avatarBg: '#00897B',
  },
];

export const RatingArea: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  // Responsive visible cards count
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, REVIEWS_DATA.length - visibleCount);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const handleDotClick = (idx: number) => {
    setCurrentIndex(Math.min(idx, maxIndex));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  return (
    <section id="reviews" className="section-padding rating-reviews-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="pill-tag pill-forest">VERIFIED GOOGLE REVIEWS</span>
          <h2 className="section-title">Loved by specialty coffee drinkers.</h2>
          <p className="section-subtitle">
            Real feedback from patrons at our partner cafe, Overflow Coffee in Lucknow, powered by beans roasted fresh at The Roast Room.
          </p>
        </div>

        {/* The Rating Area Widget matching the user screenshot */}
        <div
          className="google-widget-container"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Google Reviews Carousel"
        >
          {/* LEFT: Business Overview Card */}
          <div className="google-overview-card">
            <div className="overview-header-row">
              <div className="overview-cafe-avatar">
                <img
                  src="/images/overflow_cafe.jpg"
                  alt="Overflow Coffee Cafe"
                  className="cafe-avatar-img"
                  onError={(e) => {
                    // Fallback to stylized roastery badge if image fails to load
                    (e.currentTarget as HTMLImageElement).src = '/images/roastery_craft.jpg';
                  }}
                />
              </div>

              <div className="overview-meta">
                <h3 className="overview-business-name">Overflow Coffee</h3>
                <div className="overview-rating-score-row">
                  <span className="overview-score">4.7</span>
                  <div className="overview-stars" aria-label="4.7 out of 5 stars">
                    <RatingStar filled={true} size={17} />
                    <RatingStar filled={true} size={17} />
                    <RatingStar filled={true} size={17} />
                    <RatingStar filled={true} size={17} />
                    <RatingStar filled={true} size={17} />
                  </div>
                </div>
              </div>
            </div>

            <p className="overview-reviews-count">Based on 174 reviews</p>

            <div className="overview-powered-by">
              <span>powered by </span>
              <span className="google-multicolor-text">
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
              </span>
            </div>

            <a
              href="https://maps.google.com/?q=Overflow+Coffee+Lucknow"
              target="_blank"
              rel="noopener noreferrer"
              className="google-review-btn"
              title="Review Overflow Coffee on Google"
            >
              <span>review us on</span>
              <div className="google-btn-badge">
                <GoogleGIcon size={14} />
              </div>
            </a>
          </div>

          {/* RIGHT: Reviews Carousel with Navigation */}
          <div className="google-carousel-wrapper">
            {/* Prev Nav Button */}
            <button
              type="button"
              className="carousel-arrow-btn prev-btn"
              onClick={handlePrev}
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slider track viewport */}
            <div
              className="reviews-track-viewport"
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="reviews-cards-track"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                  transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {REVIEWS_DATA.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="google-review-card-item"
                      style={{ flex: `0 0 ${100 / visibleCount}%` }}
                    >
                      <div className="google-review-card">
                        {/* Card Top: Avatar, Name, Time, and Google Icon */}
                        <div className="review-card-header">
                          <div className="review-user-info">
                            {item.avatarType === 'image' && item.avatarSrc ? (
                              <img
                                src={item.avatarSrc}
                                alt={item.name}
                                className="review-user-avatar-img"
                              />
                            ) : (
                              <div
                                className="review-user-letter-avatar"
                                style={{ backgroundColor: item.avatarBg || '#34A853' }}
                              >
                                {item.name.charAt(0).toUpperCase()}
                              </div>
                            )}

                            <div className="review-user-text">
                              <h4 className="review-user-name">{item.name}</h4>
                              <span className="review-user-time">{item.timeAgo}</span>
                            </div>
                          </div>

                          <div className="review-card-google-logo">
                            <GoogleGIcon size={18} />
                          </div>
                        </div>

                        {/* Star Rating Row */}
                        <div className="review-stars-row" aria-label={`${item.rating} out of 5 stars`}>
                          {[1, 2, 3, 4, 5].map((starIndex) => (
                            <RatingStar
                              key={starIndex}
                              filled={starIndex <= item.rating}
                              size={16}
                            />
                          ))}
                        </div>

                        {/* Review Comment Body with sleek scrollbar for overflow */}
                        <div className="review-comment-body">
                          <p>{item.comment}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Nav Button */}
            <button
              type="button"
              className="carousel-arrow-btn next-btn"
              onClick={handleNext}
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="carousel-dots-row">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Subtle Roaster Assurance Note */}
        <div className="reviews-footer-note">
          <Coffee size={18} className="text-orange" aria-hidden="true" style={{ color: '#D95F2D', flexShrink: 0 }} />
          <span>Every cup served at Overflow Coffee is freshly roasted in small batches by <strong>The Roast Room</strong> in Lucknow.</span>
        </div>
      </div>
    </section>
  );
};

export default RatingArea;
