document.addEventListener(
  'DOMContentLoaded',
  () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGl1cml2aiIsImEiOiJjanAxdjA2cTQwMGp1M2tvYzZmZGp3bWc3In0.4cZEyLkU2ikqx_wb4A1z8A'
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.1653181, 19.4212802],
      zoom: 14
    })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const center = [position.coords.longitude, position.coords.latitude]
          const puntito = new mapboxgl.Marker({
            draggable: true,
            color: 'red'
          })
            .setLngLat(center)
            .addTo(map)
        },
        () => console.log('Error in the geolocation service.')
      )
    } else {
      console.log('Browser does not support geolocation.')
    }
  },
  false
)
