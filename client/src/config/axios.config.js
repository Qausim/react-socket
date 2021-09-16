import Axios from 'axios';
import { BASE_URL } from '../constants/string.constant';


const apiClient = Axios.create({
  baseURL: BASE_URL,
});

export default apiClient;
