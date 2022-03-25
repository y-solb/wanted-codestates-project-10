import axios from 'axios';

export default function search(keyword) {
  const response = axios.get(process.env.REACT_APP_SEARCH_API, {
    params: {
      name: keyword,
    },
  });

  return response;
}
