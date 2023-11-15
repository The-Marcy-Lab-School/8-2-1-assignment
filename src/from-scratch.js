const knex = require('./knex');

const countAllMembers = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const countAllMembersAliased = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const countByParty = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const avgAgeAllMembersRounded = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const avgAgeByCongressOrdered = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const oldestAge = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const youngestAgeIndependent = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const oldestMember = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const oldestChamber = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

const currentCongressGenerationsAndAgesCounts = async () => {
  const query = ``;

  const { rows } = await knex.raw(query);
  // console.log(rows); // for debugging!
  return rows;
};

module.exports = {
  countAllMembers,
  countAllMembersAliased,
  countByParty,
  avgAgeAllMembersRounded,
  avgAgeByCongressOrdered,
  oldestAge,
  youngestAgeIndependent,
  oldestMember,
  oldestChamber,
  currentCongressGenerationsAndAgesCounts,
};
