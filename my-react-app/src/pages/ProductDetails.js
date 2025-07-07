import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import guinea from '../assets/products/guinea-pig.jpg';
import goat from '../assets/products/goat.jpg';
import sheep from '../assets/products/sheep.jpg';
import bv380 from '../assets/products/bv380-eggs.jpg';
import coconut from '../assets/products/coconut.jpg';
import tender from '../assets/products/tender-coconut.jpg';

const productData = {
  guinea: {
    name: 'Guinea Pig',
    image: guinea,
    description:
      'Guinea pigs are small, sociable rodents known for their friendly nature. They need a good diet of hay and fresh vegetables.',
  },
  goat: {
    name: 'Goat',
    image: goat,
    description:
      'Healthy goats ideal for dairy and meat production. Raised naturally on our farm.',
  },
  sheep: {
    name: 'Sheep',
    image: sheep,
    description:
      'Our sheep are healthy, wool-bearing animals ideal for farm or livestock breeding.',
  },
  bv380: {
    name: 'BV 380 Eggs',
    image: bv380,
    description:
      'BV 380 breed eggs, rich in protein and great for hatching or consumption.',
  },
  coconut: {
    name: 'Coconut',
    image: coconut,
    description:
      'Fresh mature coconuts harvested from our organic farm.',
  },
  tender: {
    name: 'Tender Coconut',
    image: tender,
    description:
      'Naturally sweet tender coconuts for hydration and taste.',
  },
};

function ProductDetails({ isLoggedIn }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = productData[productId];

  if (!product) {
    return <h2 style={{ textAlign: 'center' }}>Product not found</h2>;
  }

  const handleOrder = () => {
    if (isLoggedIn) {
      navigate('/contact');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={detailContainer}>
      <img src={product.image} alt={product.name} style={detailImage} />
      <div style={detailContent}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button onClick={handleOrder} style={btnStyle}>
          Order Now
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;

// Styles
const detailContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  fontFamily: 'Segoe UI, sans-serif',
};

const detailImage = {
  width: '300px',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '20px',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
};

const detailContent = {
  textAlign: 'center',
  maxWidth: '600px',
};

const btnStyle = {
  marginTop: '20px',
  padding: '12px 24px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer',
};
