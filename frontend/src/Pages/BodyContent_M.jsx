import React from 'react'
// import createRoom_M from '../component/createRoom_M.JSX'
const BodyContent_M = () => {
  return (
    <>
      <div className='flex justify-around text-white w-[100vw] p-[1.5%]'>
        <div className='create_Room'>
            <div className='starting_Text text-5xl  text-wrap w-[50%] flex justify-center items-center h-[55vh]'>
            <h1> <span >Code & Compete With Your</span>Code & Compete With Your <span className='text-[#EA00FF]'>Friends</span></h1>
          </div>
          <div className='create_Room_form w-[50%] flex justify-center items-center h
          [55vh]'>
              <div className='flex justify-between w-[100%] text-black bg-[#555555] boder-5 border-red-500 rounded-lg p-[1.5%]'>
                <select className='w-[70%] bg-none border-none rounded-lg'>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <button className='border-2 p-[1%] rounded-lg text-white bg-[#EA00FF]'>Create Room</button>
                {/* <input type='submit'>Create Room</input> */}
              </div>
          </div>
        </div> 
        <div className='additional_Info  text-wrap w-[50%]'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio voluptatum quos autem, dolorem, repudiandae deserunt nesciunt eaque fuga officia iure quaerat ipsa alias ab nobis voluptatem eos impedit exercitationem praesentium laborum, aperiam placeat? Sunt hic fugit cupiditate vitae, adipisci vero id tempora deleniti ab, commodi cum neque incidunt quidem impedit! Tenetur, voluptatum numquam. Blanditiis quasi rerum sint assumenda unde nam nemo iste dolorem animi cumque, pariatur deserunt atque, mollitia, sit soluta perspiciatis quis nihil provident? Assumenda ex possimus commodi repellat vero nam similique unde minus distinctio mollitia quibusdam accusamus cupiditate, rerum debitis. Sapiente nulla doloremque alias dignissimos pariatur, voluptas placeat necessitatibus! Sint perspiciatis, ex esse molestias veritatis corrupti adipisci reiciendis quos quibusdam dolorem maiores quis dolorum, quo, eaque a. Provident recusandae quisquam doloribus quidem, cupiditate quis asperiores illo earum. Molestiae, numquam eligendi sint quia repellendus, qui placeat adipisci ipsum odit, rerum maxime soluta alias ratione dolorem iure deleniti. Quos, voluptates!
        </div>
      </div>
    </>
  )
}

export default BodyContent_M
