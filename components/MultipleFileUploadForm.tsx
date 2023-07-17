import Image from "next/image";
import { ChangeEvent, useState } from "react";
import InformationTable from "./InformationTable";
const MultipleFileUploadForm = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [tableData, setTableData] = useState<unknown[]>([]);

  const onFilesUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
      if(file.type !== "application/pdf"){
        alert(`File with idx: ${i} is invalid`);
        continue;
      }     

      validFiles.push(file);
    }

    try {
        var formData = new FormData();
        validFiles.forEach((file) => formData.append("media", file));
  
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
  
        const {
          data,
          parsedResults,
          error,
        }: {
          data: {
            url: string | string[];
            parsedResults: [];
          } | null;
          error: string | null;
        } = await res.json();
        
        if (error || !data) {
          alert(error || "Sorry! something went wrong.");
          return;
        }
        
        setPreviewUrls(
          validFiles.map((validFile) => URL.createObjectURL(validFile))
        ); // we will use this to show the preview of the images
        //set table data
        if(parsedResults.length > 0){
          let tmpdata = [];
          for(let i =0; i < parsedResults.length; i ++){
            let current = parsedResults[i];
            let currentSpecs = current.split("\n");
            if(currentSpecs.length == 8){
              tmpdata.push(currentSpecs.map((str:string) => str.substring(str.indexOf(":") + 1)))
            } else {
              // something is missing from the table
            }
          }
          setTableData(tmpdata);
        }  
        /** Reset file input */
        fileInput.type = "text";
        fileInput.type = "file";
  
        console.log("Files were uploaded successfylly:", data);
      } catch (error) {
        console.error(error);
        alert("Sorry! something went wrong.");
      }
  };

  
  return (
    <form
      className="w-full p-3 border border-gray-500 border-dashed"
      onSubmit={(e) => e.preventDefault()}
    >
      {previewUrls.length > 0 ? (
        <>
          <button
            onClick={() => setPreviewUrls([])}
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
      {tableData.length > 0 && <InformationTable data={tableData}/>}
    </form>
  );
};

export default MultipleFileUploadForm;