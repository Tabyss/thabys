import React from "react";
import Image, { StaticImageData } from "next/image"; 
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import "./PortoModal.scss"

interface PortoSlide {
  image: string | StaticImageData; 
  title: string;
}

interface PortoModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: PortoSlide[];
  currentIndex: number;
  onNext: (e: React.MouseEvent) => void;
  onPrev: (e: React.MouseEvent) => void;
}

const PortoModal: React.FC<PortoModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentIndex,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="porto-modal-overlay" onClick={onClose}>
      <button className="modal-close" onClick={onClose} aria-label="Close modal">
        <FaTimes />
      </button>

      <button className="modal-nav prev" onClick={onPrev} aria-label="Previous slide">
        <FaChevronLeft />
      </button>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="card-animation-wrapper" key={currentIndex}>
          <div className="image-container">
            {currentSlide && (
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                layout="intrinsic"
                placeholder="blur"
                priority
                className="modal-image-card"
              />
            )}
          </div>
        </div>
        <div className="modal-caption">
          <h3>{currentSlide?.title}</h3>
          <div className="indicator-bar">
            {slides.map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i === currentIndex ? 'active' : ''}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <button className="modal-nav next" onClick={onNext} aria-label="Next slide">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PortoModal;