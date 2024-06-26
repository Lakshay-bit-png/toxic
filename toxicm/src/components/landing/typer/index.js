import React from 'react';
import Typewriter from 'typewriter-effect';
// Import the Typewriter CSS file

const TypingPlaceholder = () => {
  return (
   <div style={{fontSize:'24px',color:'white'}}>
      <Typewriter
        options={{
          strings: ['Search someone in your Space 😜🤫','Locate a random individual',
          'Deployed on a Free Server',
          'The API may take time to be called once '],
          autoStart: true,
          loop: true,
        }}
       
      />
      </div>

  );
};

export default TypingPlaceholder;
