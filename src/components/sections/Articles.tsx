'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ArticleModal from '../ui/ArticleModal';
import { articlesData } from '../data/articlesData';

const Articles = () => {
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Анимация для контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Анимация для статьи
  const articleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleArticleClick = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedArticle(id);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  const getSelectedArticle = () => {
    if (selectedArticle === null) return null;
    return articlesData.find(article => article.id === selectedArticle) || null;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const articleWidth = containerWidth / 3; // Ширина одной статьи
      scrollContainerRef.current.scrollBy({
        left: -articleWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const articleWidth = containerWidth / 3; // Ширина одной статьи
      scrollContainerRef.current.scrollBy({
        left: articleWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="articles" 
      ref={sectionRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold font-display mb-6"
          >
            Полезные <span className="text-gradient">статьи</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground/80 max-w-2xl mx-auto"
          >
            Делимся экспертными знаниями и полезными советами для тех, кто хочет создать эффективный и современный сайт
          </motion.p>
        </div>

        <div className="relative">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 hide-scrollbar scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            ref={scrollContainerRef}
          >
            {articlesData.map((article) => (
              <motion.article 
                key={article.id}
                variants={articleVariants}
                className="bg-card rounded-xl overflow-hidden border border-border group hover:shadow-lg transition-all duration-300 min-w-[calc(33.333%-1rem)] snap-start"
                onMouseEnter={() => setHoveredArticle(article.id)}
                onMouseLeave={() => setHoveredArticle(null)}
              >
                <a 
                  href={`#article-${article.slug}`}
                  onClick={(e) => handleArticleClick(article.id, e)}
                  className="block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className={`object-cover transition-transform duration-500 ${
                        hoveredArticle === article.id ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-accent/90 text-white text-xs rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-foreground/60 mb-3">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime} чтения</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="text-foreground/70 text-sm mb-4">
                      {article.content.intro.substring(0, 120)}...
                    </p>
                    
                    <div className="flex items-center text-accent font-medium">
                      <span>Читать статью</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </motion.div>

          {/* Кнопки прокрутки */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-14 h-14 bg-card/95 border border-border rounded-full shadow-lg flex items-center justify-center text-foreground/70 hover:text-accent transition-colors z-10 backdrop-blur-sm group"
            aria-label="Предыдущие статьи"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:-translate-x-0.5 transition-transform"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-14 h-14 bg-card/95 border border-border rounded-full shadow-lg flex items-center justify-center text-foreground/70 hover:text-accent transition-colors z-10 backdrop-blur-sm group"
            aria-label="Следующие статьи"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Модальное окно для статьи */}
      <ArticleModal 
        isOpen={selectedArticle !== null}
        onClose={handleCloseModal}
        article={getSelectedArticle()}
      />
    </section>
  );
};

export default Articles; 