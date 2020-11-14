import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState();
  const page = currentPage || 1;
  //const value = { page, setPage };
  const [axiosData, setAxiosData] = useState();

  const [first, setFirst] = useState();
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [last, setLast] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState(false);
  const [word, setWord] = useState("");
  const [name, setName] = useState();
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
    let page = 0;
    let url = null;
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
        url = data[index].url;
        setSearch(true);
        setAxiosDataOneCharacter(data[index]);
      } else {
        if (next) {
          getAxios();
        }
      }
    };
    getAxios();
  };

  let characters = null;
  if (!search) {
    if (axiosData) {
      characters = axiosData.map((data, index) => {
        let tvSeriesLength = 0;
        if (data.tvSeries[0]) {
          tvSeriesLength = data.tvSeries.length;
          console.log(typeof data.tvSeries.length);
          console.log(data.name);
        }
        if (gender === "female") {
          if (data.gender === "Female") {
            return (
              <div key={index}>
                <p>
                  {data.name === ""
                    ? `${data.aliases}`
                    : `${data.name}, ${data.aliases}`}
                </p>
                <p>{tvSeriesLength}</p>
              </div>
            );
          }
        } else if (gender === "male") {
          if (data.gender === "Male") {
            return (
              <div key={index}>
                <p>
                  {data.name === ""
                    ? `${data.aliases}`
                    : `${data.name}, ${data.aliases}`}
                </p>
                <p>{tvSeriesLength}</p>
              </div>
            );
          }
        } else {
          return (
            <div key={index}>
              <p>
                {data.name === ""
                  ? `${data.aliases}`
                  : `${data.name}, ${data.aliases}`}
              </p>
              <p>{tvSeriesLength}</p>
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
        <div>
          <p>
            {axiosDataOneCharacter.name === ""
              ? `${axiosDataOneCharacter.aliases}`
              : `${axiosDataOneCharacter.name}, ${axiosDataOneCharacter.aliases}`}
          </p>
        </div>
      );
    } else return null;
  }

  return (
    <div>
      <div>{currentPage}</div>
      {characters}
      <div className="container">
        <input
          type="text"
          placeholder="Meribald"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={() => handleSearch(word)}>Szukaj</button>
        <div className="select-gender-container">
          <select onChange={(e) => setGender(e.target.value)} value={gender}>
            <option value="all gender">All gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="select-page-size-container">
          <select
            onChange={(e) => setPageSize(e.target.value)}
            value={pageSize}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
        <div className="pagination-container">
          <button onClick={() => setCurrentPage(first)}>First</button>
          <button onClick={() => setCurrentPage(previous)}>Prev</button>
          <button onClick={() => setCurrentPage(next)}>Next</button>
          <button onClick={() => setCurrentPage(last)}>Last</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
