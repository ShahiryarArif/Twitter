import axios from "axios";

axios.defaults.withCredentials = true;

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export default fetcher;
