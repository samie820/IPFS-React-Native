export const uploadDataSet = payload => {
  const data = new FormData();
  data.append("label", payload.label);
  data.append("trainingData", payload.image);
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    },
    body: data
  };
  console.log("trying to fetch");
  return fetch("https://b9df207d.ngrok.io/api/v1/training-set/create", config)
    .then(res => res.json())
    .catch(error => Promise.reject(Error(error)));
};

export default uploadDataSet;
