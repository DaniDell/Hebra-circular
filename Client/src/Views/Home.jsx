import StackedCard from "../Components/Card.jsx";
import React from "react";
import cards from "./cards.json";
import SearchBar from "../Components/SearchBar.jsx";

const Home = ()  => {

  
  return (
    <div style={{ minHeight: "calc(100vh - 3rem - 4rem)", width: "100%", alignItems: "center",  
    padding: "1rem" }}>
<h1 style={{ 
    textAlign: "center", 
    padding: "4rem 1rem 4rem 1rem", 
    fontFamily: "sans-serif", 
    fontWeight: "lighter", 
    lineHeight: "1", 
    fontSize: "1.5rem" 
}}>
Brindamos una <strong> solución integral </strong> para la gestión de sus <strong>descartes textiles</strong> ♻️, mediante <strong>alianzas estratégicas</strong>:
</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "center",
          alignItems: "start",
          height: "auto",
          paddingTop: "0rem",
          paddingBottom: "1rem",
        }}
      >
        {cards.map((card, index) => (
          <StackedCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
            image={card.image}
            redirection={card.redirection}
            ods={card.ods}
            category={card.category}
            instagramLink={card.instagramLink}
            linkedinLink={card.linkedinLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
