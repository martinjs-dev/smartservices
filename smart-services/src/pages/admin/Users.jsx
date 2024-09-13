// src/pages/Users.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    axios.get("http://localhost:3000/user")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Erreur lors de la récupération des utilisateurs :", error));
  }, []);

  const handleEdit = (id) => {
    // Logique pour modifier l'utilisateur
    console.log(`Modifier l'utilisateur avec l'id : ${id}`);
  };

  const handleView = (id) => {
    // Logique pour afficher les détails de l'utilisateur
    console.log(`Voir les détails de l'utilisateur avec l'id : ${id}`);
  };

  const handleDelete = (id) => {
    // Logique pour supprimer l'utilisateur
    console.log(`Supprimer l'utilisateur avec l'id : ${id}`);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="text-orange-700 ">
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">Nom</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Email</th>
            <th className="py-2 px-4 bg-gray-200 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(users).map((user) => (
            <tr key={user._id} className="border-b text-stone-900 text-left">
              <td className="py-2 px-4">{user._id}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 flex justify-center space-x-4">
                <FaEye
                  className="text-primary cursor-pointer hover:text-orange-600"
                  onClick={() => handleView(user._id)}
                />
                <FaEdit
                  className="text-primary cursor-pointer hover:text-orange-600"
                  onClick={() => handleEdit(user._id)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
