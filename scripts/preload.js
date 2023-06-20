// function preloadImages(urls) {
//   urls.forEach((url) => {
//     var img = new Image();
//     img.src = url;
//     img.style = "position:absolute";
//     cache.appendChild(img);
//   });
// }

function preloadImages(urls) {
  result = [];
  urls.map((url) => {
    const img = new Image();
    img.src = url;
    return img;
  });
}

// const cache = document.createElement("CACHE");
// cache.style = "position:absolute;z-index:-1000;opacity:0;";
// document.body.appendChild(cache);

const imagesToCache = [
  'assets/sound_on.png', 'assets/sound_off.png', 'assets/heart.png'
];

const hashKeys = Object.keys(scoreDescriptions);
for(i in hashKeys){
  imagesToCache.push(`assets/backgrounds/${scoreDescriptions[hashKeys[i]].background}`);
}

QUESTIONS.forEach((description) => {
  imagesToCache.push(`assets/backgrounds/${description.background}`);
});

preloadImages(imagesToCache);
