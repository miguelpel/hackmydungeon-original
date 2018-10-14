'use strict';

class Game {
    constructor(){
        this.room = 'room.js';
        this.turn = 0;
        this.sourceBtn = document.getElementById('viewSource');
        this.runBtn = document.getElementById('runCode');
        this.cons = document.getElementById('console');
        this.xhr;
        this.sourceBtn.addEventListener('click', this.displayRoomCode);
        this.runBtn.addEventListener('click', this.runCode);
        this.code = null;
        document.onkeypress = function(e) {
            e = e || window.event;
            // use e.keyCode
            if (e.keyCode === 13) this.runCode();
        };
    }

    createRoom(){
        this.code = eval(this.xhr.responseText);
    }

    displayRoomCode() {
        this.xhr = new XMLHttpRequest();
        // Open the request
        this.xhr.open("GET", `./rooms/${this.room}`, true);
        this.xhr.responseType = 'text';
        this.xhr.send();
        this.xhr.onreadystatechange = this.processRequest;
    }

    processRequest(e) {
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
            // console.log(xhr.responseText);
            this.cons.innerHTML = this.xhr.responseText.toString();
        }
        if (this.code === null) this.createRoom();
    }

    runCode() {
        let inpt = document.getElementsByTagName('input')[0];
        //console.log(inpt.value);
        try {
            eval("this." + inpt.value);
        } catch (error) {
            console.log(error)
        }
        inpt.value = '';
    }

    loop() {
        if (this.turn === 1) {
            // goblin.selectAction();
            this.turn = 0;
        }
        setTimeout(this.gameLoop, 3000);
    }

}

let game = new Game();

game.loop();