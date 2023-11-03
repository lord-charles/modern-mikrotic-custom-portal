'use client'
import React from 'react';
import Particles from 'react-tsparticles';
import particlesConfig from '../public/particles.json';

const ParticlesCanvas = () => {
  return (
    <div id="particles-js">
      <Particles
        id="tsparticles"
        init={particlesConfig}
      />
    </div>
  );
};

export default ParticlesCanvas;
