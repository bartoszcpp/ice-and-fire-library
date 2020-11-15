import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "./Character";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBook } from "@fortawesome/free-solid-svg-icons";

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
      })
      .catch(function (error) {
        console.log(error);
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
      let page = 0;
      const getAxios = () => {
        page = page + 1;
        axios
          .get(
            `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`
          )
          .then(function (response) {
            const parseAxiosData = parseData(response.headers.link);
            console.log(parseAxiosData.next);
            showDetails(parseAxiosData.next, response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      const showDetails = (next, data) => {
        const index = data.findIndex(
          (data) => data.name.toUpperCase() === word.toUpperCase()
        );
        if (index !== -1) {
          setSearch(true);
          setAxiosDataOneCharacter(data[index]);
        } else {
          if (next) {
            getAxios();
          }
        }
      };
      getAxios();
    }
  };

  console.log(axiosData);

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
      characters = <div>Loading...</div>;
    }
  } else {
    if (axiosDataOneCharacter) {
      characters = (
        <div className="col-lg-3 col-md-4 character-container">
          <Character data={axiosDataOneCharacter} />
        </div>
      );
    } else return null;
  }

  return (
    <>
      <div className="d-flex main-options">
        <div className="mr-auto">
          <input
            type="text"
            className="input-name"
            placeholder="Meribald"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button className="search-button" onClick={() => handleSearch(word)}>
            <FontAwesomeIcon className="socialIcon" icon={faSearch} />
          </button>
        </div>
        <div className="ml-auto">
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

      <h2 className="mr-auto">All characters:</h2>

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
          {currentPage}
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
