import { RNS3 } from "react-native-aws3";


export const uploadDataSet = payload => {
  const config = {
    keyPrefix: "dataset/",
    bucket: "training-set-data",
    region: "us-east-1",
    accessKey: "AKIAJYJVGNUJ3IR236QA",
    secretKey: "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",
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
