// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getAIResponse from "@/lib/chatgpt";

type Data = {
  parsed: string | null;
  error: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({
            parsed: null,
            error: "Method Not Allowed",
        });
        return;
    }
    try {
        const { body } = req;
        const prompt = body;
        let aires = await getAIResponse(prompt);
        res.status(200).json({ parsed: aires||null, error: null })
    } catch (error:any) {
        let errorMsg = error.message;
        console.log(errorMsg);
        if(errorMsg.includes("401")){
            errorMsg = "OpenAI Api Token is incorrect!"
        }
        res.status(500).json({ parsed: null, error: errorMsg})
    }
  
}
