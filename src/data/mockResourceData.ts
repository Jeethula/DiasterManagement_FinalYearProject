export interface ResourceData {
  id: string;
  type: 'water' | 'food' | 'medical' | 'shelter' | 'power' | 'transport';
  name: string;
  available: number;
  allocated: number;
  required: number;
  unit: string;
  location: string;
  coordinates: [number, number];
  priority: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

export const mockResourceData: ResourceData[] = [
  {
    id: '1',
    type: 'water',
    name: 'Bottled Water',
    available: 25000,
    allocated: 15000,
    required: 50000,
    unit: 'bottles',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    priority: 'high',
    lastUpdated: '10 minutes ago'
  },
  {
    id: '2',
    type: 'food',
    name: 'MRE Packages',
    available: 8500,
    allocated: 5200,
    required: 10000,
    unit: 'packages',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    priority: 'medium',
    lastUpdated: '15 minutes ago'
  },
  {
    id: '3',
    type: 'medical',
    name: 'First Aid Kits',
    available: 1200,
    allocated: 950,
    required: 2000,
    unit: 'kits',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    priority: 'high',
    lastUpdated: '20 minutes ago'
  },
  {
    id: '4',
    type: 'shelter',
    name: 'Emergency Cots',
    available: 850,
    allocated: 720,
    required: 1500,
    unit: 'cots',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    priority: 'medium',
    lastUpdated: '25 minutes ago'
  },
  {
    id: '5',
    type: 'power',
    name: 'Portable Generators',
    available: 120,
    allocated: 85,
    required: 200,
    unit: 'generators',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    priority: 'high',
    lastUpdated: '30 minutes ago'
  },
  {
    id: '6',
    type: 'transport',
    name: 'Rescue Boats',
    available: 45,
    allocated: 38,
    required: 60,
    unit: 'boats',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    priority: 'high',
    lastUpdated: '35 minutes ago'
  },
  {
    id: '7',
    type: 'water',
    name: 'Water Purification Tablets',
    available: 15000,
    allocated: 8000,
    required: 20000,
    unit: 'tablets',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    priority: 'medium',
    lastUpdated: '40 minutes ago'
  },
  {
    id: '8',
    type: 'food',
    name: 'Canned Food',
    available: 12000,
    allocated: 9800,
    required: 15000,
    unit: 'cans',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    priority: 'medium',
    lastUpdated: '45 minutes ago'
  },
  {
    id: '9',
    type: 'medical',
    name: 'Prescription Medications',
    available: 5000,
    allocated: 4200,
    required: 8000,
    unit: 'prescriptions',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    priority: 'high',
    lastUpdated: '50 minutes ago'
  },
  {
    id: '10',
    type: 'shelter',
    name: 'Blankets',
    available: 3500,
    allocated: 2800,
    required: 5000,
    unit: 'blankets',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    priority: 'low',
    lastUpdated: '55 minutes ago'
  },
  {
    id: '11',
    type: 'power',
    name: 'Solar Chargers',
    available: 750,
    allocated: 580,
    required: 1200,
    unit: 'chargers',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    priority: 'medium',
    lastUpdated: '1 hour ago'
  },
  {
    id: '12',
    type: 'transport',
    name: 'Evacuation Buses',
    available: 25,
    allocated: 22,
    required: 40,
    unit: 'buses',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    priority: 'high',
    lastUpdated: '1.1 hours ago'
  },
  {
    id: '13',
    type: 'water',
    name: 'Water Tankers',
    available: 15,
    allocated: 12,
    required: 20,
    unit: 'tankers',
    location: 'New Orleans, LA',
    coordinates: [29.9511, -90.0715],
    priority: 'high',
    lastUpdated: '1.2 hours ago'
  },
  {
    id: '14',
    type: 'food',
    name: 'Baby Formula',
    available: 1800,
    allocated: 1500,
    required: 2500,
    unit: 'containers',
    location: 'New Orleans, LA',
    coordinates: [29.9511, -90.0715],
    priority: 'high',
    lastUpdated: '1.3 hours ago'
  },
  {
    id: '15',
    type: 'medical',
    name: 'Field Hospital Kits',
    available: 5,
    allocated: 4,
    required: 8,
    unit: 'kits',
    location: 'New Orleans, LA',
    coordinates: [29.9511, -90.0715],
    priority: 'high',
    lastUpdated: '1.4 hours ago'
  }
];

export const resourceAllocationByRegion = [
  { region: 'Houston, TX', allocated: 45, required: 72 },
  { region: 'Miami, FL', allocated: 38, required: 58 },
  { region: 'New Orleans, LA', allocated: 30, required: 45 },
  { region: 'Los Angeles, CA', allocated: 25, required: 30 },
  { region: 'New York, NY', allocated: 20, required: 22 },
  { region: 'Seattle, WA', allocated: 15, required: 18 },
  { region: 'Chicago, IL', allocated: 12, required: 15 }
];