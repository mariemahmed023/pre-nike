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

