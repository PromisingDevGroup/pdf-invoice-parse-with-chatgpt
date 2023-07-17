import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, MouseEvent, useState } from "react";
import SingleFileUploadForm from "@/components/SingleFileUploadForm";
import MultipleFileUploadForm from "@/components/MultipleFileUploadForm";
const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>File uploader</title>
        <meta name="description" content="File uploader" />
      </Head>

      <main className="py-10">
        <div className="w-full max-w-3xl px-3 mx-auto">
          <h1 className="mb-10 text-3xl font-bold text-gray-900">
            Upload your files
          </h1>
          <MultipleFileUploadForm />
        </div>
      </main>

      <footer>
        <div className="w-full max-w-3xl px-3 mx-auto">
          <p>All right reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;