"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProblemWithGivenTitle } from "../apicalls/ProblemApi";
import { LanguageDropdown } from "../constants/languagedropdown";
import ProblemSection_M from "./ProblemSection_M";
import CodeEditorSection_M from "./CodeEditorSection_M";

const CodeEditor_K = () => {
  const location = useLocation();
  const title = location.search.slice(7).split("%20").join(" ");
  const [data, setData] = useState({});
  const [language, setLanguage] = useState(LanguageDropdown[0].name);
  const [code, setCode] = useState("// Start coding here...");
  const [activeTab, setActiveTab] = useState("Problems");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProblemWithGivenTitle({ title: title });
        setData(response.message);
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    };
    fetchData();
  }, [title]);

  const handleEditorChange = (e) => {
   console.log("This is the code value",e.target);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.value);
  };

  const  handleCompile = async () => {
    setProcessing(true);
    const sentData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    // console.log("This is the sentdata",sentData);

    const url = import.meta.env.VITE_RAPID_API_URL;
    const host  = import.meta.env.VITE_RAPID_API_HOST;
    const key = import.meta.env.VITE_RAPID_API_KEY;

    const options = {
      method: "POST",
      url: url,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host":host ,
        "X-RapidAPI-Key": key,
      },
      data: sentData,
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-[100vw] bg-gray-900 text-white flex flex-col">
      {/* <NavBar_M /> */}
      <div className="flex flex-row overflow-hidden">
        <ProblemSection_M
          data={data}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="flex flex-col h-full">
          <div className="h-3/4">
            <CodeEditorSection_M
              language={language}
              code={code}
              handleEditorChange={handleEditorChange}
              handleLanguageChange={handleLanguageChange}
            />
          </div>
          <div className="h-1/4 text-white flex flex-col m-2">
            <div className="text-right">
              <div>
                <button
                  onClick={handleCompile}
                  disabled={!code}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition-colors mr-6"
                >
                  {processing ? "processing.." : "Compile and Run"}
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm transition-colors mr-3">
                  Submit
                </button>
              </div>
            </div>
            <div className="flex flex-row h-3/4 m-2">
              <div className="bg-gray-950 h-full w-1/2 border rounded-md">
                <p className="text-white ml-2 text-md">Input</p>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="h-3/4 w-[95%] ml-2 m-auto bg-gray-900 text-white rounded-md "
                ></textarea>
              </div>
              <div className="bg-black h-full w-1/2 border rounded-md">
                <p className="text-white ml-2 text-md">Output</p>
                <textarea className="h-3/4 w-[95%] ml-2 m-auto bg-gray-900 text-white rounded-md"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor_K;
