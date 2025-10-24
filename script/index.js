const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}

const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass () {
    const activeButtons = document.getElementsByClassName("active");

    for(let btn of activeButtons) {
        btn.classList.remove("active")
    }
    // console.log(activeButtons)
}


function loadCategories() {
  // 1- fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2 - convert promise to json
    .then((res) => res.json())
    //3 - send data to display
    .then((data) => displayCategories(data.categories));
}

// 34-4
function loadVideos (searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(response => response.json())
    .then(data => {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
    });
}

//34-6
const loadCategoryVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);
    fetch(url)
    .then((res) => res.json())
    .then(data => {
        removeActiveClass()
        // no active class
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active")
        console.log(clickedButton)
        displayVideos(data.category)
    })
}

const loadVideoDetails = (videoId) => {
    console.log(videoId);

    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
    .then((res) => res.json())
    .then(data => displayVideoDetails(data.video))
};

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal()
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
</div>
    `
};

//34-3
// category :  "Music"
// category_id: "1001"
function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");

  // Loop operation on Array of object
  for (let cat of categories) {
    // console.log(cat);

    // create Element
    const categoryDiv = document.createElement("div");

    categoryDiv.innerHTML = `
        <button  id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})"class="btn btn-sm hover:bg-[#FF1F3D]  hover:text-white">${cat.category}</button>
    `;

    // Append the Element
    categoryContainer.append(categoryDiv);
  }
}
// {
//     "category_id": "1003",
//     "video_id": "aaae",
//     "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
//     "title": "Inside Amy Schumer",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
//             "profile_name": "Amy Schumer",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "3.6K",
//         "posted_date": "15147"
//     },
//     "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
// }

// 34-4
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
            <div class="col-span-full flex flex-col justify-center text-center items-center">
                <img class="w-[120px]" src="./assets/Icon.png" alt="Error image">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>`;
        hideLoader()
        return;
    }


    videos.forEach((video) => {
        console.log(video)

        const videoCard = document.createElement("div");

        videoCard.innerHTML =`
        <div class="card bg-base-100">
            <figure class="relative">
                <img class ="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="video" />
                <span class="absolute bottom-1 right-2 text-white bg-black px-2 text-sm rounded-sm">
                    3hrs 56 min ago
                </span>
            </figure>

            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                        <img src="${video.authors[0].profile_picture}"/>
                    </div>
                </div>
            
            </div>
                <div class="info">
                    <h2 class="text-sm font-semibold">Midnight Serenade</h2>

                    <p class="text-sm flex text-gray-400 gap-1">
                        ${video.authors[0].profile_name}
                        ${video.authors[0].verified == true ? `<img class="w-5" src="https://www.citypng.com/public/uploads/preview/blue-instagram-account-verified-symbol-sign-icon-701751695136703siwh5zdh3h.png" alt="authors">` : `` }
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
            <button onclick='loadVideoDetails("${video.video_id}")' class="btn btn-block">Show Details</button>
        </div>
        `;
        // append
        videoContainer.append(videoCard)
    });
    hideLoader();
}

document.getElementById("search-input").addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input);
})
loadCategories();
// loadVideos();

























