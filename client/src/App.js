import React, { } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Components/Nav";
import RoutesComponent from "./Components/RoutesComponent";
import "./App.css";
export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <RoutesComponent />
    </BrowserRouter>
  );
}
