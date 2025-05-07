import { useState, useContext } from 'react';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Customers', path: '/customers' },
    { name: 'Segments', path: '/segments' },
    { name: 'Campaigns', path: '/campaigns' }
  ];

  return (
    <nav className="navbar" data-theme={theme}>
      <div className="navbar-container">
        <div className="nav-group">
          <a href="/" className="brand-logo">CRM</a>
          
          {/* Desktop Navigation */}
          <div className="nav-items-wrapper">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="nav-link"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Controls */}
        <div className="controls-wrapper">
          <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          {isAuthenticated ? (
            <div className="profile-wrapper">
              <button className="profile-icon">
                <FiUser />
              </button>
              <div className="profile-dropdown">
                <button onClick={logout} className="logout-button">
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>
          ) : (
            <a href="/login" className="login-button">
              <FiLogIn /> <span>Login</span>
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;