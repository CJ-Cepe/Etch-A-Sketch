
// GLOBAL VARIABLES
const elements = {
    gridCont: document.querySelector('#grid-cont'),
    tiles: document.querySelector('.tile'),
    numTilesSlider: document.querySelector('#num-tiles-slider'),
    gridOpacitySlider: document.querySelector('#grid-opacity-slider'),
    colorCont: document.querySelector('#color-cont'),

    solidIcon: document.querySelector('.solid'),
    rainbowIcon: document.querySelector('.rainbow'),
    lightDarkIcon: document.querySelector('.light-dark'),
    darkLightIcon: document.querySelector('.dark-light'),

    eraser: document.querySelector('.eraser'),
    clear: document.querySelector('.clear'),
    save: document.querySelector('.save'),
}

const initial = {
    BORDER_COLOR: `rgba(0, 0, 0, 0)`,
    BASE_COLOR: `rgb(0, 0, 0)`,
    BACKGROUND_COLOR:  `rgb(255, 255, 255)`,
}

createTiles(10)

//Generate desired Grid Dimension
elements.numTilesSlider.addEventListener('input', ()=>{
    removeTiles()
    createTiles(elements.numTilesSlider.value)
})

//Adjust tile grid opacity
elements.gridOpacitySlider.addEventListener('input', ()=>{
    let tiles = document.querySelectorAll('.tile')
    tiles = Array.from(tiles)
    let tempOpacity = elements.gridOpacitySlider.value/100

    tiles.forEach((tile) => {
        tile.style.borderColor = `rgba(0, 0, 0, ${tempOpacity})`
        initial.BORDER_COLOR = tile.style.borderColor
    })
})

//picking colors
elements.colorCont.addEventListener('input', function(){
    initial.BASE_COLOR = elements.colorCont.value
    updateIconColors()
})

elements.solidIcon.addEventListener('click', function(){
    elements.gridCont.onmouseover = (e) => {
        if(e.target != elements.gridCont){
            initial.BASE_COLOR = elements.colorCont.value
            e.target.style.backgroundColor = initial.BASE_COLOR
            console.log(`solid`)
            //opacity can be set to 1
        }
    }

    highLightButton(1)
})

elements.rainbowIcon.addEventListener('click', ()=>{
    elements.gridCont.onmouseover = (e) => {
        if(e.target != elements.gridCont){
            e.target.style.backgroundColor = rainbow()
            console.log(`rainbow`)
            //opacity can be set to 1
        }
    }

    highLightButton(2)
})


//================= darken and lighten =================================
elements.lightDarkIcon.addEventListener('click', ()=>{
    elements.gridCont.onmouseover = (e) => {
        if(e.target != elements.gridCont){
            let opacity = window.getComputedStyle(e.target).opacity
            opacity = +opacity
            if(opacity<1){
                console.log('darken')
                e.target.style.opacity = opacity + 0.2
            }
        }
    }

    highLightButton(3)
})

elements.darkLightIcon.addEventListener('click', ()=>{
    elements.gridCont.onmouseover = (e) => {
        //if to prevent the parent being the e.target
        // we want only the child
        if(e.target != elements.gridCont){
            let opacity = window.getComputedStyle(e.target).opacity
            opacity = +opacity
            if(opacity>0){
                console.log('lighten')
                e.target.style.opacity = opacity - 0.2
            }
        }
    }

    highLightButton(4)
})

//================ 
elements.eraser.addEventListener('click', function(){
    elements.gridCont.onmouseover = (e) => {
        if(e.target != elements.gridCont){
            e.target.style.backgroundColor = initial.BACKGROUND_COLOR;
            e.target.style.opacity = 1
            console.log('eraser')
        }
    }

    highLightButton(5)
})

elements.clear.addEventListener('click', function(){
    let tiles = document.querySelectorAll('.tile')
    tiles = Array.from(tiles)

    //possible to change base on base background not just white
    tiles.forEach((tile) => {
        tile.style.backgroundColor = initial.BACKGROUND_COLOR
        tile.style.opacity = 1
        console.log('clear')
    })

    highLightButton(6)
})

//from http://html2canvas.hertzen.com/
elements.save.addEventListener('click', ()=>{
    html2canvas(elements.gridCont).then(canvas => {
        let myImage = canvas.toDataURL();
        downloadUrl(myImage, 'my_image.png')
    })

    highLightButton(6)
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

        //to set the border color
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

function rainbow(){
    let red = getRandomNumber()
    let green = getRandomNumber()
    let blue = getRandomNumber()
    
    console.log(`rgb(${red}, ${green}, ${blue})`)
    return `rgb(${red}, ${green}, ${blue})`
    //return ``
}

function getRandomNumber(){
    let range = 255
    return Math.floor(Math.random() * range) + 1;
}

function highLightButton(button){
    switch(button){
        case 1:
            //highlight solid button
            resetButtonHighlight()
            elements.solidIcon.style.border = `solid 3px red`
            break
        case 2:
            //highlight rainbow
            resetButtonHighlight()
            elements.rainbowIcon.style.border = `solid 3px red`
            break
        case 3:
            //highlight light to dark
            resetButtonHighlight()
            elements.lightDarkIcon.style.border = `solid 3px red`
            break
        case 4:
            //highlight dark to light
            resetButtonHighlight()
            elements.darkLightIcon.style.border = `solid 3px red`
            break
        case 5:
            resetButtonHighlight()
            elements.eraser.style.border = `solid 3px red`
            break
        case 6:
            //no highlight
            resetButtonHighlight()
            //clear and save
            break
    }
}

function resetButtonHighlight(){
    elements.solidIcon.style.border = 'none'
    elements.rainbowIcon.style.border = 'none'
    elements.lightDarkIcon.style.border = 'none'
    elements.darkLightIcon.style.border = 'none'
    elements.eraser.style.border = 'none'
}