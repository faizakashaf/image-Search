
let access_Key = "XePHDDX1nUFpReS4rLDtzK8IphWpyR8fKqACPejD3vM";

const form = document.querySelector(".form");
const input = document.querySelector("input");  
const wrapper = document.querySelector(".wrapper");
const showMore = document.querySelector(".show");

// let userinput = "";
let pagecount = 1;

async function search_images(){
    userinput = input.value;
    if(userinput.length == 0){
       alert("Search an image")
       showMore.style.display = "none";
    }
else{
    let api_url = `https://api.unsplash.com/search/photos?page=${pagecount}&query=${userinput}&client_id=${access_Key}`

    const response = await fetch (api_url);
    const data =await response.json();
    const results = data.results
    // console.log(results)

    if(results.length === 0){
        // console.log("image not found")
        showMore.innerText = "No image Found";
        showMore.style.display = "block";
        }
    else{
        results.forEach((result) => {
            const images = document.createElement("div");
            images.classList.add ("images");
            const img = document.createElement("img");
            const icon = document.createElement("i");
            icon.classList.add('fa','fa-download','image_download');
            icon.setAttribute("aria-hidden","true");
            img.src = result.urls.small;
            img.alt = result.description;
            images.appendChild(img);
            images.appendChild(icon);
            wrapper.appendChild(images);
             })
            
             pagecount++

             let all_Icons = document.querySelectorAll(".image_download");
    all_Icons.forEach((download) => {
download.addEventListener("click",async (e) => {
    try{
        let imgUrl = e.target.parentNode.querySelector("img").src;
       console.log(imgUrl)
        let response = await fetch (imgUrl);
        // console.log(response)
        let file =await response.blob();
        // console.log(file)
        // console.log(file.type)
        // console.log(file.size)
        let link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = `${input.value}`;
        link.click();
    }catch(error){
        alert("image not found");
    }
})
    })
            
      if(pagecount > 1){
        showMore.innerText = "Show More";
                showMore.style.display = "block";
     }}
    }
   
}

form.addEventListener("submit",async (e) =>{
    wrapper.innerHTML = "";
    e.preventDefault()
    page = 1; // reset page count to 1 for new search
 await  search_images()
})
showMore.addEventListener("click",()=>{
    search_images()
})

