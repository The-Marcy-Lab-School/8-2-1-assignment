# 6.0.1 Assignment: Aggregator Functions
- [6.0.1 Assignment: Aggregator Functions](#601-assignment-aggregator-functions)
- [Before Getting started](#before-getting-started)
  - [A brief civics lesson](#a-brief-civics-lesson)
  - ["I don't care about about that or fully understand the data"](#i-dont-care-about-about-that-or-fully-understand-the-data)
- [THE DATA RESULTS HERE ARE WRONG ON PURPOSE](#the-data-results-here-are-wrong-on-purpose)
- [Getting Started](#getting-started)
  - [Migrations and Seeds](#migrations-and-seeds)
  - [DB Dumps](#db-dumps)
  - [The data](#the-data)
- [Question 0: Restoring our DB!](#question-0-restoring-our-db)
- [Question 1: countAllMembers - How many congress members are there?](#question-1-countallmembers---how-many-congress-members-are-there)
- [Question 2: countAllMembersAliased - Alias our count](#question-2-countallmembersaliased---alias-our-count)
- [Question 3: countByParty - How many members of each party are there?](#question-3-countbyparty---how-many-members-of-each-party-are-there)
- [Question 4: avgAgeAllMembersRounded - What is the average age of congress members?](#question-4-avgageallmembersrounded---what-is-the-average-age-of-congress-members)
- [Question 5: avgAgeByCongressOrdered - What is the average age of each congress?](#question-5-avgagebycongressordered---what-is-the-average-age-of-each-congress)
- [Question 6: oldestAge - What is the oldest age of a congress member?](#question-6-oldestage---what-is-the-oldest-age-of-a-congress-member)
- [Question 7: youngestAgeIndependent - What is the youngest age of an independent congress member?](#question-7-youngestageindependent---what-is-the-youngest-age-of-an-independent-congress-member)
- [Question 8: oldestMember - Who is the oldest congress member?](#question-8-oldestmember---who-is-the-oldest-congress-member)
- [Question 9: oldestChamber - Which chamber has the oldest average age?](#question-9-oldestchamber---which-chamber-has-the-oldest-average-age)
- [Question 10: currentCongressGenerationsAndAgesCounts - What does our current congress look like?](#question-10-currentcongressgenerationsandagescounts---what-does-our-current-congress-look-like)

# Before Getting started
This is a fun assignment as you are going to be examining a data set, a list of all US congress members at 10 year intervals. We'll be trying to answer some questions about their ages and numbers, which is something you may actually care about. Do we have older and older folks running our country? Find out below!

## A brief civics lesson
Our country has 3 branches of governments: judicial, executive, and legislative. Legislative is the one that writes and makes the laws, executive enforces them, and judicial judges whether or not the laws are allowed by our Constitution.

So when we say "congress" we're talking about the legislative branch. There are two chambers of congress: The Senate and the house of representatives. Senators are elected every 6 years, house members every 2.

That means every 2 years we have a new congress. They are numbered, and our data set in particular goes from the 68th congress in the 1920s, to the 118ths congress today. To simplify things, our dataset also only includes the congresses at 10 year intervals. We have data on the following congress sessions:

- 68
- 73
- 78
- 83
- 88
- 93
- 98
- 103
- 108
- 113
- 118

It jumps by five because each congress lasts 2 years.

Finally, each member of congress has a party affiliation. The big 3 are "Democrat" (D), "Republican" (R), and "Independent" (I). How is that data stored in our dataset I wonder?

## "I don't care about about that or fully understand the data"
Honestly, you should care a little about politics (believe me, it *very* much cares what you do), but even if you don't understand it all that's ok. Sometimes the "domain" (think subject) of your project will be a little confusing to you. Just move slowly and do exactly what the tests are asking for.

# THE DATA RESULTS HERE ARE WRONG ON PURPOSE
All of the example SQL outputs in the question explainers are incorrect! **The examples here will have the right column names, but the data is wrong.** They're just hints and formatting, if you want to see what data we're literally expecting, read the question to see what we need, and then check the actual tests to see if you are getting the true answer. You must read the tests to pass this assignment.

Remember, you can use the PG terminal to check your queries and see the output, but to actually pass the tests, you must copy that query into the given function in `from-scratch.js` and knex will return an array of objects.

# Getting Started
In order to run these tests and queries, you may notice that we're expecting a database "congress_age_data," a table "congress_members," and a *ton* of rows to already exist. How does that work? Well there are 2 primary ways to fill a DB:

## Migrations and Seeds
We can run "migration files" that slowly and iteratively build up our individual tables, and then "seed" them with existing sample data. This is very useful and common in the development world for applications. This is because we want to see the history of our tables being created and slowly build them up, migration by migration.

Migrations allow any new member to start from scratch and always make sure their database is built correctly and filled with useful starter rows to play around with.

## DB Dumps
The other way is to simply take an exist, dump it into a special file, and then "restore" your database to that state. If migrations and seeds are like slowly building and filling a building, a restore would be like dropping a fully assembled and occupied building directly down on the street.

These are perfect for snapshots of time. Either used on its own to study data (like us right now!) or to use *with* migrations to look at your database from an exact moment in time (like right before it crashed).


## The data
When starting with a new data set, it would behoove you to examine it closely. What are the tables? What does each row represent? What are the columns and their values? Any relationships?

Explore!

# Question 0: Restoring our DB!
So, now that you know the two types of making a database, we are going to restore our database from an existing snapshot. If everything on your machine is setup locally with postgres properly, just run:

```bash
npm run restore
```

If that doesn't work, you *can* run the backup command:

```bash
# Go into your DB and drop/create the database first!
npm run restore:manual
```

*IF YOU CANNOT GET THIS TO WORK, YOU NEED TO FIND AN INSTRUCTOR TO HELP YOU*

> Original data: For fun, we included the original csv data set of all members for the past 100 years or so.

# Question 1: countAllMembers - How many congress members are there?
This is a pretty basic question, so it's a natural starting place for us. Use the `COUNT` function to return a single number that represents the number of congress members in the database.

```plaintext
# In the SQL console
count
------
  541
```
(That is not the exact number, it'll be a lot higher, just showing what it looks like)

> What the String? `COUNT` should return a number right? Well, *technically* it does, it returns a BIGINT, which our code interprets as a string. You can "cast" it to an integer with `COUNT()::int` but for now we're just going to leave it as a string because we aren't *doing* anything with this number. Just a heads up!

# Question 2: countAllMembersAliased - Alias our count
That first query is great except `count` isn't terribly descriptive. Why don't you use a column alias to name this count `total_members`?

```plaintext
# In the SQL console
 total_members
---------------
          541
```

(again, not the number, just an example)

# Question 3: countByParty - How many members of each party are there?
Counting an entire table's columns has its uses but there's so much more to do. Very often, you'll want to count subsets of your data. In this case let's count up the members from each party. You'll need to use our good ol' `COUNT` function again, but this time you'll need to use the `GROUP BY` clause to get the counts for each party. Also, lets alias the count column to `party_members` so we know what we're looking at. Your output should look like this (the order may differ, that's ok with this one):

```plaintext
# In the SQL console
 party_members | party
---------------+-------
          2726 | R
            31 | I
          3267 | D
```

# Question 4: avgAgeAllMembersRounded - What is the average age of congress members?
Alright, now let's answer a question: what is the average age of all congress members? To find that number let's use the `AVG` function instead of the `COUNT` function, and alias it to `avg_age`. But with one twist! See, if you *just* use `AVG` you'll get some gross float:

```plaintext
        avg_age
-------------------
 71.82431790712177
```

Boo. Hate that for us. Let's use the `ROUND` function to round that number to the nearest whole number. Your output should look like this:

```plaintext
 avg_age
---------
      72
```

The question for you is, how do you use `ROUND` with `AVG` *and* alias it?

# Question 5: avgAgeByCongressOrdered - What is the average age of each congress?

Believe it or not, you now know enough SQL to answer the question: Is congress getting older? Just like we can use `GROUP BY` with `COUNT`, let's use it with `ROUND` and `AVG` to see the average age of each congress. Now, if we *just* did that we don't have a very clear answer. It would look something like this (assuming you alias!):

```plaintext
 congress | avg_age
----------+---------
      113 |      58
      108 |      55
       98 |      50
       83 |      51
       73 |      53
       78 |      52
      103 |      52
       93 |      52
      118 |      61
       88 |      52
       68 |      54
 ```

 Everything is out of order! So to get this right, lets use `ORDER BY` to sort by `congress`, and see if as congress goes up, so does the average age:

```plaintext
 congress | avg_age
----------+---------
       68 |      50
       73 |      51
       78 |      52
       83 |      53
       88 |      54
       93 |      52
       98 |      51
      103 |      54
      108 |      57
      113 |      59
      118 |      62
```

Look at that, we can clearly see a trend going up! Good job, you just used SQL to answer a real question about a data set! Pretty cool, right?

# Question 6: oldestAge - What is the oldest age of a congress member?
Now that we know the average age of congress, let's find the *oldest* age. To do this, we'll use the `ROUND` function with the `MAX` function to find the oldest age. Your output should look like this (remember to alias to `oldest_age`):

```plaintext
 oldest_age
------------
         84
```

# Question 7: youngestAgeIndependent - What is the youngest age of an independent congress member?
Let's keep our filtering skills up! If we're just looking for a single number, we don't need `GROUP BY`, we can just use a good old `WHERE` clause. Use one to find the `MIN` age (rounded) of all the "Independent" congress members. Your output should look like this:

```plaintext
 youngest_age
--------------
           32
```

# Question 8: oldestMember - Who is the oldest congress member?
Those last two queries used aggregators to get a single number, but what if I wanted an entire row? Then you *wouldn't* use an aggregator. Instead, and this sounds crazy but it's true, you would sort the table based off what you're looking for, and then use `LIMIT` to grab the first row. Let's try it out! Use `ORDER BY` (ascending or descending?) and `LIMIT` to find the oldest congress member. Your output should look like this:

```plaintext
  id   | congress | chamber |  bioname  | age | party
-------+----------+---------+-----------+-----+-------
 23313 |      112 | Senate  | DOE, John | 100 |     D
```

What should your `SELECT` statement look like to get that output?

# Question 9: oldestChamber - Which chamber has the oldest average age?
Same idea as above, but we're back to aggregators! There are 2 chambers of congress: the Senate and the House. Which one has the oldest average age? Use `ROUND`, `AVG`, `GROUP BY`, `ORDER BY`, an alias, and `LIMIT` to find out. Your output should look like this:

```plaintext
 avg_age | chamber
---------+---------
    51   | Senate
```

# Question 10: currentCongressGenerationsAndAgesCounts - What does our current congress look like?
Alright, this is it, the final question. Using all the skills you've practiced so far, your final mission is to tell me the generational makeup of the 118th congress. I want to know how many of each generation we have, and what the average age of that generation is. The results should be in order of oldest generation to youngest. Your output should look something like this:

```
 num_members | age | generation
-------------+-----+------------
          31 |  84 | Silent
         248 |  71 | Boomers
         183 |  60 | Gen X
          58 |  42 | Millennial
           2 |  23 | Gen Z
```

Seems hard, but it's not much different than anything else we've done. You can do this!