let html = document.querySelector("html"),
    carouselNextBtn = document.querySelector(".sc-carousel .next"),
    carouselPrevBtn = document.querySelector(".sc-carousel .prev"),
    navLinks = document.querySelectorAll("nav .nav-link"),
    navbarEle = document.querySelector("nav"),
    heightOfNavbar = navbarEle.clientHeight,
    loadingPageEle = document.querySelector(".loadingPage"),
    correctImgs = document.querySelectorAll(".correctImg"),
    popUpBoxes = document.querySelector(".popup .box");

window.addEventListener("DOMContentLoaded", function () {
    let currentSlide = document.querySelector(
        ".sc-carousel .sc-carousel-item.active"
    );
    currentSlide.classList.add("show");

    loadingPageEle.classList.add("hide");

    setTimeout(function () {
        loadingPageEle.classList.add("d-none");
    }, 1000);
});

carouselNextBtn.addEventListener("click", function () {
    let currentSlide = document.querySelector(
        ".sc-carousel .sc-carousel-item.active"
    ),
        nextSlide =
            currentSlide.nextElementSibling ??
            document.querySelector(".sc-carousel .sc-carousel-item:first-child"),
        currentColorName = nextSlide.dataset.colorName;

    currentSlide.classList.remove("active", "show");
    nextSlide.classList.add("active", "show");
    changeMainColor(currentColorName);
});

carouselPrevBtn.addEventListener("click", function () {
    let currentSlide = document.querySelector(
        ".sc-carousel .sc-carousel-item.active"
    ),
        prevSlide =
            currentSlide.previousElementSibling ??
            document.querySelector(".sc-carousel .sc-carousel-item:last-child");

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
            left: 0,
        });

        currentNavLink.classList.remove("active");
        navLink.parentElement.classList.add("active");
    });
});

window.addEventListener("scroll", function () {
    let topOfWindow = window.scrollY,
        sectionNames = ["Home", "Latest", "Featured"];

    for (let sectionName of sectionNames) {
        let section = document.querySelector(`#${sectionName}`),
            sectionId = section.id;
        (topOfSection = section.offsetTop),
            (bottomOfSection = section.offsetTop + section.clientHeight);

        if (topOfWindow >= topOfSection && topOfWindow <= bottomOfSection) {
            let newNavLink = document.querySelector(
                `nav .nav-link[href="#${sectionId}"]`
            ).parentElement,
                oldNavLink = document.querySelector(`nav .nav-item.active`);

            oldNavLink.parentElement.classList.remove("active");
            newNavLink.parentElement.classList.add("active");
        }
    }

    if (topOfWindow >= 1) {
        navbarEle.classList.add("scrolled");
    } else {
        navbarEle.classList.remove("scrolled");
    }
});

popUpBoxes.forEach(function (popupBox) {
    popupBox.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});

latest.forEach(function (product) {
    document.querySelector("#Latest .products").innerHTML += `
    <div class="product mb-3">
                            <div class="row">
                                <div class="col-lg-6 part1">
                                    <div class="item">
                                        <div class="row">
                                            <div class="col-lg-2">
                                                <div class="item">
                                                    <ul type="none" class="listImages p-0">
                                                        <li class="mb-2">
                                                            <img src="images/latest/17-1-8483c8aa.png" class="img-fluid"  alt=""></img>
                                                        </li>
                                                        <li class="mb-2">
                                                            <img src="images/latest/17-2-def97a6a.png" class="img-fluid"  alt=""></img>
                                                        </li>
                                                        <li class="mb-2">
                                                            <img src="images/latest/17-3-54f8063a.png" class="img-fluid"  alt=""></img>
                                                        </li>
                                                        <li >
                                                            <img src="images/latest/17-4-921babb4.png" class="img-fluid"  alt=""></img>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="col-lg-10">
                                                <div class="item selectedImg">
                                                    <img src="images/latest/17-1-8483c8aa.png" class="img-fluid" alt=""></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 part2">
                                    <div class="item">
                                        <h3 class="mainColor">New Nike Black Airmax Shoes</h3>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi modi minus eum debitis in? Aliquid doloribus, 
                                            omnis eveniet inventore quod delectus dolores quia illum itaque dolorem, fuga recusandae at minus eum. 
                                            Dolore exercitationem hic fugiat. Eaque, inventore soluta sunt voluptates nisi esse. Reprehenderit dolorem qui, 
                                            dolores asperiores fuga illo eligendi!</p>
                                            <div class="specialRow">                                                
                                                    <strong class="me-3">Price :</strong>
                                                    <span class="oldPrice mainColor text-decoration-line-through">120 <sup>$</sup></span>
                                                    <span class="newPrice">96 <sup>$</sup></span>
                                                
                                            </div>
                                            <div class="specialRow ">
                                                <strong class="me-3">Size :</strong>
                                                <ul type="none" class="d-inline-flex p-0 ">
                                                    <li class="mainBorder active me-3">S</li>
                                                    <li class="mainBorder me-3">M</li>
                                                    <li class="mainBorder me-3">L</li>
                                                    <li class="mainBorder">XL</li>
                                                </ul>
                                            </div>
                                            <button class="btn mainButton">
                                                Add To Cart
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
    `;
});
