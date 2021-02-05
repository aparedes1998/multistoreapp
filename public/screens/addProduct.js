import { html } from 'https://unpkg.com/lit-html?module';
import { create } from '../services/products.js';

const addProduct = (storeId) => {
  const handler = async (event) => {
    event.preventDefault();
    await create(event.target, storeId);
  };
  return html`
    <div class="f-content">
      <div class="f-grid">
        <form @submit=${handler}>
          <div class="f-field">
            <p>Name</p>
            <input
              name="name"
              type="text"
              placeholder="Apple"
              class="netlify"
              required
            />
          </div>
          <div class="f-field">
            <p>Description</p>
            <input
              name="description"
              type="text"
              placeholder="..."
              class="netlify"
            />
          </div>
          <div>
            <p>Upload Photo</p>
            <input type="file" name="photo" accept=".png,.jpg,.jpeg" required />
          </div>
          <div class="f-field">
            <p>Supplier</p>
            <input
              name="supplier"
              type="text"
              placeholder="..."
              class="netlify"
              required
            />
          </div>
          <div class="f-field">
            <p>Stock</p>
            <input
              name="stock"
              type="text"
              placeholder="4500"
              class="netlify"
            />
          </div>
          <div class="f-field">
            <p>Price</p>
            <input name="price" type="number" placeholder="2" class="netlify" />
          </div>
          <button class="netlify" type="submit">Create</button>
        </form>
      </div>
    </div>
  `;
};

export default addProduct;
