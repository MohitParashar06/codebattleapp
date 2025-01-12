import  { useState } from 'react'

const BodyContent_M = () => {
  const [difficulty, setDifficulty] = useState('easy')

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-88px)] px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Code & Compete With Your{' '}
          <span className="text-purple-500">Friends</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Join coding challenges, solve problems, and improve your skills in a fun, collaborative environment.
        </p>
      </div>
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="flex flex-col space-y-4">
            <select
              className="w-full bg-gray-600 text-white border-none rounded-lg px-3 py-3 text-md"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg text-md transition duration-300">
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BodyContent_M

