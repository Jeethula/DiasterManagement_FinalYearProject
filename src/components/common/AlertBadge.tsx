type AlertType = 'urgent' | 'warning' | 'info' | 'success';

interface AlertBadgeProps {
  type: AlertType;
  label: string;
  animated?: boolean;
  className?: string;
}

const AlertBadge = ({ type, label, animated = false, className = '' }: AlertBadgeProps) => {
  const baseClasses = 'status-badge';
  
  const typeClasses = {
    urgent: 'status-badge-urgent',
    warning: 'status-badge-warning',
    info: 'status-badge-info',
    success: 'status-badge-success'
  };
  
  const animationClass = animated ? 'animate-pulse' : '';
  
  return (
    <span className={`${baseClasses} ${typeClasses[type]} ${animationClass} ${className}`}>
      {label}
    </span>
  );
};

export default AlertBadge;