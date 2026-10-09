// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Navbar from '../components/Navbar'
// import {useSelector} from 'react-redux'
// import Loader from '../components/Loader'
// import Login from './Login'
// const Layout = () => {
//   const { user, loading } = useSelector(state => state.auth)
//   if (loading) {
//     return <Loader />
//   }
//   return (
//     <div>
//       {user ? (<div className='min-h-screenbg-gray-50'>
//         <Navbar />
//         <Outlet />
//       </div>) :
//         <Login />
//       }

//     </div>
//   )
// }

// export default Layout


import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Login from './Login'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const Layout = () => {
  const { user, loading } = useSelector(state => state.auth)
  const navigate = useNavigate()

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      {user ? (
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          {/* Responsive Back Button */}
          <div className="w-full px-3 py-3 sm:px-6 md:px-8 lg:px-10">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 sm:px-4 sm:py-2.5 sm:text-base"
              title="Back to Home"
              aria-label="Back to Home"
            >
              <ArrowLeftIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

              <span className="hidden xs:inline sm:inline">
                Back to Home
              </span>
            </button>
          </div>

          <main className="w-full min-w-0">
            <Outlet />
          </main>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Layout

