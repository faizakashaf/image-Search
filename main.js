
let access_Key = "XePHDDX1nUFpReS4rLDtzK8IphWpyR8fKqACPejD3vM";

const form = document.querySelector(".form");
const input = document.querySelector("input");  
const wrapper = document.querySelector(".wrapper");
const showMore = document.querySelector(".show");

let userinput = "";
let pagecount = 1;

async function search_images(){
    userinput = input.value;
let api_url = `https://api.unsplash.com/search/photos?page=${pagecount}&query=${userinput}&client_id=${access_Key}`

try{
const response = await fetch (api_url);
const data =await response.json();
const results = data.results
console.log(results)

results.forEach((result) => {
const images = document.createElement("div");
images.classList.add ("images");
const img = document.createElement("img");
img.src = result.urls.small;
img.alt = result.description;
images.appendChild(img);
wrapper.appendChild(images);
 })

 pagecount++
} catch (error) {
    console.error("Error fetching images:", error);
}

if(pagecount > 1){
    showMore.style.display = "block";
}
}

form.addEventListener("submit",(e) =>{
    wrapper.innerHTML = "";
    e.preventDefault()
    search_images()
    page = 1; // reset page count to 1 for new search
      
})
showMore.addEventListener("click",()=>{
    search_images()
})

