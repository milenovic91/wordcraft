export default async () => {
  const mongoose = require('mongoose');
  mongoose.connection.db.dropDatabase();
  const Article = require('./models/Article').default;
  const User = require('././models/User').default;
  try {
    const user1 = await User.create({
      username: 'milos',
      password: 'password',
      email: 'milos@test.com'
    });
  
    const user2 = User.create({
      username: 'marko',
      password: 'password',
      email: 'marko@test.com'
    });
  
    const user3 = User.create({
      username: 'ana',
      password: 'password',
      email: 'ana@test.com'
    });
  
    await Article.create([{
      author: user1.id,
      title: 'Hello World',
      description: 'This is hello world article',
      body: 'This is hello world example.'
    }, {
      author: user1.id,
      title: 'how-to-get-started-with-docker',
      body: 'Docker is a set of platform as a service products...'
    }]);
  } catch (e) {
    throw e;
  }
}
