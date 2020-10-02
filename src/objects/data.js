const id = 'lU9pb0qidDFidGLicvES';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;

export const saveScore = async function (playerName, score) {
  const newscore = {
    user: playerName,
    score,
  };

  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(newscore),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .then(response => response)
    .catch(err => err);
};

export const getScores = async () => fetch(url, {
  mode: 'cors',
})
  .then(response => response.json())
  .then(response => response)
  .catch(err => err);

export const setConfig = (configKey, value) => {
  if ((value !== null || value !== undefined)
      && (configKey !== null || configKey !== undefined || configKey !== '')) {
    localStorage.setItem(configKey, value);
    return true;
  }
  return false;
};

export const getConfig = (configKey) => {
  const value = localStorage.getItem(configKey);
  if (value === null || value === undefined) {
    return null;
  }
  return value;
};
