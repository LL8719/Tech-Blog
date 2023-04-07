const newCommentHandler = async (event) => {
	event.preventDefault();
	console.log('newcomment');

	const commentText = $('#comment').val().trim();
	console.log('commentText:', commentText);

	const postId = $('#new-comment').data('postid');
	console.log('postId:', postId);

	if (commentText && postId) {
		try {
			const response = await fetch(`/api/post/${postId}/comments`, {
				method: 'POST',
				body: JSON.stringify({
					postId,
					commentText,
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) {
				console.log('Comment submitted successfully!');
				document.location.replace('/');
			}
		} catch (err) {
			console.log(err);
			alert('Error submitting comment. Please try again.');
		}
	} else {
		console.log('Please enter a comment.');
		alert('Please enter a comment.');
	}
};

document
	.querySelector('#new-comment')
	.addEventListener('submit', newCommentHandler);
