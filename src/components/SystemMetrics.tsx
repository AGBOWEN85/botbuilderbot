import React from 'react';
import { Brain, Cpu, Network, Shield, Zap, BarChart3, Activity, Clock } from 'lucide-react';

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend?: number;
  loading?: boolean;
}

function MetricCard({ icon: Icon, label, value, trend, loading }: MetricCardProps) {
  return (
    <div className="bg-gray-700/50 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Icon className="w-4 h-4" />
          {label}
        </div>
        {trend && (
          <span className={`text-xs ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="text-white font-semibold mt-1">
        {loading ? (
          <div className="animate-pulse bg-gray-600 h-6 w-16 rounded"></div>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

export default function SystemMetrics() {
  const [metrics, setMetrics] = React.useState({
    cpu: 42,
    memory: 3.2,
    network: 98,
    requests: 1200,
    uptime: '99.99%',
    latency: '45ms'
  });

  // Simulate real-time updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 30,
        memory: +(Math.random() * 2 + 2).toFixed(1),
        requests: Math.floor(Math.random() * 500) + 1000
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          System Health
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            icon={Cpu}
            label="CPU Load"
            value={`${metrics.cpu}%`}
            trend={2.5}
          />
          <MetricCard
            icon={Zap}
            label="Memory"
            value={`${metrics.memory}GB`}
            trend={-1.2}
          />
          <MetricCard
            icon={Network}
            label="Network"
            value={`${metrics.network}%`}
            trend={0.8}
          />
          <MetricCard
            icon={BarChart3}
            label="Requests"
            value={`${metrics.requests}/s`}
            trend={5.3}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-400" />
          Learning Progress
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Training Accuracy</span>
              <span className="text-white font-medium">98.5%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 rounded-full h-2" style={{ width: '98.5%' }}></div>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Model Confidence</span>
              <span className="text-white font-medium">92.3%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 rounded-full h-2" style={{ width: '92.3%' }}></div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Training Model Delta-7
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            Optimizing Neural Pathways
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          System Status
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">Uptime</span>
            </div>
            <span className="text-white font-medium">{metrics.uptime}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-gray-300">Latency</span>
            </div>
            <span className="text-white font-medium">{metrics.latency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}