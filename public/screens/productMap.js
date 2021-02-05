import { html } from 'https://unpkg.com/lit-html?module';

const showWay = (lat1, lon1, lat2, lon2) => {
  console.log(lon1);
  return html`
    <img
      src="https://image.maps.ls.hereapi.com/mia/1.6/routing?apiKey=Rk-IjjoWjSPyh85OVnnirHta5VTXIJVBlC1JdB0UETY&waypoint0=${lat1},${lon1}&waypoint1=${lat2},${lon2}&z=16&style=fleet&w=640&h=480"
      alt="”store"
      location”
    />
  `;
};

export default showWay;
