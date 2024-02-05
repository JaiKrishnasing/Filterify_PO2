alert('Onthoud en match paren kaarten om de easteregg te ontgrendelen. Ververs de pagina indien uw niet de kaarten kon zien.');

const images = document.querySelectorAll('.image');
const scoreText = document.querySelector('.count');

let arr = [];
let tempArr = [];
let count = 0;
let isClickable = true; 

setTimeout(() => {
  images.forEach(Image => Image.classList.add('hidden'));
}, 400);

function init() {
  images.forEach(image => {
    image.addEventListener('click', () => {
      if (isClickable && !image.classList.contains('clicked')) {
        const imageID = parseInt(image.getAttribute('data-button'));

        image.classList.remove('hidden');
        image.classList.add('clicked'); 

        arr.push(imageID);

        console.log(arr.length);

        if (arr.length >= 2) {
          if (checkForCorrect(arr)) {
            count++;
            scoreText.innerHTML = count;
            disableButtons(arr);
          } else {
            resetGame();
          }
          arr = [];
        }

        if(count >= 4){
          const isEasterEggUnlocked = true;
          localStorage.setItem('isEasterEggUnlocked', isEasterEggUnlocked)
          alert('Uw wordt teruggestuurd naar de image editor');
          window.location.href = 'canvas.html'
        }

        isClickable = false;
        setTimeout(() => {
          isClickable = true;
        }, 300);
      }
    });
  });
}

function shuffleNodeList() {
  const imageArray = Array.from(images);

  // Het Fisher-Yates shuffle algoritme

  for (let i = imageArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageArray[i], imageArray[j]] = [imageArray[j], imageArray[i]];
  }

  tempArr = imageArray;

  const top = document.querySelector('.top');
  const bottom = document.querySelector('.bottom');

  top.innerHTML = '';
  bottom.innerHTML = '';

  for (let i = 0; i < tempArr.length; i++) {
    if (i <= 3) {
      top.appendChild(tempArr[i]);
    } else {
      bottom.appendChild(tempArr[i]);
    }
  }
}

function resetGame() {
  arr = [];
  setTimeout(() => {
    images.forEach(image => {
      if (!image.classList.contains('disabled')) {
        image.classList.add('hidden');
        image.classList.remove('disabled');
        image.classList.remove('clicked');
      }
    });
  }, 500);
}

function disableButtons(imageIDs) {
  images.forEach(image => {
    const imagesID = parseInt(image.getAttribute('data-button'));
    if (imageIDs.includes(imagesID)) {
      image.classList.add('disabled');
    }
  });
}

function checkForCorrect(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== arr[i + 1]) {
      return false;
    }
  }
  return true;
}

init();
shuffleNodeList();

