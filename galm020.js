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
};

getStats();
