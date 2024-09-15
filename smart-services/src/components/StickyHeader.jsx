// import React from 'react';
import { Link } from 'react-router-dom';

const StickyHeader = () => {
  return (
    <header className='bg-white text-textPrimary fixed w-full top-0 left-0 z-50 shadow-md'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        {/* Logo */}
        <Link to='/dashboard' className='text-2xl font-bold'>
          <span className='text-primary'>Smart</span> Services
        </Link>

        {/* Navigation */}
        <nav className='flex space-x-6'>
          <Link to='/dashboard' className='hover:text-secondary'>Dashboard</Link>
          <Link to='/profile' className='hover:text-secondary'>Profil</Link>
          <Link to='/services' className='hover:text-secondary'>Services</Link>
        </nav>

        {/* Actions */}
        <div>
          <Link 
            to='/logout' 
            className='bg-primary hover:bg-accent text-white py-2 px-4 rounded-md'
          >
            Deconnexion
          </Link>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
