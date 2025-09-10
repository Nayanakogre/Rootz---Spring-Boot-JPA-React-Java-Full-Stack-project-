// App.jsx
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Register from './Register';
import Login from './login'; 
import Profile from './Profile'; 
import EditProfile from './EditProfile';
import ForgotPassword from './ForgotPassword';  
import ResetPassword from './ResetPassword';
   
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="main-layout">
      <Header />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile-edit" element={<EditProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
