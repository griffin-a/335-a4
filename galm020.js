const API_URL = "https://cws.auckland.ac.nz/gas/api/GameLog";

/*
[
    0: {date: '01/08/2022', played: 164, completed: 154}
    1: {date: '02/08/2022', played: 169, completed: 145}
    2: {date: '03/08/2022', played: 96, completed: 82}
]
*/

const getStats = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log(data);

  const playedData = document.getElementById("playedData");
  const completedData = document.getElementById("completedData");

  const playedNumbers = [];
  const completedNumbers = [];

  data.map(item => {
    playedNumbers.push(item["played"]);
    completedNumbers.push(item["completed"]);
  });

  playedData.innerText = playedNumbers;
  completedData.innerText = completedNumbers;

  // Find the max and min values of the data present to be used for graphing
  const playedMax = Math.max(...playedNumbers);
  const playedMin = Math.min(...playedNumbers);
  
  const completedMax = Math.max(...completedNumbers);
  const completedMin = Math.min(...completedNumbers);

  const max = Math.max(playedMax, completedMax);
  const min = Math.min(playedMin, completedMin);

  console.log(max, min);
};

getStats();
