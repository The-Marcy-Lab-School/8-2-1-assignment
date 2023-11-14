const path = require('path');
const ScoreCounter = require('score-tests');
const knex = require('./knex');
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
} = require('./queries');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  beforeAll(async () => { });
  beforeEach(() => {
    scoreCounter.add(expect);
  });

  it('Requires the database and table to have been restored somehow with all members of congress', async () => {
    const fullTable = await knex('congress_members');
    expect(fullTable.length).toBe(6022);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('countAllMembers - Returns only the number of members', async () => {
    const result = await countAllMembers();

    expect(result).toEqual([{ count: "6022" }]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('countAllMembersAliased - Returns the aliased count', async () => {
    const result = await countAllMembersAliased();

    expect(result).toEqual([{ total_members: "6022" }]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('countByParty - Counts the members of all 3 parties', async () => {
    const result = await countByParty();

    expect(result).toEqual([
      { party: 'R', party_members: '2726' },
      { party: 'I', party_members: '29' },
      { party: 'D', party_members: '3267' },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('avgAgeAllMembersRounded - Returns the age of ALL members rounded to the nearest INT', async () => {
    const result = await avgAgeAllMembersRounded();

    expect(result).toEqual([{ avg_age: 54 }]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('avgAgeByCongressOrdered - gets the average age of each congress rounded and ordered by congress ascending', async () => {
    const result = await avgAgeByCongressOrdered();

    expect(result).toEqual([
      { congress: 68, avg_age: 53 },
      { congress: 73, avg_age: 53 },
      { congress: 78, avg_age: 53 },
      { congress: 83, avg_age: 53 },
      { congress: 88, avg_age: 53 },
      { congress: 93, avg_age: 52 },
      { congress: 98, avg_age: 50 },
      { congress: 103, avg_age: 53 },
      { congress: 108, avg_age: 55 },
      { congress: 113, avg_age: 58 },
      { congress: 118, avg_age: 59 },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('oldestAge - returns the oldest age of a congress member', async () => {
    const result = await oldestAge();

    expect(result).toEqual([{ oldest_age: 90 }]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('youngestAgeIndependent - returns the youngest age of an independent party member', async () => {
    const result = await youngestAgeIndependent();

    expect(result).toEqual([{ youngest_age: 37 }]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('oldestMember - returns the selected properties of the oldest member of congress', async () => {
    const result = await oldestMember();

    expect(result).toEqual([{
      id: 26443,
      congress: 103,
      chamber: 'Senate',
      bioname: 'THURMOND, James Strom',
      age: 90,
      party: 'R',
    }]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('oldestChamber - returns only the chamber with the oldest average age', async () => {
    const result = await oldestChamber();

    expect(result).toEqual([{
      avg_age: 53,
      chamber: 'House',
    }]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('currentCongressGenerationsAndAgesCounts - returns only the chamber with the oldest average age', async () => {
    const result = await currentCongressGenerationsAndAgesCounts();

    expect(result).toEqual([
      { num_members: '29', age: 81, generation: 'Silent' },
      { num_members: '259', age: 67, generation: 'Boomers' },
      { num_members: '192', age: 50, generation: 'Gen X' },
      { num_members: '55', age: 38, generation: 'Millennial' },
      { num_members: '1', age: 26, generation: 'Gen Z' },
    ]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  afterAll(async () => {
    await knex.destroy();
    scoreCounter.export();
  });
});
