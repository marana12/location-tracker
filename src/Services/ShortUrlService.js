import axios from "axios";

export async function getLocationsByHash(hashedUrl) {
  let url = `/locations?hash=${hashedUrl}`;
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
