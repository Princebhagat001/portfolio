import React, { useState, useEffect } from 'react';

export default function GlitchText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let glitchTimeout;
    let revertTimeout;
    
    const triggerGlitch = () => {
      // Find indices of non-space characters
      const textArray = text.split('');
      const charIndices = textArray.map((c, i) => c !== ' ' ? i : -1).filter(i => i !== -1);
      
      if (charIndices.length > 0) {
        // Pick exactly 1 random character to replace
        const randomIndex = charIndices[Math.floor(Math.random() * charIndices.length)];
        const replacement = Math.random() > 0.5 ? '1' : '0';
        textArray[randomIndex] = replacement;
        
        setDisplayText(textArray.join(''));
        
        // Revert back to normal text after exactly 600ms
        revertTimeout = setTimeout(() => {
          setDisplayText(text);
          
          // Schedule the next glitch exactly 1 second (1000ms) after it goes back to normal
          glitchTimeout = setTimeout(triggerGlitch, 1000);
        }, 600);
      } else {
        // Fallback if no characters found
        glitchTimeout = setTimeout(triggerGlitch, 1000);
      }
    };

    // Start the glitch loop
    glitchTimeout = setTimeout(triggerGlitch, 1000);
    
    return () => {
      clearTimeout(glitchTimeout);
      clearTimeout(revertTimeout);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
}
