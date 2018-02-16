const clientID = "1363b70fda05c163bd9057d0ca76ace8b26185146afcf5c424fc881f76c012a9";
const loc = "https://api.unsplash.com";

// const header = document.getElementById('unsplash');
// Get Random Image for the header bg
// fetch(`${loc}/photos/random/?client_id=${clientID}`, {
// 	method: 'get'
// })
// .then((response) => response.json())
// .then((data) => {
//   console.log(data);
//   let url = data.urls.regular;
// 	header.style.backgroundImage = `url(${url})`;
// }).catch((err) => {
// 	header.style.backgroundColor = "pink";
// });

const searchInput = document.getElementById("searchtext"); // search text
const cat = document.getElementById("category"); // category

const btn = document.getElementById('btn-sub');
const categories = [];

const imageContainer = document.getElementById('imageContainer');

checkSearch();

function checkSearch(){
  if(searchInput.value.length <= 0){
    btn.disabled = true;
  }else{
    btn.disabled = false;
  }
}

searchInput.addEventListener('change', checkSearch);
searchInput.addEventListener('keyup', checkSearch);

// https://api.unsplash.com/collections?&client_id=${clientID}&per_page=100
async function getCategories(){

  let rand =  Math.floor(Math.random() * (100 - 1) + 1);
  
  // Fetch Collections
  await fetch(`${loc}/collections?&client_id=${clientID}&per_page=20&page=${rand}`, {
    method: 'get'
  })
  .then((response) => response.json())
  .then((data) => {
    for(let i = 0 ; i < data.length ; i++){
      categories.push({ id: data[i].id, title: data[i].title });
    }
  }).catch((err) => {
    console.log('Something went wrong!');
  });

  let catHtml = "<option value='all'>All</option>";
  categories.map((cat) => {
    catHtml += `<option value="${cat.id}">${cat.title}</option>`;
  });

  cat.innerHTML = catHtml;

}

getCategories();

// ${loc}/search/photos?page=1&per_page=18&client_id=${clientID}&query=office

async function onButtonSearch(){
  let searchValue = searchInput.value;
  let catValue = cat.value;
  const imagesArr = [];

  let searchURL = `${loc}/search/photos?page=1&per_page=18&client_id=${clientID}&query=${searchValue}`;

  if(catValue !== 'all'){
    searchURL = `${loc}/search/photos?page=1&per_page=18&client_id=${clientID}&query=${searchValue}&collections=${catValue}`;
  }

  await fetch(searchURL, {
    method: 'get'
  })
  .then((response) => response.json())
  .then((data) => {
    let dataArr = data.results;

    for(let i = 0 ; i < dataArr.length ; i++){
      imagesArr.push({ 
        "thumb": dataArr[i].urls.small, 
        "big": dataArr[i].urls.regular , 
        "description" : dataArr[i].description });
    }
   
  }).catch((err) => {
    
    console.log("Something went wrong!");
    console.log("Limit Reached");

  });
  
  console.log(imagesArr);

  let imgHtml = "";
  imagesArr.map((singleImage) => {
    imgHtml += `<a href="${singleImage.big}" data-fancybox data-type="image"><img src="${singleImage.thumb}" alt="${singleImage.description}" /></a>`
  });

  imageContainer.innerHTML = imgHtml;
  
}


btn.addEventListener('click', onButtonSearch);




