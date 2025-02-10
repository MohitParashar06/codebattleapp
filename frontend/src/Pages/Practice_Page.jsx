"use client"

import { useState, useMemo, useEffect } from "react";
import { getTitle } from "../apicalls/ProblemApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"
import NavBar_M from "./NavBar_M";
// Hardcoded data
// const initialData = [
//   { id: 1, title: "Two Sum", difficulty: "easy", acceptanceRatio: 0.45 },
//   { id: 2, title: "Add Two Numbers", difficulty: "medium", acceptanceRatio: 0.33 },
//   { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "medium", acceptanceRatio: 0.29 },
//   { id: 4, title: "Median of Two Sorted Arrays", difficulty: "hard", acceptanceRatio: 0.28 },
//   { id: 5, title: "Longest Palindromic Substring", difficulty: "medium", acceptanceRatio: 0.29 },
//   { id: 6, title: "ZigZag Conversion", difficulty: "medium", acceptanceRatio: 0.35 },
//   { id: 7, title: "Reverse Integer", difficulty: "medium", acceptanceRatio: 0.25 },
//   { id: 8, title: "String to Integer (atoi)", difficulty: "medium", acceptanceRatio: 0.15 },
//   { id: 9, title: "Palindrome Number", difficulty: "easy", acceptanceRatio: 0.47 },
//   { id: 10, title: "Regular Expression Matching", difficulty: "hard", acceptanceRatio: 0.26 },
//   // Add more items to test pagination...
//   // (Copy-paste the above items multiple times to have more than 20 items)
//   { id: 11, title: "Two Sum", difficulty: "easy", acceptanceRatio: 0.45 },
//   { id: 12, title: "Add Two Numbers", difficulty: "medium", acceptanceRatio: 0.33 },
//   { id: 13, title: "Longest Substring Without Repeating Characters", difficulty: "medium", acceptanceRatio: 0.29 },
//   { id: 14, title: "Median of Two Sorted Arrays", difficulty: "hard", acceptanceRatio: 0.28 },
//   { id: 15, title: "Longest Palindromic Substring", difficulty: "medium", acceptanceRatio: 0.29 },
//   { id: 16, title: "ZigZag Conversion", difficulty: "medium", acceptanceRatio: 0.35 },
//   { id: 17, title: "Reverse Integer", difficulty: "medium", acceptanceRatio: 0.25 },
//   { id: 18, title: "String to Integer (atoi)", difficulty: "medium", acceptanceRatio: 0.15 },
//   { id: 19, title: "Palindrome Number", difficulty: "easy", acceptanceRatio: 0.47 },
//   { id: 20, title: "Regular Expression Matching", difficulty: "hard", acceptanceRatio: 0.26 },
//   { id: 21, title: "Two Sum", difficulty: "easy", acceptanceRatio: 0.45 },
//   { id: 22, title: "Add Two Numbers", difficulty: "medium", acceptanceRatio: 0.33 },
//   { id: 23, title: "Longest Substring Without Repeating Characters", difficulty: "medium", acceptanceRatio: 0.29 },
//   { id: 24, title: "Median of Two Sorted Arrays", difficulty: "hard", acceptanceRatio: 0.28 },
//   { id: 25, title: "Longest Palindromic Substring", difficulty: "medium", acceptanceRatio: 0.29 },
//   { id: 26, title: "ZigZag Conversion", difficulty: "medium", acceptanceRatio: 0.35 },
//   { id: 27, title: "Reverse Integer", difficulty: "medium", acceptanceRatio: 0.25 },
//   { id: 28, title: "String to Integer (atoi)", difficulty: "medium", acceptanceRatio: 0.15 },
//   { id: 29, title: "Palindrome Number", difficulty: "easy", acceptanceRatio: 0.47 },
//   { id: 30, title: "Regular Expression Matching", difficulty: "hard", acceptanceRatio: 0.26 },
// ]

const ITEMS_PER_PAGE = 10;

export default function ListPage() {
  const [initialData, setInitialData] = useState([]);
  const [difficulty, setDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTitle();
        // console.log(response.data);
        setInitialData(response.data.ques);
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    };
    fetchData();
  }, []);


  const filteredAndSortedData = useMemo(() => {
    let filteredData = initialData.filter(
      (item) => difficulty === "all" || item.difficulty === difficulty
    );

    return filteredData.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "acceptanceRatio") {
        return b.acceptanceRatio - a.acceptanceRatio;
      }
      return 0;
    });
  }, [difficulty, sortBy, initialData]);

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };
  const handleOnClick = (title)=>{
    try{
        navigate(`/codeEditor?title=${title}`);
    }catch(err){
        toast.error('Error Occured !!')
        console.log('err', err);
        
        
    }
  }
  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <>
    <NavBar_M/>
    <div className="min-h-screen bg-black text-white p-4">
      <div className="w-[75%] m-auto">
        <h1 className="text-3xl flex justify-center font-bold mb-6 text-[#EA00FF]">
          Problem List
        </h1>
        <div className="flex space-x-4 mb-6 justify-around">
          <select
            className="w-[180px] bg-[#EA00FF] text-white border-none rounded-md p-2"
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <option value="all" className="bg-black">All Difficulties</option>
            <option value="Easy" className="bg-black">Easy</option>
            <option value="Medium" className="bg-black">Medium</option>
            <option value="Hard" className="bg-black">Hard</option>
          </select>

          <select
            className="w-[180px] bg-[#EA00FF] text-white border-none rounded-md p-2"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="title" className="bg-black">Sort by Title</option>
            <option value="acceptanceRatio" className="bg-black">Sort by Acceptance</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-6">
          {paginatedData.map((item) => (
            <div key={item.id} onClick={()=>{
                handleOnClick(item.title)
            }} className="flex items-center space-x-4 hover:cursor-pointer bg-gray-900 p-4 rounded-lg">
              <div className="flex-grow">
                <h2 className="font-semibold text-[#EA00FF]">{item.title}</h2>
                <p className="text-sm text-gray-400">Difficulty: {item.difficulty}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#EA00FF]">
                  {(item.acceptanceRatio).toFixed(2)}%
                </p>
                <p className="text-xs text-gray-400">Acceptance</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="bg-[#EA00FF] text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-[#EA00FF]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="bg-[#EA00FF] text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
