let data = new Date();
let newDate = data.toDateString();

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=89cb993b1fbeca99f9ca5e6d1fd90aa1&units=metric";
const server = "http://127.0.0.1:4000";

const error = document.getElementById("error");
const generateData = () => { 
  const zip = document.getElementById("ZipCode").value;
  const feelings = document.getElementById("feelings").value;

  getWeatherData(zip).then((data) => {
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const info = {
        newDate,
        city,
        temp: Math.round(temp), 
        description,
        feelings,
      };

      postData(server + "/add", info);

      updatingUI();
      document.getElementById('Card').style.opacity = 1;
    }
  });
};

document.getElementById("generate").addEventListener("click", generateData);

const getWeatherData = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      error.innerHTML = data.message;
      setTimeout(_=> error.innerHTML = '', 2000)
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await res.json();
    console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};


const updatingUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();

    document.getElementById("Date").innerHTML = savedData.newDate;
    document.getElementById("City").innerHTML = savedData.city;
    document.getElementById("Temp").innerHTML = savedData.temp + '&degC';
    document.getElementById("Description").innerHTML = savedData.description;
    document.getElementById("Content").innerHTML = savedData.feelings;
  } catch (error) {
    console.log(error);
  }
};
