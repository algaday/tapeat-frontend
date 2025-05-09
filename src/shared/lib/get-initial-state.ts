export function getInitialState() {
  const locationContent = localStorage.getItem('locationContent');
  return locationContent
    ? JSON.parse(locationContent)
    : {
        deliveryAddress: {
          coordinates: [71.430429, 51.128201],
          address: 'Астана, бульвар Нуржол, 14',
        },
        pickupAddress: {
          coordinates: [71.428489, 51.113253],
          address: null,
        },
        type: 'delivery',
      };
}
