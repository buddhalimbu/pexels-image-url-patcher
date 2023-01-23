//JavaScript 
const imgwrapper = document.querySelector(".img-holder");

const btn = document.querySelector(".loadmore");


//tabs reaveal

function ot(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.querySelector("#showDef").click();


//Showing random 10 images,

function blogImg(){
  var i =0;
  //Lopping images on front page
  for(var i=0;i<10;i++){
    const div = document.createElement("div");
    div.className = "imgWrap " + randClass();
    const img = new Image();
    img.src = genUrl();
    div.appendChild(img);
    imgwrapper.append(div);
}
err();
//Selecting all the images 
const group = [...document.querySelectorAll(".imgWrap")];
//transition on load
setTimeout(()=>{
  group.forEach((singlePost)=>{
singlePost.classList.add("add-ts")
});
});

const image = document.querySelectorAll('.imgWrap img');
image.forEach((x) => {
x.addEventListener("click", function(e){
  //create image wrapper
  const imgHolder= document.createElement("div");
  imgHolder.className = "imgHolder";
  const imgClose = document.createElement("span");
  imgClose.className = "imgClose";
  const imgCloseTxt = document.createTextNode("\u00D7");
  imgClose.appendChild(imgCloseTxt);
  
  //hide on click
  imgClose.onclick = (item) => {
    item.target.parentNode.style.display="none"
  }
  
  //image module onclick
  const imgsrc = e.target.src;
  
  const newImage = document.createElement("img");
  newImage.src = imgsrc;
  //note 
  const note = document.createElement("i");
  note.className="note";
  note.innerText="This image is originally from pexels.com and Original source of this Image is Pexels.";
  
  //download button
  const dWrap = document.createElement("div");
  dWrap.className = "dWrap";
  //copy links input
  

  const number = Math.floor((Math.random() * 9000) + 1);
  const cs = document.createElement("span");
  cs.className = "copysrc";
  cs.appendChild(document.createTextNode("Copy Src"));
  const dImg = document.createElement("a");
  dImg.className = "dimg";
  dImg.href = imgsrc;
  dImg.download = "My Image";
  dImg.appendChild(document.createTextNode("Download"));
  cs.addEventListener("click", (e)=>{
    var areabox=document.createElement("textarea");
    areabox.value=imgsrc;
    document.body.appendChild(areabox);
    areabox.focus();
    areabox.select();
    document.execCommand("copy");
    document.body.removeChild(areabox);
    e.target.innerHTML='Src Copied';
    e.target.style.background='#d5001c';
    setTimeout(()=>{
      e.target.style.display='none'
    },3000);
  });
  dImg.addEventListener("click", (event) => {
    event.preventDefault();
    downloadImage(imgsrc);
    event.target.style.display='none'
  });function downloadImage(url) {
const options = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
  fetch(url, options)
   .then( response => {
    response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = "My-Image-"+[number]+".jpg";
        a.click();
      });
    }); 
}


  //append the button close
  imgHolder.append(imgClose,newImage,dImg,cs,note);
  document.body.appendChild(imgHolder)
});
});
}

//if Img Error
function err(){
const images = document.querySelectorAll(".img-holder img");
images.forEach((image) =>{
  image.onerror = () =>{
    //image.src= "https://raw.githubusercontent.com/buddhalimbu/buddhalimbu.github.io/master/image/buddha.jpg"
    image.src = errorUrlReplaced();
  }
})
}



btn.addEventListener("click",(e) =>{
  blogImg();
  err();
  window.scrollTo(0,document.body.scrollHeight)
});

//gen classes

function randClass(){
  const randNumber = Math.floor(Math.random()*11);
  const randomclass = "flex"+randNumber;
  return randomclass;
}



function genUrl(){
  const n = (Math.floor(1000000+Math.random()*9000000));
  const url = "https://images.pexels.com/photos/"+n+"/pexels-photo-"+n+".jpeg?auto=compress&cs=tinysrgb&w=800&h=300&dpr=2";
  return url;
}


function errorUrlReplaced(){
  const gImages = ["https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500","https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","https://images.pexels.com/photos/789812/pexels-photo-789812.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"];
  const gImage = gImages[Math.floor(Math.random()*gImages.length)];
  return gImage
}
function randBg(length){
  var c = "0123456689ABCDEF";
  var s = "#";
  var cL = c.length;
  for ( var i = 0; i < length; i++ ) {
        s += c.charAt(Math.floor(Math.random() * cL));
    }
    return s;
}

function randText(){
  var txt = ["Click Here","Need Repo ?","Github Link"];
  var t = txt[Math.floor(Math.random()*txt.length)];
  return t
}




setInterval(()=>{
  const repo = document.querySelector(".repo");
  repo.style.backgroundColor=randBg(6);
  repo.innerHTML = randText();
},2000);


blogImg();



