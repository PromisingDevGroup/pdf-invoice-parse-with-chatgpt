const { Configuration, OpenAIApi } = require("openai");
try {
    const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      
      openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
      }).then((completion) => {
          console.log(completion.data.choices[0].message);
      }) 
} catch (error) {
    console.log(error.message)
}


