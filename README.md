This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> Scroll for instructions on how to make ajax calls

### Prop-types

Prop types will be enforced.

---

---

## Ajax calls with Axios

An example call may look like this:

```js
const create = payload => {
  const config = {
    method: "POST",
    // make note of the helpers.API_HOST_PREFIX
    url: helpers.API_HOST_PREFIX + "/api/blogs",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};
````

## Messages to user

### react-toastify

We will be using this package to give the user messages or feedback.
https://github.com/fkhadra/react-toastify

### sweetalert

We will be using this package to prompt the user to confirm any action that needs confirmation.
https://www.npmjs.com/package/sweetalert

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
