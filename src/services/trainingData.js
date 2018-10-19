export const getAllTrainingData = (page = "", limit = "", hasQuery = false) => {
  console.log("trying to fetch");
  const url = "https://453c0cba.ngrok.io/api/v1/training-set/list";
  const urlWithQuery = `https://453c0cba.ngrok.io/api/v1/training-set/list?page=${page}&limit=${limit}`;
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
