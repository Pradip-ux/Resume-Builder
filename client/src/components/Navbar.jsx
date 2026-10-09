// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// const Navbar = () => {
//     const user = { name: 'John Doe' }
//     const navigate = useNavigate();

//     const logoutuser = ()=>{
//         navigation('/')
//     }

//     return (
//         <div className='shadow bg-white'>
//             <nav className='flex items-center justify-center max-w-7xl mx-auto px-4 py-3.5
//         text-slate-800 transition-all'>
//                 <Link to='/'>

//                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
//                         <path d="M9 18h6" />
//                         <path d="M10 22h4" />
//                     </svg>

//                 </Link>
//                 <div className='flex items-center gap-4 text-sm'>
//                     <p className='max-sm:hidden'>Hi, {user?.name}</p>
//                     <button onClick={logoutuser} className='bg-white hover:bg-slate-50  border border-gray-300 px-7 py-1.5 rounded-full
//                     active:scale-95 transition-all'>Logout</button>
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default Navbar

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authslice';

const Navbar = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutuser = () => {
        navigate('/') 
        dispatch(logout())
    }

    return (
        <div className='shadow bg-white'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5
        text-slate-800 transition-all'>

                {/* resumeForge Logo */}
                <Link to='/' className='flex items-center gap-2.5 select-none'>
                    {/* Gradient Lightbulb Icon Container */}
                    <div className='flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-purple-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                            <path d="M9 18h6" />
                            <path d="M10 22h4" />
                        </svg>
                    </div>
                    {/* Brand Text */}
                    <span className='text-xl tracking-tight font-extrabold text-slate-900'>
                        resume<span className='text-purple-600'>Forge</span>
                    </span>
                </Link>

                <div className='flex items-center gap-4 text-sm'>
                    <p className='max-sm:hidden'>Hi, {user?.name}</p>
                    <button onClick={logoutuser} className='bg-white hover:bg-slate-50  border border-gray-300 px-7 py-1.5 rounded-full
                    active:scale-95 transition-all'>Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar