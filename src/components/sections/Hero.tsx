'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactModal from '@/components/sections/ContactModal';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ParallaxItem from '@/components/ui/ParallaxItem';
import MagneticButton from '@/components/ui/MagneticButton';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Регистрируем плагины GSAP
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Анимация для фона
      gsap.to(containerRef.current, {
        backgroundPositionY: '30%',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Анимированный фон */}
      <AnimatedBackground />
      
      {/* Декоративные элементы с параллакс-эффектом */}
      <ParallaxItem speed={0.3} className="absolute top-1/4 left-10 w-64 h-64 opacity-50 z-0">
        <div className="w-full h-full rounded-full bg-accent/10 filter blur-3xl"></div>
      </ParallaxItem>
      
      <ParallaxItem speed={-0.2} className="absolute bottom-1/4 right-10 w-64 h-64 opacity-50 z-0">
        <div className="w-full h-full rounded-full bg-secondary/10 filter blur-3xl"></div>
      </ParallaxItem>
      
      {/* Декоративные круги */}
      <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-accent z-0"></div>
      <div className="absolute top-[30%] right-[20%] w-3 h-3 rounded-full bg-secondary z-0"></div>
      <div className="absolute bottom-[25%] left-[30%] w-4 h-4 rounded-full bg-accent/50 z-0"></div>
      
      {/* Декоративные линии */}
      <div className="absolute top-[10%] left-[5%] w-[150px] h-[1px] bg-gradient-to-r from-accent to-transparent z-0"></div>
      <div className="absolute bottom-[15%] right-[5%] w-[150px] h-[1px] bg-gradient-to-l from-secondary to-transparent z-0"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Премиальная веб-студия
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Создаем <span className="text-gradient">цифровые</span> впечатления, которые <span className="text-gradient">запоминаются</span>
            </motion.h1>
            
            <motion.p 
              ref={subtitleRef}
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10"
            >
              Мы разрабатываем сложные профессиональные сайты с уникальным дизайном и анимацией, выделяющие ваш бренд среди конкурентов.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactModal 
                buttonText="Обсудить проект" 
                buttonSize="lg"
                buttonClassName="px-8"
              />
              
              <MagneticButton 
                className="bg-transparent border border-border hover:border-accent text-foreground hover:text-accent px-8 py-4 rounded-full transition-colors duration-300 text-base font-medium"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Смотреть проекты
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Добавляем пульсирующий элемент для привлечения внимания */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="pulse w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-accent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 