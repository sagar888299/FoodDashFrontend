import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "./MenuActions";
import { useParams } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";

export default function RestaurantMenu() {
  const dispatch = useDispatch();
  const [tab, selectedTab] = useState("Order");
  const { restaurantId } = useParams();
  const menuData = useSelector((state) => state.menu.menuItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const selectedResaurant = useSelector(
    (state) => state.restaurant.selectedRestaurant
  );

  useEffect(() => {
    dispatch(getMenu(restaurantId));
  }, [dispatch, restaurantId]);

  const handleAddItem = (item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [item.id]: { ...item, quantity: 1 },
    }));
  };

  const handleIncrease = (item) => {
    const newQuantity = selectedItems[item.id].quantity + 1;
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [item.id]: { ...item, quantity: newQuantity },
    }));
  };

  const handleDecrease = (item) => {
    const newQuantity = selectedItems[item.id].quantity - 1;

    if (newQuantity === 0) {
      const updatedItems = { ...selectedItems };
      delete updatedItems[item.id];

      setSelectedItems(updatedItems);
    } else {
      setSelectedItems((prevItems) => ({
        ...prevItems,
        [item.id]: { ...item, quantity: newQuantity },
      }));
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-5xl py-5 font-bold text-indigo-600 underline decoration-indigo-500">
        {selectedResaurant?.name}
      </h1>
      <div className="flex gap-6 w-4/6 text-left border-b mb-4 mx-auto text-left px-5">
        <button
          onClick={() => selectedTab("Order")}
          className={`text-2xl py-2 font-bold ${
            tab === "Order"
              ? "text-indigo-700 underline decoration-indigo-500"
              : "text-gray-700 "
          }`}
        >
          Order Online
        </button>
        <button
          onClick={() => selectedTab("Dineout")}
          className={`text-2xl py-2 font-bold ${
            tab === "Dineout"
              ? "text-indigo-700 underline decoration-indigo-500"
              : "text-gray-700"
          }`}
        >
          DineOut
        </button>
      </div>
      <div className="border-x border-b mb-4 flex flex-col gap-6 w-4/6 mx-auto px-5 pb-5 bg-gradient-to-r from-slate-50 to-slate-300 rounded-b-[20px]">
        <div className="w-full text-left mx-auto text-left px-5 bg-white shadow-xl rounded-b-lg p-5 space-y-2">
          <div className="flex items-center font-semibold">
            4.3{" "}
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            (2.1K+ ratings)
          </div>
          <ol class="relative ml-1 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ">
            <li class="mb-2
             ms-3 ">
              <span class="absolute mb-3 flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              </span>
              <div className="font-semibold ">
              Outlet {"  "}
              {selectedResaurant.location}
              </div>
            </li>
            <li class="ms-3">
              <span class="absolute flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              </span>
              <div class="font-semibold">15 - 20 Minutes</div>
            </li>
          </ol>
          <div className="flex gap-2 font-semibold">
            {" "}
            <MdDeliveryDining size={24} /> 0.5 kms | ₹33 Delivery fee will apply
          </div>
        </div>
      </div>
      {/* {tab === "Order" && (
        <h1 className="text-5xl py-5 font-bold text-indigo-700 underline decoration-indigo-500">
          Menu
        </h1>
      )} */}
      {tab === "Order" && (
        <div className="w-4/6 mx-auto text-center space-y-12 px-5">
          {menuData.map((item) => {
            return (
              <div
                className="flex justify-between gap-8 border-y py-10"
                key={item.id}
              >
                <div className="flex flex-col text-left gap-1 font-semibold text-gray-700">
                  <div className="text-xl font-bold text-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="border p-0.5">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xl font-bold text-gray-800">
                        {item.name}
                      </div>
                    </div>
                  </div>
                  <div>{item.price} $</div>
                  <div>
                    <div className="flex items-center">
                      4.3{" "}
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-3">{item.description}</div>
                </div>
                <div className="relative ">
                  <img
                    className="h-[144px] w-[156px] rounded-lg border bg-gray-100"
                    alt={item.name}
                  />
                  {selectedItems[item.id] ? (
                    <div className="absolute text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl translate-x-5 -translate-y-6 flex items-center gap-2 border px-4 py-2 rounded-lg bg-white">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="border rounded px-2"
                      >
                        -
                      </button>
                      <div>{selectedItems[item.id].quantity}</div>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="border rounded px-2"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddItem(item)}
                      className="absolute text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl -translate-x-14 -translate-y-6 border px-10 py-2 rounded-lg bg-white"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
