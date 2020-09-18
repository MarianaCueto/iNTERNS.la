import axios from "axios";
import * as helpers from "./serviceHelpers";

const getById = id => {
  const config = {
    method: "GET",
    url: helpers.API_HOST_PREFIX + "/forgotPassword" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const update = (payload, token) => {
  const config = {
    method: "PUT",
    url: helpers.API_HOST_PREFIX + "/resetpassword" + token,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};
export { getById, update };
