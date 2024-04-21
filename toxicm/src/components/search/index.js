import React, { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { RxCross2 } from "react-icons/rx";
import './index.css'; // Import CSS file

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce function to delay API requests
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Throttle function to limit API requests frequency
  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const retrieval = async (search) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://toxic-3y8d.onrender.com/api/users/search?keyword=${search}`,
        { method: "GET" }
      );
      const searchData = await response.json();
      if (response.ok) {
        setSearchedData(searchData);
      } else {
        console.log(searchData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedRetrieval = debounce(retrieval, 300); // Debounced retrieval function

  const handleResultClick = (result) => {
    setSelectedData([...selectedData, result]);
    setSearchValue("");
  };

  const removeThis = (resultToRemove) => {
    setSelectedData(selectedData.filter((result) => result !== resultToRemove));
  };

  useEffect(() => {
    retrieval(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className={selectedData.length > 5 ? "input-field column-switch" : "input-field"}>
        <div className={selectedData.length > 5 ? "saved-results width-change" : "saved-results"}>
          {selectedData.map((result) => (
            <div className="each-saved" key={result._id}>
              <img className="image" src={result?.imgUrl} alt={`Profile`} />
              <div className="saved-name">{result?.name}</div>
              <RxCross2
                className="crossed"
                onClick={() => removeThis(result)}
              />
            </div>
          ))}
        </div>
        <input
          type="text"
          className={selectedData.length > 5 ? "searcher-input input-change" : "searcher-input"}
          placeholder="Search by Name or Email"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            debouncedRetrieval(e.target.value); // Use debounced retrieval
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
          <Circles color="cyan" height={100} width={100} />
        </div>
      ) : searchedData.length > 0 ? (
        <div className="search-results">
          {searchedData.map((result) => (
            <div
              key={result._id}
              className="each-result"
              onClick={() => handleResultClick(result)}
            >
              <img src={result?.imgUrl} alt={`Profile`} />
              <div className="name">{result?.name}</div>
              <div className="email">{result?.username}</div>
              <div className="info-det"></div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: 'white', textAlign: "center" }}>No Matched Results Found</div>
      )}
    </>
  );
};
