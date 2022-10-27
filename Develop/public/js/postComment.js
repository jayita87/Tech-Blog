const newCommentHandler = async (event) => {
    event.preventDefault();
    console.log('button hit')

    const contents = document.querySelector('#inputComment').value.trim();
    console.log(contents); 

    const post_id = document.querySelector('.comment-form').getAttribute('data-id');
    console.log(post_id); 

    if (contents && post_id) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ 
          post_id: post_id, 
          contents: contents 
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('comment handlder function successful'); 
        document.location.reload(); 
      } else {
        alert('Cannot Create Comment');
      }
    }
  };
  
  document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);