// Product Management Script
// This script can be used to automatically manage products via API calls
// Products are populated from the database and rendered dynamically

const productManagementScript = {
  // Add a new product
  addProduct: async (productData) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify(productData)
    });
    return response.json();
  },

  // Remove a product
  removeProduct: async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    return response.ok;
  },

  // Update a product
  updateProduct: async (productId, productData) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify(productData)
    });
    return response.json();
  },

  // Fetch all products
  getAllProducts: async () => {
    const response = await fetch('/api/products', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });
    return response.json();
  }
};

export default productManagementScript;
