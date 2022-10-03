const API_URL = "https://cws.auckland.ac.nz/gas/api/GameLog";
const BOX_WIDTH = 1600;
const BOX_HEIGHT = 800;

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

  const topLimit = document.getElementById("topLimit");
  const bottomLimit = document.getElementById("bottomLimit");

  topLimit.textContent = max;
  bottomLimit.textContent = min;

  const startDate = data[0]["date"];
  const endDate = data[data.length - 1]["date"];

  console.log(startDate, endDate);

  const firstDate = document.getElementById("startDate");
  firstDate.textContent = startDate;

  const secondDate = document.getElementById("endDate");
  secondDate.textContent = endDate;

  // Begin plotting played/finished games 
  // Get the width multiplier for each point
  const unitSizeX = ((BOX_WIDTH + 50) / data.length);

  // Get the height multiplier for each point
  const unitSizeY = Math.ceil((BOX_HEIGHT - min) / max);
  console.log(unitSizeX, unitSizeY);

  const playedDataLine = document.getElementById("playedLine");
  const completedDataLine = document.getElementById("completedLine");

  let currentX = 100;
  let playedPointsString = "";

  for (let i = 0; i < playedNumbers.length - 1; i++) {
    const xCoord = currentX;
    const yRatio = 1 - ((playedNumbers[i] - min) / (max - min));
    const yCoord = (BOX_HEIGHT * yRatio) + 100;
    playedPointsString += `${xCoord},${yCoord} `;
    currentX += unitSizeX;
  }

  console.log(playedPointsString);
  playedDataLine.setAttribute("points", playedPointsString);

  let completedPointsString = "";

  currentX = 100;

  for (let j = 0; j < completedNumbers.length - 1; j++) {
    const xCoord = currentX;
    const yRatio = 1 - ((completedNumbers[j] - min) / (max - min));
    const yCoord = (BOX_HEIGHT * yRatio) + 100;
    completedPointsString += `${xCoord},${yCoord} `;
    currentX += unitSizeX;
  }

  console.log(completedPointsString);
  completedDataLine.setAttribute("points", completedPointsString);

  // svgGraph.appendChild(playedDataLine);
  // svgGraph.appendChild(completedDataLine);
};

getStats();
