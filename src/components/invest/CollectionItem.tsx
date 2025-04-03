
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface CollectionItemProps {
  icon: LucideIcon;
  title: string;
  path: string;
  iconColor?: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({ 
  icon: Icon, 
  title, 
  path,
  iconColor = 'text-paygrow-green' 
}) => {
  return (
    <Link to={path} className="flex flex-col items-center">
      <div className={`w-14 h-14 ${iconColor} bg-gray-100 rounded-full flex items-center justify-center mb-2`}>
        <Icon className="w-7 h-7" />
      </div>
      <span className="text-xs text-gray-700 text-center">{title}</span>
    </Link>
  );
};

export default CollectionItem;
