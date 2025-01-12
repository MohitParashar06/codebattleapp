
import NavBar_M from './NavBar_M'
import BodyContent_M from './BodyContent_M'

const HomePage_M = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar_M />
      <main className="container mx-auto">
        <BodyContent_M />
      </main>
    </div>
  )
}

export default HomePage_M


