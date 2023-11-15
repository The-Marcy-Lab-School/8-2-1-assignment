const {
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
} = require('./from-scratch');

const main = async () => {
  await countAllMembers();
  // await countAllMembersAliased();
  // await countByParty();
  // await avgAgeAllMembersRounded();
  // await avgAgeByCongressOrdered();
  // await oldestAge();
  // await youngestAgeIndependent();
  // await oldestMember();
  // await oldestChamber();
  // await currentCongressGenerationsAndAgesCounts();
};

main();
