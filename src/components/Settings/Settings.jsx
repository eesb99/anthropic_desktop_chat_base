import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const Settings = () => {
  const { settings, updateSettings } = useContext(ChatContext);

  const handleChange = (key, value) => {
    const numValue = ['temperature', 'topP', 'maxTokens'].includes(key) 
      ? parseFloat(value)
      : value;
    updateSettings({ [key]: numValue });
  };

  return (
    <div className="settings-panel">
      <h2>API Settings</h2>
      
      <div className="setting-group">
        <h3>Generation Parameters</h3>
        <label>
          Temperature
          <div className="range-with-value">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => handleChange('temperature', e.target.value)}
            />
            <span className="setting-value">{settings.temperature}</span>
          </div>
          <small>Controls randomness (0 = deterministic, 1 = creative)</small>
        </label>

        <label>
          Top P
          <div className="range-with-value">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.topP}
              onChange={(e) => handleChange('topP', e.target.value)}
            />
            <span className="setting-value">{settings.topP}</span>
          </div>
          <small>Nucleus sampling threshold (higher = more diverse)</small>
        </label>

        <label>
          Max Tokens
          <input
            type="number"
            min="100"
            max="4000"
            step="100"
            value={settings.maxTokens}
            onChange={(e) => handleChange('maxTokens', e.target.value)}
          />
          <small>Maximum length of response</small>
        </label>
      </div>

      <div className="setting-group">
        <h3>Model Settings</h3>
        <label>
          Model
          <select 
            value={settings.model} 
            onChange={(e) => handleChange('model', e.target.value)}
          >
            <option value="claude-2.1">Claude 2.1</option>
            <option value="claude-instant-1.2">Claude Instant 1.2</option>
          </select>
          <small>Select AI model to use</small>
        </label>
      </div>

      <div className="setting-group">
        <h3>Advanced Settings</h3>
        <label>
          System Prompt
          <textarea
            value={settings.systemPrompt}
            onChange={(e) => handleChange('systemPrompt', e.target.value)}
            rows="3"
            placeholder="Enter system prompt..."
          />
          <small>Define AI assistant's behavior</small>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.stream}
            onChange={(e) => handleChange('stream', e.target.checked)}
          />
          Stream Response
          <small>Show response as it's generated</small>
        </label>
      </div>
    </div>
  );
};

export default Settings;
