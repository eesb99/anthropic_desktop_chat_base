export const renderArtifact = (artifact) => {
  switch (artifact.type) {
    case 'code':
      return renderCodeBlock(artifact);
    case 'image':
      return renderImage(artifact);
    default:
      return null;
  }
};

const renderCodeBlock = (artifact) => {
  return (
    <pre className="code-block">
      <code>{artifact.content}</code>
    </pre>
  );
};

const renderImage = (artifact) => {
  return (
    <img
      src={artifact.url}
      alt={artifact.alt || 'Generated image'}
      className="artifact-image"
    />
  );
};
