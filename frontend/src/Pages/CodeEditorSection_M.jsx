import Editor from "@monaco-editor/react";
import Select from "react-select";
import { LanguageDropdown } from "../constants/languagedropdown";

const CodeEditorSection_M = (props) => {
  const { language, code, handleEditorChange, handleLanguageChange } = props;
  return (
    <div className="flex-grow min-w-[55vw]  h-full flex flex-col border-l border-gray-700">
      <div className="bg-gray-800 border-b border-gray-700 text-black p-4 flex justify-between items-center">
        <Select
          placeholder={"Filter by value"}
          options={LanguageDropdown}
          defaultValue={LanguageDropdown[0].name}
          onChange={handleLanguageChange}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "grey" : "red",
            }),
          }}
        />
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
  );
};

export default CodeEditorSection_M;
