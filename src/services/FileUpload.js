import { RNS3 } from "react-native-aws3";


export const uploadDataSet = payload => {
  const config = {
    keyPrefix: "insert ucket folder name",
    bucket: "insert bucket name",
    region: "insert region here",
    accessKey: "insert key here",
    secretKey: "insert secret here",
    successActionStatus: 201
  };
  return RNS3.put(payload.image, config)
    .then(response => {
      if (response.status === 201) {
        console.log(response);
        return saveMetaDataToDB({
            label: payload.label,
            url: response.body.postResponse.location
        });
      }
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(Error(error));
    });
};

saveMetaDataToDB = data => {
    console.log('trying to fetch')
  return fetch("https://453c0cba.ngrok.io/api/v1/training-set/create", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    method: "POST",
    body: JSON.stringify({ ...data })
  })
    .then(res => res.json())
    .catch(error => Promise.reject(Error(error)));
};

export default uploadDataSet;
