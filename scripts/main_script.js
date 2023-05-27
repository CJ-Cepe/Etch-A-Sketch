// GLOBAL VARIABLES
const elements = {
    gridCont: document.querySelector('#grid-cont'),
    tiles: document.querySelector('.tile'),
    numTilesSlider: document.querySelector('#num-tiles-slider'),
    gridOpacitySlider: document.querySelector('#grid-opacity-slider'),
    colorCont: document.querySelector('#color-cont')

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
})

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
    solid
    light-dark
    dark-light
    complementary
    triadic
}