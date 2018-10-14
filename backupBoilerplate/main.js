const playerData = {
    cookies: 2,
    cursors: 1,
    prestige: 0
}

const add = () => {
    playerData.cookies = playerData.cookies + 1;
    playerData.cursors = playerData.cursors + 1;
    playerData.prestige = playerData.prestige + 1;
    console.log(`added: cookies : ${playerData.cookies} cursors: ${playerData.cursors} prestige: ${playerData.prestige}`)
}

const displayPlayerData = () => {
    console.log(`display player data: cookies : ${playerData.cookies} cursors: ${playerData.cursors} prestige: ${playerData.prestige}`)
}

const saveGame = () => {
    console.log(`save data: cookies : ${playerData.cookies} cursors: ${playerData.cursors} prestige: ${playerData.prestige}`)
    localStorage.setItem("backup",JSON.stringify(playerData));
}

const loadGame = () => {
    console.log(`Before loadGame: cookies : ${playerData.cookies} cursors: ${playerData.cursors} prestige: ${playerData.prestige}`)
    let savedGame = JSON.parse(localStorage.getItem("backup"));
    if(savedGame !== null) {
        console.log(`loadgame: cookies : ${savedGame.cookies} cursors: ${savedGame.cursors} prestige: ${savedGame.prestige}`)
        for (var key in savedGame) {
            if (typeof savedGame[key] !== "undefined") playerData[key] = savedGame[key];
        } 
    } else {
        console.log('No saved game')
    }
     
}

const deleteBackup = () => {
    console.log('backUp deleted');
    localStorage.removeItem("backup")
}
