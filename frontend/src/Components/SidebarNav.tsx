import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logedInNavs } from '../constants';
import Logo from './Logo';
import { NavItem } from './NavItem';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`${
        isOpen ? 'fixed z-50' : 'relative'
      } w-full md:w-[20vw] h-full md:h-auto md:relative transition-all duration-300`}
    >
      <div className="flex flex-col min-h-screen">
        {/* Header with Logo and Menu Toggle */}
        <div className="flex items-center justify-between w-full p-4 bg-black md:bg-transparent">
          <Link to="/" className="block">
            <Logo />
          </Link>
          <button
            onClick={toggleMenu}
            className="text-white md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:block flex-grow p-4 bg-black md:bg-transparent transition-all duration-300`}
        >
          {logedInNavs.map((el) => (
            <NavItem
              key={crypto.randomUUID()}
              page={el.page}
              link={el.link}
              location={el.location}
            >
              {el.icon}
            </NavItem>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default SidebarNav;
