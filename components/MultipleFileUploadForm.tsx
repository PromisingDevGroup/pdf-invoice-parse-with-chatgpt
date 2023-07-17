import { ChangeEvent, useState, useEffect } from "react";
import InformationTable from "./InformationTable";
import Loading from "./Loading";
const MultipleFileUploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusTxt, setStatusTxt] = useState("Please start!")

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [tableData, setTableData] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);
  useEffect(() => {
    if (prompts.length > 0) {
      setIsLoading(true);
      setStatusTxt("sending prompts to AI")
      let tmp:string[] = [];
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
              setIsLoading(false);
            }
          } else {
            setStatusTxt("Error Occured")
            alert("Something went wrong!")
            setIsLoading(false);
          }
        }
      }
      fetachData()
      
    }
  }, [prompts])

  const getAIData = () => {
    if(prompts.length < 1){
      alert("No prompts to send")
      return;
    }

  }

  const onFilesUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No files were chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    /** Files validation */
    const validFiles: File[] = [];
    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];
      if (file.type !== "application/pdf") {
        alert(`File with idx: ${i} is invalid`);
        continue;
      }

      validFiles.push(file);
    }

    try {
      setStatusTxt("uploading and converting pdf to text")
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
        alert(error || "Sorry! something went wrong.");
        return;
      }
      setStatusTxt("pdf loaded and parsed")

      setPreviewUrls(
        validFiles.map((validFile) => URL.createObjectURL(validFile))
      ); // we will use this to show the preview of the images
      //set table data
      setPrompts(data.parsedResults);
      // console.log(data.parsedResults);
      // if (data.parsedResults && data.parsedResults.length > 0) {
      //   let tmpdata = [];
      //   for (let i = 0; i < data.parsedResults.length; i++) {
      //     let current = data.parsedResults[i];
      //     let currentSpecs = current.split("\n");
      //     if (currentSpecs.length == 8) {
      //       tmpdata.push(currentSpecs.map((str: string) => str.substring(str.indexOf(":") + 1)))
      //     } else {
      //       console.log(currentSpecs)
      //       // something is missing from the table
      //     }
      //   }
      //   setTableData(tmpdata);
      // }

      /** Reset file input */
      fileInput.type = "text";
      fileInput.type = "file";
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
      setIsLoading(false);
    }
  };


  return (
    <div>
      {isLoading === true && <Loading message={statusTxt} />}
      <form
        className="w-full p-3 border border-gray-500 border-dashed"
        onSubmit={(e) => e.preventDefault()}
      >
        {previewUrls.length > 0 ? (
          <>
            <button
              onClick={() => {
                setPreviewUrls([])
                setTableData([])
              }}
              className="mb-3 text-sm font-medium text-gray-500 transition-colors duration-300 hover:text-gray-900"
            >
              Clear Previews
            </button>

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