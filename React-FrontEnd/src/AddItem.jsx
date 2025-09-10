import React, { useState } from "react";

function AddItem() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Seed",
    quantity: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item Added:", formData);
    alert("✅ Item added successfully!");
    // Later: Save to backend / localStorage
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-green-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Add New Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter item name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter item description"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="Seed">Seed</option>
              <option value="Essential">Terrace Garden Essential</option>
              <option value="Plant">Plant</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter quantity"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
