const { User, Post, Comment } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');

// Homepage route
router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			attributes: ['id', 'title', 'content', 'date_created'],
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render('homepage', {
			posts,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Sign-up route
router.get('/signup', async (req, res) => {
	try {
		res.render('signup');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Login route
router.get('/login', async (req, res) => {
	try {
		if (req.session.loggedIn) {
			res.redirect('/');
			return;
		}

		res.render('login');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Post by id route
router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ['id', 'title', 'content', 'date_created'],
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

		if (!postData) {
			res.status(404).json({
				message: 'No post found with that id',
			});
			return;
		}

		const post = postData.get({ plain: true });
		res.render('single-post', {
			post,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
