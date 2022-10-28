import UI from "./UI/UI.js"

window.onload = function(){
    window.onkeydown = (e) => {
        if (e.code == "Enter"){
            let game = new UI();
            game.run();
        }
    }
}