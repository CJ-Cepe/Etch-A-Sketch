
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

    solidOpt: document.querySelector('.solid-opt'),
    rainbowOpt: document.querySelector('.rainbow-opt'),
    lightDarkOpt: document.querySelector('.light-dark-opt'),
    darkLightOpt: document.querySelector('.dark-light-opt'),

    eraser: document.querySelector('.eraser'),
    clear: document.querySelector('.clear'),
    save: document.querySelector('.save'),

    canvasColor: document.querySelector('#canvas-color-cont'),
    canvasColorPicker: document.querySelector('.background-color'),

    dimension: document.getElementById('canvas-dimension'),
    opacity: document.getElementById('grid-opacity'),
}

const initial = {
    BORDER_COLOR: `rgba(0, 0, 0, 0.1)`,
    OUTLINE_COLOR: `rgba(26, 26, 26, 0.1)`,
    BASE_COLOR: `rgb(0, 0, 0)`,
    //BACKGROUND_COLOR:  `rgb(255, 255, 255)`,
    BACKGROUND_COLOR: `#e8e8e8`,
}

elements.canvasColor.addEventListener('click', (e) => {
    if(e.target == elements.canvasColor){
        elements.canvasColorPicker.click()
        console.log('canvas cliked')
    }
})


elements.canvasColorPicker.addEventListener('input', () => {
    elements.canvasColor.style.backgroundColor = elements.canvasColorPicker.value
    let hsl = hexToHSL(elements.canvasColorPicker.value)

    //create shadow on upper right
    elements.canvasColor.style.setProperty('--color1', `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]-10}%)`)
    
    //create light on lower left
    elements.canvasColor.style.setProperty('--color2', `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]+10}%)`)

   
    initial.BACKGROUND_COLOR = elements.canvasColorPicker.value
    

    let tiles = document.querySelectorAll('.tile')
    tiles = Array.from(tiles)

    //possible to change base on base background not just white
    tiles.forEach((tile) => {
        if(!tile.classList.contains('colored')){
            tile.style.backgroundColor = initial.BACKGROUND_COLOR
            tile.style.opacity = 1
            console.log('canvas color change')
        }
    })

    elements.gridCont.style.backgroundColor = initial.BACKGROUND_COLOR
    console.log(`${initial.BACKGROUND_COLOR}`)
    console.log(`${elements.gridCont.style.backgroundColor}`)
})



createTiles(10)

//Generate desired Grid Dimension
elements.numTilesSlider.addEventListener('input', ()=>{
    removeTiles()
    console.log(elements.numTilesSlider.value)
    createTiles(elements.numTilesSlider.value)
    elements.dimension.textContent = `${elements.numTilesSlider.value}`
})

//Adjust tile grid opacity
elements.gridOpacitySlider.addEventListener('input', ()=>{
    let tiles = document.querySelectorAll('.tile')
    tiles = Array.from(tiles)
    let tempOpacity = elements.gridOpacitySlider.value/100

    tiles.forEach((tile) => {
        tile.style.outlineColor = `rgba(0, 0, 0, ${tempOpacity})`
        initial.OUTLINE_COLOR = tile.style.outlineColor
    })

    elements.opacity.textContent = `${elements.gridOpacitySlider.value/100}`
})

//picking colors
elements.colorCont.addEventListener('input', function(e){
    initial.BASE_COLOR = elements.colorCont.value
    updateIconColors()
})


elements.gridCont.addEventListener('mousedown', function(e){
    elements.gridCont.clicked = true;

    //so that the first tile that is clicked, is colored as well
    elements.gridCont.onmouseover(e, 'mouseover');
})

elements.gridCont.addEventListener('mouseup', function(e){
    elements.gridCont.clicked = false;
})

elements.gridCont.addEventListener('mouseleave', function(e){
    elements.gridCont.clicked = false;
    console.log('onmouseleave')
})


elements.solidIcon.addEventListener('click', function(){
    elements.gridCont.onmouseover = (e, temp) => {
        console.log(e)
        if((e.type === 'mouseover' || temp === 'mouseover') && elements.gridCont.clicked){
            console.log(`clicked ${elements.gridCont.clicked}`)

            if(e.target != elements.gridCont){
                initial.BASE_COLOR = elements.colorCont.value
                e.target.style.backgroundColor = initial.BASE_COLOR
                console.log(`solid`)
                //opacity can be set to 1
                e.target.style.opacity = 1
                e.target.classList.add('colored')
            }

        } else {
            console.log(`not clicked ${elements.gridCont.clicked}`)
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
            e.target.style.opacity = 1
            e.target.classList.add('colored')
        }
    }

    highLightButton(2)
})


//================= darken and lighten =================================
elements.lightDarkIcon.addEventListener('click', ()=>{
    elements.gridCont.onmouseover = (e) => {
        if(e.target != elements.gridCont){
            if(e.target.classList.contains('colored')){
                let opacity = window.getComputedStyle(e.target).opacity
                opacity = +opacity
                console.log(opacity)
                if(opacity<1){
                    console.log('darken')
                    e.target.style.opacity = opacity + 0.2
                }
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
            if(e.target.classList.contains('colored')){
                let opacity = window.getComputedStyle(e.target).opacity
                console.log(opacity)
                opacity = +opacity
                if(opacity>0.2){
                    console.log('lighten')
                    //e.target.style.backgroundColor = tempvalue
                    e.target.style.opacity = opacity - 0.2
                } 

            }
        }
    }

    highLightButton(4)
})

//================ 
elements.eraser.addEventListener('click', function(){
    elements.gridCont.onmouseover = (e) => {
        if(e.target != elements.gridCont){
            if(e.target.classList.contains('colored')){
                e.target.classList.remove('colored')
                e.target.style.backgroundColor = initial.BACKGROUND_COLOR;
                e.target.style.opacity = 1
                console.log('eraser')
            }
        }
    }

    highLightButton(5)
})

elements.clear.addEventListener('click', function(){
    let tiles = document.querySelectorAll('.tile')
    tiles = Array.from(tiles)

    //possible to change base on base background not just white
    tiles.forEach((tile) => {
            tile.classList.remove('colored')
            initial.BACKGROUND_COLOR = `#e8e8e8`
            //elements.canvasColorPicker.value = hexToRgb(`#e8e8e8`)
            elements.canvasColor.style.backgroundColor  =  `#e8e8e8`
            elements.canvasColor.style.setProperty('--color1', `#bebebe`)
            elements.canvasColor.style.setProperty('--color2', `#ffffff`)
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
    elements.gridCont.clicked = false;
    
    //divide the container by num of divs then set as size for the tile width and height
    let tileSize = elements.gridCont.clientWidth/numOfDivs
    tileSize = Math.round((tileSize + Number.EPSILON) * 1000) / 1000

    //generate divs
    for(let i = 1; i<=numOfDivs**2; i++){
        let tempDiv = document.createElement('div')
        tempDiv.classList.add('tile')
        tempDiv.style.flexBasis = tileSize + 'px'

        

        tempDiv.style.backgroundColor = initial.BACKGROUND_COLOR

        
        //to set the border color
        tempDiv.style.outlineColor = initial.OUTLINE_COLOR;

        //add container div for the border????

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
//reference: https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html
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

function hexToHSL(H) {
//reference: https://css-tricks.com/converting-color-spaces-in-javascript/
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    //console.log([h, s, l])
    //return "hsl(" + h + "," + s + "%," + l + "%)";
    return [h, s, l]
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
            elements.solidOpt.style.boxShadow = `inset 10px 10px 12px #bebebe, inset -6px -6px 8px #ffffff`
            break
        case 2:
            //highlight rainbow
            resetButtonHighlight()
            elements.rainbowOpt.style.boxShadow = `inset 10px 10px 12px #bebebe, inset -6px -6px 8px #ffffff`
            break
        case 3:
            //highlight light to dark
            resetButtonHighlight()
            elements.lightDarkOpt.style.boxShadow = `inset 10px 10px 12px #bebebe, inset -6px -6px 8px #ffffff`
            break
        case 4:
            //highlight dark to light
            resetButtonHighlight()
            elements.darkLightOpt.style.boxShadow = `inset 10px 10px 12px #bebebe, inset -6px -6px 8px #ffffff`
            break
        case 5:
            resetButtonHighlight()
            elements.eraser.style.boxShadow = `inset 8px 8px 12px #bebebe, inset -6px -6px 8px #ffffff`
            break
        case 6:
            //no highlight
            //resetButtonHighlight()
            //clear and save
            break
    }
}

function resetButtonHighlight(){
    elements.solidOpt.style.boxShadow = 'none'
    elements.rainbowOpt.style.boxShadow = 'none'
    elements.lightDarkOpt.style.boxShadow = 'none'
    elements.darkLightOpt.style.boxShadow = 'none'
    elements.eraser.style.boxShadow = 'none'
}