import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className = '' }: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;