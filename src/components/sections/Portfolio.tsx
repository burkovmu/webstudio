'use client';

import React, { useState, useRef, memo, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ContactModal from './ContactModal';
import Button from '@/components/ui/Button';

// Определение типов для проекта
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  placeholder: string;
  category: string;
  tags: string[];
  features: string[];
}

// Типы для пропсов компонентов
interface ProjectCardProps {
  project: Project;
  onClick: (id: number) => void;
  isHovered: boolean;
  onHover: (id: number) => void;
  onHoverEnd: () => void;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Мемоизированный компонент проекта для предотвращения лишних ререндеров
const ProjectCard = memo(({ project, onClick, isHovered, onHover, onHoverEnd }: ProjectCardProps) => {
  return (
    <div
      className="project-card relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onHoverEnd}
      style={{ 
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
        willChange: 'transform' // Подсказка браузеру для оптимизации
      }}
    >
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        {/* Градиентный оверлей */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
        
        {/* Фоновая анимация при наведении */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          placeholder="blur"
          blurDataURL={project.placeholder || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
        
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
          {/* Категория */}
          <span
            className="inline-block py-1 px-3 rounded-full bg-accent/20 backdrop-blur-sm text-white text-xs font-medium mb-3 w-fit"
          >
            {project.category}
          </span>
          
          {/* Заголовок */}
          <h3 
            className="text-2xl md:text-3xl font-bold mb-2"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
              {project.title}
            </span>
          </h3>
          
          {/* Описание */}
          <p 
            className={`text-white/90 mb-4 line-clamp-2 md:line-clamp-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}
          >
            {project.description}
          </p>
          
          {/* Теги */}
          <div 
            className="flex flex-wrap gap-2 mb-4"
          >
            {project.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-xs text-white/90 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Кнопка */}
          <div
            className={`transform transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Button 
              onClick={() => onClick(project.id)}
              variant="gradient"
              size="md"
              className="w-full sm:w-auto"
            >
              Подробнее о проекте
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Мемоизированный компонент модального окна
const ProjectModal = memo(({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-card/95 backdrop-blur-lg rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={project.placeholder || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/20 backdrop-blur-sm text-white text-xs font-medium mb-3">
              {project.category}
            </span>
            <h3 className="text-3xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                {project.title}
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-xs text-white/90 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8">
          <h4 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
            О проекте
          </h4>
          <p className="text-foreground/90 mb-6">{project.description}</p>
          
          <h4 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
            Ключевые особенности
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {project.features.map((feature: string, index: number) => (
              <li 
                key={index} 
                className="flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-accent"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.875 5.625L8.125 14.375L3.75 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-foreground/90">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
            >
              Закрыть
            </Button>
            <ContactModal 
              buttonText="Обсудить похожий проект" 
              buttonVariant="primary" 
              buttonSize="md"
              buttonClassName="w-full sm:w-auto" 
            />
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectModal.displayName = 'ProjectModal';

// Данные о проектах
const projects: Project[] = [
  {
    id: 1,
    title: 'Архитектурное бюро "Модерн"',
    description: 'Минималистичный сайт с плавными переходами и параллакс-эффектами для архитектурного бюро. Уникальный дизайн, отражающий философию современной архитектуры.',
    image: '/images/portfolio/modern.jpg',
    placeholder: 'data:image/jpeg;base64,...', // Здесь должен быть реальный base64
    category: 'Архитектура',
    tags: ['React', 'Next.js', 'GSAP', 'Framer Motion'],
    features: [
      'Параллакс-эффекты',
      'Интерактивная галерея проектов',
      'Анимированные переходы',
      'Оптимизированная производительность'
    ]
  },
  {
    id: 2,
    title: 'Интернет-магазин "Aurum"',
    description: 'Премиальный интернет-магазин с 3D-моделями украшений и интерактивной примеркой. Элегантный дизайн с акцентом на детали и удобство использования.',
    image: '/images/portfolio/aurum.jpg',
    placeholder: 'data:image/jpeg;base64,...',
    category: 'E-commerce',
    tags: ['React', 'Redux', 'Three.js', 'Node.js'],
    features: [
      '3D-визуализация товаров',
      'Виртуальная примерка',
      'Интеграция с платежными системами',
      'Административная панель'
    ]
  },
  {
    id: 3,
    title: 'Фестиваль "Новая волна"',
    description: 'Динамичный сайт с нестандартной навигацией и анимированными переходами для музыкального фестиваля. Яркий дизайн, отражающий атмосферу мероприятия.',
    image: '/images/portfolio/festival.jpg',
    placeholder: 'data:image/jpeg;base64,...',
    category: 'Мероприятия',
    tags: ['Next.js', 'GSAP', 'WebGL', 'Firebase'],
    features: [
      'Интерактивная программа фестиваля',
      'Онлайн-бронирование билетов',
      'Стриминг выступлений',
      'Интеграция соцсетей'
    ]
  },
  {
    id: 4,
    title: 'Экосистема "GreenTech"',
    description: 'Интерактивная платформа с визуализацией данных и сложными анимациями для технологического стартапа. Инновационный подход к представлению информации.',
    image: '/images/portfolio/greentech.jpg',
    placeholder: 'data:image/jpeg;base64,...',
    category: 'Технологии',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    features: [
      'Визуализация данных в реальном времени',
      'Интерактивные графики',
      'API интеграция',
      'Масштабируемая архитектура'
    ]
  }
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Мемоизируем выбранный проект, чтобы избежать лишних вычислений при ререндере
  const selectedProjectData = useMemo(() => 
    selectedProject !== null ? projects.find(p => p.id === selectedProject) || null : null, 
    [selectedProject]
  );

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      
      {/* Упрощенные градиентные круги без анимации */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/5 to-secondary/5 blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-secondary/5 to-accent/5 blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            Наши работы
          </div>
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold font-display mb-6"
          >
            Портфолио <span className="text-gradient">проектов</span>
          </h2>
          <p 
            className="text-foreground/80 max-w-2xl mx-auto"
          >
            Каждый проект — это уникальное решение, созданное с учетом потребностей клиента и современных тенденций в дизайне.
          </p>
        </div>

        {/* Сетка проектов с оптимизацией для производительности */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 content-visibility-auto"
        >
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              isHovered={hoveredProject === project.id}
              onHover={setHoveredProject}
              onHoverEnd={() => setHoveredProject(null)}
            />
          ))}
        </div>

        {/* Кнопка "Обсудить проект" */}
        <div 
          className="text-center mt-16"
        >
          <ContactModal 
            buttonText="Обсудить ваш проект" 
            buttonVariant="primary" 
            buttonSize="lg" 
            buttonClassName="px-8 shadow-lg shadow-accent/20"
          />
        </div>

        {/* Модальное окно с деталями проекта */}
        <AnimatePresence>
          {selectedProject !== null && selectedProjectData && (
            <ProjectModal 
              project={selectedProjectData} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio; 