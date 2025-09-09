function changeMainColor(colorName) {
    let valueOfCurrentColor = getComputedStyle(html).getPropertyValue(colorName);

    changeImg(colorName, Logo, "logo");

    correctImgs.forEach(function (correctImg) {
        changeImg(colorName, correctImg, "correct");
    });

    html.style.setProperty("--main-color", valueOfCurrentColor);
}

function changeImg(colorName, imgEle, commonName) {
    let currentName = colorName.split("-")[2],
        currentSrcArr = imgEle.src.split("/");

    currentSrcArr[currentSrcArr.length - 1] = `${currentName}-${commonName}.png`;

    let newImgSrc = currentSrcArr.join("/");

    imgEle.src = newImgSrc;
}

function openPopup(popupName) {
    let currentPopup = document.querySelector(`.popup[data-popup-name="${popupName}"]`);

    currentPopup.classList.add("active");

    setTimeout(function () {
        currentPopup.classList.add("show");
        currentPopup.querySelector(".box").classList.add("show");
    }, 1)
}

function closePopup(popupName) {
    let currentPopup = document.querySelector(`.popup[data-popup-name="${popupName}"]`);

    currentPopup.querySelector(".box").classList.remove("show");

    setTimeout(function () {
        currentPopup.classList.remove("show");
        setTimeout(function () {
            currentPopup.classList.remove("active");
        }, 1000)
    }, 500)
}

function parents(element, parentSelector = null) {

    let result = element;


    while (true) {
        result = result.parentElement;
        if (result.classList.contains("product")) {
            break;
        }
    }


    if (!parentSelector) {
        return result;
    }

    else {
        return result.querySelector(parentSelector);
    }


    return result.querySelector(parentSelector);
}

function changeSelectedImg(that) {
    let selectedImgEle = parents(that, ".selectedImg img");

    selectedImgEle.src = that.getAttribute("src");
}

function changeActive(that) {
    let currentElementActive = that.parentElement.querySelector(".active");

    currentElementActive.classList.remove("active");

    that.classList.add("active")
}

function preparePrice(price, discount) {
    return `
    <span class="oldPrice mainColor text-decoration-line-through ${(discount == 0) ? "d-none" : ""}">${price.toFixed(2)}<sup>$</sup></span>
    <span class="newPrice">${(price * (1 - discount)).toFixed(2)}<sup>$</sup></span>
    `
}

function getProduct(productId) {
    return products.filter((product) => { return product.id == productId; })[0];
}

function showProductIntoPopup(productId) {

    let product = getProduct(productId),
        boxOfProductPopup = document.querySelector(".popup[data-popup-name='product'] .box");


    boxOfProductPopup.innerHTML = `
        <div class="row product" data-product-id="${product.id}" data-selected-size="${product.sizes[0]}" data-selected-color="${product.colors[0]}">
                    <div class="col-md-6">
                        <div class="item">
                            <div class="selectedImg">
                                <img src="images/products/${product.images[0]}" alt="" class="img-fluid">
                            </div>
                            <div class="listImages">
                                <ul type="none" class="d-flex p-0">
                                ${prepareImages(product.images)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 text-start">
                        <div class="item">
                            <h3 class="mb-3">${product.name}</h3>
                            ${preparePrice(product.price, product.discount)}
                            <hr>
                            <p>
                            ${product.description}
                            </p>
                            <div class="specialRow sizes">
                                <strong class="me-3">Size :</strong>
                                <ul type="none" class="d-inline-flex p-0 ">
                                        ${prepareSizes(product.sizes)}
                                </ul>
                            </div>
                            <div class="specialRow colors">
                                <strong class="me-3">Colors :</strong>
                                <ul type="none" class="d-inline-flex p-0 ">
                                        ${prepareColors(product.colors)}
                                </ul>
                            </div>
                            <button class="btn mainButton" onclick="addToCart(this, ${product.id})">Add To Cart</button>
                        </div>
                    </div>
                </div>
        `;
}

function prepareImages(images) {
    let imagesHTML = ``;

    for (let i = 0; i < images.length; i++) {
        imagesHTML += `
        <li class="mb-2 me-2 me-md-0 mb-md-2">
        <img src="images/products/${images[i]}" class="img-fluid active"  alt="" onclick="changeSelectedImg(this)" ></img>
        </li>`;
    }


    return imagesHTML;
}


function prepareSizes(sizes) {
    let sizesHTML = ``;

    for (let i = 0; i < sizes.length; i++) {
        sizesHTML += `
        <li class="mainBorder ${(i != sizes.length - 1) ? "me-3" : ""} ${(i == 0) ? "active" : ""}" onclick="changeActive(this); updateSize(this,'${sizes[i]}')"> ${sizes[i]} </li>
        `;
    }


    return sizesHTML;
}


function prepareColors(colors) {
    let colorsHTML = ``;

    for (let i = 0; i < colors.length; i++) {
        colorsHTML += `
        <li class="${(i == 0) ? 'active' : ''} ${(i != colors.length - 1) ? 'me-2' : ''}  rounded-circle" onclick="changeActive(this); updateColor(this,'${colors[i]}')" style="background-color:${colors[i]}"></li>
        `;
    }


    return colorsHTML;
}

function updateSize(that, size) {
    let parentEle = parents(that);

    parentEle.setAttribute("data-selected-size", size);
}

function updateColor(that, color) {
    let parentEle = parents(that);

    parentEle.setAttribute("data-selected-color", color);
}

function addToCart(that, productId) {
    let product = getProduct(productId),
        productEle = document.querySelector(`.product[data-product-id="${product.id}"]`),
        selectedSize = productEle.getAttribute("data-selected-size"),
        selectedColor = productEle.getAttribute("data-selected-color"),
        cartProduct = {
            id: product.id,
            size: selectedSize,
            color: selectedColor
        };

    cartProducts.push(cartProduct);


    toggleCartButton(that, "remove");


    that.setAttribute("onclick", `removeFromCart(this, ${productId})`);

    updateLocalStorage();

}

function removeFromCart(that, productId) {
    cartProducts  = cartProducts.filter((item) => {return item.id != productId;})

    toggleCartButton(that, "add");

    that.setAttribute("onclick",`addToCart(this,${productId})`);

    updateLocalStorage();
}

function toggleCartButton(btn, status) {
    if (status == "add") {
        btn.textContent = "Add To Cart";
        btn.classList.remove("remove");
    }

    else if (status == "remove") {
        btn.textContent = "Remove From Card";
        btn.classList.add("remove");
    }
}

function updateLocalStorage(){
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}





