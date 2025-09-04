let html = document.querySelector("html"),
    carouselNextBtn = document.querySelector(".sc-carousel .next"),
    carouselPrevBtn = document.querySelector(".sc-carousel .prev"),
    navLinks = document.querySelectorAll("nav .nav-link"),
    navbarEle = document.querySelector("nav"),
    heightOfNavbar = navbarEle.clientHeight,
    loadingPageEle = document.querySelector(".loadingPage");


window.addEventListener("DOMContentLoaded", function () {
    let currentSlide = document.querySelector(".sc-carousel .sc-carousel-item.active");
    currentSlide.classList.add("show");

    loadingPageEle.classList.add("hide");

    setTimeout(function (){
        loadingPageEle.classList.add("d-none");
    } ,1000);
});

carouselNextBtn.addEventListener("click", function () {
    let currentSlide = document.querySelector(".sc-carousel .sc-carousel-item.active"),
        nextSlide = currentSlide.nextElementSibling ?? document.querySelector(".sc-carousel .sc-carousel-item:first-child"),
        currentColorName = nextSlide.dataset.colorName;


    currentSlide.classList.remove("active", "show");
    nextSlide.classList.add("active", "show");
    changeMainColor(currentColorName);

});


carouselPrevBtn.addEventListener("click", function () {
    let currentSlide = document.querySelector(".sc-carousel .sc-carousel-item.active"),
        prevSlide = currentSlide.previousElementSibling ?? document.querySelector(".sc-carousel .sc-carousel-item:last-child");

    currentColorName = prevSlide.dataset.colorName;


    currentSlide.classList.remove("active", "show");
    prevSlide.classList.add("active", "show");
    changeMainColor(currentColorName);



});

navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function (e) {

        e.preventDefault();
        let currentNavLink = document.querySelector("nav .nav-item.active"),
            idOfCurrentSection = navLink.getAttribute("href"),
            currentSection = document.querySelector(`${idOfCurrentSection}`),
            currentSectionTop = currentSection.offsetTop - heightOfNavbar;

        window.scrollTo({
            top: currentSectionTop,
            left: 0
        })

        currentNavLink.classList.remove("active");
        navLink.parentElement.classList.add("active");
    });
});

window.addEventListener("scroll", function () {
    let topOfWindow = window.scrollY,
        sectionNames = ["Home", "Latest", "Featured"];

    for (let sectionName of sectionNames) {
        let section = document.querySelector(`#${sectionName}`),
            sectionId = section.id,
            topOfSection = section.offsetTop,
            bottomOfSection = section.offsetTop + section.clientHeight;

        if (topOfWindow >= topOfSection && topOfWindow <= bottomOfSection) {
            let newNavLink = document.querySelector(`nav .nav-link[href="#${sectionId}"]`).parentElement,
                oldNavLink = document.querySelector(`nav .nav-item.active`);


            oldNavLink.parentElement.classList.remove("active");
            newNavLink.parentElement.classList.add("active");
        }
    }

    if (topOfWindow >= 1){
        navbarEle.classList.add("scrolled");
    }

    else {
        navbarEle.classList.remove("scrolled")
    }

    });







