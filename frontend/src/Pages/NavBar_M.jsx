

const NavBar_M = () => {
  return (
    <nav className="bg-gray-800 py-2 px-8 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <a href="/" className="text-3xl font-bold">
            <span className="text-white">code</span><span className="text-[#EA00FF]">Construct</span>
          </a>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center space-x-8">
            {['Active Rooms', 'Problems', 'Contact', 'About Us'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-md text-gray-300 hover:text-[#EA00FF] transition duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar_M

