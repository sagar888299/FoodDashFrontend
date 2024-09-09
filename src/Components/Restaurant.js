import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "./RestaurantActions";
import ImageSlider from "./ImageSlider";
import { useNavigate } from "react-router-dom";
import { selectRestaurant } from "./RestaurantSlice";

export default function Restaurant() {
  const restaurantData = useSelector((state) => state.restaurant.restaurants);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(restaurantData);
  const handleRestaurant = (item) => {
    dispatch(selectRestaurant(item));
    navigate(`menu/restaurant/${item.id}`);
  }

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap px-10 justify-center items-center">
      {restaurantData.length > 0 &&
        restaurantData.map(
          (item) => {
            return (
              <div key={item.id}>
                <div className="relative mx-6 flex w-full max-w-xs flex-col overflow-hidden rounded-lg bg-white">
                  <div
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                  >
                    <ImageSlider images={item.images} />
                    <span className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      39% OFF
                    </span>
                  </div>
                  <div className="mt-4 px-2 pb-5">
                    <div className="flex item-center justify-between px-3">
                      <div >
                        <h5 class="text-xl tracking-tight text-slate-900 font-bold">
                          {item.name}
                        </h5>
                      </div>
                      <div className="flex items-center justify-between  mt-1">
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          5.0
                        </span>
                        <svg
                          aria-hidden="true"
                          class="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 mb-5 flex items-center justify-between px-3">
                      <p>
                        <span className="text text-slate-900 font-semibold">
                          {item.location}
                        </span>
                      </p>
                    </div>
                    <button
                      className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg flex items-center justify-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      onClick={() => handleRestaurant(item)}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
}
