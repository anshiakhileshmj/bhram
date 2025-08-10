
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, ArrowLeft, Copy, CheckCircle, Code, Globe, Zap, Shield } from 'lucide-react';

const Documentation = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const curlExample = `curl -X POST "https://edge-tts-g3en.onrender.com/tts" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, this is MJAK Voice OS!",
    "voice_id": "english_us_male",
    "speed": 1.0,
    "pitch": 1.0
  }'`;

  const jsExample = `const response = await fetch(
  'https://edge-tts-g3en.onrender.com/tts', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: 'Hello, World!',
      voice_id: 'english_us_male',
      speed: 1.0,
      pitch: 1.0
    })
  }
);

const result = await response.json();
console.log(result.audio_base64);`;

  const pythonExample = `import requests
import base64

url = "https://edge-tts-g3en.onrender.com/tts"
payload = {
    "text": "Hello, this is MJAK Voice OS!",
    "voice_id": "english_us_male",
    "speed": 1.0,
    "pitch": 1.0
}

response = requests.post(url, json=payload)
result = response.json()

if result['success']:
    audio_data = base64.b64decode(result['audio_base64'])
    with open('output.mp3', 'wb') as f:
        f.write(audio_data)`;

  const voices = [
    { id: 'english_us_male', name: 'English US Male (Andrew)', language: 'en-US' },
    { id: 'english_uk_male', name: 'English UK Male (Ryan)', language: 'en-GB' },
    { id: 'hindi_male', name: 'Hindi Male (Madhur)', language: 'hi-IN' },
    { id: 'german_male', name: 'German Male (Conrad)', language: 'de-DE' },
    { id: 'french_male', name: 'French Male (Henri)', language: 'fr-FR' },
    { id: 'spanish_male', name: 'Spanish Male (Alvaro)', language: 'es-ES' },
    { id: 'italian_male', name: 'Italian Male (Diego)', language: 'it-IT' },
    { id: 'portuguese_male', name: 'Portuguese Male (Duarte)', language: 'pt-PT' },
    { id: 'russian_male', name: 'Russian Male (Dmitry)', language: 'ru-RU' },
    { id: 'japanese_male', name: 'Japanese Male (Keita)', language: 'ja-JP' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <Mic className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">MJAK Voice OS</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/auth" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional Text-to-Speech API powered by Microsoft Edge Neural Voices. 
              Complete integration guide with code examples.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-gray-400 text-sm">Male Voices</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">9</div>
              <div className="text-gray-400 text-sm">Languages</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <Code className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">&lt; 200ms</div>
              <div className="text-gray-400 text-sm">Latency</div>
            </div>
          </div>

          {/* Base URL Section */}
          <section className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Base URL</h2>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <code className="text-green-400 text-lg">https://edge-tts-g3en.onrender.com</code>
              </div>
            </div>
          </section>

          {/* Text to Speech Endpoint */}
          <section className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Text to Speech</h2>
              
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">POST</span>
                  <code className="text-purple-400 text-lg">/tts</code>
                </div>
                <p className="text-gray-300">Convert text to high-quality speech using Microsoft Edge Neural Voices.</p>
              </div>

              {/* Parameters */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Parameters</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-gray-300 pb-2 pr-4">Parameter</th>
                        <th className="text-gray-300 pb-2 pr-4">Type</th>
                        <th className="text-gray-300 pb-2 pr-4">Required</th>
                        <th className="text-gray-300 pb-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="text-purple-400 py-2 pr-4">text</td>
                        <td className="text-gray-300 py-2 pr-4">string</td>
                        <td className="text-green-400 py-2 pr-4">Yes</td>
                        <td className="text-gray-300 py-2">The text to convert to speech</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="text-purple-400 py-2 pr-4">voice_id</td>
                        <td className="text-gray-300 py-2 pr-4">string</td>
                        <td className="text-yellow-400 py-2 pr-4">Optional</td>
                        <td className="text-gray-300 py-2">Voice identifier (default: english_us_male)</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="text-purple-400 py-2 pr-4">speed</td>
                        <td className="text-gray-300 py-2 pr-4">number</td>
                        <td className="text-yellow-400 py-2 pr-4">Optional</td>
                        <td className="text-gray-300 py-2">Speech speed (0.5 - 2.0, default: 1.0)</td>
                      </tr>
                      <tr>
                        <td className="text-purple-400 py-2 pr-4">pitch</td>
                        <td className="text-gray-300 py-2 pr-4">number</td>
                        <td className="text-yellow-400 py-2 pr-4">Optional</td>
                        <td className="text-gray-300 py-2">Voice pitch (0.5 - 2.0, default: 1.0)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Code Examples */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Code Examples</h3>
                
                {/* cURL */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium text-gray-300">cURL</h4>
                    <button
                      onClick={() => copyToClipboard(curlExample, 'curl')}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === 'curl' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode === 'curl' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">{curlExample}</pre>
                  </div>
                </div>

                {/* JavaScript */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium text-gray-300">JavaScript</h4>
                    <button
                      onClick={() => copyToClipboard(jsExample, 'js')}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === 'js' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode === 'js' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">{jsExample}</pre>
                  </div>
                </div>

                {/* Python */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium text-gray-300">Python</h4>
                    <button
                      onClick={() => copyToClipboard(pythonExample, 'python')}
                      className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === 'python' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode === 'python' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">{pythonExample}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Available Voices */}
          <section className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Available Voices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {voices.map((voice) => (
                  <div key={voice.id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium">{voice.name}</h3>
                        <p className="text-gray-400 text-sm">{voice.language}</p>
                      </div>
                      <code className="text-purple-400 text-sm bg-gray-700 px-2 py-1 rounded">
                        {voice.id}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Response Format */}
          <section className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Response Format</h2>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "success": true,
  "audio_base64": "UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
  "voice_used": "english_us_male",
  "text_length": 25,
  "generation_time_ms": 1234
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Get Started */}
          <section className="text-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-6">
                Create your account and start using the MJAK Voice OS API today.
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Get API Access
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
