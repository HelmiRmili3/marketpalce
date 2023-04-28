import React, { useEffect, useState } from "react";
import "../../App.css";
import List from "./Components/list";
import { useNftDatabase } from "../../Contexts/NFTdatabase";
import { useAuth } from "../../Contexts/authContext";
import LaboratoryNavBar from "../../Components/LaboratoryNavBar";
import RangeFilter from "./Components/RangeFilterBar";
import SearchComponent from "./Components/SearchComponent";
const Laboratory = () => {
  const { allnfts } = useNftDatabase();
  const [filterdBycategory, setfilterdBycategory] = useState(null);
  const [data, setData] = useState([
    { id: 0, owner: 0, name: "Electrolytes", date: "2022-05-01", price: 10 },
    { id: 1, owner: 0, name: "Glucose", date: "2022-05-02", price: 15 },
    { id: 2, owner: 0, name: "Cholesterol", date: "2022-05-03", price: 20 },
    { id: 3, owner: 0, name: "Electrolytes", date: "2022-05-04", price: 25 },
    { id: 4, owner: 1, name: "Electrolytes", date: "2022-05-01", price: 10 },
    { id: 5, owner: 1, name: "Glucose", date: "2022-05-02", price: 15 },
    { id: 6, owner: 1, name: "Electrolytes", date: "2022-05-03", price: 20 },
    { id: 7, owner: 1, name: "Electrolytes", date: "2022-05-04", price: 25 },
    { id: 8, owner: 2, name: "Electrolytes", date: "2022-05-01", price: 10 },
    { id: 9, owner: 2, name: "Glucose", date: "2022-05-02", price: 15 },
    { id: 10, owner: 2, name: "Cholesterol", date: "2022-05-03", price: 20 },
    { id: 11, owner: 3, name: "Electrolytes", date: "2022-05-04", price: 25 },
    { id: 12, owner: 4, name: "Electrolytes", date: "2022-05-01", price: 10 },
    { id: 13, owner: 4, name: "Glucose", date: "2022-05-02", price: 15 },
    { id: 14, owner: 4, name: "Cholesterol", date: "2022-05-03", price: 20 },
    { id: 15, owner: 4, name: "Glucose", date: "2022-05-04", price: 25 },
    { id: 16, owner: 5, name: "Glucose", date: "2022-05-04", price: 25 },
  ]);

  function Category() {
    const category = {};
    for (let index = 0; index < data.length; index++) {
      const owner = data[index].owner;
      if (data[index].name === "Electrolytes") {
        if (category.hasOwnProperty(owner)) {
          category[owner].Electrolytes.push(data[index].id);
        } else {
          category[owner] = { Electrolytes: [], Glucose: [], Cholesterol: [] };
          category[owner].Electrolytes.push(data[index].id);
        }
      }
      if (data[index].name === "Glucose") {
        if (category.hasOwnProperty(owner)) {
          category[owner].Glucose.push(data[index].id);
        } else {
          category[owner] = { Electrolytes: [], Glucose: [], Cholesterol: [] };
          category[owner].Glucose.push(data[index].id);
        }
      }
      if (data[index].name === "Cholesterol") {
        if (category.hasOwnProperty(owner)) {
          category[owner].Cholesterol.push(data[index].id);
        } else {
          category[owner] = { Electrolytes: [], Glucose: [], Cholesterol: [] };
          category[owner].Cholesterol.push(data[index].id);
        }
      }
    }
    setfilterdBycategory(category);
  }
  useEffect(() => {
    Category();
  }, []);

  return (
    <>
      <LaboratoryNavBar />
      {/* <button
        onClick={() => {
          Category();
          console.log(filterdBycategory);
        }}
      >
        click me
      </button> */}
      <SearchComponent />
      <List items={filterdBycategory} />
    </>
  );
};
export default Laboratory;
