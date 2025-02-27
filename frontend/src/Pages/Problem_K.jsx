"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getProblemWithGivenTitle } from "../apicalls/ProblemApi"
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai"
import Editor from "@monaco-editor/react"

const CodeEditor_K = () => {
  const location = useLocation()
  const title = location.search.slice(7).split("%20").join(" ")
  const [data, setData] = useState({})
  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState("// Start coding here...")
  const [activeTab, setActiveTab] = useState("Problems")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProblemWithGivenTitle({ title: title })
        setData(response.message)
      } catch (error) {
        console.log("Error occurred: ", error)
      }
    }
    fetchData()
  }, [title])

  const handleEditorChange = (value) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div className="min-h-screen w-[100vw] bg-gray-900 text-white flex flex-col">
      {/* <NavBar_M /> */}
      <div className="flex flex-1 overflow-hidden">
        <ProblemSection data={data} activeTab={activeTab} setActiveTab={setActiveTab} />
        <CodeEditorSection
          language={language}
          code={code}
          handleEditorChange={handleEditorChange}
          handleLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  )
}

const ProblemSection = ({ data, activeTab, setActiveTab }) => {
  return (
    <div className="flex-shrink flex-grow-0 max-w-[45vw] flex flex-col overflow-hidden">
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center space-x-8">
        {["Problems", "Submissions", "Solution"].map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`text-md transition duration-300 ${
              activeTab === item ? "text-purple-500" : "text-gray-300 hover:text-purple-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">1. {data.title}</h1>
          <div className="flex items-center space-x-4">
            <AiTwotoneLike className="text-xl cursor-pointer" />
            <AiTwotoneDislike className="text-xl cursor-pointer" />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.content }} className="prose prose-invert max-w-none" />
      </div>
    </div>
  )
}

const CodeEditorSection = ({ language, code, handleEditorChange, handleLanguageChange }) => {
  return (
    <div className="flex-grow min-w-[55vw] flex flex-col border-l border-gray-700">
      <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="cpp">C++</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition-colors mr-2">
            Run Code
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm transition-colors">
            Submit
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
            tabSize: 2,
            lineNumbers: "on",
          }}
        />
      </div>
    </div>
  )
}

export default CodeEditor_K

