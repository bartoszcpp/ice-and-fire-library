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
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return <div className="book-container">boook</div>;
};

export default BooksPage;
