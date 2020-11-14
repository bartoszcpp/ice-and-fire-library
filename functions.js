import axios from "axios";

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

export const handleSearch = (word) => {
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
    console.log(data);
    const index = data.findIndex((data) => {
      if (data.name === word) {
        console.log(data.name);
      }
    });
    console.log(data[index].name);
    if (index !== -1) {
      console.log(data[index].url);
      url = data[index].url;
      console.log(url);
    } else {
      if (next) {
        getAxios();
      }
    }
  };
  getAxios();
};
