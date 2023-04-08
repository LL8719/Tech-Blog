const { User, Post, Comment } = require('../models');
const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('./../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [{ model: User }, { model: Comment, include: { model: User } }],
		});

		const posts = postData.map((post) => post.get({ plain: true }));

		res.render('homepage', {
			posts,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Post by id route
router.get('/post/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		const post = postData.get({ plain: true });

		res.render('post', {
			...post,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Login route
router.get('/login', async (req, res) => {
	try {
		if (req.session.logged_in) {
			res.redirect('/');
			return;
		}

		res.render('login');
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
