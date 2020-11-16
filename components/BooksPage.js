import React, { useState, useEffect } from "react";
import axios from "axios";

const BooksPage = (props) => {
  const { id } = props;
  const [axiosData, setAxiosData] = useState();

  useEffect(() => {
    axios
      .get(`https://www.anapioficeandfire.com/api/books/${id}`)
      .then(function (response) {
        setAxiosData(response.data);
      });
  }, []);
  if (axiosData) {
    return (
      <div className="book-container">
        <p>
          <b>Name: </b>
          {axiosData.name}
        </p>
        <p>
          <b>ISBN: </b>
          {axiosData.isbn}
        </p>
        <p>
          <b>Number of pages: </b>
          {axiosData.numberOfPages}
        </p>
        <p>
          <b>Release date: </b>
          {axiosData.released.split("T")[0]}
        </p>
      </div>
    );
  } else {
    return (
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
};

export default BooksPage;
