/*
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
      { name: ' Chargers And Adapters', description: 'Chargers And Adapters', level: 1, order: 1 },
      { name: 'Power Banks', description: 'Portable charging solutions', level: 1, order: 2 },
      { name: 'UPS Systems', description: 'Uninterruptible power supplies', level: 1, order: 3 },
      { name: 'Surge Protectors', description: 'Power surge protection strips', level: 1, order: 4 }
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
  },
];
*/


export const initialCategories = [
  {
    name: 'Cables & Connectivity',
    description: 'Essential cables for video, audio, data, and power connectivity',
    level: 0,
    order: 1,
    children: [
      {
        name: 'Video Cables',
        description: 'Cables for connecting displays and video devices',
        level: 1,
        order: 1,
        children: [
          { name: 'HDMI Cables', description: 'Standard, High-Speed, 4K, 8K HDMI cables', level: 2, order: 1 },
          { name: 'DisplayPort Cables', description: 'DP 1.4, DP 2.0 cables for high-performance displays', level: 2, order: 2 },
          { name: 'VGA Cables', description: 'Cables for older monitors and projectors', level: 2, order: 3 },
          { name: 'Thunderbolt Cables', description: 'High-speed data and display connectivity', level: 2, order: 4 }
        ]
      },
      {
        name: 'Audio Cables',
        description: 'Cables for audio connections and professional sound systems',
        level: 1,
        order: 2,
        children: [
          { name: 'Auxiliary Cables', description: '3.5mm cables for headphones and car audio', level: 2, order: 1 },
          { name: 'Optical Audio Cables', description: 'Digital audio cables for home theaters', level: 2, order: 2 },
          { name: 'RCA Cables', description: 'Analog stereo (Red/White) and video (Yellow)', level: 2, order: 3 },
          { name: 'XLR Cables', description: 'Professional audio cables for microphones', level: 2, order: 4 },
          {name: 'TRS Cables', description: 'Professional Tip-Ring-Sleeve (TRS) audio cables for high-quality balanced signal', level: 2, order: 5 },
          {name: 'TS Cables', description: 'Professional Tip-Ring-Sleeve (TRS) audio cables for high-quality unbalanced signal', level: 2, order: 6 }
        ]
      },
      {
        name: 'Data & Charging Cables',
        description: 'Cables for charging and data transfer',
        level: 1,
        order: 3,
        children: [
          { name: 'USB-C Cables', description: 'Fast charging and data transfer', level: 2, order: 1 },
          { name: 'Lightning Cables', description: 'Apple device cables (iPhones, iPads)', level: 2, order: 2 },
          { name: 'Micro-USB Cables', description: 'For older mobile devices and accessories', level: 2, order: 3 },
          { name: 'MagSafe Charging Cables', description: 'Apple’s magnetic charging solution', level: 2, order: 4 }
        ]
      },
      {
        name: 'Network & Communication Cables',
        description: 'Cables for networking and high-speed internet',
        level: 1,
        order: 4,
        children: [
          { name: 'Ethernet Cables', description: 'Cat6, Cat7 cables for wired networking', level: 2, order: 1 },
          { name: 'Fiber Optic Cables', description: 'High-speed internet connections', level: 2, order: 2 },
          { name: 'Coaxial Cables', description: 'Used for cable TV and internet', level: 2, order: 3 }
        ]
      },
      {
        name: 'Power Cables',
        description: 'Power supply cables and extension solutions',
        level: 1,
        order: 5,
        children: [
          { name: 'Laptop Power Cables', description: 'AC adapters for major brands', level: 2, order: 1 },
          { name: 'Extension Cords', description: 'Power management solutions', level: 2, order: 2 },
          { name: 'DC Power Cables', description: 'Universal power adapters', level: 2, order: 3 },
          { name: 'AC Power Cables', description: 'AC power adapters for older devices', level: 2, order: 4 }
        ]
      }
    ]
  },
  {
    name: 'Converters & Adapters',
    description: 'Adapters and converters for seamless connectivity',
    level: 0,
    order: 2,
    children: [
      { name: 'USB to Ethernet Adapters', description: 'Wired internet via USB', level: 1, order: 1 },
      { name: 'USB-C to HDMI Adapters', description: 'Connect USB-C devices to HDMI displays', level: 1, order: 2 },
      { name: 'HDMI to VGA Adapters', description: 'Convert HDMI output to VGA', level: 1, order: 3 },
      { name: 'OTG (On-The-Go) Cables', description: 'Connect USB devices to mobile devices', level: 1, order: 4 },
      { name: 'Micro-USB to USB-A', description: 'Connect micro-USB devices to standard USB-A ports', level: 1, order: 5 },
      { name: 'Micro-USB to USB-C', description: 'Connect micro-USB devices to USB-C ports', level: 1, order: 6 },
      { name: 'USB-C to USB-A', description: 'Use older USB devices with USB-C ports', level: 1, order: 7 },
      { name: 'Lightning to 3.5mm Adapter', description: 'Connect wired headphones to Apple devices', level: 1, order: 8 },
      { name: 'USB-C to 3.5mm Adapter', description: 'For devices without a headphone jack', level: 1, order: 9 },
      { name: 'DVI to HDMI Adapters', description: 'Convert DVI signals to HDMI', level: 1, order: 10 },
      { name: 'Lightning to USB-A', description: 'Connect Lightning devices to USB-A ports', level: 1, order: 11 },
      { name: 'Memory Card Readers', description: 'Devices for accessing data on memory cards', level: 1, order: 12 },
      { name: 'USB-C Docking Stations', description: 'Expand connectivity options via USB-C', level: 1, order: 13 },
      { name: 'USB-C Hubs', description: 'Add multiple ports to USB-C devices', level: 1, order: 14 },
      { name: 'USB-A Hubs', description: 'Expand USB-A ports for multiple devices', level: 1, order: 15 },
      { name: 'Hybrid USB-A & USB-C Hubs', description: 'Combined USB-A and USB-C port expansion', level: 1, order: 16 },
      { name: 'Lightning Docking Stations', description: 'Docks for Apple devices with Lightning ports', level: 1, order: 17 },
      { name: 'Surface Docking Stations', description: 'Docking stations for Microsoft Surface devices', level: 1, order: 18 },
      { name: 'Hard Disk Enclosures', description: 'External cases for HDD storage', level: 1, order: 19 },
      { name: 'SSD Enclosures', description: 'External cases for SSD storage', level: 1, order: 20 }
    ]
  }
];
