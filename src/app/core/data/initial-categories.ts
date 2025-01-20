
export const initialCategories = [
  {
    name: 'Computers',
    description: 'All types of personal and professional computers',
    level: 0,
    order: 1,
    children: [
      {
        name: 'Laptops',
        description: 'Portable computers for work and gaming',
        level: 1,
        order: 1,
        children: [
          { name: 'Ultrabooks', description: 'Slim and lightweight laptops', level: 2, order: 1 },
          { name: 'Gaming Laptops', description: 'High-performance laptops for gaming', level: 2, order: 2 },
          { name: '2-in-1 Laptops', description: 'Convertible laptops with touchscreen', level: 2, order: 3 },
          { name: 'Business Laptops', description: 'Reliable laptops for professional use', level: 2, order: 4 }
        ]
      },
      {
        name: 'Desktops',
        description: 'Powerful and customizable computers',
        level: 1,
        order: 2,
        children: [
          { name: 'Gaming Desktops', description: 'High-end desktops for gaming', level: 2, order: 1 },
          { name: 'Workstations', description: 'Desktops for professional use', level: 2, order: 2 },
          { name: 'Mini PCs', description: 'Compact desktop solutions', level: 2, order: 3 },
          { name: 'All-in-One PCs', description: 'Integrated systems with no separate tower', level: 2, order: 4 }
        ]
      }
    ]
  },
  {
    name: 'Computer Components',
    description: 'Hardware for building or upgrading computers',
    level: 0,
    order: 2,
    children: [
      {
        name: 'Processors (CPUs)',
        description: 'Central processing units',
        level: 1,
        order: 1,
        children: [
          { name: 'Intel Processors', description: 'Intel brand CPUs', level: 2, order: 1 },
          { name: 'AMD Processors', description: 'AMD brand CPUs', level: 2, order: 2 }
        ]
      },
      {
        name: 'Graphics Cards (GPUs)',
        description: 'Video and graphics processors',
        level: 1,
        order: 2,
        children: [
          { name: 'NVIDIA Graphics Cards', description: 'NVIDIA brand GPUs', level: 2, order: 1 },
          { name: 'AMD Graphics Cards', description: 'AMD brand GPUs', level: 2, order: 2 },
          { name: 'Workstation Graphics', description: 'Professional graphics cards', level: 2, order: 3 }
        ]
      },
      {
        name: 'Motherboards',
        description: 'Main circuit boards for PCs',
        level: 1,
        order: 3,
        children: [
          { name: 'Intel Motherboards', description: 'Intel chipset motherboards', level: 2, order: 1 },
          { name: 'AMD Motherboards', description: 'AMD chipset motherboards', level: 2, order: 2 },
          {
            name: 'Form Factors',
            description: 'Different motherboard sizes',
            level: 2,
            order: 3,
            children: [
              { name: 'ATX', description: 'Standard size motherboards', level: 3, order: 1 },
              { name: 'Micro-ATX', description: 'Medium size motherboards', level: 3, order: 2 },
              { name: 'Mini-ITX', description: 'Small form factor motherboards', level: 3, order: 3 }
            ]
          }
        ]
      },
      {
        name: 'RAM (Memory)',
        description: 'Random-access memory modules',
        level: 1,
        order: 4,
        children: [
          { name: 'DDR4 Memory', description: 'DDR4 RAM modules', level: 2, order: 1 },
          { name: 'DDR5 Memory', description: 'DDR5 RAM modules', level: 2, order: 2 },
          { name: 'Laptop Memory', description: 'SO-DIMM RAM modules', level: 2, order: 3 },
          { name: 'Server Memory', description: 'ECC RAM modules', level: 2, order: 4 }
        ]
      },
      {
        name: 'Storage Devices',
        description: 'Data storage solutions',
        level: 1,
        order: 5,
        children: [
          {
            name: 'Solid State Drives',
            description: 'SSDs for faster storage performance',
            level: 2,
            order: 1,
            children: [
              { name: 'SATA SSDs', description: 'Traditional SATA interface SSDs', level: 3, order: 1 },
              { name: 'NVMe SSDs', description: 'High-speed PCIe interface SSDs', level: 3, order: 2 },
              { name: 'Portable SSDs', description: 'External SSD storage', level: 3, order: 3 }
            ]
          },
          {
            name: 'Hard Disk Drives',
            description: 'Traditional HDDs for mass storage',
            level: 2,
            order: 2,
            children: [
              { name: 'Desktop HDDs', description: '3.5" internal hard drives', level: 3, order: 1 },
              { name: 'Laptop HDDs', description: '2.5" internal hard drives', level: 3, order: 2 },
              { name: 'External HDDs', description: 'Portable hard drives', level: 3, order: 3 }
            ]
          }
        ]
      },
      { name: 'Power Supplies (PSUs)', description: 'Power units for PCs', level: 1, order: 6 },
      { name: 'PC Cases', description: 'Enclosures for building computers', level: 1, order: 7 },
      {
        name: 'Cooling Systems',
        description: 'Temperature management solutions',
        level: 1,
        order: 8,
        children: [
          { name: 'CPU Coolers', description: 'Processors cooling solutions', level: 2, order: 1 },
          { name: 'Case Fans', description: 'Airflow management', level: 2, order: 2 },
          { name: 'Liquid Cooling', description: 'Water cooling systems', level: 2, order: 3 }
        ]
      }
    ]
  },

  {
    name: 'Peripherals',
    description: 'Essential computer accessories and input devices',
    level: 0,
    order: 3,
    children: [
      {
        name: 'Monitors',
        description: 'Display screens for computers',
        level: 1,
        order: 1,
        children: [
          { name: 'Gaming Monitors', description: 'High refresh rate displays', level: 2, order: 1 },
          { name: 'Professional Monitors', description: 'Color accurate displays', level: 2, order: 2 },
          { name: 'Ultrawide Monitors', description: 'Extra wide aspect ratio displays', level: 2, order: 3 },
          { name: '4K Monitors', description: 'Ultra HD resolution displays', level: 2, order: 4 }
        ]
      },
      {
        name: 'Input Devices',
        description: 'Keyboards, mice, and other input peripherals',
        level: 1,
        order: 2,
        children: [
          {
            name: 'Keyboards',
            description: 'Computer keyboards',
            level: 2,
            order: 1,
            children: [
              { name: 'Mechanical Keyboards', description: 'Keyboards with mechanical switches', level: 3, order: 1 },
              { name: 'Wireless Keyboards', description: 'Cordless keyboards', level: 3, order: 2 },
              { name: 'Gaming Keyboards', description: 'RGB and macro keyboards', level: 3, order: 3 }
            ]
          },
          {
            name: 'Mice',
            description: 'Computer mice and pointing devices',
            level: 2,
            order: 2,
            children: [
              { name: 'Gaming Mice', description: 'High-DPI gaming mice', level: 3, order: 1 },
              { name: 'Wireless Mice', description: 'Cordless mice', level: 3, order: 2 },
              { name: 'Ergonomic Mice', description: 'Comfort-focused mice', level: 3, order: 3 }
            ]
          },
          { name: 'Graphics Tablets', description: 'Digital drawing tablets', level: 2, order: 3 }
        ]
      },
      {
        name: 'Printers & Scanners',
        description: 'Document processing devices',
        level: 1,
        order: 3,
        children: [
          { name: 'Inkjet Printers', description: 'Color document printers', level: 2, order: 1 },
          { name: 'Laser Printers', description: 'High-volume document printers', level: 2, order: 2 },
          { name: '3D Printers', description: 'Additive manufacturing devices', level: 2, order: 3 },
          { name: 'Scanners', description: 'Document digitization devices', level: 2, order: 4 }
        ]
      }
    ]
  },
  {
    name: 'Mobile Devices',
    description: 'Smartphones, tablets, and accessories',
    level: 0,
    order: 4,
    children: [
      {
        name: 'Smartphones',
        description: 'Mobile phones and accessories',
        level: 1,
        order: 1,
        children: [
          {
            name: 'Android Phones',
            description: 'Android-based smartphones',
            level: 2,
            order: 1,
            children: [
              { name: 'Samsung Phones', description: 'Samsung smartphones', level: 3, order: 1 },
              { name: 'Google Phones', description: 'Google Pixel smartphones', level: 3, order: 2 },
              { name: 'Other Android', description: 'Other Android brands', level: 3, order: 3 }
            ]
          },
          { name: 'iPhones', description: 'Apple smartphones', level: 2, order: 2 }
        ]
      },
      {
        name: 'Tablets',
        description: 'Tablet computers and accessories',
        level: 1,
        order: 2,
        children: [
          { name: 'Android Tablets', description: 'Android-based tablets', level: 2, order: 1 },
          { name: 'iPads', description: 'Apple tablets', level: 2, order: 2 },
          { name: 'Tablet Cases', description: 'Protective tablet covers', level: 2, order: 3 },
          { name: 'Tablet Stands', description: 'Desktop tablet holders', level: 2, order: 4 }
        ]
      },
      {
        name: 'Phone Accessories',
        description: 'Mobile phone accessories and add-ons',
        level: 1,
        order: 3,
        children: [
          {
            name: 'Phone Cases',
            description: 'Protective cases and covers',
            level: 2,
            order: 1,
            children: [
              { name: 'Hard Cases', description: 'Rigid protective cases', level: 3, order: 1 },
              { name: 'Soft Cases', description: 'Flexible silicone cases', level: 3, order: 2 },
              { name: 'Wallet Cases', description: 'Cases with card storage', level: 3, order: 3 }
            ]
          },
          {
            name: 'Screen Protectors',
            description: 'Display protection accessories',
            level: 2,
            order: 2,
            children: [
              { name: 'Tempered Glass', description: 'Glass screen protectors', level: 3, order: 1 },
              { name: 'Privacy Screens', description: 'Privacy protection films', level: 3, order: 2 }
            ]
          },
          {
            name: 'Phone Stands',
            description: 'Mobile phone holders and stands',
            level: 2,
            order: 3
          },
          {
            name: 'PopSockets',
            description: 'Phone grips and stands',
            level: 2,
            order: 4
          }
        ]
      },
    ]
  },
  {
    name: 'Networking',
    description: 'Network and internet connectivity solutions',
    level: 0,
    order: 5,
    children: [
      {
        name: 'Routers',
        description: 'Network routing devices',
        level: 1,
        order: 1,
        children: [
          { name: 'WiFi 6 Routers', description: 'Latest generation WiFi routers', level: 2, order: 1 },
          { name: 'Gaming Routers', description: 'Low-latency gaming routers', level: 2, order: 2 },
          { name: 'Mesh Systems', description: 'Whole-home WiFi systems', level: 2, order: 3 }
        ]
      },
      { name: 'Network Switches', description: 'Network expansion devices', level: 1, order: 2 },
      { name: 'Network Cards', description: 'WiFi and ethernet adapters', level: 1, order: 3 },
      { name: 'Network Cables', description: 'Ethernet and fiber cables', level: 1, order: 4 }
    ]
  },
  {
    name: 'Audio & Video',
    description: 'Sound and video equipment',
    level: 0,
    order: 6,
    children: [
      {
        name: 'Audio Devices',
        description: 'Sound equipment',
        level: 1,
        order: 1,
        children: [
          {
            name: 'Headphones',
            description: 'Personal audio devices',
            level: 2,
            order: 1,
            children: [
              { name: 'Wireless Headphones', description: 'Bluetooth headphones', level: 3, order: 1 },
              { name: 'Gaming Headsets', description: 'Gaming audio with mic', level: 3, order: 2 },
              { name: 'Earbuds', description: 'Compact earphones', level: 3, order: 3 }
            ]
          },
          {
            name: 'Speakers',
            description: 'Audio output devices',
            level: 2,
            order: 2,
            children: [
              { name: 'Computer Speakers', description: 'Desktop audio systems', level: 3, order: 1 },
              { name: 'Bluetooth Speakers', description: 'Wireless portable speakers', level: 3, order: 2 },
              { name: 'Gaming Speakers', description: 'Gaming audio systems', level: 3, order: 3 }
            ]
          },
          {
            name: 'Professional Audio',
            description: 'Professional audio equipment',
            level: 2,
            order: 3,
            children: [
              { name: 'Audio Interfaces', description: 'Digital audio converters', level: 3, order: 1 },
              { name: 'MIDI Controllers', description: 'Musical instrument controllers', level: 3, order: 2 },
              { name: 'Studio Monitors', description: 'Professional studio speakers', level: 3, order: 3 },
              { name: 'Microphones', description: 'Recording microphones', level: 3, order: 4 }
            ]
          }
        ]
      },
      {
        name: 'Video Devices',
        description: 'Video capture and streaming equipment',
        level: 1,
        order: 2,
        children: [
          { name: 'Webcams', description: 'Video chat cameras', level: 2, order: 1 },
          { name: 'Capture Cards', description: 'Video capture devices', level: 2, order: 2 },
          { name: 'Streaming Equipment', description: 'Live streaming gear', level: 2, order: 3 }
        ]
      }
    ]
  },
  {
    name: 'Power & Charging',
    description: 'Power solutions and charging devices',
    level: 0,
    order: 7,
    children: [
      {
        name: 'Chargers & Adapters',
        description: 'Device charging solutions',
        level: 1,
        order: 1,
        children: [
          {
            name: 'Laptop Chargers',
            description: 'Power adapters for laptops',
            level: 2,
            order: 1,
            children: [
              { name: 'Universal Chargers', description: 'Multi-brand compatible chargers', level: 3, order: 1 },
              { name: 'Brand Specific', description: 'Original manufacturer chargers', level: 3, order: 2 },
              { name: 'USB-C Chargers', description: 'USB Type-C laptop chargers', level: 3, order: 3 }
            ]
          },
          {
            name: 'Phone Chargers',
            description: 'Mobile device charging solutions',
            level: 2,
            order: 2,
            children: [
              { name: 'Wall Chargers', description: 'AC power adapters', level: 3, order: 1 },
              { name: 'Car Chargers', description: 'Vehicle charging adapters', level: 3, order: 2 },
              { name: 'Wireless Chargers', description: 'Qi charging pads and stands', level: 3, order: 3 }
            ]
          },
          { name: 'Multi-Device Chargers', description: 'Charging stations for multiple devices', level: 2, order: 3 }
        ]
      },
      {
        name: 'Power Banks',
        description: 'Portable charging solutions',
        level: 1,
        order: 2,
        children: [
          { name: 'Standard Power Banks', description: 'Regular capacity portable chargers', level: 2, order: 1 },
          { name: 'High Capacity', description: 'Large capacity power banks', level: 2, order: 2 },
          { name: 'Solar Power Banks', description: 'Solar-charging portable batteries', level: 2, order: 3 }
        ]
      },
      {
        name: 'Power Protection',
        description: 'Power security and backup solutions',
        level: 1,
        order: 3,
        children: [
          { name: 'UPS Systems', description: 'Uninterruptible power supplies', level: 2, order: 1 },
          { name: 'Surge Protectors', description: 'Power surge protection strips', level: 2, order: 2 },
          { name: 'Voltage Regulators', description: 'Power stabilization devices', level: 2, order: 3 }
        ]
      },
      {
        name: 'Car Charging',
        description: 'Vehicle charging solutions',
        level: 1,
        order: 4,
        children: [
          { name: 'Car Chargers', description: 'Vehicle power adapters', level: 2, order: 1 },
          { name: 'Car Mounts', description: 'Phone mounting solutions', level: 2, order: 2 },
          { name: 'Car Power Inverters', description: 'DC to AC power converters', level: 2, order: 3 }
        ]
      }
    ]
  },
  {
    name: 'Gaming & Entertainment',
    description: 'Gaming hardware and accessories',
    level: 0,
    order: 8,
    children: [
      {
        name: 'Gaming Consoles',
        description: 'Video game platforms',
        level: 1,
        order: 1,
        children: [
          { name: 'PlayStation', description: 'Sony gaming consoles', level: 2, order: 1 },
          { name: 'Xbox', description: 'Microsoft gaming consoles', level: 2, order: 2 },
          { name: 'Nintendo', description: 'Nintendo gaming systems', level: 2, order: 3 }
        ]
      },
      {
        name: 'Gaming Accessories',
        description: 'Gaming peripheral devices',
        level: 1,
        order: 2,
        children: [
          { name: 'Controllers', description: 'Game input devices', level: 2, order: 1 },
          { name: 'Racing Wheels', description: 'Driving simulation controllers', level: 2, order: 2 },
          { name: 'Gaming Chairs', description: 'Ergonomic gaming seating', level: 2, order: 3 }
        ]
      },
      {
        name: 'Virtual Reality',
        description: 'VR hardware and accessories',
        level: 1,
        order: 3,
        children: [
          { name: 'VR Headsets', description: 'Virtual reality displays', level: 2, order: 1 },
          { name: 'VR Controllers', description: 'Virtual reality input devices', level: 2, order: 2 },
          { name: 'VR Accessories', description: 'Additional VR equipment', level: 2, order: 3 }
        ]
      }
    ]
  },
  {
    name: 'Smart Home',
    description: 'Home automation and IoT devices',
    level: 0,
    order: 9,
    children: [
      {
        name: 'Smart Security',
        description: 'Connected security devices',
        level: 1,
        order: 1,
        children: [
          { name: 'Security Cameras', description: 'Smart surveillance cameras', level: 2, order: 1 },
          { name: 'Smart Doorbells', description: 'Video doorbell systems', level: 2, order: 2 },
          { name: 'Smart Locks', description: 'Connected door locks', level: 2, order: 3 }
        ]
      },
      {
        name: 'Smart Controls',
        description: 'Home automation controls',
        level: 1,
        order: 2,
        children: [
          { name: 'Smart Lighting', description: 'Connected light systems', level: 2, order: 1 },
          { name: 'Smart Plugs', description: 'Connected power outlets', level: 2, order: 2 },
          { name: 'Climate Control', description: 'Smart thermostats and fans', level: 2, order: 3 }
        ]
      },
      { name: 'Smart Appliances', description: 'Connected home appliances', level: 1, order: 3 },
      { name: 'Smart Speakers', description: 'Voice-controlled speakers', level: 1, order: 4 }
    ]
  },
  {
    name: 'Software & Security',
    description: 'Digital software and security solutions',
    level: 0,
    order: 10,
    children: [
      {
        name: 'Operating Systems',
        description: 'Computer operating systems',
        level: 1,
        order: 1,
        children: [
          { name: 'Windows', description: 'Microsoft Windows OS', level: 2, order: 1 },
          { name: 'MacOS', description: 'Apple desktop OS', level: 2, order: 2 },
          { name: 'Linux', description: 'Open source OS', level: 2, order: 3 }
        ]
      },
      {
        name: 'Security Software',
        description: 'Digital protection software',
        level: 1,
        order: 2,
        children: [
          { name: 'Antivirus', description: 'Malware protection software', level: 2, order: 1 },
          { name: 'VPN Services', description: 'Virtual private networks', level: 2, order: 2 },
          { name: 'Password Managers', description: 'Credential management tools', level: 2, order: 3 }
        ]
      },
      { name: 'Productivity Software', description: 'Office and work applications', level: 1, order: 3 },
      { name: 'Design Software', description: 'Creative and design applications', level: 1, order: 4 }
    ]
  },

  {
    name: 'Professional Equipment',
    description: 'Enterprise and professional-grade hardware',
    level: 0,
    order: 11,
    children: [
      {
        name: 'Server Equipment',
        description: 'Enterprise server solutions',
        level: 1,
        order: 1,
        children: [
          {
            name: 'Server Hardware',
            description: 'Physical server equipment',
            level: 2,
            order: 1,
            children: [
              { name: 'Server CPUs', description: 'Server processors', level: 3, order: 1 },
              { name: 'Server Memory', description: 'ECC server RAM', level: 3, order: 2 },
              { name: 'Server Storage', description: 'Server storage drives', level: 3, order: 3 },
              { name: 'Server Motherboards', description: 'Server mainboards', level: 3, order: 4 }
            ]
          },
          { name: 'Server Racks', description: 'Equipment mounting solutions', level: 2, order: 2 },
          { name: 'Server Accessories', description: 'Additional server components', level: 2, order: 3 }
        ]
      },
      {
        name: 'Workstation Equipment',
        description: 'Professional workstation gear',
        level: 1,
        order: 2,
        children: [
          { name: 'CAD Workstations', description: 'Design-focused systems', level: 2, order: 1 },
          { name: 'Video Editing Stations', description: 'Media production systems', level: 2, order: 2 },
          { name: '3D Rendering Stations', description: 'Graphics rendering systems', level: 2, order: 3 }
        ]
      },
      {
        name: 'Network Infrastructure',
        description: 'Professional networking equipment',
        level: 1,
        order: 3,
        children: [
          { name: 'Enterprise Switches', description: 'Business-grade network switches', level: 2, order: 1 },
          { name: 'Enterprise Routers', description: 'Business-grade routers', level: 2, order: 2 },
          { name: 'Network Security', description: 'Hardware firewalls and security', level: 2, order: 3 }
        ]
      }
    ]
  },
  {
    name: 'Cables & Connectivity',
    description: 'Connection cables and adapters',
    level: 0,
    order: 12,
    children: [
      {
        name: 'Video Cables',
        description: 'Display connection cables',
        level: 1,
        order: 1,
        children: [
          { name: 'HDMI Cables', description: 'Digital video/audio cables', level: 2, order: 1 },
          { name: 'DisplayPort Cables', description: 'High-performance display cables', level: 2, order: 2 },
          { name: 'VGA Cables', description: 'Legacy display cables', level: 2, order: 3 }
        ]
      },
      {
        name: 'USB Cables',
        description: 'Universal Serial Bus cables',
        level: 1,
        order: 2,
        children: [
          { name: 'USB-C Cables', description: 'Type-C connection cables', level: 2, order: 1 },
          { name: 'USB-A Cables', description: 'Standard USB cables', level: 2, order: 2 },
          { name: 'Lightning Cables', description: 'Apple device cables', level: 2, order: 3 }
        ]
      },
      {
        name: 'Network Cables',
        description: 'Network connection cables',
        level: 1,
        order: 3,
        children: [
          { name: 'Ethernet Cables', description: 'Network patch cables', level: 2, order: 1 },
          { name: 'Fiber Optic Cables', description: 'High-speed fiber cables', level: 2, order: 2 },
          { name: 'Patch Panels', description: 'Cable management solutions', level: 2, order: 3 }
        ]
      }
    ]
  },
  {
    name: 'Office Equipment',
    description: 'Business and office hardware',
    level: 0,
    order: 13,
    children: [
      {
        name: 'Office Electronics',
        description: 'Electronic office equipment',
        level: 1,
        order: 1,
        children: [
          { name: 'Calculators', description: 'Mathematical calculation devices', level: 2, order: 1 },
          { name: 'Label Printers', description: 'Label making devices', level: 2, order: 2 },
          { name: 'Paper Shredders', description: 'Document destruction devices', level: 2, order: 3 }
        ]
      },
      {
        name: 'Communication Devices',
        description: 'Office communication equipment',
        level: 1,
        order: 2,
        children: [
          { name: 'IP Phones', description: 'Internet protocol phones', level: 2, order: 1 },
          { name: 'Conference Phones', description: 'Meeting room phones', level: 2, order: 2 },
          { name: 'Headsets', description: 'Communication headsets', level: 2, order: 3 }
        ]
      }
    ]
  },
  {
    name: 'Maintenance & Repair',
    description: 'Tools and supplies for tech maintenance',
    level: 0,
    order: 14,
    children: [
      {
        name: 'Cleaning Supplies',
        description: 'Device cleaning materials',
        level: 1,
        order: 1,
        children: [
          { name: 'Air Dusters', description: 'Compressed air cleaners', level: 2, order: 1 },
          { name: 'Cleaning Solutions', description: 'Electronic cleaning liquids', level: 2, order: 2 },
          { name: 'Cleaning Tools', description: 'Device cleaning implements', level: 2, order: 3 }
        ]
      },
      {
        name: 'Repair Tools',
        description: 'Hardware repair equipment',
        level: 1,
        order: 2,
        children: [
          { name: 'Tool Kits', description: 'Computer repair toolsets', level: 2, order: 1 },
          { name: 'Testing Equipment', description: 'Hardware testing devices', level: 2, order: 2 },
          { name: 'Soldering Equipment', description: 'Electronic repair tools', level: 2, order: 3 }
        ]
      },
      {
        name: 'Spare Parts',
        description: 'Replacement components',
        level: 1,
        order: 3,
        children: [
          { name: 'Screws & Standoffs', description: 'Hardware fasteners', level: 2, order: 1 },
          { name: 'Cable Connectors', description: 'Connection terminals', level: 2, order: 2 },
          { name: 'Thermal Compounds', description: 'Heat transfer materials', level: 2, order: 3 }
        ]
      }
    ]
  },
  {
    name: 'Educational Technology',
    description: 'Learning and educational tech',
    level: 0,
    order: 15,
    children: [
      {
        name: 'Learning Devices',
        description: 'Educational hardware',
        level: 1,
        order: 1,
        children: [
          { name: 'Educational Tablets', description: 'Learning-focused tablets', level: 2, order: 1 },
          { name: 'E-Readers', description: 'Digital book readers', level: 2, order: 2 },
          { name: 'Learning Computers', description: 'Educational computers', level: 2, order: 3 }
        ]
      },
      {
        name: 'Classroom Technology',
        description: 'School and classroom equipment',
        level: 1,
        order: 2,
        children: [
          { name: 'Interactive Displays', description: 'Smart boards and displays', level: 2, order: 1 },
          { name: 'Document Cameras', description: 'Visual presentation devices', level: 2, order: 2 },
          { name: 'Student Response Systems', description: 'Classroom feedback devices', level: 2, order: 3 }
        ]
      }
    ]
  },
  {
    name: 'Smart Wearables',
    description: 'Wearable smart devices and accessories',
    level: 0,
    order: 16,
    children: [
      {
        name: 'Smartwatches',
        description: 'Smart wrist watches',
        level: 1,
        order: 1,
        children: [
          { name: 'Apple Watch', description: 'Apple smartwatches', level: 2, order: 1 },
          { name: 'Android Watches', description: 'Android-compatible smartwatches', level: 2, order: 2 },
          { name: 'Fitness Watches', description: 'Sport and fitness focused watches', level: 2, order: 3 }
        ]
      },
      {
        name: 'Smart Bands',
        description: 'Fitness and activity trackers',
        level: 1,
        order: 2
      },
      {
        name: 'Watch Accessories',
        description: 'Smartwatch bands and accessories',
        level: 1,
        order: 3,
        children: [
          { name: 'Watch Bands', description: 'Replacement watch straps', level: 2, order: 1 },
          { name: 'Watch Chargers', description: 'Charging accessories', level: 2, order: 2 },
          { name: 'Watch Protectors', description: 'Screen protectors and cases', level: 2, order: 3 }
        ]
      }
    ]
  }


]
