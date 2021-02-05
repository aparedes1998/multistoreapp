import { html } from 'https://unpkg.com/lit-html?module';
import geocode from '../scripts/maputil.js';
import { createStore } from '../services/stores.js';

const loadMap = async () => {
  await geocode(document.getElementById('directions').value);
};

export default () => {
  const handler = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const latitude = event.target.latitude.value;
    const longitude = event.target.longitude.value;
    await createStore(name, description, latitude, longitude);
  };
  return html`
    <div class="f-content">
      <div class="f-grid">
        <form @submit=${handler}>
          <div class="f-field">
            <p>Name</p>
            <input
              class="netlify"
              name="name"
              required
              type="text"
              placeholder="Name"
            />
          </div>
          <div class="f-field">
            <p>Description</p>
            <textarea
              class="netlify"
              name="description"
              placeholder="A great place..."
            ></textarea>
          </div>
          <div class="f-field">
            <p>Search direction</p>
            <input
              class="netlify"
              name="direction"
              id="directions"
              required
              placeholder="Rivera 2333, Montevideo, Uruguay"
            />
          </div>
          <button class="netlify" type="button" @click=${loadMap}>
            Show on map
          </button>
          <div class="f-field">
            <p>Latitude</p>
            <input
              id="lat"
              class="netlify"
              name="latitude"
              required
              type="text"
              readonly
              placeholder="Latitude"
            />
          </div>
          <div class="f-field">
            <p>Longitude</p>
            <input
              id="lng"
              class="netlify"
              name="longitude"
              required
              type="text"
              readonly
              placeholder="Longitude"
            />
          </div>
          <button class="netlify" type="submit">Send info</button>
          <div style="width: 100%; height: 480px" id="mapContainer"></div>
        </form>
      </div>
    </div>
  `;
};
