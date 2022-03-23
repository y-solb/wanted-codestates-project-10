import axios from 'axios';

export default async function search(keyword) {
  const response = await axios.get(process.env.REACT_APP_SEARCH_API, {
    params: {
      name: keyword,
    },
  });

  return response.data.slice(0, 7);
}
