import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm, formidableErrors } from "../../lib/parse-form";
import { pdfParse } from "@/lib/pdf-parse";
// import getAIResponse from "@/lib/chatgptresponse";
import getAIResponse from "@/lib/chatgpt";
import makePrompt from "@/lib/makeprompt";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
        url: string[];
        parsedResults: unknown[]
    } | null;
    error: string | null;
  }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }

  // Just after the "Method Not Allowed" code
  try {
    const { fields, files } = await parseForm(req);
    const file = files.media;
    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
    console.log("Number of files to parse: ", files.length)
     if(Array.isArray(file)){
      let parsedResults: unknown[] = [];
      for(let i = 0; i < file.length; i ++){
        // if(i == file.length){
        //   //
        //   // console.log("sending result");
        //   // res.status(200).json({
        //   //   data: {
        //   //     url,
        //   //     parsedResults
        //   //   },
        //   //   error: null,
        //   // });
        // } else {
          console.log("parsing pdf files")
          await pdfParse(file[i].filepath).then(result => {
            console.log("parse success, sending to AI");
            let prompt = makePrompt(result);
            let j = 0;
            getAIResponse(prompt).then(result => {
              console.log("Got AI response\n---------------\n", result)
              parsedResults.push(result);
              console.log(i, j, parsedResults);
              if(i == j){
                res.status(200).json({
                  data: {
                    url,
                    parsedResults
                  },
                  error: null,
                });
              }
              
              j ++;
            })
            
          })
        // }
        
      }
     }  else {
      // Only multiple file is implemented
     }

    
  } catch (e) {
    console.log(e)
    // if (e instanceof formidableErrors) {
    //   console.log(e);
    //   res.status(400).json({ data: null, error: "Error Occured" });
    // } else {
    //   console.error(e);
    //   res.status(500).json({ data: null, error: "Internal Server Error" });
    // }
  }
  
}



export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;