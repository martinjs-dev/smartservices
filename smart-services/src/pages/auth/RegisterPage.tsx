// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    // Gestion de la soumission du formulaire
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-textPrimary font-medium mb-1">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 text-textPrimary border border-gray-300 py-2 px-3 rounded-md"
              placeholder="email@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-textPrimary font-medium mb-1">Mot de passe</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 text-textPrimary border border-gray-300 py-2 px-3 rounded-md"
              placeholder="Mot de passe"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-textPrimary font-medium mb-1">Confirmer le mot de passe</label>
            <input 
              id="confirmPassword" 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-100 text-textPrimary border border-gray-300 py-2 px-3 rounded-md"
              placeholder="Confirmer le mot de passe"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-700"
          >
            S'inscrire
          </button>
          <p className="text-textSecondary mt-4">
            Déjà un compte ? <Link to="/login" className="text-secondary hover:text-orange-600">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
