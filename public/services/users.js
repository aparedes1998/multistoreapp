/* eslint-disable no-alert */

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.clear();
  window.dispatchEvent(new CustomEvent('logout'));
};

export const login = async (email, password) => {
  try {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const response = await window.fetch(`/.netlify/functions/sessions`, {
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid username/password combination!');
      }
      throw new Error('Something went wrong, try again!');
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.name);

    window.dispatchEvent(new CustomEvent('main'));
  } catch (error) {
    window.alert(error);
  }
};

export const register = async (name, email, password) => {
  try {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    };

    const response = await window.fetch(`/.netlify/functions/accounts`, {
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('An user with that email already exists');
      }
      throw new Error('Something went wrong, try again!');
    }
    window.alert('Successfully registered!');
    window.dispatchEvent(new CustomEvent('login'));
  } catch (error) {
    window.alert(error);
  }
};

export const profile = async () => {
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  };

  const response = await window.fetch('/.netlify/functions/users', {
    ...options,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid token');
    }
    if (response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Something went wrong');
  }
  const data = await response.json();
  return data;
};
