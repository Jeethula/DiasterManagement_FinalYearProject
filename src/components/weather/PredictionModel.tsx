import { useState } from 'react';
import { AlertTriangle, CloudRain, Wind, Thermometer } from 'lucide-react';

interface PredictionModelProps {
  weatherData: any;
}

const PredictionModel = ({ weatherData }: PredictionModelProps) => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  
  const scenarios = {
    rainfall: {
      title: 'Heavy Rainfall Scenario',
      description: 'Simulating sustained heavy precipitation',
      risks: [
        { level: 'high', message: 'Flash flooding in low-lying areas' },
        { level: 'medium', message: 'River overflow potential' },
        { level: 'high', message: 'Landslide risk in hilly regions' }
      ],
      recommendations: [
        'Evacuate low-lying areas',
        'Prepare emergency supplies',
        'Monitor local emergency channels'
      ]
    },
    wind: {
      title: 'High Wind Scenario',
      description: 'Simulating severe wind conditions',
      risks: [
        { level: 'high', message: 'Structural damage to buildings' },
        { level: 'medium', message: 'Power line disruption' },
        { level: 'high', message: 'Flying debris hazard' }
      ],
      recommendations: [
        'Secure outdoor objects',
        'Stay indoors',
        'Prepare for power outages'
      ]
    },
    heatwave: {
      title: 'Heat Wave Scenario',
      description: 'Simulating extreme temperature conditions',
      risks: [
        { level: 'high', message: 'Heat exhaustion and stroke risk' },
        { level: 'high', message: 'Wildfire potential' },
        { level: 'medium', message: 'Infrastructure strain' }
      ],
      recommendations: [
        'Stay hydrated',
        'Avoid outdoor activities',
        'Check on vulnerable neighbors'
      ]
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-emergency-500';
      case 'medium':
        return 'bg-warning-500';
      case 'low':
        return 'bg-success-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getScenarioIcon = (scenario: string) => {
    switch (scenario) {
      case 'rainfall':
        return <CloudRain size={24} className="text-info-500" />;
      case 'wind':
        return <Wind size={24} className="text-primary-500" />;
      case 'heatwave':
        return <Thermometer size={24} className="text-emergency-500" />;
      default:
        return <AlertTriangle size={24} className="text-warning-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setSelectedScenario(key)}
            className={`p-4 rounded-lg transition-colors ${
              selectedScenario === key 
                ? 'bg-background-light border-2 border-primary-500' 
                : 'bg-background-medium hover:bg-background-light'
            }`}
          >
            <div className="flex items-center mb-2">
              {getScenarioIcon(key)}
              <span className="ml-2 font-semibold">{scenario.title}</span>
            </div>
            <p className="text-sm text-gray-400">{scenario.description}</p>
          </button>
        ))}
      </div>

      {selectedScenario && (
        <div className="bg-background-medium p-6 rounded-lg animate-fade-in">
          <h3 className="text-xl font-bold mb-4">
            {scenarios[selectedScenario as keyof typeof scenarios].title} Analysis
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Risk Assessment</h4>
              <div className="space-y-2">
                {scenarios[selectedScenario as keyof typeof scenarios].risks.map((risk, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${getRiskColor(risk.level)} mr-2`}></div>
                    <span className="text-sm">{risk.message}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <ul className="list-disc list-inside space-y-1">
                {scenarios[selectedScenario as keyof typeof scenarios].recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-300">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="bg-background-light p-4 rounded">
              <h4 className="font-semibold mb-2">Risk Level Meter</h4>
              <div className="h-4 bg-background-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-success-500 via-warning-500 to-emergency-500 transition-all duration-1000"
                  style={{ 
                    width: selectedScenario === 'rainfall' ? '85%' :
                           selectedScenario === 'wind' ? '75%' :
                           '90%'
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>Low Risk</span>
                <span>Moderate</span>
                <span>High Risk</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionModel;