const { User, Post, Comment } = require('../models');
const router = require('express').Router();

const withAuth = require('../utils/auth');

// Dashboard Route

router.get('/', withAuth, async (req, res) => {
	try {
		const postData = await Post.findAll({
			where: {
				user_id: req.session.user_id,
			},
			attributes: ['id', 'title', 'content', 'user_id', 'date_created'],
			include: [
				{
					model: Comment,
					attributes: [
						'id',
						'comment_text',
						'user_id',
						'date_created',
						'post_id',
					],
					include: {
						model: User,
						attributes: ['username'],
					},
				},
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		const posts = postData.map((post) => {
			const postObj = post.get({ plain: true });
			postObj.User = post.User;
			return postObj;
		});

		const user = await User.findByPk(req.session.user_id);
		const dashUser = user.get({
			plain: true,
		});

		res.render('dashboard', {
			posts,
			user: dashUser,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/newpost', withAuth, async (req, res) => {
	try {
		res.render('newpost', {
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
