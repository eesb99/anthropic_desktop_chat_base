import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

export const sendMessage = async (message) => {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
      system: "You are a helpful AI assistant in a desktop chat application. When sharing code examples, always wrap them in ```python markdown blocks for proper formatting."
    });
    
    return {
      role: 'assistant',
      content: response.content[0].text
    };
  } catch (error) {
    console.error('Error sending message to Anthropic:', error);
    throw error;
  }
};
