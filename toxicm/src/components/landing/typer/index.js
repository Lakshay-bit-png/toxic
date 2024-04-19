import React from 'react';
import Typewriter from 'typewriter-effect';
// Import the Typewriter CSS file

const TypingPlaceholder = () => {
  return (
   <div style={{fontSize:'24px',color:'white'}}>
      <Typewriter
        options={{
          strings: ['Search someone in your Space 😜🤫','Locate a random individual',
          'Find someone special',
          'Discover a new face',],
          autoStart: true,
          loop: true,
        }}
       
      />
      </div>

  );
};

export default TypingPlaceholder;
