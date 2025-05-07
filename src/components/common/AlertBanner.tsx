import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

type AlertType = 'emergency' | 'warning' | 'info';

interface AlertBannerProps {
  type: AlertType;
  message: string;
  location: string;
}

const AlertBanner = ({ type, message, location }: AlertBannerProps) => {
  const alertClasses = {
    emergency: 'emergency-alert',
    warning: 'warning-alert',
    info: 'info-alert'
  };
  
  const icons = {
    emergency: <AlertTriangle className="mr-2 flex-shrink-0" />,
    warning: <AlertCircle className="mr-2 flex-shrink-0" />,
    info: <Info className="mr-2 flex-shrink-0" />
  };

  return (
    <div className={`${alertClasses[type]} flex items-start mb-3 animate-slide-in`}>
      {icons[type]}
      <div>
        <div className="font-bold">{message}</div>
        <div className="text-sm opacity-80">{location}</div>
      </div>
    </div>
  );
};

export default AlertBanner;