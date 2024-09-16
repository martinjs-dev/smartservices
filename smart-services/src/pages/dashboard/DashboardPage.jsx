import { element } from "prop-types";
import React, { useEffect, useState } from "react";

import { IoAddCircleSharp } from "react-icons/io5";
import MusicComponent from "../../components/Music/MusicComponent";
import Weather from "../../components/Weather/index";
import News from "../../components/News/index";
import Food from "../../components/Cuisine";
import Livre from "../../components/Livre/livre";
import Convert_currency from "../../components/Currency/currency";
import Film from "../../components/film/film";
import Quote from "../../components/Quote/quote";
const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);

  const ListServices = [
    {
      name: "Musique",
      id: "musique",
      widget: "Chercher une musique",
      search_query: "",
    },
    {
      name: "Cuisine",
      id: "cuisine",
      widget: "Chercher une recette",
      search_query: "",
    },
    {
      name: "Actualités",
      id: "actualites",
      widget: "Chercher une new",
      search_query: "",
    },
    {
      name: "Metéo",
      id: "meteo",
      widget: "Voir la metéo d'une ville",
      search_query: "",
    },
    {
      name: "Livre",
      id: "livre",
      widget: "Rechercher un livre",
      search_query: "",
    },
    {
      name: "Devises",
      id: "devises",
      widget: "Convertir une devise",
      search_query: "",
    },
    {
      name: "Films",
      id: "films",
      widget: "Rechercher un film",
      search_query: "",
    },
    {
      name: "Citations",
      id: "citations",
      widget: "Chercher une citation",
      search_query: "",
    },
  ];

  const [userWidgets, setUserWidgets] = useState([]);

  const handleOnClick = () => {
    setShowModal(!showModal);
  };


  const handleCreateWidget = (element) => {
    const newWidget = { ...element, search_query: "" };
    const updatedWidgets = [...userWidgets, newWidget];
    setUserWidgets(updatedWidgets);
    localStorage.setItem("userWidgets", JSON.stringify(updatedWidgets));
  };

  useEffect(() => {
    const savedWidgets = localStorage.getItem("userWidgets");
    if (savedWidgets) {
      setUserWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  const handleUpdateSearchQuery = (index, searchQuery) => {
    const updatedWidgets = userWidgets.map((widget, i) =>
      i === index ? { ...widget, search_query: searchQuery } : widget
    );
    setUserWidgets(updatedWidgets);
    localStorage.setItem("userWidgets", JSON.stringify(updatedWidgets));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button
        className="bg-white text-primary border border-primary py-1 px-6 rounded-md hover:shadow-md flex flex-row items-center"
        onClick={handleOnClick}
      >
        Add Widget <IoAddCircleSharp size={30} className="ml-2" />
      </button>

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[30%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">Add a Widget</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {ListServices.map((element, index) => (
                    <div
                      className="flex flex-row justify-between items-center mb-4"
                      key={index}
                    >
                      <p>
                        {element.name} {"("}
                        {element.widget}
                        {")"}
                      </p>
                      <button onClick={() => handleCreateWidget(element)}>
                        <IoAddCircleSharp size={30} className="ml-2" />
                      </button>
                    </div>
                  ))}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 bg-white font-bold shadow-md uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {userWidgets &&
          userWidgets.map((element, index) => (
            <div
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                {element.name} #{index}
              </h3>
              {element.id === "musique" && (
                <MusicComponent
                  search_query={element.search_query}
                  onSearchQueryChange={(searchQuery) =>
                    handleUpdateSearchQuery(index, searchQuery)
                  }
                />
              )}
              {element.id === "meteo" && (
                <Weather
                  city_name={element.search_query}
                  onSearchQueryChange={(searchQuery) =>
                    handleUpdateSearchQuery(index, searchQuery)
                  }
                />
              )}
              {element.id === "actualites" && (
                <News
                  news_query={element.search_query}
                  onSearchQueryChange={(searchQuery) =>
                    handleUpdateSearchQuery(index, searchQuery)
                  }
                />
              )}
              {element.id === "cuisine" && (
                <Food
                  food_query={element.search_query}
                  onSearchQueryChange={(searchQuery) =>
                    handleUpdateSearchQuery(index, searchQuery)
                  }
                />
              )}
              {element.id === "livre" && (
                <Livre
                  food_query={element.search_query}
                  onSearchQueryChange={(searchQuery) =>
                    handleUpdateSearchQuery(index, searchQuery)
                  }
                />
              )}
               {element.id === "devises" && (
          <Convert_currency
            onSearchQueryChange={(searchQuery) =>
              handleUpdateSearchQuery(index, searchQuery)
            }
          />
        )}
        {element.id === "films" && (
          <Film
            onSearchQueryChange={(searchQuery) =>
              handleUpdateSearchQuery(index, searchQuery)
            }
          />
        )}
        {element.id === "citations" && (
          <Quote
            onSearchQueryChange={(searchQuery) =>
              handleUpdateSearchQuery(index, searchQuery)
            }
          />
        )}
        
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;