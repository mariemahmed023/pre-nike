function changeMainColor (colorName){
    let valueOfCurrentColor = getComputedStyle(html).getPropertyValue(colorName),
    currentName = colorName.split("-")[2];
    console.log(Logo.src);

    html.style.setProperty("--main-color", valueOfCurrentColor);


}