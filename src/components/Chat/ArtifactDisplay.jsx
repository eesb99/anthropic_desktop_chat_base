import React from 'react';
import { renderArtifact } from '../../utils/artifactRenderer';

const ArtifactDisplay = ({ artifacts }) => {
  return (
    <div className="artifact-display">
      {artifacts.map((artifact, index) => (
        <div key={index} className="artifact">
          {renderArtifact(artifact)}
        </div>
      ))}
    </div>
  );
};

export default ArtifactDisplay;
