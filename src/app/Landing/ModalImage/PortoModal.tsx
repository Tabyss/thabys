import React from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import "./PortoModal.scss"

interface PortoModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: any[];
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

  return (
    <div className="porto-modal-overlay" onClick={onClose}>
      <button className="modal-close" onClick={onClose}>
        <FaTimes />
      </button>

      <button className="modal-nav prev" onClick={onPrev}>
        <FaChevronLeft />
      </button>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="card-animation-wrapper" key={currentIndex}>
          <div className="image-container">
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              layout="intrinsic"
              placeholder="blur"
              priority
              className="modal-image-card"
            />
          </div>
        </div>
          <div className="modal-caption">
            <h3>{slides[currentIndex].title}</h3>
            <div className="indicator-bar">
              {slides.map((_, i) => (
                <span key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} />
              ))}
            </div>
          </div>
      </div>

      <button className="modal-nav next" onClick={onNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PortoModal;