const span = document.getElementById("mapContainerSpan")
const spans = span.getElementsByTagName('SPAN');
const player = {position:{x: 0, y: 0}, char:"@", class: 'pulse', color:'red'};
const rows = 55;
const cols = 158;
let currentCharAndcolor = {};

// storeCurrentCharacterAndColor (position);
// spawnPlayer(position);
// coverter from position to grid ???


const spawnPlayer = (toPosition) => {
    if (checkIfWater(toPosition)) {
        // change position of player,
        player.position = toPosition;
        //get the newSpan
        let newSpan = getSpanAt(toPosition);
        // get the char and color at new position,
        let charAndColor = getCharAndColorOf(newSpan);
        // change char and color at next position,
        setPlayerTo(newSpan);
        // stock char and color into vaiable.
        currentCharAndcolor = charAndColor;
    } else {
        return false;
    }
}

const move = (fromPosition, toPosition) => {
    console.log(`from x: ${fromPosition.x} y: ${fromPosition.y}`)
    console.log(`to x: ${toPosition.x} y: ${toPosition.y}`)
    if (checkIfWater(toPosition)) {
        // change position of player,
        player.position = toPosition;

        //get the oldSpan and newSpan
        let oldSpan = getSpanAt(fromPosition);
        let newSpan = getSpanAt(toPosition);

        // get the char and color at new position,
        let charAndColor = getCharAndColorOf(newSpan);

        // change char and color at next position,
        setPlayerTo(newSpan);
        removePlayerFrom(oldSpan);
        // restore char and color at old position.
       
        // stock char and color into vaiable.
        currentCharAndcolor = charAndColor;
    } else {
        return false;
    }

}

const setPlayerTo = (span) => {
    span.innerHTML = player.char;
    span.style.color = player.color;
    span.classList.add(player.class);
}

const removePlayerFrom = (span) => {
    span.classList.remove(player.class);
    setCharAndColor(span, currentCharAndcolor);
}

const checkIfWater = (position) => {
    if(position.y < 2 || position.y > 55) {
        console.log("out of map");
        return false;
    }
    //"rgb(168 , 216 , 227)"
    let span = getSpanAt(position);
    if(span.innerHTML === ',') {
        console.log("Water!")
        console.log(span.style.color);
        return false;
    } else {
        console.log("land.")
        return true;
    }
}

const getCharAndColorOf = (span) => {
    let char = span.innerHTML;
    let color = span.style.color;
    return {char: char, color: color};
}

const setCharAndColor = (span, charAndColorObject) => {
    span.innerHTML = charAndColorObject.char;
    span.style.color = charAndColorObject.color;
}

const getSpanAt = (position) => {
    let nbr = (position.x - 1) + (cols * (position.y - 1))
    return spans[nbr];
}

const getPositionOf = (spanNbr) => {
     let spanY = (Math.floor(spanNbr / cols)) + 1;
     let spanX = (spanNbr % cols) + 1;
    return {x: spanX, y: spanY};
}

// let test = spans.length % 158;
// console.log(test)

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        console.log("up arrow")
        move(player.position, {x: player.position.x, y: player.position.y-1})
    }
    else if (e.keyCode == '40') {
        console.log("down arrow")
        move(player.position, {x: player.position.x, y: player.position.y+1})
    }
    else if (e.keyCode == '37') {
        console.log("left arrow")
        move(player.position, {x: player.position.x-1, y: player.position.y})
    }
    else if (e.keyCode == '39') {
        console.log("right arrow")
        move(player.position, {x: player.position.x+1, y: player.position.y})
    }

}

spawnPlayer({x:32,y:11});