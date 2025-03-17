'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Не блокируем прокрутку страницы при открытом модальном окне
    // Это позволит прокручивать содержимое на мобильных устройствах
  }, [isOpen]);

  // Не рендерим на сервере
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          >
            <div className="bg-card rounded-lg shadow-lg w-full max-w-lg my-8 relative">
              {title && (
                <div className="px-6 py-4 border-b border-border">
                  <h3 className="text-xl font-semibold">{title}</h3>
                </div>
              )}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal; 