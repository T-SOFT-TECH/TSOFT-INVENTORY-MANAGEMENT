export const initialCategories = [
  {
    name: 'Computers',
    description: 'All types of personal and professional computers',
    level: 0,
    order: 1,
    children: [
      { name: 'Ultrabooks', description: 'Slim and lightweight laptops', level: 1, order: 1 },
      { name: 'Gaming Laptops', description: 'High-performance laptops for gaming', level: 1, order: 2 },
      { name: '2-in-1 Laptops', description: 'Convertible laptops with touchscreen', level: 1, order: 3 },
      { name: 'Business Laptops', description: 'Reliable laptops for professional use', level: 1, order: 4 },
      { name: 'Gaming Desktops', description: 'High-end desktops for gaming', level: 1, order: 5 },
      { name: 'Workstations', description: 'Desktops for professional use', level: 1, order: 6 },
      { name: 'Mini PCs', description: 'Compact desktop solutions', level: 1, order: 7 },
      { name: 'All-in-One PCs', description: 'Integrated systems with no separate tower', level: 1, order: 8 }
    ]
  },
  {
    name: 'Computer Components',
    description: 'Hardware for building or upgrading computers',
    level: 0,
    order: 2,
    children: [
      { name: 'Processors (CPUs)', description: 'Central processing units', level: 1, order: 1 },
      { name: 'Graphics Cards (GPUs)', description: 'Video and graphics processors', level: 1, order: 2 },
      { name: 'Motherboards', description: 'Main circuit boards for PCs', level: 1, order: 3 },
      { name: 'RAM (Memory)', description: 'Random-access memory modules', level: 1, order: 4 },
      { name: 'Storage Devices', description: 'Data storage solutions', level: 1, order: 5 },
      { name: 'Power Supplies (PSUs)', description: 'Power units for PCs', level: 1, order: 6 },
      { name: 'PC Cases', description: 'Enclosures for building computers', level: 1, order: 7 },
      { name: 'Cooling Systems', description: 'Temperature management solutions', level: 1, order: 8 }
    ]
  },
  {
    name: 'Mobile Devices',
    description: 'Smartphones, tablets, and accessories',
    level: 0,
    order: 3,
    children: [
      { name: 'Smartphones', description: 'Mobile phones and accessories', level: 1, order: 1 },
      { name: 'Tablets', description: 'Tablet computers and accessories', level: 1, order: 2 },
      { name: 'Phone Accessories', description: 'Mobile phone accessories and add-ons', level: 1, order: 3 }
    ]
  },
  {
    name: 'Networking',
    description: 'Network and internet connectivity solutions',
    level: 0,
    order: 4,
    children: [
      { name: 'Routers', description: 'Network routing devices', level: 1, order: 1 },
      { name: 'Network Switches', description: 'Network expansion devices', level: 1, order: 2 },
      { name: 'Network Cards', description: 'WiFi and ethernet adapters', level: 1, order: 3 },
      { name: 'Enterprise Switches', description: 'Business-grade network switches', level: 1, order: 4 },
      { name: 'Enterprise Routers', description: 'Business-grade routers', level: 1, order: 5 },
      { name: 'Network Security', description: 'Hardware firewalls and security', level: 1, order: 6 }
    ]
  },
  {
    name: 'Audio & Video',
    description: 'Sound and video equipment',
    level: 0,
    order: 5,
    children: [
      { name: 'Headphones', description: 'Personal audio devices', level: 1, order: 1 },
      { name: 'Speakers', description: 'Sound output devices', level: 1, order: 2 },
      { name: 'Microphones', description: 'Audio input devices', level: 1, order: 3 },
      { name: 'Audio Interface', description: 'Audio processing devices', level: 1, order: 4 },
      { name: 'Sound Card', description: 'Audio enhancement cards', level: 1, order: 5 }
    ]
  },
  {
    name: 'Power & Charging',
    description: 'Power solutions and charging devices',
    level: 0,
    order: 6,
    children: [
      { name: 'Universal Chargers', description: 'Multi-brand compatible chargers', level: 1, order: 1 },
      { name: 'Brand Specific Chargers', description: 'Original manufacturer chargers', level: 1, order: 2 },
      { name: 'Wall Chargers', description: 'AC power adapters', level: 1, order: 3 },
      { name: 'Car Chargers', description: 'Vehicle charging adapters', level: 1, order: 4 },
      { name: 'Wireless Chargers', description: 'Qi charging pads and stands', level: 1, order: 5 },
      { name: 'Power Banks', description: 'Portable charging solutions', level: 1, order: 6 },
      { name: 'UPS Systems', description: 'Uninterruptible power supplies', level: 1, order: 7 },
      { name: 'Surge Protectors', description: 'Power surge protection strips', level: 1, order: 8 }
    ]
  },
  {
    name: 'Smart Home',
    description: 'Home automation and IoT devices',
    level: 0,
    order: 7,
    children: [
      { name: 'Security Cameras', description: 'Smart surveillance cameras', level: 1, order: 1 },
      { name: 'Smart Doorbells', description: 'Video doorbell systems', level: 1, order: 2 },
      { name: 'Smart Locks', description: 'Connected door locks', level: 1, order: 3 },
      { name: 'Smart Lighting', description: 'Connected light systems', level: 1, order: 4 },
      { name: 'Smart Plugs', description: 'Connected power outlets', level: 1, order: 5 },
      { name: 'Smart Appliances', description: 'Connected home appliances', level: 1, order: 6 },
      { name: 'Smart Speakers', description: 'Voice-controlled speakers', level: 1, order: 7 }
    ]
  },
  {
    name: 'Software & Security',
    description: 'Digital software and security solutions',
    level: 0,
    order: 8,
    children: [
      { name: 'Operating Systems', description: 'Computer operating systems', level: 1, order: 1 },
      { name: 'Antivirus Software', description: 'Security protection software', level: 1, order: 2 },
      { name: 'Office Software', description: 'Productivity applications', level: 1, order: 3 },
      { name: 'Design Software', description: 'Creative applications', level: 1, order: 4 },
      { name: 'Development Tools', description: 'Programming software', level: 1, order: 5 }
    ]
  },
  {
    name: 'Professional Equipment',
    description: 'Enterprise and professional-grade hardware',
    level: 0,
    order: 9,
    children: [
      { name: 'Document Scanners', description: 'Professional scanning devices', level: 1, order: 1 },
      { name: 'Label Printers', description: 'Professional label printing', level: 1, order: 2 },
      { name: 'Paper Shredders', description: 'Document destruction devices', level: 1, order: 3 },
      { name: 'Projectors', description: 'Display projection systems', level: 1, order: 4 },
      { name: 'Conference Systems', description: 'Meeting room equipment', level: 1, order: 5 },
      { name: 'Security Systems', description: 'Professional security solutions', level: 1, order: 6 }
    ]
  },
  {
    name: 'Cables & Connectivity',
    description: 'Connection cables and adapters',
    level: 0,
    order: 10,
    children: [
      { name: 'HDMI Cables', description: 'Digital video/audio cables', level: 1, order: 1 },
      { name: 'DisplayPort Cables', description: 'High-performance display cables', level: 1, order: 2 },
      { name: 'USB-C Cables', description: 'Type-C connection cables', level: 1, order: 3 },
      { name: 'Lightning Cables', description: 'Apple device cables', level: 1, order: 4 },
      { name: 'Ethernet Cables', description: 'Network patch cables', level: 1, order: 5 },
      { name: 'Fiber Optic Cables', description: 'High-speed fiber cables', level: 1, order: 6 }
    ]
  },
  {
    name: 'Educational Technology',
    description: 'Learning and educational tech',
    level: 0,
    order: 11,
    children: [
      { name: 'Educational Tablets', description: 'Learning-focused tablets', level: 1, order: 1 },
      { name: 'E-Readers', description: 'Digital book readers', level: 1, order: 2 },
      { name: 'Interactive Displays', description: 'Smart boards and displays', level: 1, order: 3 },
      { name: 'Document Cameras', description: 'Visual presentation devices', level: 1, order: 4 },
      { name: 'Student Response Systems', description: 'Classroom feedback devices', level: 1, order: 5 }
    ]
  },
  {
    name: 'Smart Wearables',
    description: 'Wearable smart devices',
    level: 0,
    order: 12,
    children: [
      { name: 'Smartwatches', description: 'Smart wrist watches', level: 1, order: 1 },
      { name: 'Smart Bands', description: 'Fitness and activity trackers', level: 1, order: 2 },
      { name: 'Watch Bands', description: 'Replacement watch straps', level: 1, order: 3 },
      { name: 'Watch Chargers', description: 'Charging accessories', level: 1, order: 4 },
      { name: 'Watch Protectors', description: 'Screen protectors and cases', level: 1, order: 5 }
    ]
  }
];
