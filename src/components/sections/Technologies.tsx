'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ContactModal from './ContactModal';
import Button from '@/components/ui/Button';

// Данные о технологиях
const technologies = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Создаем современные и отзывчивые пользовательские интерфейсы с использованием передовых технологий.',
    items: [
      { name: 'React', icon: '/icons/react.svg', description: 'Библиотека для создания пользовательских интерфейсов' },
      { name: 'Next.js', icon: '/icons/nextjs.svg', description: 'React-фреймворк для создания веб-приложений' },
      { name: 'TypeScript', icon: '/icons/typescript.svg', description: 'Типизированный JavaScript для надежного кода' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg', description: 'Утилитарный CSS-фреймворк для быстрой разработки' },
      { name: 'Framer Motion', icon: '/icons/framer.svg', description: 'Библиотека для создания анимаций' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Разрабатываем надежные и масштабируемые серверные решения для ваших проектов.',
    items: [
      { name: 'Node.js', icon: '/icons/nodejs.svg', description: 'JavaScript-среда выполнения на стороне сервера' },
      { name: 'Express', icon: '/icons/express.svg', description: 'Минималистичный веб-фреймворк для Node.js' },
      { name: 'MongoDB', icon: '/icons/mongodb.svg', description: 'NoSQL база данных для современных приложений' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg', description: 'Мощная реляционная база данных' },
      { name: 'GraphQL', icon: '/icons/graphql.svg', description: 'Язык запросов для API с гибкой структурой данных' },
    ]
  },
  {
    id: 'tools',
    title: 'Инструменты',
    description: 'Используем современные инструменты для оптимизации процесса разработки и доставки продукта.',
    items: [
      { name: 'Git', icon: '/icons/git.svg', description: 'Система контроля версий для отслеживания изменений' },
      { name: 'Docker', icon: '/icons/docker.svg', description: 'Платформа для разработки и доставки приложений' },
      { name: 'Vercel', icon: '/icons/vercel.svg', description: 'Платформа для развертывания веб-приложений' },
      { name: 'Figma', icon: '/icons/figma.svg', description: 'Инструмент для дизайна интерфейсов' },
      { name: 'Jest', icon: '/icons/jest.svg', description: 'Фреймворк для тестирования JavaScript-кода' },
    ]
  }
];

const Technologies = () => {
  // Анимация для контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Анимация для отдельной категории
  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Анимация для технологий
  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="technologies" className="py-24 bg-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      
      {/* Анимированные градиентные круги */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Декоративная сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Наш стек
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold font-display mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Наши <span className="text-gradient">технологии</span>
          </motion.h2>
          <motion.p 
            className="text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Мы используем современные и проверенные технологии для создания высококачественных веб-приложений.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {technologies.map((category) => (
            <motion.div
              key={category.id}
              variants={categoryVariants}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-secondary rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
              <div className="relative bg-card border border-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
                  {category.title}
                </h3>
                <p className="text-foreground/80 mb-8">
                  {category.description}
                </p>
                <div className="space-y-6">
                  {category.items.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      variants={techItemVariants}
                      className="flex items-center gap-4 group/item"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 bg-card rounded-xl p-2.5 border border-border/50 shadow-sm group-hover/item:shadow-md group-hover/item:border-accent/30 transition-all duration-300">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          fill
                          className="object-contain p-1.5 group-hover/item:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground group-hover/item:text-accent transition-colors duration-300">
                          {tech.name}
                        </h4>
                        <p className="text-sm text-foreground/60 group-hover/item:text-foreground/80 transition-colors duration-300">
                          {tech.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
            Наша команда постоянно следит за новыми технологиями и инструментами, чтобы предлагать наиболее эффективные решения для ваших проектов.
          </p>
          <ContactModal 
            buttonText="Обсудить технологии для вашего проекта" 
            buttonVariant="primary" 
            buttonSize="lg" 
            buttonClassName="px-8 shadow-lg shadow-accent/20"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies; 