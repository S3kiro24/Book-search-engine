// Schemas/index.js
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./typeDefs');
const { resolvers } = require('./resolvers');

// Ensure that typeDefs is not null or undefined
if (!typeDefs) {
  throw new Error('Must provide typeDefs');
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = { typeDefs, resolvers };