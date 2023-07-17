import { ChangeEvent, useState, useEffect } from "react";
import InformationTable from "./InformationTable";
import Loading from "./Loading";
import AlertComponent from "./AlertComponent"
import {  Button } from "@material-tailwind/react";

const MultipleFileUploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusTxt, setStatusTxt] = useState("Please start!")
  const [alertOpen, setAlertOpen] = useState(true);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  useEffect(() => {
    if(alertOpen === true){
      setTimeout(() => {
        setAlertOpen(false);
      }, 5000)
    }
  }, [alertOpen])
  useEffect(() => {
    if (prompts.length > 0) {
      setIsLoading(true);
      setStatusTxt("Sending Prompts to AI")
      setAlertOpen(true);
      let tmp:string[][] = [];
      const fetachData = async() => {
        for(let i =0; i < prompts.length; i++){
          const res = await fetch("/api/parse", {
            method: "POST",
            body: prompts[i],
          });
          const data = await res.json();
          // console.log(data.parsed);
          if (data.parsed) {
            let currentSpecs = data.parsed.split("\n")
            currentSpecs = currentSpecs.map((str: string) => str.substring(str.indexOf(":") + 1));
            // let tmp = tableData;
            tmp.push(currentSpecs);
            if (tmp.length === prompts.length) {
              setTableData(tmp);
              setStatusTxt("Got the result")
              setAlertOpen(true);
              setIsLoading(false);
            }
          } else if(data.error) {
            setStatusTxt(data.error)
            setAlertOpen(true);
            setIsLoading(false);
          } else {
            setStatusTxt("Something went wrong while interacting with OpenAI api")
            setAlertOpen(true);
            setIsLoading(false);
          }
        }
      }
      fetachData()
      
    }
  }, [prompts])


  const onFilesUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const fileInput = e.target;

    if (!fileInput.files) {
      setStatusTxt("No files were chosen");
      setAlertOpen(true);
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      setStatusTxt("Files list is empty");
      setAlertOpen(true);
      return;
    }

    /** Files validation */
    const validFiles: File[] = [];
    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];
      if (file.type !== "application/pdf") {
        setStatusTxt(`File with idx: ${i} is invalid`);
        setAlertOpen(true);
        continue;
      }

      validFiles.push(file);
    }

    try {
      setStatusTxt("Uploading and converting pdf to text")
      var formData = new FormData();
      validFiles.forEach((file) => formData.append("media", file));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const {
        data,
        error,
      }: {
        data: {
          url: string | string[];
          parsedResults: string[];
        } | null;
        error: string | null;
      } = await res.json();

      if (error || !data) {
        // alert(error || "Sorry! something went wrong.");
        setStatusTxt(error || "Sorry! Something went wrong while uploading and converting.");
        setAlertOpen(true);
        return;
      }
      setStatusTxt("Pdf loaded and parsed!")
      setAlertOpen(true);

      setPreviewUrls(
        validFiles.map((validFile) => URL.createObjectURL(validFile))
      ); // we will use this to show the preview of the images
      //set table data
      setPrompts(data.parsedResults);      

      /** Reset file input */
      fileInput.type = "text";
      fileInput.type = "file";
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setStatusTxt("Sorry! something went wrong.");
      setAlertOpen(true);
      setIsLoading(false);
    }
  };


  return (
    <div>
      <AlertComponent open={alertOpen} message={statusTxt}/>
      {isLoading === true && <Loading message={statusTxt} />}
      <form
        className="w-full p-3 border border-gray-500 border-dashed"
        onSubmit={(e) => e.preventDefault()}
      >
        {previewUrls.length > 0 ? (
          <>
            <Button
              onClick={() => {
                setPreviewUrls([])
                setTableData([])
              }}              
            >
              Clear Previews
            </Button>

            <div className="flex flex-wrap justify-start">
              {previewUrls.map((previewUrl, idx) => (
                <div key={idx} className="w-full p-1.5 md:w-1/2">
                  <iframe
                    src={previewUrl}
                    width={320}
                    height={218}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center h-full py-8 transition-colors duration-150 cursor-pointer hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <strong className="text-sm font-medium">Select Invoices(pdf)</strong>
            <input
              className="block w-0 h-0"
              accept=".pdf"
              name="file"
              type="file"
              onChange={onFilesUploadChange}
              multiple
            />
          </label>
        )}
        {tableData.length > 0 && <InformationTable data={tableData} />}
      </form>

    </div>


  );
};

export default MultipleFileUploadForm;