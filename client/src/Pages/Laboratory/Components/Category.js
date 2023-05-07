import React, { useEffect, useState } from "react";
import "./category.css";

const Category = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {}, [selectedItems]);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(items);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (item) => {
    const selectedIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.name === item.name
    );
    if (selectedIndex > -1) {
      const updatedItems = [...selectedItems];
      updatedItems.splice(selectedIndex, 1);
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return items ? (
    <div className="list">
      <div className="list-header">
        <div className="list-header-checkbox">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </div>
        <div className="list-header-owner">Patients</div>
        <div className="list-header-item">Electrolytes</div>
        <div className="list-header-item">Glucose</div>
        <div className="list-header-item">Cholesterol</div>
      </div>
      {
        <div>
          {Object.keys(items).map((key) => (
            <div key={key} className="list-item">
              <div className="list-item-checkbox">
                <input
                  type="checkbox"
                  checked={selectedItems.some(
                    (selectedItem) => selectedItem.owner === key
                  )}
                  onChange={() => handleSelectItem(key)}
                />
              </div>
              <div className="list-item-owner">{key}</div>
              {Object.keys(items[key]).map((innerKey, value) => (
                <div key={innerKey} className="list-item">
                  {items[key][innerKey].length === 0 ? (
                    <div
                      style={{
                        border: "1px solid green",
                        borderRadius: "50px",
                        width: "10px",
                        height: "10px",
                        marginLeft: "40px",
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "green",
                        borderRadius: "50px",
                        width: "12px",
                        height: "12px",
                        marginLeft: "40px",
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      }
    </div>
  ) : (
    <div>Lodding</div>
  );
};

export default Category;
