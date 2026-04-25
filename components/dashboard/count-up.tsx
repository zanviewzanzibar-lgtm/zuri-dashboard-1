"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** End value (number). For values like "$14,820" pass 14820 and use prefix="$". */
  end: number;
  /** Duration in ms. */
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Thousands separator using locale formatting. */
  locale?: string;
  className?: string;
  /** Delay before starting (ms). */
  delay?: number;
}

/**
 * Eases from 0 to `end` on mount using requestAnimationFrame.
 * Uses easeOutExpo for a premium "settle" feel.
 */
export function CountUp({
  end,
  duration = 1100,
  prefix = "",
  suffix = "",
  decimals = 0,
  locale = "en-US",
  className,
  delay = 0,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const animate = (now: number) => {
        if (startRef.current === null) startRef.current = now;
        const elapsed = now - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(end * eased);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [end, duration, delay]);

  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
