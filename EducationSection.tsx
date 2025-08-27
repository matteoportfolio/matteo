import React from 'react';

const EducationSection: React.FC = () => {
  return (
    <section className="education-section" style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', padding: '2rem' }}>
      <div className="education-content">
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Formazione</h2>
        {/* Contenuto della sezione formazione */}
      </div>
    </section>
  );
};

export default EducationSection;