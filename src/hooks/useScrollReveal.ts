import { useEffect, useState } from 'react';

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  reObserveOnUpdate?: boolean;
}

/**
 * useScrollReveal
 * A high-performance, GPU-accelerated IntersectionObserver hook for scroll animations.
 * Observes all elements marked with `[data-reveal]` or `.reveal-on-scroll`.
 * Also tracks document scroll progress (0-100%).
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
  } = options;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.setAttribute('data-revealed', 'true');
        el.classList.add('is-revealed');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.setAttribute('data-revealed', 'true');
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            entry.target.classList.add('is-revealed');
            // Unobserve after entrance so animation plays cleanly once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(
        '[data-reveal]:not([data-revealed="true"]), .reveal-on-scroll:not(.is-revealed)'
      );
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observation
    observeAll();

    // Re-scan after short delay in case of dynamic image/model layout stabilization
    const timer = setTimeout(observeAll, 300);

    // Watch for DOM mutations to catch newly rendered cards/tabs
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Track scroll progress for top glowing bar
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)) : 0;
          setScrollProgress(progress);
          setIsScrolled(currentScroll > 120);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, rootMargin]);

  return { scrollProgress, isScrolled };
}
