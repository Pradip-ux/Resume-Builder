import React from 'react'

const Footer = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght=0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <footer className="flex flex-col lg:flex-row lg:justify-between overflow-hidden gap-12 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 
            bg-gradient-to-r from-white via-indigo-200/60 to-white mt-40 border-t border-indigo-100">
                
                {/* Left Section: Logo + Links */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-[60px] xl:gap-[100px] w-full lg:w-auto">
                    
                    {/* Responsive Logo Wrapper */}
                    <a href="/" className="group flex justify-center items-center shrink-0">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                <path d="M9 18h6" />
                                <path d="M10 22h4" />
                            </svg>
                        </div>
                    </a>

                    {/* Links Grid: Centers on mobile, columns on larger viewports */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 text-center md:text-left w-full sm:w-auto">
                        <div>
                            <p className="text-slate-800 font-semibold tracking-wide uppercase text-xs">Product</p>
                            <ul className="mt-3 space-y-2">
                                <li><a href="/" className="hover:text-indigo-600 transition">Home</a></li>
                                <li><a href="/" className="hover:text-indigo-600 transition">Support</a></li>
                                <li><a href="/" className="hover:text-indigo-600 transition">Pricing</a></li>
                                <li><a href="/" className="hover:text-indigo-600 transition">Affiliate</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-slate-800 font-semibold tracking-wide uppercase text-xs">Resources</p>
                            <ul className="mt-3 space-y-2">
                                <li><a href="/" className="hover:text-indigo-600 transition">Company</a></li>
                                <li><a href="/" className="hover:text-indigo-600 transition">Blogs</a></li>
                                <li><a href="/" className="hover:text-indigo-600 transition">Community</a></li>
                                <li><a href="/" className="hover:text-indigo-600 transition">Careers<span className="text-[10px] tracking-normal normal-case font-medium text-white bg-indigo-600 rounded-md ml-2 px-1.5 py-0.5 inline-block align-middle">Hiring</span></a></li>
                                <li><a href="/" className="hover:text-indigo-600 transition">About</a></li>
                            </ul>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-slate-800 font-semibold tracking-wide uppercase text-xs">Legal</p>
                            <ul className="mt-3 space-y-2">
                                <li><a href="/" className="hover:text-indigo-600 transition">Privacy</a></li>
                                <li><a href="/" className="hover:text-indigo-600 transition">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Section: Copy & Socials */}
                <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-2 border-t border-slate-200/60 pt-8 lg:pt-0 lg:border-none">
                    <p className="max-w-60 text-slate-600">Building brighter career paths, one perfect resume at a time.</p>
                    <div className="flex items-center gap-4 mt-3 text-slate-400">
                        <a href="https://dribbble.com/prebuiltui" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-indigo-600 transition-colors" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/prebuiltui" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-indigo-600 transition-colors" aria-hidden="true">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="https://x.com/prebuiltui" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-indigo-600 transition-colors" aria-hidden="true">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@prebuiltui" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-indigo-600 transition-colors" aria-hidden="true">
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                                <path d="m10 15 5-3-5-3z"></path>
                            </svg>
                        </a>
                    </div>
                    <p className="mt-3">© 2026 Resume Builder</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;