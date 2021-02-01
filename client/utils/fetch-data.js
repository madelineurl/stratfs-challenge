import axios from 'axios';

export const fetchData = () => {
  return axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
};
