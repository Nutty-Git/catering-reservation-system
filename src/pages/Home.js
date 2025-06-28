import React from 'react';

function Home() {
  const menuImages = [
    { src: "/menu/todayspecial.jpg", alt: "Today's Special" },
    { src: "/menu/breakfast.jpg", alt: "Breakfast" },
    { src: "/menu/starters.jpg", alt: "Starter" },
    { src: "/menu/maincourse.jpg", alt: "Main Course" },
    { src: "/menu/drinks.jpg", alt: "Drinks" },
    { src: "/menu/desserts.jpg", alt: "Desserts" }
  ];

  return (
    <div style={{ padding: '40px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {menuImages.map((img, index) => (
          <div key={index} style={{
            width: '100%',
            height: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <img
              src={img.src}
              alt={img.alt}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
