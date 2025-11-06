import React from 'react';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

// Mock data (use your actual category state if available directly in MobileHeader)
const mockCategories = ['Sofas', 'Lighting', 'Shelf', 'Chair', 'Clock']; 

function MobileHeader({ onMenuToggle, isMenuOpen }) {
    return (
        // The header bar, visible only on screens smaller than the 'md' breakpoint
        <div className='w-full bg-[#014d40] text-white p-4 flex justify-between items-center shadow-lg md:hidden sticky top-0 z-50'>
            
            {/* Logo/Title */}
            <h1 className="text-xl font-bold text-white">
                Woodspire
            </h1>

            {/* Hamburger/Close Button */}
            <button
                onClick={onMenuToggle}
                className="p-2 rounded-md hover:bg-[#00a896] transition duration-200"
                aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
                {isMenuOpen ? (
                    <IoMdClose className="h-6 w-6" />
                ) : (
                    <FaBars className="h-6 w-6" />
                )}
            </button>

            {/* Mobile Menu Overlay/Drawer */}
            <div className={`
                fixed top-16 left-0 w-64 h-full bg-[#002d25] p-6 transition-transform duration-300 ease-in-out z-40
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <h3 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-4 text-[#00a896]">
                    Categories
                </h3>
                <ul className="space-y-3">
                    {mockCategories.map((cat) => (
                        <li key={cat}>
                            <a 
                                href="#" 
                                className="block py-2 text-gray-200 hover:text-white hover:bg-[#014d40] rounded-md px-2 transition-colors"
                                onClick={onMenuToggle} // Close menu on click
                            >
                                {cat}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 pt-4 border-t border-gray-600">
                     <button className='w-full text-center bg-[#00a896] font-medium text-white px-4 py-2 rounded-md hover:bg-[#008f7d] transition duration-300'>
                        Shop All
                    </button>
                </div>
            </div>

             {/* Backdrop */}
             {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
                    onClick={onMenuToggle}
                ></div>
            )}
        </div>
    );
}

export default MobileHeader;