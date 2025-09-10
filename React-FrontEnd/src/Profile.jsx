import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user) {
    return (
      <div>
        <Header />
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
          <h2>No user data found. Please login again.</h2>
          <button onClick={() => navigate('/login')} className="btn btn-primary mt-3">
            Go to Login
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const menuItems = [
  { title: 'Add Item', description: 'Add your items for sell', link: '/add-item' },
  { title: 'Buy Item', description: 'Browse and buy available items', link: '/buy-item' },
  { title: 'Help', description: 'Get help and support', link: '/help' },
  { title: 'Terrace Garden Essentials', description: 'Find all the must-have items for your terrace garden', link: '/essentials' },
];


  return (
    <div>
      <Header />
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
        <div className="row justify-content-center">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className="col-md-5 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate(item.link)}
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>
              {(index + 1) % 2 === 0 && <div className="w-100"><br /><br /></div>} {/* 2 line breaks after every 2 cards */}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
