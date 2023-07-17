import chatgptapikey from "./chatgptapikey";
import axios from "axios";
const client = axios.create({
  headers: { Authorization: "Bearer " + chatgptapikey },
});

const getAIResponse = (prompt: unknown) => {
  const params = {
    prompt: prompt,
    max_tokens: 1024,
  };
  const chatgpturls = [
    "https://api.openai.com/v1/engines/davinci/completions",
    "https://api.openai.com/v1/models/text-ada-001/completions",
    "https://api.openai.com/v1/models/text-babbage-001/completions",
    "https://api.openai.com/v1/models/text-curie-001/completions",
  ]
  return new Promise ((resolve, reject) => {
    client
    .post("https://api.openai.com/v1/engines/davinci/completions", params)
    .then((result) => {
    //   console.log("****************** Chat gpt response ************");
      console.log(result.data);
        resolve(result.data.choices[0].text);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
  })
 
};

export default getAIResponse;
