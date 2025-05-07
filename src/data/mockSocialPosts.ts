export interface SocialPost {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  location: string;
  coordinates: [number, number];
  urgency: 'urgent' | 'warning' | 'info';
  needType: 'water' | 'food' | 'shelter' | 'medical' | 'rescue' | 'other';
  likes: number;
  retweets: number;
  verified: boolean;
}

export const mockSocialPosts: SocialPost[] = [
  {
    id: '1',
    username: 'Emily Johnson',
    handle: 'EmergencyEmily',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    content: 'URGENT: Need bottled water in Houston neighborhoods affected by flooding. Distribution centers overwhelmed. #HoustonFloods #WaterNeed',
    timestamp: '10 minutes ago',
    location: 'Houston, TX',
    coordinates: [29.7604, -95.3698],
    urgency: 'urgent',
    needType: 'water',
    likes: 128,
    retweets: 342,
    verified: true
  },
  {
    id: '2',
    username: 'Mark Wilson',
    handle: 'DisasterResponder',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'Elderly residents trapped in Miami high-rise without power after hurricane. Need emergency generators! #MiamiHurricane #PowerOutage',
    timestamp: '15 minutes ago',
    location: 'Miami, FL',
    coordinates: [25.7617, -80.1918],
    urgency: 'urgent',
    needType: 'other',
    likes: 89,
    retweets: 215,
    verified: false
  },
  {
    id: '3',
    username: 'Red Cross',
    handle: 'RedCross',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    content: 'Setting up additional shelter at Lincoln High School in New Orleans. Can accommodate 200+ evacuees. Bring essentials only. #NOLAevcacuation',
    timestamp: '25 minutes ago',
    location: 'New Orleans, LA',
    coordinates: [29.9511, -90.0715],
    urgency: 'info',
    needType: 'shelter',
    likes: 232,
    retweets: 540,
    verified: true
  },
  {
    id: '4',
    username: 'Sarah Martinez',
    handle: 'SarahM',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    content: 'Multiple injuries reported at apartment complex collapse in San Francisco. Need additional medical personnel and supplies ASAP! #SFDisaster',
    timestamp: '32 minutes ago',
    location: 'San Francisco, CA',
    coordinates: [37.7749, -122.4194],
    urgency: 'urgent',
    needType: 'medical',
    likes: 342,
    retweets: 687,
    verified: false
  },
  {
    id: '5',
    username: 'FEMA',
    handle: 'FEMA',
    avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
    content: 'Food distribution centers now open in Dallas at the following locations: Central HS, Meadows Community Center, Oak Ridge Mall. #DallasRelief',
    timestamp: '45 minutes ago',
    location: 'Dallas, TX',
    coordinates: [32.7767, -96.7970],
    urgency: 'info',
    needType: 'food',
    likes: 198,
    retweets: 421,
    verified: true
  },
  {
    id: '6',
    username: 'John Peterson',
    handle: 'JohnP',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    content: 'WARNING: Wildfire moving east toward Santa Barbara neighborhoods. Prepare to evacuate if in zones 3, 4, or 5. #SBWildfire #Evacuation',
    timestamp: '1 hour ago',
    location: 'Santa Barbara, CA',
    coordinates: [34.4208, -119.6982],
    urgency: 'warning',
    needType: 'other',
    likes: 511,
    retweets: 1029,
    verified: false
  },
  {
    id: '7',
    username: 'NYC Emergency',
    handle: 'NYCEmergency',
    avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
    content: 'Flooding reported in Queens and Brooklyn subway stations. Seek alternate routes. MTA working to restore service. #NYCFlooding',
    timestamp: '1.5 hours ago',
    location: 'New York, NY',
    coordinates: [40.7128, -74.0060],
    urgency: 'warning',
    needType: 'other',
    likes: 621,
    retweets: 845,
    verified: true
  },
  {
    id: '8',
    username: 'Dr. Lisa Chen',
    handle: 'DrLisa',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    content: 'Medical supplies desperately needed at Chicago Memorial Hospital. Currently out of blood type O and basic antibiotics. #ChicagoStorm #MedicalNeed',
    timestamp: '1.8 hours ago',
    location: 'Chicago, IL',
    coordinates: [41.8781, -87.6298],
    urgency: 'urgent',
    needType: 'medical',
    likes: 378,
    retweets: 904,
    verified: true
  },
  {
    id: '9',
    username: 'Phoenix Fire Dept',
    handle: 'PHXFire',
    avatar: 'https://randomuser.me/api/portraits/lego/4.jpg',
    content: 'Multiple water rescue operations underway in Phoenix metro after flash flooding. Avoid all low-lying areas. #PhoenixFloods',
    timestamp: '2 hours ago',
    location: 'Phoenix, AZ',
    coordinates: [33.4484, -112.0740],
    urgency: 'warning',
    needType: 'rescue',
    likes: 210,
    retweets: 589,
    verified: true
  },
  {
    id: '10',
    username: 'Seattle Alert',
    handle: 'SEAAlert',
    avatar: 'https://randomuser.me/api/portraits/lego/5.jpg',
    content: 'Emergency shelters open at Seattle Center and UW Stadium due to earthquake damage. Pets welcome. #SeattleQuake #Shelter',
    timestamp: '2.5 hours ago',
    location: 'Seattle, WA',
    coordinates: [47.6062, -122.3321],
    urgency: 'info',
    needType: 'shelter',
    likes: 412,
    retweets: 735,
    verified: true
  },
  {
    id: '11',
    username: 'David Kim',
    handle: 'DavidK',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    content: 'URGENT: Family trapped in flooded basement in Atlanta Peachtree district. Need immediate rescue! Corner of Peachtree and 10th. #AtlantaFlood #Rescue',
    timestamp: '3 hours ago',
    location: 'Atlanta, GA',
    coordinates: [33.7490, -84.3880],
    urgency: 'urgent',
    needType: 'rescue',
    likes: 523,
    retweets: 1156,
    verified: false
  },
  {
    id: '12',
    username: 'Boston Emergency',
    handle: 'BostonEmergency',
    avatar: 'https://randomuser.me/api/portraits/lego/6.jpg',
    content: 'Power restored to downtown Boston. Still working on Back Bay and South End neighborhoods. Estimated time 4-6 hours. #BostonOutage',
    timestamp: '3.5 hours ago',
    location: 'Boston, MA',
    coordinates: [42.3601, -71.0589],
    urgency: 'info',
    needType: 'other',
    likes: 187,
    retweets: 241,
    verified: true
  },
  {
    id: '13',
    username: 'Maria Rodriguez',
    handle: 'MariaR',
    avatar: 'https://randomuser.me/api/portraits/women/58.jpg',
    content: 'WARNING: Contaminated water reported in Denver metro area. Boil all water before consumption until further notice. #DenverWater #SafetyAlert',
    timestamp: '4 hours ago',
    location: 'Denver, CO',
    coordinates: [39.7392, -104.9903],
    urgency: 'warning',
    needType: 'water',
    likes: 894,
    retweets: 2156,
    verified: false
  },
  {
    id: '14',
    username: 'Detroit Health',
    handle: 'DetroitHealth',
    avatar: 'https://randomuser.me/api/portraits/lego/7.jpg',
    content: 'Emergency medical stations set up at Detroit Convention Center and Ford Field. Treating all injuries, no insurance required. #DetroitTornado',
    timestamp: '4.5 hours ago',
    location: 'Detroit, MI',
    coordinates: [42.3314, -83.0458],
    urgency: 'info',
    needType: 'medical',
    likes: 321,
    retweets: 578,
    verified: true
  },
  {
    id: '15',
    username: 'Carlos Mendez',
    handle: 'CarlosM',
    avatar: 'https://randomuser.me/api/portraits/men/79.jpg',
    content: 'URGENT: Need baby formula and diapers at San Diego evacuation center. Hundreds of families with infants here. #SDFire #BabySupplies',
    timestamp: '5 hours ago',
    location: 'San Diego, CA',
    coordinates: [32.7157, -117.1611],
    urgency: 'urgent',
    needType: 'food',
    likes: 267,
    retweets: 894,
    verified: false
  }
];