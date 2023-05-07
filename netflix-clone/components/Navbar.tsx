import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import { useCallback, useEffect, useState } from "react";

const TOP_OFFSET = 66;
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className="{`px-4 md:px-16 py-6 flex items-center justify-between transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}">
        <div className="flex items-center">
          <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />

          <div className="hidden lg:flex ml-8 space-x-7">
            <NavbarItem label="Home" />
            <NavbarItem label="Series" />
            <NavbarItem label="Films" />
            <NavbarItem label="New & Popular" />
            <NavbarItem label="My List" />
            <NavbarItem label="Browse by languages" />
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div
            className="lg:hidden flex items-center space-x-2 ml-8 cursor-pointer relative"
            onClick={toggleMobileMenu}
          >
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown
              className={`w-4 text-white fill-white transition ${
                showMobileMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <MobileMenu visible={showMobileMenu} />
          </div>

          <div className="flex items-center space-x-4 cursor-pointer">
            <BsSearch className="text-gray-200 hover:text-gray-300 transition text-xl" />
            <BsBell className="text-gray-200 hover:text-gray-300 transition text-xl" />
            <div
              onClick={toggleAccountMenu}
              className="flex items-center space-x-2 cursor-pointer relative"
            >
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="/images/default-blue.png" alt="Profile" />
              </div>
              <BsChevronDown
                className={`w-4 text-white fill-white transition ${
                  showAccountMenu ? "rotate-180" : "rotate-0"
                }`}
              />
              <AccountMenu visible={showAccountMenu} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
