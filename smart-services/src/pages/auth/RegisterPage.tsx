import axios from './api';
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const backendUrl = "https://api-smartservices.onrender.com";

const handleOAuthLogin = (provider) => {
  window.location.href = `${backendUrl}/auth/${provider}`;
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage('Adresse email invalide.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await axios.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
  
      if (response.status === 201) {
        console.log('Inscription validée', response.data);
        setErrorMessage('');

        window.location.href = '/check-email';
        
      } else {
        setErrorMessage('Une erreur est survenue lors de votre inscription.');
      }
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    }

  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {errorMessage && <p className="text-error">{errorMessage}</p>}

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-textPrimary font-medium mb-1">Prénom</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-gray-100 text-textPrimary border border-gray-300 py-2 px-3 rounded-md"
                placeholder="Prénom"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-textPrimary font-medium mb-1">Nom</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-gray-100 text-textPrimary border border-gray-300 py-2 px-3 rounded-md"
                placeholder="Nom"
                required
              />
            </div>
          </div>

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
            className="bg-primary w-full text-white py-2 px-4 rounded-md hover:bg-orange-700"
          >
            S'inscrire
          </button>
        </form>

        <div className="flex items-center justify-center my-6">
          <div className="w-full border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <div className="flex justify-between">
          
          <button
            className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded mx-1 flex items-center justify-center"
            onClick={() => handleOAuthLogin("google")}
          >
            <img
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </button>


          <button
            className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded mx-1 flex items-center justify-center"
            onClick={() => handleOAuthLogin("github")}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/shift-logotypes/32/Github-512.png"
              alt="GitHub"
              className="w-5 h-5 mr-2"
            />
            GitHub
          </button>


          <button
            className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded mx-1 flex items-center justify-center"
            onClick={() => handleOAuthLogin("facebook")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Facebook
          </button>
        </div>

        <p className="text-textSecondary mt-4">
          Déjà un compte ? <Link to="/login" className="text-secondary hover:text-orange-600">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
