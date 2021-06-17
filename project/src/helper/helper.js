const groupOffersPerCity = (cities, offer) => {
  const cityName = offer['city']['name'];

  if (Array.isArray(cities[cityName])) {
    cities[cityName].push(offer);
  } else {
    cities[cityName] = [offer];
  }

  return cities;
};

export {groupOffersPerCity};