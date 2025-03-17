'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface ArticleContent {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string;
      image?: string;
    }[];
    conclusion: string;
  };
}

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: ArticleContent | null;
}

const ArticleModal = ({ isOpen, onClose, article }: ArticleModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Не блокируем прокрутку страницы при открытом модальном окне
    // Это позволит прокручивать содержимое на мобильных устройствах
  }, [isOpen]);

  // Обработчик нажатия клавиши Escape для закрытия модального окна
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Не рендерим на сервере
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && article && (
        <>
          {/* Затемнение фона */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/70 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Модальное окно */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
            onClick={onClose}
          >
            <div 
              className="bg-card/95 w-full max-w-4xl my-8 rounded-2xl shadow-xl border border-border relative backdrop-blur-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-accent transition-colors duration-300"
                aria-label="Закрыть"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Изображение статьи */}
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 bg-accent/90 text-white text-xs rounded-full mb-3 inline-block">
                    {article.category}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-bold text-white">{article.title}</h1>
                  <div className="flex items-center text-sm text-white/80 mt-2">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime} чтения</span>
                  </div>
                </div>
              </div>

              {/* Содержимое статьи */}
              <div className="p-6 md:p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg font-medium text-foreground/90 mb-8">{article.content.intro}</p>
                  
                  {article.content.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                      <p className="mb-4">{section.content}</p>
                      {section.image && (
                        <div className="relative h-64 w-full my-6 rounded-xl overflow-hidden">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <h2 className="text-2xl font-bold mb-4">Заключение</h2>
                    <p>{article.content.conclusion}</p>
                  </div>
                </div>
                
                {/* Кнопка "Назад" */}
                <div className="mt-8 text-center">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors duration-300 shadow-lg"
                  >
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
                      className="mr-2"
                    >
                      <path d="M19 12H5"></path>
                      <path d="M12 19l-7-7 7-7"></path>
                    </svg>
                    <span>Вернуться к статьям</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal; 