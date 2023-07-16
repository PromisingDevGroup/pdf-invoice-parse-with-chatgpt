import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm, formidableErrors } from "../../lib/parse-form";
import { pdfParse } from "@/lib/pdf-parse";
import getAIResponse from "@/lib/chatgptresponse";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
        url: string | string[];
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
     if(Array.isArray(file)){
      for(let i = 0; i < file.length; i ++){
        pdfParse(file[i].filepath).then(result => {
          console.log("--------------------------------------------------------- from here (array) ---------------------------------------------------------");
          console.log(result);
          getAIResponse("how can I hep you today?")
          // txts += result
        })
      }
     }  else {
      // Note that even a single file is not called here ... some other reason
      let t = await pdfParse(file.filepath);
      console.log("--------------------------------------------------------- from here ---------------------------------------------------------");
      console.log(t);
     }
    // console.log(txts);

    res.status(200).json({
        data: {
          url,
        },
        error: null,
    });
  } catch (e) {
    if (e instanceof formidableErrors) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
  
}



export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;