export const accountRatings = [
  { code: '01', description: 'Paid or paying as agreed' },
  { code: '02', description: '30 days past due' },
  { code: '03', description: '60 days past due' },
  { code: '04', description: '90 days past due' },
  { code: '05', description: '120 days past due' },
  { code: '07', description: 'Wage earner or similar plan' },
  { code: '08', description: 'Repossession' },
  { code: '8A', description: 'Voluntary surrender' },
  { code: '8P', description: 'Payment after repossession' },
  { code: '09', description: 'Charged off as bad debt' },
  { code: '9B', description: 'Collection account' },
  { code: '9P', description: 'Payment after charge off/collection' },
  {
    code: 'UR',
    description:
      'Unrated or bankruptcy (remark codes will show whether the account is a bankruptcy and, if so, what type of bankruptcy)',
  },
];
export const addressCodes = [
  { code: 'AD', streetType: 'Arcade' },
  { code: 'GR', streetType: 'Grove' },
  { code: 'AL', streetType: 'Alley' },
  { code: 'HL', streetType: 'Hill' },
  { code: 'AV', streetType: 'Avenue' },
  { code: 'HT', streetType: 'Heights' },
  { code: 'AX', streetType: 'Annex' },
  { code: 'HY', streetType: 'Highway' },
  { code: 'BD', streetType: 'Bend' },
  { code: 'KN', streetType: 'Knoll' },
  { code: 'BE', streetType: 'Bridge' },
  { code: 'LN', streetType: 'Lane' },
  { code: 'BF', streetType: 'Bluff' },
  { code: 'LP', streetType: 'Loop' },
  { code: 'BG', streetType: 'Burg' },
  { code: 'MA', streetType: 'Mall' },
  { code: 'BH', streetType: 'Beach' },
  { code: 'PA', streetType: 'Path' },
  { code: 'BK', streetType: 'Brook' },
  { code: 'PI', streetType: 'Pike' },
  { code: 'BL', streetType: 'Bluffs' },
  { code: 'PK', streetType: 'Park' },
  { code: 'BM', streetType: 'Bottom' },
  { code: 'PL', streetType: 'Place' },
  { code: 'BN', streetType: 'Branch' },
  { code: 'PT', streetType: 'Point' },
  { code: 'BP', streetType: 'Bypass' },
  { code: 'PY', streetType: 'Parkway' },
  { code: 'BS', streetType: 'Brooks' },
  { code: 'PZ', streetType: 'Plaza' },
  { code: 'BU', streetType: 'Burgs' },
  { code: 'RD', streetType: 'Road' },
  { code: 'BV', streetType: 'Boulevard' },
  { code: 'RN', streetType: 'Run' },
  { code: 'BY', streetType: 'Bayou' },
  { code: 'RO', streetType: 'Row' },
  { code: 'CI', streetType: 'Circle' },
  { code: 'RT', streetType: 'Route' },
  { code: 'CN', streetType: 'Center' },
  { code: 'SQ', streetType: 'Square' },
  { code: 'CR', streetType: 'Crescent' },
  { code: 'ST', streetType: 'Street' },
  { code: 'CT', streetType: 'Court' },
  { code: 'TE', streetType: 'Terrace' },
  { code: 'DA', streetType: 'Dale' },
  { code: 'TP', streetType: 'Turnpike' },
  { code: 'DR', streetType: 'Drive' },
  { code: 'TR', streetType: 'Trail' },
  { code: 'EX', streetType: 'Expressway' },
  { code: 'VI', streetType: 'Viaduct' },
  { code: 'FY', streetType: 'Freeway' },
  { code: 'WK', streetType: 'Walk' },
  { code: 'GA', streetType: 'Garden' },
  { code: 'WY', streetType: 'Way' },
];
export const provinces = [
  { code: 'AB', province: 'Alberta' },
  { code: 'BC', province: 'British Columbia' },
  { code: 'LB', province: 'Labrador' },
  { code: 'MB', province: 'Manitoba' },
  { code: 'NB', province: 'New Brunswick' },
  { code: 'NK', province: 'New Brunswick' },
  { code: 'NF', province: 'Newfoundland' },
  { code: 'NT', province: 'Northwest Territories' },
  { code: 'NW', province: 'Northwest Territories' },
  { code: 'NS', province: 'Nova Scotia' },
  { code: 'ON', province: 'Ontario' },
  { code: 'PE', province: 'Prince Edward Island' },
  { code: 'QU', province: 'Quebec' },
  { code: 'PQ', province: 'Quebec' },
  { code: 'SK', province: 'Saskatchewan' },
  { code: 'YU', province: 'Yukon' },
  { code: 'YT', province: 'Yukon' },
];
export const locations = [
  { code: 'AA', location: 'Military address in America other than Canada' },
  {
    code: 'AE',
    location: 'Military address in Europe, Middle East, or Canada',
  },
  { code: 'AP', location: 'Military address in Pacific' },
  { code: 'AS', location: 'American Samoa' },
  { code: 'CA', location: 'Canada' },
  { code: 'CZ', location: 'Canal Zone' },
  { code: 'FM', location: 'Federated States' },
  { code: 'GU', location: 'Guam' },
  { code: 'MH', location: 'Marshall Islands' },
  { code: 'MP', location: 'N. Mariana Isles' },
  { code: 'MX', location: 'Mexico' },
  { code: 'PW', location: 'Palau' },
  { code: 'PR', location: 'Puerto Rico' },
  { code: 'VI', location: 'Virgin Islands ]' },
];

export const states = [
  { code: 'AL', state: 'Alabama', numericCode: '01' },
  { code: 'AK', state: 'Alaska', numericCode: '02' },
  { code: 'AZ', state: 'Arizona', numericCode: '04' },
  { code: 'AR', state: 'Arkansas', numericCode: '05' },
  { code: 'CA', state: 'California', numericCode: '06' },
  { code: 'CO', state: 'Colorado', numericCode: '08' },
  { code: 'CT', state: 'Connecticut', numericCode: '09' },
  { code: 'DE', state: 'Delaware', numericCode: '10' },
  { code: 'DC', state: 'Washington D.C.', numericCode: '11' },
  { code: 'FL', state: 'Florida', numericCode: '12' },
  { code: 'GA', state: 'Georgia', numericCode: '13' },
  { code: 'HI', state: 'Hawaii', numericCode: '15' },
  { code: 'ID', state: 'Idaho', numericCode: '16' },
  { code: 'IL', state: 'Illinois', numericCode: '17' },
  { code: 'IN', state: 'Indiana', numericCode: '18' },
  { code: 'IA', state: 'Iowa', numericCode: '19' },
  { code: 'KS', state: 'Kansas', numericCode: '20' },
  { code: 'KY', state: 'Kentucky', numericCode: '21' },
  { code: 'LA', state: 'Louisiana', numericCode: '22' },
  { code: 'ME', state: 'Maine', numericCode: '23' },
  { code: 'MD', state: 'Maryland', numericCode: '24' },
  { code: 'MA', state: 'Massachusetts', numericCode: '25' },
  { code: 'MI', state: 'Michigan', numericCode: '26' },
  { code: 'MN', state: 'Minnesota', numericCode: '27' },
  { code: 'MS', state: 'Mississippi', numericCode: '28' },
  { code: 'MO', state: 'Missouri', numericCode: '29' },
  { code: 'MT', state: 'Montana', numericCode: '30' },
  { code: 'NE', state: 'Nebraska', numericCode: '31' },
  { code: 'NV', state: 'Nevada', numericCode: '32' },
  { code: 'NH', state: 'New Hampshire', numericCode: '33' },
  { code: 'NJ', state: 'New Jersey', numericCode: '34' },
  { code: 'NM', state: 'New Mexico', numericCode: '35' },
  { code: 'NY', state: 'New York', numericCode: '36' },
  { code: 'NC', state: 'North Carolina', numericCode: '37' },
  { code: 'ND', state: 'North Dakota', numericCode: '38' },
  { code: 'OH', state: 'Ohio', numericCode: '39' },
  { code: 'OK', state: 'Oklahoma', numericCode: '40' },
  { code: 'OR', state: 'Oregon', numericCode: '41' },
  { code: 'PA', state: 'Pennsylvania', numericCode: '42' },
  { code: 'RI', state: 'Rhode Island', numericCode: '44' },
  { code: 'SC', state: 'South Carolina', numericCode: '45' },
  { code: 'SD', state: 'South Dakota', numericCode: '46' },
  { code: 'TN', state: 'Tennessee', numericCode: '47' },
  { code: 'TX', state: 'Texas', numericCode: '48' },
  { code: 'UT', state: 'Utah', numericCode: '4' },
  { code: 'VT', state: 'Vermont', numericCode: '50' },
  { code: 'VA', state: 'Virginia', numericCode: '51' },
  { code: 'WA', state: 'Washington', numericCode: '53' },
  { code: 'WV', state: 'West Virginia', numericCode: '54' },
  { code: 'WI', state: 'Wisconsin', numericCode: '55' },
  { code: 'WY', state: 'Wyoming', numericCode: '5' },
];

export const stateOptions = states.map((s) => ({
  key: s.numericCode,
  text: s.state,
  value: s.code,
}));

export const addressTypeOptions = addressCodes.map((a) => ({
  key: a.code,
  text: `${a.code} - ${a.streetType}`,
  value: a.code,
}));