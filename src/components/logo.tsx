
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link to="/" className={className}>
      <div className="flex items-center">
        <span className="text-viralOrange font-bold text-3xl">Viral</span>
        <span className="text-white font-bold text-3xl">Clicker</span>
      </div>
    </Link>
  );
};

export default Logo;
