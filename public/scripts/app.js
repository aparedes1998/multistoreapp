/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import { render } from 'https://unpkg.com/lit-html?module';

import { unauthenticated, authenticated } from '../layouts/index.js';

import {
  login,
  stores,
  signup,
  addStore,
  addProduct,
  search,
  productMap,
} from '../screens/index.js';

import { isLoggedIn, profile } from '../services/users.js';

const root = document.getElementById('root');

const getLayout = () => {
  const loggedIn = isLoggedIn();
  if (loggedIn) {
    return authenticated;
  }
  return unauthenticated;
};

const setMain = () => {
  history.pushState({}, '', '/');
  const layout = getLayout();
  const content = search();
  render(layout(content), root);
};

const setLogin = () => {
  history.pushState({}, '', '/login');
  const layout = getLayout();
  const content = login();
  render(layout(content), root);
};

const setStores = async (event) => {
  const { _id } = event.detail || {};
  const layout = getLayout();
  const content = await stores(_id);
  if (_id) {
    history.pushState({}, '', `/stores/${_id}`);
  } else {
    history.pushState({}, '', '/stores');
  }
  render(layout(content), root);
};

const setAddStore = () => {
  history.pushState({}, '', '/stores/add');
  const layout = getLayout();
  const content = addStore();
  render(layout(content), root);
};

const setSignup = () => {
  history.pushState({}, '', '/register');
  const layout = getLayout();
  const content = signup();
  render(layout(content), root);
};

const setAddProduct = (event) => {
  history.pushState({}, '', '/products/add');
  const { storeId } = event.detail || {};
  const layout = getLayout();
  const content = addProduct(storeId);
  render(layout(content), root);
};

const setStoreMap = (event) => {
  const { storeId, lat1, lon1, lat2, lon2 } = event.detail || {};
  history.pushState({}, '', `/stores/map/?id=${storeId}`);
  const layout = getLayout();
  const content = productMap(lat1, lon1, lat2, lon2);
  render(layout(content), root);
};

window.addEventListener('main', setMain);
window.addEventListener('login', setLogin);
window.addEventListener('logout', setLogin);
window.addEventListener('stores', setStores);
window.addEventListener('signup', setSignup);
window.addEventListener('addStore', setAddStore);
window.addEventListener('addProduct', setAddProduct);
window.addEventListener('productMap', setStoreMap);

const navigate = async () => {
  const path = window.location.pathname;
  // Reviso si el token sigue siendo válido, si tira error, no lo es.
  profile()
    .then(() => {
      switch (path) {
        case '/login':
          window.dispatchEvent(new CustomEvent('main')); // Ya estoy logueado
          break;
        case '/home':
          window.dispatchEvent(new CustomEvent('main'));
          break;
        case '/stores':
          window.dispatchEvent(new CustomEvent('stores'));
          break;
        case '/register':
          window.dispatchEvent(new CustomEvent('signup')); // Ya estoy logueado
          break;
        default:
          setMain();
          break;
      }
    })
    .catch(() => {
      localStorage.clear('token');
      if (path === '/login') {
        setLogin();
      } else if (path === '/home') {
        setMain();
      } else if (path === '/register') {
        setSignup();
      } else {
        setMain();
      }
    });
};
navigate();
