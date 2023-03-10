import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./app/ROUTES";
import Admin from "./app/Admin";
import Categories from "./features/admin/categories/Categories";
import Products from "./features/admin/products/Products";
import Home from "./features/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.homeRoute()} element={<Home />}></Route>
          <Route path={ROUTES.adminRoute()} element={<Admin />}>
            <Route path={ROUTES.categoriesAdmin()} element={<Categories />} />
            <Route path={ROUTES.productsAdmin()} element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
