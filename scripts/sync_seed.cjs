const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const authPath = path.resolve(__dirname, '../frontend/src/data/authoritativeDirectory.js');
const seedPath = path.resolve(__dirname, '../seed_data/pgi_directory_seed.json');

import(pathToFileURL(authPath).href).then(({ authoritativeDirectory }) => {
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  seed.patient_journey_steps = authoritativeDirectory.patient_journey_steps;
  seed.new_opd_floor_directory = authoritativeDirectory.new_opd_floor_directory;
  seed.amrit_pharmacies = authoritativeDirectory.amrit_pharmacies;
  seed.sarais_and_amenities = authoritativeDirectory.sarais_and_amenities;
  seed.campus_transport = authoritativeDirectory.campus_transport;
  seed.welfare_and_schemes = authoritativeDirectory.welfare_and_schemes;
  seed.emergency_triage_zones = authoritativeDirectory.emergency_triage_zones;
  seed.online_pre_registration_guide = authoritativeDirectory.online_pre_registration_guide;
  seed.opd_schedule = authoritativeDirectory.opd_schedule;

  fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2), 'utf8');
  console.log('Successfully synced seed_data/pgi_directory_seed.json with all scraped authentic data');
});
