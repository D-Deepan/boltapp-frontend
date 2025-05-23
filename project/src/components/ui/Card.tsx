import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className = '', 
  children, 
  hoverable = false 
}) => {
  return (
    <div className={`card ${hoverable ? 'room-card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`card-header ${className}`}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
};

export default Object.assign(Card, { 
  Header: CardHeader, 
  Body: CardBody, 
  Footer: CardFooter 
});