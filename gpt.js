const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const { Configuration, OpenAIApi } = require("openai");
const models = [
  "gpt-3.5-turbo",
  "text-ada-001",
  "text-babbage-001",
  "text-curie-001",
  "text-davinci-003"
]
try {
    const configuration = new Configuration({
        apiKey: "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 ",//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   //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
      });
      const openai = new OpenAIApi(configuration);
      readline.question("Available ChatGPT models are:\n0. gpt-3.5-turbo\n1. text-ada-001\n2. text-babbage-001\n3. text-curie-001\n4. text-davinci-003\nWhich model(0-4)?", name=>{
        console.log(`using ${models[name]}`)
        defaultPrompt = "Hello world!"
        readline.question("What do you want to ask ChatGPT? (Hello world)", name=>{
          if(name !== ""){
            defaultPrompt = name;
          }
          console.log(`Saying ******** ${defaultPrompt} ******** to ChatGPT...`)
          openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: defaultPrompt}],
          }).then((completion) => {
              console.log("******************** ChatGPT answered: ***********************")
              console.log(completion.data.choices[0].message);
          })
          readline.close()
        })
      })
      // readline.close()

      
      
} catch (error) {
    console.log("***************************************************** ERROR OCCURED *******************************************")
    console.log(error.message)
    console.log("***************************************************** END OF ERROR *******************************************")
}


