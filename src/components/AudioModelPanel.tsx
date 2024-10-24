import React from 'react';
import { Mic, Volume2, Waveform, Activity } from 'lucide-react';

const audioModels = [
  {
    id: 'speech-recognition',
    name: 'Speech Recognition',
    model: 'DeepSpeech',
    accuracy: 95,
    status: 'active',
    icon: Mic
  },
  {
    id: 'text-to-speech',
    name: 'Text-to-Speech',
    model: 'Tacotron 2',
    accuracy: 98,
    status: 'active',
    icon: Volume2
  },
  {
    id: 'speaker-id',
    name: 'Speaker ID',
    model: 'SincNet',
    accuracy: 92,
    status: 'active',
    icon: Waveform
  }
];

export default function AudioModelPanel() {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-purple-400" />
        Audio Processing Models
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {audioModels.map(({ id, name, model, accuracy, status, icon: Icon }) => (
          <div key={id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-medium">{name}</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Model</span>
                <span className="text-white">{model}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Accuracy</span>
                <span className="text-green-400">{accuracy}%</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className="text-blue-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  {status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}