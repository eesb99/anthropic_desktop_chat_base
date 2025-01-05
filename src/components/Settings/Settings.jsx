import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const MODEL_INFO = {
  'claude-3-opus-20240229': {
    description: 'Most capable model. Best for complex tasks, analysis, and creative work.',
    contextWindow: 200000,
    costPer1kTokens: '$0.015',
  },
  'claude-3-sonnet-20240229': {
    description: 'Balanced performance and speed. Good for most tasks.',
    contextWindow: 200000,
    costPer1kTokens: '$0.003',
  },
};

const PARAMETER_PRESETS = {
  creative: { temperature: 0.9, topP: 1, maxTokens: 1500 },
  balanced: { temperature: 0.7, topP: 0.9, maxTokens: 1000 },
  precise: { temperature: 0.3, topP: 0.5, maxTokens: 800 },
};

const Settings = () => {
  const { settings, updateSettings } = useContext(ChatContext);

  const handleChange = (key, value) => {
    const numValue = ['temperature', 'topP', 'maxTokens', 'contextLength'].includes(key) 
      ? parseFloat(value)
      : value;
    updateSettings({ [key]: numValue });
  };

  const applyPreset = (preset) => {
    updateSettings(PARAMETER_PRESETS[preset]);
  };

  return (
    <div className="settings-panel">
      <h2>AI Settings</h2>
      
      <div className="setting-group">
        <h3>Model Selection</h3>
        <label>
          Model
          <select 
            value={settings.model} 
            onChange={(e) => handleChange('model', e.target.value)}
          >
            <option value="claude-3-opus-20240229">Claude 3 Opus</option>
            <option value="claude-3-sonnet-20240229">Claude 3 Sonnet</option>
          </select>
          <div className="model-info">
            <small>{MODEL_INFO[settings.model].description}</small>
            <div className="model-specs">
              <span>Context: {MODEL_INFO[settings.model].contextWindow.toLocaleString()} tokens</span>
              <span>Cost: {MODEL_INFO[settings.model].costPer1kTokens}/1k tokens</span>
            </div>
          </div>
        </label>
      </div>

      <div className="setting-group">
        <h3>Parameter Presets</h3>
        <div className="preset-buttons">
          <button 
            className={`preset-button ${JSON.stringify(settings) === JSON.stringify(PARAMETER_PRESETS.creative) ? 'active' : ''}`}
            onClick={() => applyPreset('creative')}
          >
            Creative
          </button>
          <button 
            className={`preset-button ${JSON.stringify(settings) === JSON.stringify(PARAMETER_PRESETS.balanced) ? 'active' : ''}`}
            onClick={() => applyPreset('balanced')}
          >
            Balanced
          </button>
          <button 
            className={`preset-button ${JSON.stringify(settings) === JSON.stringify(PARAMETER_PRESETS.precise) ? 'active' : ''}`}
            onClick={() => applyPreset('precise')}
          >
            Precise
          </button>
        </div>
      </div>

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
          <small>Controls randomness and creativity in responses</small>
          <div className="parameter-hints">
            <span>0 = Deterministic</span>
            <span>1 = Creative</span>
          </div>
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
          <small>Controls diversity of word choices</small>
          <div className="parameter-hints">
            <span>0 = Focused</span>
            <span>1 = Diverse</span>
          </div>
        </label>

        <label>
          Max Tokens
          <div className="range-with-value">
            <input
              type="range"
              min="100"
              max="4000"
              step="100"
              value={settings.maxTokens}
              onChange={(e) => handleChange('maxTokens', e.target.value)}
            />
            <span className="setting-value">{settings.maxTokens}</span>
          </div>
          <small>Maximum length of response in tokens</small>
          <div className="parameter-hints">
            <span>Short</span>
            <span>Long</span>
          </div>
        </label>
      </div>

      <div className="setting-group">
        <h3>Response Format</h3>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.stream}
            onChange={(e) => handleChange('stream', e.target.checked)}
          />
          Stream Response
          <small>Show response as it's being generated</small>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.markdown}
            onChange={(e) => handleChange('markdown', e.target.checked)}
          />
          Markdown Formatting
          <small>Enable rich text formatting in responses</small>
        </label>
      </div>

      <div className="setting-group">
        <h3>System Prompt</h3>
        <label>
          <textarea
            value={settings.systemPrompt}
            onChange={(e) => handleChange('systemPrompt', e.target.value)}
            rows="3"
            placeholder="Enter system prompt..."
          />
          <small>Define the AI assistant's behavior and role</small>
        </label>
      </div>
    </div>
  );
};

export default Settings;
