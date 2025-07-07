import React from 'react';
import { Link } from 'react-router-dom';
import guineaPigImg from '../assets/products/guinea-pig.jpg';
import sheepImg from '../assets/products/sheep.jpg';
import goatImg from '../assets/products/goat.jpg';
import eggsImg from '../assets/products/bv380-eggs.jpg';
import coconutImg from '../assets/products/coconut.jpg';
import tenderCoconutImg from '../assets/products/tender-coconut.jpg';

const products = [
  { key: 'guinea', name: 'Guinea Pigs', image: guineaPigImg },
  { key: 'sheep', name: 'Sheep', image: sheepImg },
  { key: 'goat', name: 'Goats', image: goatImg },
  { key: 'bv380', name: 'BV 380 Eggs', image: eggsImg },
  { key: 'coconut', name: 'Coconuts', image: coconutImg },
  { key: 'tender', name: 'Tender Coconuts', image: tenderCoconutImg },
];

function Product() {
  return (
    <div style={containerStyle}>
      <h2>Our Products</h2>
      <div style={gridStyle}>
        {products.map((item, index) => (
          <Link
            to={`/product/${item.key}`} // ✅ Updated path
            key={index}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={cardStyle}>
              <img src={item.image} alt={item.name} style={imageStyle} />
              <h3>{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;

// Styles (same as before)
const containerStyle = {
  padding: '40px 20px',
  maxWidth: '1200px',
  margin: 'auto',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '30px',
  marginTop: '30px',
};

const cardStyle = {
  backgroundColor: '#f2f2f2',
  borderRadius: '10px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease',
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '6px',
};
