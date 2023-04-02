const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
	{
		username: 'johndoe',
		email: 'johndoe@gmail.com',
		password: 'password123',
	},
	{
		username: 'janedoe',
		email: 'janedoe@gmail.com',
		password: 'password456',
	},
];

const postData = [
	{
		title: 'My First Blog Post',
		content: 'This is the content of my first blog post.',
		user_id: 1,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		title: 'My Second Blog Post',
		content: 'This is the content of my second blog post.',
		user_id: 2,
		created_at: new Date(),
		updated_at: new Date(),
	},
];

const commentData = [
	{
		comment_text: 'Great post!',
		user_id: 2,
		post_id: 1,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		comment_text: 'Thanks for sharing!',
		user_id: 1,
		post_id: 2,
		created_at: new Date(),
		updated_at: new Date(),
	},
];

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	const users = await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	const posts = await Post.bulkCreate(postData);

	const comments = await Comment.bulkCreate(commentData);

	process.exit(0);
};

seedDatabase();
