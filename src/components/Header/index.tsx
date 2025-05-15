"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import { useAuth } from "@/Auth/authcontext";

const Header = () => {
  const { user, isLoading, logout } = useAuth();
  const isLoggedIn = !!user;
  const pathname = usePathname(); 
  const isMainPage = pathname === "/"; 
  
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 500) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };
   
  const headerClass = isMainPage 
    ? (sticky ? "bg-white shadow-sticky" : "bg-transparent") 
    : "bg-white shadow-sticky";

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center fixed transition-all duration-300 ${headerClass}`}
        role="banner"
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className="header-logo block w-full py-5 lg:py-2"
              >
                <Image
                  src={"/images/logo/logo-2.svg"}
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div className="lg:block">
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="ring-primary absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                      !isMainPage || sticky ? "bg-black" : "bg-white"
                    } ${navbarOpen ? "top-[7px] rotate-45" : ""}`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                      !isMainPage || sticky ? "bg-black" : "bg-white"
                    } ${navbarOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                      !isMainPage || sticky ? "bg-black" : "bg-white"
                    } ${navbarOpen ? "top-[-8px] -rotate-45" : ""}`}
                  />
                </button>
                <nav
                    id="navbarCollapse"
                    className={`navbar absolute right-0 top-full z-30 w-[250px] rounded border-[.5px] px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                      navbarOpen
                        ? "visibility opacity-100"
                        : "invisible opacity-0"
                    } ${
                      !isMainPage || sticky
                        ? "border-body-color/50 bg-white" 
                        : "border-white/10 bg-black/50"
                    }`}
                  >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-4 ${
                              pathname === menuItem.path
                                ? (!isMainPage || sticky) ? "text-primary" : "text-white"
                                : (!isMainPage || sticky) 
                                  ? "text-dark hover:text-primary" 
                                  : "text-white hover:text-white/80"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className={`flex cursor-pointer items-center justify-between py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-4 ${
                                (!isMainPage || sticky) 
                                  ? "text-dark group-hover:text-primary" 
                                  : "text-white group-hover:text-white/80"
                              }`}
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu relative top-full left-0 rounded-sm transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              } ${
                                (!isMainPage || sticky) 
                                  ? "bg-white" 
                                  : "bg-gray-900 text-white"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, idx) => (
                                <Link
                                  href={submenuItem.path}
                                  key={idx}
                                  className={`block rounded-sm py-2.5 text-sm lg:px-3 ${
                                    (!isMainPage || sticky)
                                      ? "text-dark hover:text-primary"
                                      : "text-white hover:text-white/80"
                                  }`}
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                {isLoading ? null : isLoggedIn ? (
                  <div className="flex items-center">
                    <span className={`hidden md:inline-block text-sm font-medium mr-4 ${
                      (!isMainPage || sticky) ? "text-dark" : "text-white"
                    }`}>
                      {user?.name || "사용자"}
                    </span>
                    <button
                      onClick={logout}
                      className={`text-sm font-medium hover:underline ${
                        (!isMainPage || sticky) ? "text-dark hover:text-primary" : "text-white hover:text-white/80"
                      }`}
                    >
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <Link
                        href="/signin"
                        className={`px-4 py-2 text-sm font-medium hover:opacity-70 ${
                          (!isMainPage || sticky) ? "text-dark" : "text-white"
                        }`}
                      >
                        로그인
                      </Link>
                      <Link
                        href="/signup"
                        className="ease-in-up shadow-btn hover:shadow-btn-hover rounded-sm bg-primary px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-opacity-90"
                      >
                        회원가입
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-[90px]"></div>
    </>
  );
};

export default Header;