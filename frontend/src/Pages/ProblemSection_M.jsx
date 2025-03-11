import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai"


const ProblemSection_M = ({ data, activeTab, setActiveTab }) => {
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

export default ProblemSection_M;