import axios from "axios";
import * as serviceHelper from "./serviceHelpers";
axios.defaults.withCredentials = true;

const adminDashUrl = serviceHelper.API_HOST_PREFIX + "/api/admin";

const getAll = () => {
  const config = {
    method: "GET",
    url: adminDashUrl + `/dashboard`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

const adminRecentMetrics = () => {
  const config = {
    method: "GET",
    url: adminDashUrl + `/dashboard/recentMetrics`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(serviceHelper.onGlobalSuccess)
    .catch(serviceHelper.onGlobalError);
};

export { getAll, adminRecentMetrics };
