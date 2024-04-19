import React, { useEffect, useState } from "react";
import index from "./index.css";

import TypingPlaceholder from "./typer";
import { Search } from "../search";
import { Add } from "../add";

export const Landing = () => {
  const [searchValue, setsearchValue] = useState("");
  const [searcheddata, setsearcheddata] = useState([]);
  const [selecteddata, setSelecteddata] = useState([]);
  const [isadder, setisadder] = useState(false);

  const toggleswitch = () => {
    setisadder(!isadder);
  };

  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const retrieval = async (search) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/search?keyword=${search}`,
        {
          method: "GET",
        }
      );
      const searchData = await response.json();
      if (response.ok) {
        // Filter out selected items from the searched data
        const filteredData = searchData.filter(
          (result) =>
            !selecteddata.some((selected) => selected._id === result._id)
        );
        console.log(filteredData);
        setsearcheddata(filteredData);
      } else {
        console.log(searchData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResultClick = (result) => {
    setSelecteddata([...selecteddata, result]);
    retrieval(searchValue);
    // Add the clicked result to selectedData
  };

  const removeThis = (resultToRemove) => {
    setSelecteddata(selecteddata.filter((result) => result !== resultToRemove));
  };

  useEffect(() => {
    retrieval(searchValue);
  }, [selecteddata]);

  return (
    <>
      <div className="main">
        <div className="searcher">
          <div className="button-switcher">
            <div
              className={isadder ? "active-this" : "inactive-this"}
              onClick={toggleswitch}
            >
              Search User
            </div>
            <div
              className={isActive ? "toggle-button active" : "toggle-button"}
              onClick={() => {
                toggle();
                toggleswitch();
              }}
            >
              <div className="slider"></div>
            </div>
            <div
              className={isadder ? "inactive-this" : "active-this"}
              onClick={toggleswitch}
            >
              Add User
            </div>
          </div>



          { !isActive && <><TypingPlaceholder />




         <Search/> </>}
         {isActive && <Add/>}
        </div>
      </div>
    </>
  );
};
