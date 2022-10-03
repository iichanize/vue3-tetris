import Axios from "axios";

const instance = Axios.create();
instance.defaults.timeout = 30000;

export const axios = instance;
