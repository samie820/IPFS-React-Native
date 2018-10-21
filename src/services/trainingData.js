const baseUrl = "https://b9df207d.ngrok.io";

export const getAllTrainingData = (page = "", limit = "", hasQuery = false) => {
  console.log("trying to fetch");
  const url = `${baseUrl}/api/v1/training-set/list`;
  const urlWithQuery = `${baseUrl}/api/v1/training-set/list?page=${page}`;
  const finalUrl = hasQuery ? urlWithQuery : url;
  return fetch(finalUrl, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .catch(error => Promise.reject(Error(error)));
};

export default getAllTrainingData;
