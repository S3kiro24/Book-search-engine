// server.js
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth'); // Adjust path based on your actual structure
const { typeDefs, resolvers } = require('./schemas/index');
const routes = require('./routes//index');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }), // Pass user data to context for resolvers
});

// Start Apollo Server and apply middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

// Apply other routes
app.use(routes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Connect to MongoDB and start server
db.once('open', () => {
  startServer().then(() => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`GraphQL Playground: http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
});
