import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; 
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Components/Home";
import Modal from "./Components/Modal";
import Header from "./Components/Header";
import RestaurantMenu from "./Components/RestaurantMenu";


function App() {
  const { isOpen, modalName } = useSelector((state) => state.modal);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Modal show={isOpen} modalName={modalName} />
        <Routes>
        <Route  index element={<Home />} />
        <Route path = "/menu/restaurant/:restaurantId"  element = {<RestaurantMenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
