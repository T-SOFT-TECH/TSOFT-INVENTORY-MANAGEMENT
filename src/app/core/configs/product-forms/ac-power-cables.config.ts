import {CategoryFormConfig} from './product-form.types';

export const acPowerCablesConfig: CategoryFormConfig = {
  id: 'ac_power_cables',
  name: 'AC Power Cables',
  fields: [
    {
      name: 'length',
      type: 'number',
      label: 'Cable Length',
      required: true,
      unit: 'm',
      group: 'specifications',
    },
    {
      name: 'deviceConnectorType',
      type: 'select',
      label: 'Device-Side Connector',
      required: true,
      options: [
        'C5 (Cloverleaf/Mickey Mouse)',
        'C7 (Figure-8/Non-polarized)',
        'C13 (Standard IEC)',
        'C15 (High-temperature IEC)',
        'C17 (Polarized Figure-8)',
        'C19 (High-current IEC)',
        'C21 (High-current, high-temperature)',
        'C9 (Hot-condition appliances)',
        'C15A (High-temperature, alternative)',
        'IEC 60320 variants',
        'NEMA 5-15P to C13',
        'Proprietary/Device-Specific'
      ],
      group: 'specifications',
    },
    {
      name: 'wallPlugType',
      type: 'select',
      label: 'Wall Plug Type',
      required: true,
      options: [
        'Type A (NEMA 1-15, US/Japan, Ungrounded)',
        'Type B (NEMA 5-15, US/Japan, Grounded)',
        'Type C (CEE 7/16, Europlug)',
        'Type D (BS-546, India/UK Old-style)',
        'Type E (CEE 7/5, France)',
        'Type F (CEE 7/4, Schuko, Germany/EU)',
        'Type G (BS-1363, UK/Ireland/Singapore)',
        'Type H (SI 32, Israel)',
        'Type I (AS/NZS 3112, Australia/New Zealand)',
        'Type J (SEV 1011, Switzerland)',
        'Type K (Danish 107-2-D1, Denmark)',
        'Type L (CEI 23-16, Italy)',
        'Type M (BS-546, South Africa)',
        'Type N (NBR 14136, Brazil)',
        'Universal/Interchangeable'
      ],
      group: 'specifications',
    },
    {
      name: 'applicationCategory',
      type: 'select',
      label: 'Primary Application',
      required: false,
      options: [
        'Computer/IT Equipment',
        'Audio/Visual Equipment',
        'Kitchen Appliances',
        'Home Entertainment',
        'Power Tools',
        'Medical Equipment',
        'Server/Data Center',
        'UPS/Power Backup',
        'General Purpose',
        'Laptop PCs',
        'Desktop PCs'
      ],
      group: 'compatibility',
    },
    {
      name: 'voltageRating',
      type: 'select',
      label: 'Voltage Rating',
      required: true,
      options: ['100-125V', '220-240V', '100-240V (Universal)', '250V', '277V', '600V'],
      group: 'specifications',
    },
    {
      name: 'currentRating',
      type: 'select',
      label: 'Current Rating',
      required: true,
      options: ['1A', '3A', '5A', '6A', '10A', '13A', '15A', '16A', '20A', '30A'],
      group: 'specifications',
    },
    {
      name: 'powerRating',
      type: 'select',
      label: 'Power Rating',
      required: false,
      options: ['Up to 125W', '125W-500W', '500W-1000W', '1000W-1500W', '1500W-2000W', '2000W+'],
      group: 'specifications',
    },
    {
      name: 'wireGauge',
      type: 'select',
      label: 'Wire Gauge (AWG)',
      required: false,
      options: ['18 AWG', '16 AWG', '14 AWG', '12 AWG', '10 AWG'],
      group: 'specifications',
    },
    {
      name: 'conductorCount',
      type: 'select',
      label: 'Conductor Count',
      required: false,
      options: ['2-Conductor (Ungrounded)', '3-Conductor (Grounded)'],
      group: 'specifications',
    },
    {
      name: 'grounded',
      type: 'radio',
      label: 'Grounded Connection',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'jacketing',
      type: 'select',
      label: 'Cable Jacketing',
      required: false,
      options: ['PVC', 'SJT', 'SVT', 'SJTW (Weather-resistant)', 'Hospital Grade', 'Plenum-rated'],
      group: 'specifications',
    },
    {
      name: 'heavyDuty',
      type: 'radio',
      label: 'Heavy-Duty Construction',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'temperatureRating',
      type: 'select',
      label: 'Temperature Rating',
      required: false,
      options: ['Standard (60°C/140°F)', 'High Temp (75°C/167°F)', 'Very High Temp (90°C/194°F)'],
      group: 'specifications',
    },
    {
      name: 'angledPlug',
      type: 'select',
      label: 'Plug Style',
      required: false,
      options: ['Straight', 'Right Angle', '45-Degree Angle', 'Up-Angle', 'Down-Angle'],
      group: 'physical',
    },
    {
      name: 'compatibleDevices',
      type: 'textarea',
      label: 'Compatible Device Types',
      required: false,
      placeholder: 'PC, Monitor, TV, etc.',
      group: 'compatibility',
    },
    {
      name: 'cableMaterial',
      type: 'select',
      label: 'Cable Material',
      required: false,
      options: ['Standard PVC', 'Premium PVC', 'TPE', 'Rubber', 'Low-Smoke Zero-Halogen (LSZH)'],
      group: 'physical',
    },
    {
      name: 'includesFuse',
      type: 'radio',
      label: 'Includes Fuse',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'fuseRating',
      type: 'select',
      label: 'Fuse Rating (if applicable)',
      required: false,
      options: ['Not Applicable', '1A', '3A', '5A', '10A', '13A', '15A'],
      group: 'specifications',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      required: false,
      options: ['Black', 'White', 'Gray', 'Beige', 'Green', 'Orange', 'Blue'],
      group: 'physical',
    },
    {
      name: 'certifications',
      type: 'select',
      label: 'Primary Certification',
      required: false,
      options: [
        'UL Listed',
        'CSA Certified',
        'CE Certified',
        'VDE Certified',
        'TÜV Certified',
        'RoHS Compliant',
        'FCC Compliant',
        'ETL Listed',
        'cUL Listed',
        'PSE (Japan)',
        'CCC (China)',
        'KC (Korea)',
        'SAA (Australia)',
        'Multiple Certifications'
      ],
      group: 'certification',
    },
    {
      name: 'hospitalGrade',
      type: 'radio',
      label: 'Hospital Grade',
      required: false,
      options: ['Yes', 'No'],
      group: 'certification',
    },
    {
      name: 'originalPart',
      type: 'radio',
      label: 'Original/OEM Part',
      required: false,
      options: ['Yes', 'No'],
      group: 'additional',
    },
    {
      name: 'polarized',
      type: 'radio',
      label: 'Polarized Plug',
      required: false,
      options: ['Yes', 'No', 'Not Applicable'],
      group: 'specifications',
    },
    {
      name: 'lockingConnector',
      type: 'radio',
      label: 'Locking Connector Feature',
      required: false,
      options: ['Yes', 'No'],
      group: 'features',
    },
    {
      name: 'warranty',
      type: 'select',
      label: 'Warranty',
      required: false,
      options: ['1 Year', '2 Years', '5 Years', 'Lifetime'],
      group: 'additional',
    }
  ],
};
