/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { stores } from '../scripts/index.js';

export const list = async () => {
  try {
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };

    const response = await window.fetch(`/.netlify/functions/stores`, {
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('unauthorized');
      }
      throw new Error('something went wrong, try again!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    window.alert(error);
  }
};

export const information = async (_id) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  };

  const response = await window.fetch(`/.netlify/functions/stores?_id=${_id}`, {
    ...options,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('unauthorized');
    }
    throw new Error('something went wrong, try again!');
  }

  const data = await response.json();
  return data;
};

export const createStore = async (name, description, latitude, longitude) => {
  try {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name,
        description,
        latitude,
        longitude,
      }),
    };

    const response = await window.fetch(`/.netlify/functions/stores`, {
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('unauthorized');
      }
      throw new Error('something went wrong, try again!');
    }
    window.alert('Successfully created!');
    stores();
  } catch (error) {
    window.alert(error);
  }
};
