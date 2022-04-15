const elUserList = document.querySelector(".users__list")
const elUsersTemplate = document.querySelector(".users__template").content;

const elPostList = document.querySelector(".post__list")
const elPostTemplate = document.querySelector(".post__template").content

const elCommentList = document.querySelector(".comment__list");
const elCommentTemplate = document.querySelector(".comment__template").content




function renderUsers(array, element) {
  
  element.innerHtml = null;
  
  const usersFragment = document.createDocumentFragment();
  
  array.forEach(item => {
    
    const clonedTemplate = elUsersTemplate.cloneNode(true);
    
    
    clonedTemplate.querySelector(".users__item").dataset.userID = item.id;
    clonedTemplate.querySelector(".users__id").textContent= item.id;
    clonedTemplate.querySelector(".users__title").textContent = item.username;
    clonedTemplate.querySelector(".users__heading").textContent = item.name;
    clonedTemplate.querySelector(".users__email").textContent = item.email;
    clonedTemplate.querySelector(".users__email").href =  "mailto:" + item.email;
    clonedTemplate.querySelector(".users__phone").textContent = item.phone;
    clonedTemplate.querySelector(".users__website").textContent = item.website;
    clonedTemplate.querySelector(".users__website").href = "http://" + item.website;
    clonedTemplate.querySelector(".company__name").textContent = item.company.name;
    clonedTemplate.querySelector(".company__catch-phrase").textContent = item.company.catchPhrase;
    clonedTemplate.querySelector(".company__bs").textContent = item.company.bs;
    clonedTemplate.querySelector(".adress__link").href = 'https://www.google.com/maps/place/' +item.address.geo.lat + ',' + item.address.geo.lng
    
    
    
    
    usersFragment.appendChild(clonedTemplate)
  });
  
  element.appendChild(usersFragment)
  
  elUserList.addEventListener('click', (e)=>{
    localStorage.setItem('id', e.target.dataset.uuid)
  })
};


async function getUsers() {
  const resp = await fetch('https://jsonplaceholder.typicode.com/users');
  
  const data = await resp.json();
  
 
  renderUsers(data, elUserList)
};

getUsers();


elUserList.addEventListener("click" , evt =>{
  
  elPostList.innerHTML = "";
  elCommentList.innerHTML = "";

  
  if(evt.target.matches(".users__item")){
    
    
    const itemId = evt.target.dataset.userID;
    console.log(itemId)
    
    async function getPosts() {
      const resp = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + itemId);
      
      const data = await resp.json()
      
      console.log(data);
      
      
      renderPosts(data, elPostList)
      
    }
    
 
    
    getPosts()
    
    
   
    
  }
  
})



function renderPosts(arr, node) {
  
  node.innerHtml = null;
  
  const postFragment = document.createDocumentFragment();
  
  arr.forEach(el => {
    
    const clonedTemplates = elPostTemplate.cloneNode(true);
    
    clonedTemplates.querySelector(".post__item").dataset.postId = el.id;
    clonedTemplates.querySelector(".post__title").textContent = el.title;
    
    clonedTemplates.querySelector(".post__text").textContent = el.body;
    
   
    
    postFragment.appendChild(clonedTemplates)
  });
  
  node.appendChild(postFragment)
};



elPostList.addEventListener("click" , evt =>{
  
  elCommentList.innerHTML = "";
 
  
  if(evt.target.matches(".post__item")){
    
    ;
    
    const itemId = evt.target.dataset.postId;
    console.log(itemId)
    
    async function getComments() {
      const resp = await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + itemId);
      
      const data = await resp.json()
      
      console.log(data);
      
      
      
      renderComments(data, elCommentList)
    }
    
   
    
    getComments()
    
    
   
    
    
  }
  
})

function renderComments(arr, e) {
  
  e.innerHTML = "";
  
  const commentFragment = document.createDocumentFragment()
  
  arr.forEach(evt =>{
    
    const clonedTemp = elCommentTemplate.cloneNode(true);
    
    clonedTemp.querySelector(".comment__title").textContent = evt.name;
    clonedTemp.querySelector(".comment__text").textContent = evt.body;
    clonedTemp.querySelector(".comment__email").textContent = evt.email;
    clonedTemp.querySelector(".comment__email").href =  "mailto:" + evt.email;
    
    
    commentFragment.appendChild(clonedTemp);
  })

  e.appendChild(commentFragment)
  
}




