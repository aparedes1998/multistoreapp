const main = () => window.dispatchEvent(new CustomEvent('main'));

const login = () => window.dispatchEvent(new CustomEvent('login'));

const signup = () => window.dispatchEvent(new CustomEvent('signup'));

const stores = (event, _id) => {
  if (_id) {
    window.dispatchEvent(
      new CustomEvent('stores', {
        detail: {
          _id,
        },
      }),
    );
  } else {
    window.dispatchEvent(new CustomEvent('stores'));
  }
};

const addStore = () => window.dispatchEvent(new CustomEvent('addStore'));

const addProduct = (event, storeId) => {
  if (storeId) {
    window.dispatchEvent(
      new CustomEvent('addProduct', {
        detail: {
          storeId,
        },
      }),
    );
  } else {
    window.dispatchEvent(new CustomEvent('stores'));
  }
};

const storeMap = (event, storeId, lat1, lon1, lat2, lon2) => {
  window.dispatchEvent(
    new CustomEvent('productMap', {
      detail: {
        storeId,
        lat1,
        lat2,
        lon1,
        lon2,
      },
    }),
  );
};

export { main, login, stores, signup, addStore, addProduct, storeMap };
