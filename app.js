
// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// create list item

const mysection = Array.from(document.querySelectorAll("section"));
const menu = document.getElementById("navbar_list");
const fragment = document.createDocumentFragment();
function createListItem(){
  for(const section of mysection){
       const sectionName = section.getAttribute("data-nav");
      const sectionLink = section.getAttribute("id");
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="#${sectionLink}" class="menu_link">${sectionName}</a>`;
      listItem.addEventListener("click", evt =>{
           evt.preventDefault();
           section.scrollIntoView({behavior:"smooth"});
       });
    fragment.appendChild(listItem);
  }
menu.appendChild(fragment);
}

// ********** close links ************

const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    console.log("helo");

    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links

const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});

// read me button

function myFunction() {
  let dots = document.getElementById("dots");
  let moreText = document.getElementById("more");
  let btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}

// services sildes

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

//Add an active state to your navigation items when a section is in the viewport

function sectionInViewPort(elem) {
  let sectionPosition = elem.getBoundingClientRect();
  return sectionPosition.top >= 0 && sectionPosition.top < 150;
}
function toggleActiveClass() {
  for (section of mysection) {
    if (sectionInViewPort(section)) {
      if (!section.classList.contains("your-active-class")) {
        section.classList.add("your-active-class");
      }
    } else {
      section.classList.remove("your-active-class");
    }
  }
}

// The active section in the Navbar highlighted

function toggleActiveClass() {
  const links = document.querySelectorAll("a.menu_link");
  console.log(links);
  for (const section of mysection) {
    if (sectionInViewPort(section)) {
      if (!section.classList.contains("your-active-class")) {
        section.classList.add("your-active-class");
        for (const link of links) {
          if (link.textContent === section.dataset.nav) {
            link.classList.add("active-link");
          } else {
            link.classList.remove("active-link");
          }
        }
      }
    } else {
      section.classList.remove("your-active-class");
    }
  }
}




createListItem();

document.addEventListener("scroll", toggleActiveClass);


