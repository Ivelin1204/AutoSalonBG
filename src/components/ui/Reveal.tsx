import type { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import { cx } from '../../utils/format';

type Direction = 'up' | 'left' | 'right';

interface RevealProps {
  children: ReactNode;
  /** Откъде влиза елементът */
  direction?: Direction;
  /** Закъснение в милисекунди (за поредни анимации) */
  delay?: number;
  threshold?: number;
  className?: string;
}

/** Плавно показва съдържанието, когато се скролне до него. */
export function Reveal({ children, direction = 'up', delay = 0, threshold, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);

  return (
    <div
      ref={ref}
      className={cx('reveal', `reveal--${direction}`, inView && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
