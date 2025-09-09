let html = document.querySelector("html"),
    carouselNextBtn = document.querySelector(".sc-carousel .next"),
    carouselPrevBtn = document.querySelector(".sc-carousel .prev"),
    navLinks = document.querySelectorAll("nav .nav-link"),
    navbarEle = document.querySelector("nav"),
    heightOfNavbar = navbarEle.clientHeight,
    loadingPageEle = document.querySelector(".loadingPage"),
    correctImgs = document.querySelectorAll(".correctImg"),
    popUpBoxes = document.querySelectorAll(".popup .box"),
    cartProducts = [];


    if (localStorage.getItem("cartProducts") != null){
        cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    }

    else {
        updateLocalStorage();
    }

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

        // currentNavLink.classList.remove("active");
        // navLink.parentElement.classList.add("active");
    });
});

window.addEventListener("scroll", function () {
    let topOfWindow = window.scrollY + heightOfNavbar,
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

    let sizesHTML = ``;

    document.querySelector("#Latest .products").innerHTML += `
<div class="product mb-3" data-product-id="${product.id}" data-selected-size="${product.sizes[0]}" data-selected-colors="${product.colors[0]}">
            <div class="row">
                <div class="col-lg-6 part1">
                    <div class="item">
                        <div class="row">
                            <div class="col-md-2 col-lg-3 col-xl-2">
                                <div class="item">
                                    <ul type="none" class="listImages p-0">
                                        ${prepareImages(product.images)}
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-10 col-lg-9 col-xl-10">
                                <div class="item selectedImg">
                                    <img src="images/products/${product.images?.[0]}" class="img-fluid" alt=""></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 part2">
                    <div class="item">
                        <h3 class="mainColor">${product.name}</h3>
                        <p>${product.description}</p>
                            <div class="specialRow">                                                
                                    <strong class="me-3">Price :</strong>
                                    ${preparePrice(product.price, product.discount)}
                            </div>
                            <div class="specialRow sizes">
                                <strong class="me-3">Size :</strong>
                                <ul type="none" class="d-inline-flex p-0 ">
                                        ${prepareSizes(product.sizes)}
                                </ul>
                            </div>
                            
                            <button class="btn mainButton" onclick="addToCart(this, ${product.id})">
                                Add To Cart
                            </button>
                    </div>
                </div>
            </div>
        </div>
    `;
});

features.forEach(function (product) {

    let elements = ``;

    for (let i = 0; i < product.images.length; i++) {
        elements += `
                <li 
                onclick="changeActive(this); changeSelectedImg(this);" 
                src="images/products/${product.images[i]}" 
                class=" me-2 mainBorder ${(i != product.images.length - 1) ? 'me-2' : ''} ${(i == 0) ? 'active' : ''} rounded-circle"></li>
        `;
    }


    document.querySelector("#Featured .row").innerHTML += `
    <div class="col-lg-3 col-sm-6 mb-3 ">
        <div class="item product text-center bg-light  ">
            <p class="${(product.discount == 0) ? 'd-none' : ''}">${product.discount * 100}%</p>
            <div class="selectedImg">
                <img src="images/products/${product.images[0]}" alt="" class="img-fluid">
            </div>
            <i class="fa-solid fa-magnifying-glass" onclick="showProductIntoPopup(${product.id}); openPopup('product')"></i>
            <ul type="none" class="d-flex p-0 justify-content-center">
                ${elements}
            </ul>
            <h6>${product.name}</h6>
            <div class="specialRow price">
                ${preparePrice(product.price, product.discount)}
            </div>
            
        </div>
    </div>
    `;
});




