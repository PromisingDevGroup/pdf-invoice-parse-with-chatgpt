import { Configuration, OpenAIApi } from "openai";
import chatgptapikey from "./chatgptapikey";







const getAIResponse = async (prompt: unknown) => {
    const configuration = new Configuration({
        apiKey: chatgptapikey,
      });
    
    const openai = new OpenAIApi(configuration);
    // const response = await openai.listModels();
    // console.log(response)

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful assistant."}, 
        {"role": "user", "content": prompt}
      ],
    });
    return completion.data.choices[0].message.content

    // const completion = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: prompt,
    //   });

    // const completion_text = completion.data.choices[0].message.content;
    // return completion_text
    // return ""
}

export default getAIResponse;