let punchCount = 0;

const personImage = document.getElementById("personImage");
const countDisplay = document.getElementById("count");
const punchEmoji = document.getElementById("punchEmoji");
const punchBtn = document.getElementById("punchBtn");
const punchSound = document.getElementById("punchSound");
const skinHit = document.getElementById("skinHit");

punchBtn.addEventListener("click", punchFace);

function punchFace() {

 
  punchCount++;


  countDisplay.innerText = punchCount;


  punchSound.currentTime = 0;
  punchSound.play();

  
  personImage.classList.add("shake");

  punchEmoji.classList.add("animate-punch");

  skinHit.classList.add("skin-red");

  setTimeout(() => {

   
    personImage.classList.remove("shake");

    punchEmoji.classList.remove("animate-punch");

    skinHit.classList.remove("skin-red");

  }, 500);

}