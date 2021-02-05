import { html, directive, render } from 'https://unpkg.com/lit-html?module';
import { search as products } from '../services/products.js';
import { getDistance, getUserLocation } from '../scripts/distanceHandler.js';
import { storeMap as routeHandler } from '../scripts/index.js';

const search = (q) => {
  return new Promise(async (resolve) => {
    try {
      const elements = await products(q);
      if (elements.length) {
        const coordinates = await getUserLocation();
        resolve(
          html`<div class="products">
            ${elements.map((product) => {
              product.stores.forEach((s) => {
                s.distance = getDistance(
                  s.latitude,
                  s.longitude,
                  coordinates ? coordinates.coords : null,
                );
              });
              product.stores.sort((a, b) => {
                return a.distance - b.distance;
              });
              return html`
                <div class="item">
                  <img src="${product.photo}" />
                  <div>
                    <h2>${product.name}</h2>
                    <p>${product.supplier}</p>
                    ${product.stores.map(
                      (store) =>
                        html`
                          <p
                            @click=${(event) =>
                              coordinates
                                ? routeHandler(
                                    event,
                                    // eslint-disable-next-line no-underscore-dangle
                                    store._id,
                                    coordinates.coords.latitude,
                                    coordinates.coords.longitude,
                                    store.latitude,
                                    store.longitude,
                                  )
                                : null}
                          >
                            ${store.name} | $${store.price} | ${store.distance}
                            km away
                          </p>
                        `,
                    )}
                  </div>
                </div>
              `;
            })}
          </div>`,
        );
      } else {
        resolve(html`<p>Try with another product!</p>`);
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

export default () => {
  const handler = async (event) => {
    event.preventDefault();
    const query = event.target.query.value;
    const element = document.getElementById('products');
    render(resolve(search(query)), element);
  };
  return html`
    <link href="./styles/search.css" rel="stylesheet" />
    <div class="content">
      <form @submit=${handler} class="subheader">
        <input type="text" name="query" minlength="3" placeholder="Search something..." required />
        <button class="netlify" type="submit">Search</button>
      </form>
      <div id="products"></div>
      </div>
    </div>
  `;
};
