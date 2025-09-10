import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { useEffect, useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Profile Icon

function Header() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('loggedInUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Check if required fields exist
        if (user && user.name && user.email) {
          setLoggedInUser(user);
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
        setLoggedInUser(null);
      }
    } else {
      setLoggedInUser(null);
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    navigate('/login');
  };

  return (
    <Navbar expand="lg" id="header">
      <Container fluid className="d-flex justify-content-between align-items-center px-4">

        {/* Logo */}
        <img
          src="/LogoUrban.png"
          height="65"
          width="65"
          className="d-inline-block align-top"
          alt="Urban Rootz Logo"
        />

        {/* Heading */}
        <div className="text-center flex-grow-1">
          <h4 className="m-0 header-title"><b>Welcome To Urban Rootz</b></h4>
        </div>

        {/* Right Section */}
        <Nav className="d-flex gap-3 align-items-center">
          {loggedInUser ? (
            <div className="position-relative d-flex align-items-center" ref={dropdownRef}>
              <FaUserCircle
                size={26}
                color="white"
                style={{ cursor: 'pointer' }}
                onClick={toggleDropdown}
              />
              <span className="text-white ms-2">Welcome, {loggedInUser.name}</span>

              {showDropdown && (
                <div className="profile-dropdown">
                  <p><strong>Name:</strong> {loggedInUser.name}</p>
                  <p><strong>Email:</strong> {loggedInUser.email}</p>
                  {/* <p><strong>Password:</strong> {loggedInUser.password}</p> */}
                  <button
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button
                    className="btn btn-sm btn-primary mt-2 ms-2"
                    onClick={() => navigate('/profile-edit')}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Click to register</Tooltip>}>
                <Nav.Link as={NavLink} to="/register" className="text-white">
                  Register
                </Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger placement="bottom" overlay={<Tooltip>Click to login</Tooltip>}>
                <Nav.Link as={NavLink} to="/login" className="text-white">
                  Login
                </Nav.Link>
              </OverlayTrigger>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
