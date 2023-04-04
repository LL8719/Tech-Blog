const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'cascade',
});
Post.hasMany(Comment, {
	foreignKey: 'post_id',
	onDelete: 'cascade',
	hooks: true,
});
Comment.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'cascade',
	hooks: true,
});

module.exports = { User, Post, Comment };