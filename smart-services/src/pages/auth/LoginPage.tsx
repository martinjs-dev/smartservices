// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gestion de la soumission du formulaire
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-textPrimary font-medium mb-1"
            >
              Email
            </label>
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
            <label
              htmlFor="password"
              className="block text-textPrimary font-medium mb-1"
            >
              Mot de passe
            </label>
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
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-700"
          >
            Se connecter
          </button>
          <p className="text-textSecondary mt-4">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="text-secondary hover:text-orange-600"
            >
              S'inscrire
            </Link>
          </p>
        </form>

        <div className="flex items-center justify-center my-6">
          <div className="w-full border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <div className="flex justify-between">
          {/* Google Button */}
          <button
            className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded mx-1 flex items-center justify-center"
            onClick={() => (window.location.href = "/auth/google")}
          >
            <img
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </button>

          {/* GitHub Button */}
          <button
            className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded mx-1 flex items-center justify-center"
            onClick={() => (window.location.href = "/auth/github")}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/shift-logotypes/32/Github-512.png"
              alt="GitHub"
              className="w-5 h-5 mr-2"
            />
            GitHub
          </button>

          {/* Facebook Button */}
          <button
            className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded mx-1 flex items-center justify-center"
            onClick={() => (window.location.href = "/auth/facebook")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
