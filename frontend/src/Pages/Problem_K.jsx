import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProblemWithGivenTitle } from "../apicalls/ProblemApi";
import { LanguageDropdown } from "../constants/languagedropdown";
import ProblemSection_M from "./ProblemSection_M";
import CodeEditorSection_M from "./CodeEditorSection_M";
import axios from "axios";

const CodeEditor_K = () => {
  const location = useLocation();
  const title = location.search.slice(7).split("%20").join(" ");
  const [data, setData] = useState({});
  const [language, setLanguage] = useState(LanguageDropdown[0].value);
  const [langId, setLangId] = useState(LanguageDropdown[0].id);
  const [code, setCode] = useState("// Start coding here...");
  const [activeTab, setActiveTab] = useState("Problems");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);

  const url = import.meta.env.VITE_RAPID_API_URL;
  const host = import.meta.env.VITE_RAPID_API_HOST;
  const key = import.meta.env.VITE_RAPID_API_KEY;

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
    setCode(e);
  };

  const handleLanguageChange = (e) => {
    setLangId(e.id);
    setLanguage(e.value);
  };

  const getSubmission = async (token) => {
    const statusUrl = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;

    const statusOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": key,
      },
    };

    try {
      let response = await fetch(statusUrl, statusOptions);
      let result = await response.json();

      while (result.status_id <= 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = await fetch(statusUrl, statusOptions);
        result = await response.json();
      }

      return result;
    } catch (error) {
      console.error("Error while fetching submission status:", error);
      return null;
    }
  };

  const handleCompile = async () => {
    setProcessing(true);
    setOutputDetails(null); // clear previous output

    const dataToSend = {
      language_id: langId,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": key,
      },
      body: JSON.stringify(dataToSend),
    };

    try {
      const response = await fetch(
        `${url}?base64_encoded=true&fields=*`,
        requestOptions
      );

      if (!response.ok) {
        console.error("Submission request failed:", response.status);
        setProcessing(false);
        return;
      }

      const result = await response.json();
      const token = result.token;
      const finalResult = await getSubmission(token);

      if (finalResult) {
        setOutputDetails(finalResult); // ✅ Set output details for UI

        if (finalResult.status_id === 11) {
          console.error(" Runtime Error:", atob(finalResult.stderr || ""));
        } else if (finalResult.status_id === 6) {
          console.error(" Compilation Error:", atob(finalResult.compile_output || ""));
        } else {
          console.log("✅ Execution Output:", atob(finalResult.stdout || ""));
        }
      } else {
        console.error("Failed to fetch final result.");
      }
    } catch (error) {
      console.error("Error during code submission:", error);
    }

    setProcessing(false);
  };

  const getReadableOutput = () => {
    if (!outputDetails) return "";

    if (outputDetails.status_id === 6) {
      return `Compilation Error:\n${atob(outputDetails.compile_output || "")}`;
    } else if (outputDetails.status_id === 11) {
      return `Runtime Error:\n${atob(outputDetails.stderr || "")}`;
    } else if (outputDetails.stdout) {
      return atob(outputDetails.stdout);
    } else {
      return "No output.";
    }
  };

  return (
    <div className="min-h-screen w-[100vw] bg-gray-900 text-white flex flex-col">
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
              <button
                onClick={handleCompile}
                disabled={!code || processing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition-colors mr-6"
              >
                {processing ? "Processing..." : "Compile and Run"}
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm transition-colors mr-3">
                Submit
              </button>
            </div>
            <div className="flex flex-row h-3/4 m-2">
              <div className="bg-gray-950 h-full w-1/2 border rounded-md">
                <p className="text-white ml-2 text-md">Input</p>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="h-3/4 w-[95%] ml-2 m-auto bg-gray-900 text-white rounded-md"
                />
              </div>
              <div className="bg-black h-full w-1/2 border rounded-md">
                <p className="text-white ml-2 text-md">Output</p>
                <textarea
                  className="h-3/4 w-[95%] ml-2 m-auto bg-gray-900 text-white rounded-md"
                  value={getReadableOutput()}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor_K;
