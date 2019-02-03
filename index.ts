import { cards } from "./data";
import { Player } from "./Models/Player";
import { shuffle } from "./Helpers/Shuffle";
import { Game } from "./Models/Game";
import { DB } from "./config/FirebaseConfig";

// let player = new Player();
// player.cards = cards;
// console.log(player.totalPoint())

// for (let i = 1; i < 101; i++) {
//     let myPlayer = new Player(10);
//     myPlayer.isMyPlayer = true;
//     myPlayer.bet = 10;
//     let game = new Game();
//     game.players = [new Player(1),new Player(2),new Player(3),new Player(4), myPlayer, new Player(5)]
//     game.play(50);
//     game.players.forEach(p => {
//         DB.collection("3Cay lan "+(i)).doc("Lan choi "+i+ ": Nguoi choi "+p.id).set({
//             win: p.win,
//             gameAsMain: p.timeAsMain, 
//         })
//     })
// }

let express = require('express')
let app = express()
 
app.get('/', async function (req, res) {
    let sum = 0
    for (let i = 1; i < 101; i++) {
        let result = await DB.collection("3Cay lan "+(i)).doc("Lan choi "+i+ ": Nguoi choi "+1).get();
        sum = sum + result.data().win;
    }
    DB.collection("Result").doc("Tong tien 1").set({Sum: sum});
  res.send('Hello World')
})

app.listen(3000,"localhost",() => console.log("server started"))

