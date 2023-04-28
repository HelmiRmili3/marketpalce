import React, { } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Components/Nav";
import RoutesComponent from "./Components/RoutesComponent";
//import { useNftDatabase } from "./Contexts/NFTdatabase";
import "./App.css";
export default function App() {
 // const { mint } = useNftDatabase();

  // const getdata = async () => {
  //   //await addBuyRequest(1)
  //   await mint("blod16",100000000,"this is the data of the nft 16",100000000);
  //   //await getMedicalData(1);
  //   // await getBuyRequests();
  //   // await addBuyRequest(1);
  //   //await tokenIdCounter();
  // };

  return (
    <BrowserRouter>
      <Nav />
      <RoutesComponent />
    </BrowserRouter>
  );
}
