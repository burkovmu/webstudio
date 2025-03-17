'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxItemProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Скорость параллакса (положительное или отрицательное число)
  direction?: 'vertical' | 'horizontal';
  offset?: number; // Смещение в пикселях
}

const ParallaxItem = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
  offset = 0,
}: ParallaxItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Создаем трансформацию в зависимости от направления
  const getTransformValue = (value: MotionValue<number>) => {
    if (direction === 'vertical') {
      // Преобразуем scrollYProgress в пиксели (от -offset до offset)
      return useTransform(value, [0, 1], [-offset - 100 * speed, offset + 100 * speed]);
    } else {
      // Для горизонтального параллакса
      return useTransform(value, [0, 1], [-offset - 100 * speed, offset + 100 * speed]);
    }
  };

  const y = direction === 'vertical' ? getTransformValue(scrollYProgress) : 0;
  const x = direction === 'horizontal' ? getTransformValue(scrollYProgress) : 0;

  return (
    <motion.div
      ref={ref}
      className={`relative z-0 ${className}`}
      style={{
        x,
        y,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxItem; 