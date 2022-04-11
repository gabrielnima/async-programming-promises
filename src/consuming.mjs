import setText, { appendText, showWaiting, hideWaiting } from "./results.mjs";

export function get() {
  //destruccturación
  axios.get("http://localhost:3000/orders/1").then(({ data }) => {
    setText(JSON.stringify(data));
  });
}

export function getCatch() {
  axios
    .get("http://localhost:3000/orders/123")
    .then(({ data }) => {
      setText(JSON.stringify(data));
    })
    .catch((error) => setText(error));
}

export function chain() {
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(
        `http://localhost:3000/addresses/${data.shippingAddress}`
      );
    })
    .then(({ data }) => setText(data.city));
}

export function chainCatch() {
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
      throw new Error("!Error");
    })
    .catch((error) => {
      setText(error);
      throw new Error("Error 2");
    })
    .then(({ data }) => setText(data.city))
    .catch((error) => setText(error));
}

export function final() {
  showWaiting();
  axios
    .get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
      throw new Error("!Error");
    })
    .catch((error) => {
      setText(error);
      throw new Error("Error 2");
    })
    .then(({ data }) => setText(data.city))
    .catch((error) => setText(error))
    .finally(() => {
      setTimeout(() => {
        hideWaiting();
      }, 1500);
      appendText("--Completely Done");
    });
}
