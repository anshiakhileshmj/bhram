
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { Mic, Key, BarChart3, Settings, LogOut, Copy, Play, Pause, Volume2, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface ApiKey {
  id: string;
  key_name: string;
  api_key: string;
  is_active: boolean;
  usage_count: number;
  last_used_at: string | null;
  created_at: string;
}

interface UsageLog {
  id: string;
  text_input: string;
  voice_used: string;
  success: boolean;
  error_message: string | null;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [usageLogs, setUsageLogs] = useState<UsageLog[]>([]);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [testText, setTestText] = useState('Hello! This is MJAK Voice OS text to speech service.');
  const [selectedVoice, setSelectedVoice] = useState('english_us_male');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      fetchApiKeys();
      fetchUsageLogs();
    }
  }, [user, loading, navigate]);

  const fetchApiKeys = async () => {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setApiKeys(data);
    }
  };

  const fetchUsageLogs = async () => {
    const { data, error } = await supabase
      .from('tts_usage_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setUsageLogs(data);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) return;

    const { data, error } = await supabase.rpc('generate_api_key');
    
    if (!error && data) {
      const { error: insertError } = await supabase
        .from('api_keys')
        .insert({
          key_name: newKeyName,
          api_key: data,
          user_id: user?.id
        });

      if (!insertError) {
        setNewKeyName('');
        setShowCreateKey(false);
        fetchApiKeys();
      }
    }
  };

  const deleteApiKey = async (id: string) => {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchApiKeys();
    }
  };

  const testTTS = async () => {
    if (!testText.trim()) return;

    setIsPlaying(true);
    try {
      const response = await fetch('https://edge-tts-g3en.onrender.com/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: testText,
          voice_id: selectedVoice,
          speed: 1.0,
          pitch: 1.0
        })
      });

      const result = await response.json();
      
      if (result.success && result.audio_base64) {
        // Convert base64 to audio
        const audioBlob = new Blob([
          Uint8Array.from(atob(result.audio_base64), c => c.charCodeAt(0))
        ], { type: 'audio/mpeg' });
        
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new HTMLAudioElement(audioUrl);
        
        audio.onended = () => {
          setIsPlaying(false);
          setCurrentAudio(null);
        };
        
        setCurrentAudio(audio);
        await audio.play();

        // Log usage
        if (user) {
          await supabase.from('tts_usage_logs').insert({
            user_id: user.id,
            text_input: testText,
            voice_used: selectedVoice,
            success: true
          });
          fetchUsageLogs();
        }
      }
    } catch (error) {
      console.error('TTS Error:', error);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    setIsPlaying(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const voices = [
    { id: 'english_us_male', name: 'English US Male (Andrew)' },
    { id: 'english_uk_male', name: 'English UK Male (Ryan)' },
    { id: 'hindi_male', name: 'Hindi Male (Madhur)' },
    { id: 'german_male', name: 'German Male (Conrad)' },
    { id: 'french_male', name: 'French Male (Henri)' },
    { id: 'spanish_male', name: 'Spanish Male (Alvaro)' },
    { id: 'italian_male', name: 'Italian Male (Diego)' },
    { id: 'portuguese_male', name: 'Portuguese Male (Duarte)' },
    { id: 'russian_male', name: 'Russian Male (Dmitry)' },
    { id: 'japanese_male', name: 'Japanese Male (Keita)' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Mic className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">MJAK Voice OS</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.user_metadata?.full_name || user?.email}</span>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">API Keys</p>
                <p className="text-2xl font-bold text-white">{apiKeys.length}</p>
              </div>
              <Key className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Usage</p>
                <p className="text-2xl font-bold text-white">{apiKeys.reduce((sum, key) => sum + key.usage_count, 0)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Keys</p>
                <p className="text-2xl font-bold text-white">{apiKeys.filter(key => key.is_active).length}</p>
              </div>
              <Settings className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Voices Available</p>
                <p className="text-2xl font-bold text-white">10</p>
              </div>
              <Volume2 className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Voice Testing */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">Test TTS</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Text to Speech</label>
                <textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  rows={3}
                  placeholder="Enter text to convert to speech..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Voice</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {voices.map(voice => (
                    <option key={voice.id} value={voice.id}>{voice.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={isPlaying ? stopAudio : testTTS}
                  disabled={!testText.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Stop' : 'Test Voice'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* API Keys Management */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">API Keys</h2>
              <button
                onClick={() => setShowCreateKey(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Key</span>
              </button>
            </div>

            {showCreateKey && (
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Enter key name..."
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={createApiKey}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreateKey(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {apiKeys.map(key => (
                <div key={key.id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{key.key_name}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <code className="text-sm text-gray-300 bg-gray-700 px-2 py-1 rounded">
                          {showApiKey[key.id] ? key.api_key : '••••••••••••••••••••••••••••••••'}
                        </code>
                        <button
                          onClick={() => toggleApiKeyVisibility(key.id)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {showApiKey[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(key.api_key)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        Usage: {key.usage_count} • Created: {new Date(key.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteApiKey(key.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage Logs and API Documentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Usage */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Usage</h2>
            <div className="space-y-3">
              {usageLogs.length > 0 ? (
                usageLogs.map(log => (
                  <div key={log.id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium truncate max-w-xs">
                          "{log.text_input.length > 50 ? log.text_input.substring(0, 50) + '...' : log.text_input}"
                        </p>
                        <p className="text-sm text-gray-400">Voice: {log.voice_used}</p>
                        <p className="text-sm text-gray-400">{new Date(log.created_at).toLocaleString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        log.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {log.success ? 'Success' : 'Error'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No usage logs yet.</p>
              )}
            </div>
          </div>

          {/* API Documentation Preview */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">Quick API Reference</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Base URL</h3>
                <code className="block bg-gray-800 p-3 rounded-lg text-green-400 text-sm">
                  https://edge-tts-g3en.onrender.com
                </code>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Text to Speech</h3>
                <pre className="bg-gray-800 p-3 rounded-lg text-sm text-gray-300 overflow-x-auto">
{`POST /tts
Content-Type: application/json

{
  "text": "Hello World!",
  "voice_id": "english_us_male",
  "speed": 1.0,
  "pitch": 1.0
}`}
                </pre>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => navigate('/docs')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Full Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
