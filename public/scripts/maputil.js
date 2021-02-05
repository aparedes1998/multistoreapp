/* eslint-disable no-undef */

const addLocationsToMap = (map, locations) => {
  const group = new H.map.Group();

  let i;
  for (i = 0; i < locations.length; i += 1) {
    const location = locations[i];

    const marker = new H.map.Marker(location.position);
    marker.label = location.address.label;
    group.addObject(marker);
  }

  group.addEventListener(
    'tap',
    (evt) => {
      map.setCenter(evt.target.getGeometry());

      openBubble(evt.target.getGeometry(), evt.target.label);
    },
    false,
  );

  map.addObject(group);
  map.setCenter(group.getBoundingBox().getCenter());
  map.setZoom(16);
};

const geocode = (query) => {
  const platform = new H.service.Platform({
    apikey: 'YOUR_HERE_MAPS_API_KEY',
  });
  const div = document.getElementById('mapContainer');
  if (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  const maptypes = platform.createDefaultLayers();

  // eslint-disable-next-line no-unused-vars
  const map = new H.Map(div, maptypes.vector.normal.map, {
    zoom: 10,
    center: { lng: -56.1895335, lat: -34.889782 },
  });
  const geocoder = platform.getSearchService();
  const geocodingParameters = {
    q: query,
  };

  geocoder.geocode(
    geocodingParameters,
    (result) => {
      const locations = result.items;
      addLocationsToMap(map, locations);
      const [location] = locations;
      const { position } = location;

      document.getElementById('lat').value = position.lat;
      document.getElementById('lng').value = position.lng;
    },
    (error) => {
      console.log("Can't reach the remote server", error);
    },
  );
};

export default geocode;
