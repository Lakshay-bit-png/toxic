import React, { useEffect, useState } from 'react'
import index from './index.css'
import { RxCross2 } from "react-icons/rx";
export const Search = () => {
    const [searchValue, setsearchValue] = useState("");
  const [searcheddata, setsearcheddata] = useState([]);
  const [selecteddata, setSelecteddata] = useState([]);
  const [isadder, setisadder] = useState(false);
  const retrieval = async (search) => {
    
    try {
      const response = await fetch(
        `https://toxic-3y8d.onrender.com/api/users/search?keyword=${search}`,
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
    <div
            className={
              selecteddata?.length > 5
                ? "input-field column-switch"
                : "input-field"
            }
          >
            <div
              className={
                selecteddata?.length > 5
                  ? "saved-results width-change"
                  : "saved-results"
              }
            >
              {selecteddata?.map((result) => (
                <div className="each-saved">
                  <img className="image" src={result?.imgUrl} />
                  <div className="saved-name">{result?.name}</div>
                  <RxCross2
                    className="crossed"
                    onClick={() => {
                      removeThis(result);
                    }}
                  />
                </div>
              ))}
            </div>
            <input
              type="text"
              className={
                selecteddata?.length > 5
                  ? "searcher-input input-change"
                  : "searcher-input"
              }
              placeholder="Search by Name or Email"
              value={searchValue}
              onChange={(e) => {
                setsearchValue(e.target.value); // Update searchValue state
                retrieval(e.target.value); // Call the retrieval function
              }}
            />
          </div>
         

          {searcheddata.length > 0 ? (
            <div className="search-results">
              {searcheddata?.map((result, index) => (
                <div
                  key={index}
                  className="each-result"
                  onClick={() => handleResultClick(result)}
                >
                  <img
                    src={result?.imgUrl}
                    alt={`Profile picture of ${result?.name}`}
                  />
                  <div className="name">{result?.name}</div>
                  <div className="email">{result?.username}</div>
                  <div className="info-det"></div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{color:'white'}}>No Matched Results Found</div>
          )}
   </>
  )
}
