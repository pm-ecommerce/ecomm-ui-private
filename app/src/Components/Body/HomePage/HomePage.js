import React from 'react';
import './HomePage.css';

function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

const HomePage = () => {
    const categories = [
        {name:"Gifts & Toys", image: images[0]},
        {name:"Gifts & Toys", image: images[0]},
        {name:"Gifts & Toys", image: images[0]},
        {name:"Gifts & Toys", image: images[0]},
        {name:"Gifts & Toys", image: images[0]},
        {name:"Gifts & Toys", image: images[0]},
        {name:"Gifts & Toys", image: images[0]}
    ];
    return(
        <div id="main-page-container">
            <div className="left-column">
                <div className="category-menu">
                    {categories.map((category,index) => (
                        <div key={index} className="category-name">
                            <img src={category.image} className="category-name-img" alt="category"/>
                            <span style={{position:"relative", bottom: 3}}>{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="right-column">
                <div className="hp-image-container">
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage;