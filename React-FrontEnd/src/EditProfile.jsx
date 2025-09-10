import React, { useState, useEffect } from "react";
import axios from "axios";
import "./editProfile.css";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // 👇 Assume you saved logged-in email in localStorage during login
  const loggedEmail = localStorage.getItem("email");

  // Fetch user data on load
  useEffect(() => {
    if (loggedEmail) {
      axios
        .get(`http://localhost:8080/rootz/profile/${loggedEmail}`)
        .then((res) => {
          setFormData({
            name: res.data.name || "",
            email: res.data.email || "",
          });
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    }
  }, [loggedEmail]);

  // Handle text input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Update profile details
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/rootz/edit-profile",
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      alert(response.data);
    } catch (error) {
      alert("Update failed: " + (error.response?.data || "Server error"));
    }
  };

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/rootz/change-password",
        {
          email: formData.email,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  // Upload profile image
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!profileImage || !formData.email) {
      alert("Please select an image and enter email before uploading.");
      return;
    }

    const data = new FormData();
    data.append("email", formData.email);
    data.append("image", profileImage);

    try {
      const response = await axios.post(
        "http://localhost:8080/rootz/upload-profile-image",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Image upload failed");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>

      {/* Profile Update Form */}
      <form onSubmit={handleProfileUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly // 👈 email displayed but not editable
        />
        <br />
        <br />
        <button type="submit">Update Profile</button>
      </form>
      <br />
      <br />

      {/* Password Change Form */}
      <h3>Change Password</h3>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          required
        />
        <br />
        <br />
        <button type="submit">Change Password</button>
        <br />
        <br />
      </form>

      {/* Profile Image Upload */}
      <h3>Upload Profile Image</h3>
      <form onSubmit={handleImageUpload}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {previewImage && (
          <div>
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "100px", borderRadius: "50%" }}
            />
          </div>
        )}
        <br />
        <br />
        <button type="submit">Upload Image</button>
      </form>
      <br />
      <br />
    </div>
  );
}

export default EditProfile;
