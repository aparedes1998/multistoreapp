/* eslint-disable no-underscore-dangle */
import { html, directive } from 'https://unpkg.com/lit-html?module';
import { stores as handler, addStore, addProduct } from '../scripts/index.js';
import { list, information } from '../services/stores.js';

const stores = () => {
  return new Promise(async (resolve) => {
    try {
      const elements = await list();
      if (elements.length) {
        resolve(html`
          <div class="s-stores">
            ${elements.map(
              (store) => html`
                <div class="s-information">
                  <h2 @click=${(event) => handler(event, store._id)}>
                    ${store.name}
                  </h2>
                  <p>${store.description}</p>
                </div>
              `,
            )}
          </div>
        `);
      } else {
        resolve(html`<p>No stores have been added yet!</p>`);
      }
    } catch (error) {
      resolve(html`<p>Something went wrong!</p>`);
    }
  });
};

const map = (latitude, longitude) => {
  const url = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=Rk-IjjoWjSPyh85OVnnirHta5VTXIJVBlC1JdB0UETY&style=fleet&w=640&h=480&c=${latitude},${longitude}&z=16`;
  return html`<img src="${url}" />`;
};

const store = (_id) => {
  return new Promise(async (resolve) => {
    try {
      const element = await information(_id);
      if (element) {
        resolve(html`
          <div class="s-profile">
            <div>
              ${map(element.latitude, element.longitude)}
            </div>
            <div>
              <h2>${element.name}</h2>
              <p>${element.description}</p>
              <button
                class="netlify"
                @click=${(event) => addProduct(event, _id)}
              >
                Add product
              </button>
            </div>
          </div>
          <div class="e-scroll">
            <h2>Products</h2>
            <div class="e-products">
              ${element.products.map(
                (relationship) => html`
                  <div class="e-item">
                    <img src="${relationship.productId.photo}" />
                    <div>
                      <h2>${relationship.productId.name}</h2>
                      <p>${relationship.productId.description}</p>
                      <p>${relationship.productId.supplier}</p>
                      <p>Qty. ${relationship.stock} | $${relationship.price}</p>
                    </div>
                  </div>
                `,
              )}
            </div>
          </div>
        `);
      } else {
        resolve(html`<p>Not found!</p>`);
      }
    } catch (error) {
      resolve(html`<p>Something went wrong!</p>`);
    }
  });
};

const resolve = directive((promise) => (part) => {
  part.setValue(html`<p class="spinner"></p>`);
  Promise.resolve(promise).then((result) => {
    part.setValue(result);
    part.commit();
  });
});

export default async (_id = null) => {
  return html`
    <div class="s-content">
      <div class="s-subheader">
        <h2>My Stores</h2>
        <button class="netlify" @click=${addStore}>Add store</button>
      </div>
      ${_id ? resolve(store(_id)) : resolve(stores())}
    </div>
  `;
};
