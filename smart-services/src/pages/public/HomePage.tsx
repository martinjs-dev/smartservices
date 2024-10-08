import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  if (token) {
    localStorage.setItem("smart_access", token);
  }
  return (
    <div className="bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mon Application</h1>
          <nav>
            <Link to="/login" className="text-white hover:text-gray-200 mx-2">
              Se connecter
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-gray-200 mx-2"
            >
              S'inscrire
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary">Welcome</h2>
          <p className="text-lg mb-8 text-gray-700">
            Découvrez Smart Sevices et profitez de fonctionnalités exceptionnelles pour améliorer votre expérience.
          </p>
          <Link
            to="/dashboard"
            className="bg-primary text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-orange-700"
          >
            Accéder au Dashboard
          </Link>
        </div>

        {/* Features Section */}
        <section className=" py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">Une panoplie de services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Fonctionnalités</h3>
                <p className="text-gray-600">Réaliser des actions spécifiques avec facilité.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Services</h3>
                <p className="text-gray-600">Aux utilisateurs d'obtenir des informations très rapidement.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Experience-client</h3>
                <p className="text-gray-600">Une experience exceptionnelle et fluide.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-6 px-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Mon Application. Tous droits
            réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
