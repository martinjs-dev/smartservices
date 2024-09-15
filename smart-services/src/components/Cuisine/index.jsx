import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaCheckSquare } from "react-icons/fa";
import axios from "axios";
import CloudSvg from "../../assets/cloud";

const Food = ({ food_query, onSearchQueryChange }) => {
  const [isEditing, setIsEditing] = useState(!food_query);
  const [food, setFood] = useState(food_query || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reloadAt, setReloadAt] = useState(null);

  const handleValidate = () => {
    if (isEditing) {
      getFood();
    }
    setIsEditing(!isEditing);
  };

  const getFood = async () => {
    setLoading(true);

    try {
      const response = await axios.get(

        `https://api.edamam.com/search?q=${food}&app_id=a52b4d43&app_key=e0e5c667605f5e91d8275c973531b80a`

      );
      const { data } = response;
      if (data.hits?.length == 0) {
        setResult(null);
      } else setResult(data.hits?.slice(0, 10));
      onSearchQueryChange(food);
    //   console.log(data.hits)
    // console.log(result)

    } catch (error) {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (food) {
      getFood();
    }
  }, []);

  return (
    <>
      <div className="flex flex-row items-center justify-evenly">
        <input
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className={`p-1 rounded-lg border border-gray-500 me-2 w-50 ${
            !isEditing ? "bg-gray-50 text-gray-300" : ""
          }`}
          type="search"
          placeholder="Search a recipe"
          disabled={!isEditing}
        />
        <button className="p-1 rounded" onClick={() => handleValidate()}>
          <span className="text-white"></span>
          {isEditing ? (
            <FaCheckSquare size={30} color="green" className="" />
          ) : (
            <CiEdit size={30} color="orange" className="" />
          )}
        </button>
      </div>
      {loading ? (
        <div className="flex flex-row justify-center mt-2">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : result ? (
        <div className="flex flex-col gap-2 mt-4 h-[500px] overflow-y-auto">
          {result.map((element, index) => (
            <div className="border border-gray-500 shadow mt-4 p-2" key={index}>
              <p>
                <span className="font-bold text-xl text-st">Food : </span>
                {element.recipe.label}
              </p>
              <p>
                 <img src={element.recipe.image} alt="" />
              </p>


              <p>
                <span className="font-bold text-xl text-start">

                  Calories : </span>
                {element.recipe.calories}
              </p>
              <p>
                <span className="font-bold text-xl text-start">

                  Ingredients : </span>
                {element.recipe.ingredientLines}
              </p>


              <p>
                <span className="font-bold text-xl text-start">Link to recipe : </span>{" "}
                <a href={element.recipe.url}>{element.recipe.url.slice(0, 20)}</a>
              </p>
            </div>
            ))}
        </div>
      ) : (
        "Aucune information trouvé"
      )}
    </>
  );
};

export default Food;