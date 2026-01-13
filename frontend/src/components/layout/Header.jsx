
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <header className='navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom position-fixed w-100' style={{ zIndex: 1030 }}>
        <div className='container-fluid px-4'>
          {/* Logo */}
          <a className='navbar-brand d-flex align-items-center' href='#home'>
            <img
                src="/logo.jpeg" 
              alt="Mood Genius Logo"
              className='rounded d-flex align-items-center justify-content-center me-2' 
              style={{
                width: '40px', 
                height: '40px', 
              }}
            />
            
            <span className='fw-bold fs-5 text-dark'>Mood Genius</span>
          </a>

          {/* Mobile Toggle Button */}
          <button 
            className='navbar-toggler' 
            type='button' 
            data-bs-toggle='collapse' 
            data-bs-target='#navbarNav'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          {/* Navigation */}
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto align-items-lg-center'>
              <li className='nav-item'>
                <NavLink className='nav-link fw-medium text-secondary' to='/home'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link fw-medium text-secondary' to='/mood-check'>
                  Mood Check
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link fw-medium text-secondary' to='/insights'>
                  Insights
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link fw-medium text-secondary' to='/contact'>
                  Contact
                </NavLink>
              </li>
              
              {/* Account Dropdown */}
              <li className='nav-item dropdown ms-lg-2'>
                <button 
                  className='btn btn-primary dropdown-toggle d-flex align-items-center gap-2' 
                  type='button'
                  id='accountDropdown'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <svg 
                    width='18' 
                    height='18' 
                    fill='currentColor' 
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/>
                  </svg>
                  Account
                </button>
                <ul className='dropdown-menu dropdown-menu-end' aria-labelledby='accountDropdown'>
                  {!isLoggedIn ? (
                    // Before Login
                    <>
                      <li>
                        <NavLink className='dropdown-item d-flex align-items-center gap-2' to='/login'>
                          <svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                            <path fillRule='evenodd' d='M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z'/>
                            <path fillRule='evenodd' d='M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'/>
                          </svg>
                          Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className='dropdown-item d-flex align-items-center gap-2' to='/signup'>
                          <svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/>
                            <path fillRule='evenodd' d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'/>
                          </svg>
                          Sign Up
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a className='dropdown-item d-flex align-items-center gap-2' href='#profile'>
                          <svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z'/>
                          </svg>
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item d-flex align-items-center gap-2' href='#settings'>
                          <svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                            <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z'/>
                            <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z'/>
                          </svg>
                          Settings
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item d-flex align-items-center gap-2' href='#support'>
                          <svg width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>
                            <path d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z'/>
                          </svg>
                          Contact Support
                        </a>
                      </li>
                     </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </header>

     </>
  );
};

export default Header;
