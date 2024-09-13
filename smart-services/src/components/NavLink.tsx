import { Link } from "react-router-dom";
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li><Link to="/profile" className="hover:text-gray-200">Profil</Link></li>
        {/* Ajoute d'autres liens ici */}
      </ul>
    </nav>
  );
};

export default Navigation;
