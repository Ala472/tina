import logo from '../../images/Logo.png';
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        
    <header className="site-header">
      <div className="header-container">
        <div className="logo-wrapper">
          <Link to="/" className="logo" aria-label="Tina Mouteur Home">
            <img src={logo} alt="" className="logo-img" />
            
          </Link>
        </div>

        <div
          className="mobile-menu-toggle"
          tabIndex="0"
          role="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="toggle-icon"></span>
          <span className="sr-only">Menu</span>
        </div>

        <nav className="main-navigation" aria-label="Main navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                  to="/"
                  className="nav-link megamenu-toggle"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="nav-link-text">Company</span>
                </Link>
            </li>

            <li className="nav-item">
              <Link
                  to="/product"
                  className="nav-link megamenu-toggle"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="nav-link-text">Our Products</span>
                </Link>
            </li>

            <li className="nav-item">
              <Link
                  to="/contact"
                  className="nav-link megamenu-toggle"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="nav-link-text">Contact</span>
                </Link>
            </li>
          </ul>

        </nav>
      </div>
    </header>

    );
}