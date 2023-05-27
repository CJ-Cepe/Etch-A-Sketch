
// GLOBAL VARIABLES
const elements = {
    gridCont: document.querySelector('#grid-cont'),
    tiles: document.querySelector('.tile'),
    numTilesSlider: document.querySelector('#num-tiles-slider'),
    gridOpacitySlider: document.querySelector('#grid-opacity-slider'),
    colorCont: document.querySelector('#color-cont'),

    solidIcon: document.querySelector('.solid'),
    lightDarkIcon: document.querySelector('.light-dark'),
    darkLightIcon: document.querySelector('.dark-light'),

    eraser: document.querySelector('.eraser'),
    clear: document.querySelector('.clear'),
    save: document.querySelector('.save'),
}

const initial = {
    BORDER_COLOR: `rgba(0, 0, 0, 0)`,
    BASE_COLOR: `rgb(0, 0, 0)`
}

createTiles(10)

elements.numTilesSlider.addEventListener('input', ()=>{
    removeTiles()
    createTiles(elements.numTilesSlider.value)
})

elements.gridOpacitySlider.addEventListener('input', ()=>{
    let tiles = document.querySelectorAll('.tile')
    tiles = Array.from(tiles)
    let tempOpacity = elements.gridOpacitySlider.value/100

    tiles.forEach((tile) => {
        tile.style.borderColor = `rgba(0, 0, 0, ${tempOpacity})`
        initial.BORDER_COLOR = tile.style.borderColor
    })
})

elements.colorCont.addEventListener('input', function(){
    initial.BASE_COLOR = elements.colorCont.value
    updateIconColors()
})

elements.eraser.addEventListener('click', function(){
    initial.BASE_COLOR = 'white'
})

elements.clear.addEventListener('click', function(){
    let tiles = document.querySelectorAll('.tile')
    tiles = Array.from(tiles)
    let tempOpacity = elements.gridOpacitySlider.value/100

    tiles.forEach((tile) => {
        tile.style.backgroundColor = `white`
    })
})

//from http://html2canvas.hertzen.com/
elements.save.addEventListener('click', ()=>{
    html2canvas(elements.gridCont).then(canvas => {
        let myImage = canvas.toDataURL();
        downloadUrl(myImage, 'my_image.png')
    })
})

function downloadUrl(url, name) {
    let link = document.createElement('a')
    link.download = name
    link.href = url
    link.classList.add('.tempLink')
    document.body.appendChild(link)
    link.click()
    link.remove()
}

//Procedurally creates tiles given number
//  as well as computes their sizes
function createTiles(numOfDivs=3){
    //divide the container by num of divs then set as size for the tile width and height
    let tileSize = elements.gridCont.clientWidth/numOfDivs
    tileSize = Math.round((tileSize + Number.EPSILON) * 1000) / 1000

    //generate divs
    for(let i = 1; i<=numOfDivs**2; i++){
        let tempDiv = document.createElement('div')
        tempDiv.classList.add('tile')
        tempDiv.style.flexBasis = tileSize + 'px'
        tempDiv.addEventListener('mouseover', () => {
            tempDiv.style.backgroundColor = initial.BASE_COLOR
        })
        tempDiv.style.borderColor = initial.BORDER_COLOR;

        elements.gridCont.appendChild(tempDiv)
    }
}

//Removes each tile to make room for new tiles
function removeTiles(){
    let tiles = document.querySelectorAll('.tile')
    tiles = Array.from(tiles)

    tiles.forEach((tile) => {
        elements.gridCont.removeChild(tile)
    })
}

function updateIconColors(){
    //recolor first icon
    elements.solidIcon.style.backgroundColor = initial.BASE_COLOR
    
    //change hex to rgb 
    let rgba = hexToRgb(initial.BASE_COLOR)
    rgba = 'rgba(' + rgba + ','
    
    //recolor the shades/tint icon
    elements.lightDarkIcon.style.background = `linear-gradient(135deg, ${rgba}0.25) 0%, ${rgba}1) 100%)`
    elements.darkLightIcon.style.background = `linear-gradient(135deg, ${rgba}1) 0%, ${rgba}0) 100%)`
}


//converts hex values to equivalent rgb values
function hexToRgb(hex){
//reference https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html
    hex = hex.substring(1)
    if(hex.length != 6){
        console.log('not equal to 6')
    }
    let aRgbHex = hex.match(/.{1,2}/g);
    let aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb
}

