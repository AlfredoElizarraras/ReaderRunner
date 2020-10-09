/* eslint-disable consistent-return */
const id = 'lU9pb0qidDFidGLicvES';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;

export async function saveScore(playerName, score) {
  const newscore = {
    user: playerName,
    score,
  };

  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(newscore),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  });

  try {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  } catch (error) {
    localStorage.setItem('error', `${error}`);
  }
}

export const getScores = async () => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    const data = await response.json();
    return data;
  } catch (error) {
    localStorage.setItem('error', `${error}`);
  }
};

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
/* eslint-enable consistent-return */
