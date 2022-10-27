const newPostHandler= async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const contents = document.querySelector('#article').value.trim();
  
    if (title && contents) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Cannot Create Blog Post');
      }
    }
  };
  //event handler that allows a user to delete their owned blog posts from their dashboard
  const delButtonHandler = async (event) => {
    
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Cannot Delete Blog Post');
      }
    }
  };

  //attaching the event handlers to the buttons within the handlebar views 
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);
  
let deletebuttons = document.querySelectorAll('.deletes')
  
deletebuttons.forEach((btn) => {
  btn.addEventListener('click', delButtonHandler);
}); 