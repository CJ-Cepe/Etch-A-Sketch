
const elements = {
    gridCont: document.querySelector('#grid-container')
}

//create a function that procedurally creates div given number
function createDiv(numOfDivs=3){

    //get main container size?
    let gridContSize = elements.gridCont.clientWidth
    //divide by num of divs then set as size for the tile width and height
    let tileSize = gridContSize/numOfDivs
    tileSize = Math.round((tileSize + Number.EPSILON) * 1000) / 1000
    //set width and height of each tile
    
    console.log(elements.gridCont.clientWidth)
    console.log(elements.gridCont.clientHeight/numOfDivs)     
    console.log(tileSize + 'px')     

    //Loop
    for(let i = 1; i<=numOfDivs**2; i++){
        //console.log(i)
        
        //create html element
        let tempDiv = document.createElement('div')
        //add necessary attribute
        //class & id
        tempDiv.classList.add('tile')
        //add to DOM
        tempDiv.style.flexBasis = tileSize + 'px'
        elements.gridCont.appendChild(tempDiv)
    }

}

createDiv(10)
addEvent()

function addEvent(){
    let tiles = document.querySelectorAll('.tile')
    console.log(tiles)
    tiles = Array.from(tiles)
    console.log(tiles)
    tiles.forEach((tile) => {
     /*    tile.addEventListener('mouseout', () => {
            tile.style.backgroundColor = 'white'
        }) */
        tile.addEventListener('mouseover', () => {
            tile.style.backgroundColor = 'black'
        })
    })
}
