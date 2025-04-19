import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="bg-blue-500 p-4 shadow-lg">
          <ul className="flex justify-between">
            <li className="text-3xl text-white font-bold">Task Manager</li>
            <ul className="flex gap-4">
              <li className="text-white font-bold">Home</li>
              <li className="text-white font-bold">About</li>
            </ul>
          </ul>
        </nav>
        
    </>
  )
}

export default Navbar