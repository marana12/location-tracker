export const getLocation = async (): Promise<GeolocationCoordinates | undefined> => {
  if (navigator.geolocation) {
    const position = await new Promise<GeolocationCoordinates | undefined>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => resolve(position.coords),
        (error: GeolocationPositionError) => reject(error)
      );
    });

    return position;
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};