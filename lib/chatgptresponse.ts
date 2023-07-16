// import { Configuration, OpenAIApi } from "openai";

// import chatgptapi from "./chatgptapi";
// // Set up the OpenAI API client with your API key
// const configuration = new Configuration({
//     organization: "YOUR_ORG_ID",
//     apiKey: chatgptapi,
// });
// const openai = new OpenAIApi(configuration);

// const getAIResponse = (prompt: string) => {
//   // Define the prompt to start the conversation
//   prompt = "Hi, how can I help you today?";

//   // Generate a response to the prompt using the OpenAI API
//   client.completions
//     .create({
//       engine: "text-davinci-002",
//       prompt: prompt,
//       max_tokens: 64,
//       n: 1,
//       stop: "\n",
//     })
//     .then((response: any) => {
//       const message: string = response.choices[0].text.trim();
//       console.log(message);
//     })
//     .catch((err: any) => {
//       console.error(err);
//     });
// };

// export default getAIResponse;
import chatgptapi from "./chatgptapi";
import axios from "axios"
// const axios = require("axios");
// const apiKey = process.env.OPENAI_API_KEY;
const client = axios.create({
  headers: { Authorization: "Bearer " + chatgptapi },
});

const params = {
  prompt: "Once upon a time",
  max_tokens: 1000,
};
const getAIResponse = () => {
  client
    .post("https://api.openai.com/v1/engines/davinci/completions", params)
    .then((result) => {
        console.log("****************** Chat gpt response ************")
        console.log(result.data.choices)
      console.log(params.prompt + result.data.choices[0].text);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getAIResponse
