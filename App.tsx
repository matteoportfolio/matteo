import React from 'react';
import SplitText from './components/SplitText';

const App: React.FC = () => {
  return (
    <div className="hero-react-content">
      <div className="hero-text">
        <h1 className="hero-title">
          <div className="animated-gradient-text">
            <SplitText
              onLetterAnimationComplete={() => {}}
              text="Benvenuto!"
              className="text-content"
              splitType="chars"
              delay={100}
              duration={0.8}
              ease="power3.out"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
            />
          </div>
        </h1>
        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
          Questo è il mio portfolio, e io sono Matteo, esperto in digital marketing e intelligenza artificiale
        </p>
        <div className="hero-buttons" data-aos="fade-up" data-aos-delay="400">
          <a href="#projects" className="btn btn-primary">
            <span>Scopri i miei progetti</span>
          </a>
          <a href="#contact" className="btn btn-secondary">
            <span>Contattami</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;