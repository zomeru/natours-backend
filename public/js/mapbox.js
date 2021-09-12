/* eslint-disable */
console.log('Hello from client side');
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoiem9tZXJ1IiwiYSI6ImNrdGg5YTU2eTBxMnAycG5tZ2xsZnY1NWEifQ.dUEMsEcC3zAnjwdGCXsS2A';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/zomeru/ckthfo4ie56dg18s2bwkf06mp',
  scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 4,
  // interactivity: false
});

const bound = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Add marker
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
