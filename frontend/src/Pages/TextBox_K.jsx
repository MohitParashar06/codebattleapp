"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"

const TextBox_K = ({ defaultLanguage = "cpp", defaultValue = "// Start coding here..." }) => {
  const [language, setLanguage] = useState(defaultLanguage)
  const [code, setCode] = useState(defaultValue)

  const handleEditorChange = (value) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div className="flex flex-col h-[100vh] w-full">
      <div className="flex justify-between items-center p-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
          </select>
        </div>
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm ml-2 transition-colors"
            onClick={() => console.log(code)}
          >
            Run Code
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm ml-2 transition-colors"
            onClick={() => console.log("Submit code")}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <Editor
          height="100%"
          defaultLanguage={language}
          defaultValue={code}
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
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

export default TextBox_K

