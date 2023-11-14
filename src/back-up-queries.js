// Only use this file if you're on a non-local postgres
const path = require('path');
const knex = require('./knex');

// REMEMBER: You would've had to manually create the database first!
/* DROP DATABASE congress_age_data */
/* CREATE DATABASE congress_age_data */
const runBackUpQueries = async () => {
  const createCongressMembers = `CREATE TABLE congress_members (
    id SERIAL PRIMARY KEY,
    congress INTEGER,
    start_date DATE,
    chamber VARCHAR(255),
    state_abbrev VARCHAR(255),
    party_code INTEGER,
    bioname VARCHAR(255),
    bioguide_id VARCHAR(255),
    birthday DATE,
    cmltv_cong INTEGER,
    cmltv_chamber INTEGER,
    age_days INTEGER,
    age_years FLOAT,
    generation VARCHAR(255)
  );`;
  await knex.raw(createCongressMembers);

  const dataAgingCongressCsv = path.join(__dirname, 'data_aging_congress.csv');

  const copyDataQuery = `
  COPY congress_members(congress, start_date, chamber, state_abbrev, party_code, bioname, bioguide_id, birthday, cmltv_cong, cmltv_chamber, age_days, age_years, generation)
  FROM '${dataAgingCongressCsv}'
  DELIMITER ','
  CSV HEADER;`;
  await knex.raw(copyDataQuery);

  const renameColumnQuery = `
  ALTER TABLE congress_members
  ADD COLUMN party text;`;

  await knex.raw(renameColumnQuery);

  const fillNewColumnQuery = `
  UPDATE congress_members
  SET party = CASE
    WHEN party_code = 100 THEN 'D'
    WHEN party_code = 200 THEN 'R'
    ELSE 'I'
  END;`;
  await knex.raw(fillNewColumnQuery);

  const dropOldColumnQuery = `
  ALTER TABLE congress_members
  DROP COLUMN party_code;`;

  await knex.raw(dropOldColumnQuery);

  const deleteNon5YearCongresses = `
  DELETE FROM congress_members
  WHERE congress
    NOT IN (68, 73, 78, 83, 88, 93, 98, 103, 108, 113, 118);`;
  await knex.raw(deleteNon5YearCongresses);

  knex.destroy();
};

runBackUpQueries();
