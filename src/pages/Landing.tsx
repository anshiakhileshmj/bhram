
import React from 'react';
import { Mic, Globe, Zap, Shield, Code, Play } from 'lucide-react';
import GetStartedButton from '../components/GetStartedButton';

const Landing = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "High-Quality TTS",
      description: "Microsoft Edge Neural Voices for natural speech synthesis"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "10 Male Voices",
      description: "Multiple languages: English US/UK, Hindi, German, French, Spanish, Italian, Portuguese, Russian, Japanese"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "RESTful API",
      description: "Simple endpoints for TTS conversion, voice management, and streaming"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "CORS Support",
      description: "Ready for web applications with full CORS support"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Multiple Formats",
      description: "Base64 and streaming audio responses for flexibility"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Real-time Streaming",
      description: "Low latency streaming for real-time applications"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Mic className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">MJAK Voice OS</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/docs" className="text-gray-300 hover:text-white transition-colors">
                API Docs
              </a>
              <a href="https://edge-tts-g3en.onrender.com/docs" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-white transition-colors">
                Live API
              </a>
              <a href="/auth" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Professional 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}TTS API
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              High-quality Text-to-Speech API powered by Microsoft Edge Neural Voices. 
              Global accessibility with enterprise-grade reliability.
            </p>
          </div>

          {/* Get Started Button */}
          <div className="mb-16">
            <GetStartedButton />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
              <div className="text-gray-400">Male Voices</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">9</div>
              <div className="text-gray-400">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">&lt; 200ms</div>
              <div className="text-gray-400">Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400">Everything you need for professional text-to-speech integration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Example Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Integration</h2>
            <p className="text-xl text-gray-400">Get started with just a few lines of code</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* cURL Example */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">cURL Example</h3>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -X POST "https://edge-tts-g3en.onrender.com/tts" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, this is MJAK Voice OS!",
    "voice_id": "english_us_male",
    "speed": 1.0,
    "pitch": 1.0
  }'`}
              </pre>
            </div>

            {/* JavaScript Example */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">JavaScript Example</h3>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`const response = await fetch(
  'https://edge-tts-g3en.onrender.com/tts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Hello, World!',
    voice_id: 'english_us_male'
  })
});

const result = await response.json();`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of developers using MJAK Voice OS for their text-to-speech needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GetStartedButton />
            <a 
              href="/docs"
              className="px-8 py-4 bg-transparent border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              View API Docs
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Mic className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold text-white">MJAK Voice OS</span>
            </div>
            <div className="flex space-x-6">
              <a href="/docs" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </a>
              <a href="https://edge-tts-g3en.onrender.com/docs" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors">
                Live API
              </a>
              <a href="/auth" className="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">© 2024 MJAK Voice OS. All rights reserved. Created by Akhilesh Chandra</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
