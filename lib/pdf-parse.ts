import { PdfReader } from "pdfreader";
// import fs from "fs";

const pdfParse = (pdfpath: string) => {
    return new Promise((resolve, reject) => {
        var resultTxt : string = "";
        new PdfReader().parseFileItems(pdfpath, (err:any, item:any) => {
            if (err) {
                console.log(err)
                reject(err);
            }
            else if (!item) {
                // console.log(resultTxt)
                resolve(resultTxt);
            }
            else if (item.text) {
                // console.log(item.text)
                resultTxt += "\r\n"
                resultTxt += item.text
            }
        });
    });
}

// const rawPdfParse = (pdfpath:string) => {
//     let resultTxt = "";
//      fs.readFileSync(pdfpath, (err, pdfBuffer) => {
//         // pdfBuffer contains the file content
//         new PdfReader().parseBuffer(pdfBuffer, (err:any, item:any) => {
//             if (err) {
//                 console.error("error:", err);
//             }
//             else if (!item) {
//                 console.warn("end of file");
//             }
//             else if (item.text) {
//                 console.log(item.text)
//                 resultTxt += item.text
//             }
//         });
//       });

    
//     return resultTxt
// }

export {
    pdfParse
    // rawPdfParse
}
