import axios from '../auth/api';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const backendUrl = "http://localhost:3000";

const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<any>(null); // Remplacez `any` par un type plus spécifique si vous avez défini un type pour l'utilisateur

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/auth/profile');
        setUser(response.data);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      } catch (error) {
        setErrorMessage('Erreur lors de la récupération des informations utilisateur.');
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await axios.put('/auth/profile', {
        firstName,
        lastName,
        email,
        password,
      });
  
      if (response.status === 200) {
        console.log('Profil mis à jour avec succès', response.data);
        setErrorMessage('');
        // Redirection ou autre action après la mise à jour
      } else {
        setErrorMessage('Une erreur est survenue lors de la mise à jour du profil.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Profil Utilisateur</h2>
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
            />
          </div>

          <button
            type="submit"
            className="bg-primary w-full text-white py-2 px-4 rounded-md hover:bg-orange-700"
          >
            Mettre à jour
          </button>
        </form>

        <div className="flex justify-between mt-6">
          <Link to="/" className="text-secondary hover:text-orange-600">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
