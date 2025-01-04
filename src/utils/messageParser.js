export const parseMessage = (response) => {
  // Parse the response from Anthropic
  // Extract any special content, code blocks, or artifacts
  const message = {
    role: 'assistant',
    content: response.content,
    artifacts: extractArtifacts(response.content)
  };
  
  return message;
};

const extractArtifacts = (content) => {
  // Extract code blocks, images, or other artifacts from the message
  const artifacts = [];
  // Add parsing logic here
  return artifacts;
};
