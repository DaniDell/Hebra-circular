import React from 'react';

const DetailUser = () => {
    return (
        <div style={{  margin: '10px', textAlign: 'center'}}>
        <div style={{ 
            position: 'relative',
            overflow: 'hidden',
            marginTop: '40px',
            paddingTop: '56.25%', /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
            display: 'flex', // Add this
            justifyContent: 'center', // Add this
            alignItems: 'center' // Add this
        }}>
           
            <iframe 
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%',
                    height: '50%',
                    border: '0'
                }}
                src="https://www.youtube.com/embed/8V7pB7NfM-4?si=rmKczDBNPKMsSb7Z&amp;start=27" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
            </iframe>
        </div>
        <p>Segundas Oportunidades</p>
        </div>
    );
};

export default DetailUser;