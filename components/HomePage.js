import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "./Character";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState();
  const page = currentPage || 1;
  const [axiosData, setAxiosData] = useState();

  const [first, setFirst] = useState();
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [last, setLast] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState(false);
  const [word, setWord] = useState("");
  const [axiosDataOneCharacter, setAxiosDataOneCharacter] = useState();
  const [gender, setGender] = useState("all gender");
  const [searchWord, setSearchWord] = useState(false);
  const [noCharacter, setNoCharacter] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=${pageSize}`
      )
      .then(function (response) {
        const parseAxiosData = parseData(response.headers.link);
        setFirst(parseAxiosData.first);
        setPrevious(parseAxiosData.prev);
        setNext(parseAxiosData.next);
        setLast(parseAxiosData.last);
        setAxiosData(response.data);
      });
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (word === "") {
      setSearch(false);
    }
  }, [word]);

  function parseData(data) {
    let arrData = data;
    data = arrData.length == 2 ? arrData[1] : data;
    let parsed_data = {};

    arrData = data.split(",");

    for (const d of arrData) {
      const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(d);
      parsed_data[linkInfo[2]] = linkInfo[1].match(/\d+/)[0];
    }

    return parsed_data;
  }

  const handleSearch = (word) => {
    if (word !== "") {
      setSearchWord(true);
      let page = 0;
      const getAxios = () => {
        page = page + 1;
        axios
          .get(
            `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`
          )
          .then(function (response) {
            const parseAxiosData = parseData(response.headers.link);
            showDetails(parseAxiosData.next, response.data);
          });
      };
      const showDetails = (next, data) => {
        const index = data.findIndex(
          (data) => data.name.toUpperCase() === word.toUpperCase()
        );
        if (index !== -1) {
          setSearchWord(false);
          setSearch(true);
          setAxiosDataOneCharacter(data[index]);
        } else {
          if (next) {
            getAxios();
          } else {
            setSearch(true);
            setNoCharacter(true);
            setSearchWord(false);
          }
        }
      };
      getAxios();
    }
  };

  const handleClearWord = () => {
    setSearch(false);
    setWord("");
  };

  let characters = null;
  if (!search) {
    if (axiosData) {
      characters = axiosData.map((data, index) => {
        if (gender === "female") {
          if (data.gender === "Female") {
            return (
              <div
                key={index}
                className="col-lg-3 col-md-4 character-container"
              >
                <Character data={data} />
              </div>
            );
          }
        } else if (gender === "male") {
          if (data.gender === "Male") {
            return (
              <div
                key={index}
                className="col-lg-3 col-md-4 character-container"
              >
                <Character data={data} />
              </div>
            );
          }
        } else {
          return (
            <div key={index} className="col-lg-3 col-md-4 character-container">
              <Character data={data} />
            </div>
          );
        }
      });
    } else {
      characters = (
        <div className="loading-container">
          <div className="fire">
            <div className="fire-left">
              <div className="main-fire"></div>
              <div className="particle-fire"></div>
            </div>
            <div className="fire-main">
              <div className="main-fire"></div>
              <div className="particle-fire"></div>
            </div>
            <div className="fire-right">
              <div className="main-fire"></div>
              <div className="particle-fire"></div>
            </div>
            <div className="fire-bottom">
              <div className="main-fire"></div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    if (axiosDataOneCharacter) {
      characters = (
        <div className="col-lg-3 col-md-4 character-container">
          <Character data={axiosDataOneCharacter} />
        </div>
      );
    } else if (noCharacter) {
      characters = (
        <div className="col-lg-3 col-md-4 character-container">
          <p className="text-white">No results :( Try search some one else</p>
        </div>
      );
    }
  }

  return (
    <>
      <div className="row main-options">
        <div className="col-sm-6 d-flex">
          <input
            type="text"
            className="input-name"
            placeholder="Meribald"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            hidden={!search}
            className="search-button"
            onClick={() => handleClearWord()}
          >
            <FontAwesomeIcon className="socialIcon" icon={faTrashAlt} />
          </button>
          <button className="search-button" onClick={() => handleSearch(word)}>
            <FontAwesomeIcon className="socialIcon" icon={faSearch} />
          </button>
          {searchWord && (
            <div className="">
              <div className="loading-container-small">
                <div className="fire">
                  <div className="fire-left">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                  </div>
                  <div className="fire-main">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                  </div>
                  <div className="fire-right">
                    <div className="main-fire"></div>
                    <div className="particle-fire"></div>
                  </div>
                  <div className="fire-bottom">
                    <div className="main-fire"></div>
                  </div>
                </div>
              </div>
              <p className="m-auto text-white text-center">Search...</p>
            </div>
          )}
        </div>
        <div className="col-sm-6">
          <div className="ml-auto select-gender-page-size">
            <select
              hidden={search}
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              className="select-gender"
            >
              <option value="all gender">All gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>

            <select
              onChange={(e) => setPageSize(e.target.value)}
              value={pageSize}
              hidden={search}
              className="select-page-size"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>
      </div>

      <h2 className="mr-auto text-white">All characters:</h2>

      <div className="row characters">{characters}</div>

      <div className="current-page"></div>
      <div className="pagination-container">
        <div className="mx-auto w-ft">
          <button hidden={search} onClick={() => setCurrentPage(first)}>
            First
          </button>
          <button hidden={search} onClick={() => setCurrentPage(previous)}>
            Prev
          </button>
          <span className="current-page">{currentPage}</span>
          <button hidden={search} onClick={() => setCurrentPage(next)}>
            Next
          </button>
          <button hidden={search} onClick={() => setCurrentPage(last)}>
            Last
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
