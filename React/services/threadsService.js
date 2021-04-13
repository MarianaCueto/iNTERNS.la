import axios from "axios";
import * as helpers from "./serviceHelpers";

const getById = threadId => {
  const config = {
    method: "GET",
    url: helpers.API_HOST_PREFIX + `/api/threads/${threadId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const paginate = pageIndex => {
  const config = {
    method: "GET",
    url:
      helpers.API_HOST_PREFIX +
      "/api/threads/paginate?pageindex=" +
      pageIndex +
      "&pageSize=8",
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};
const getByCurrent = pageIndex => {
  const config = {
    method: "GET",
    url:
      helpers.API_HOST_PREFIX +
      "/api/threads/current?pageIndex=" +
      pageIndex +
      "&pageSize=8" +
      "&createdBy=1",
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const add = payload => {
  const config = {
    method: "POST",
    url: helpers.API_HOST_PREFIX + "/api/threads",
    data: payload,
    crossdomain: true
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};
const update = payload => {
  const config = {
    method: "PUT",
    data: payload,
    url: helpers.API_HOST_PREFIX + `/api/threads/${payload.id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};
const deleteById = id => {
  const config = {
    method: "DELETE",
    url: helpers.API_HOST_PREFIX + `/api/threads/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const search = (data, pageIndex) => {
  const config = {
    method: "GET",
    url:
      helpers.API_HOST_PREFIX +
      "/api/threads/search?pageIndex=" +
      pageIndex +
      "&pageSize=8&search=" +
      data,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { getById, paginate, getByCurrent, add, update, deleteById, search };
