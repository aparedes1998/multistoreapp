/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import imageHandler from '../scripts/imageHandler.js';

export const create = async (product, storeId) => {
  try {
    const [photo] = product.photo.files;
    const photoUrl = await imageHandler(photo);
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: product.name.value,
        description: product.description.value,
        supplier: product.supplier.value,
        stock: product.stock.value,
        price: product.price.value,
        storeId,
        photo: photoUrl,
      }),
    };

    const response = await window.fetch(`/.netlify/functions/products`, {
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('unauthorized');
      }
      throw new Error('something went wrong, try again!');
    }
    const data = await response.json();
    window.alert('Successfully created!');
    window.dispatchEvent(new CustomEvent('stores'));
    return data;
  } catch (error) {
    window.alert(error);
  }
};

export const liststore = async (_id) => {
  try {
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };

    const response = await window.fetch(
      `/.netlify/functions/products?_id=${_id}`,
      {
        ...options,
      },
    );

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

export const search = async (query) => {
  try {
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };

    const response = await window.fetch(
      `/.netlify/functions/products?q=${query}`,
      {
        ...options,
      },
    );

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
