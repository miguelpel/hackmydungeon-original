// let turn
//
// with a set time out:
// if turn == goblin, goblin.selectAction();
// nothing else

let turn = 0;

function gameLoop() {
    console.log('One loop')
    if (turn === 1) {
        goblin.selectAction();
        turn = 0;
    }
    setTimeout(gameLoop, 3000);
}

gameLoop();