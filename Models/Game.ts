import { Player } from "./Player";
import { shuffle } from "../Helpers/Shuffle";
import { cards, bet, testCards } from "../data";
import { ExchangeMoney } from "../Helpers/Exchange";
export class Game {
    id: number;
    players: Player[] = [];
    mainPlayer: Player;
    myCards = shuffle(cards);

    bootstrap(): void {
        this.myCards = shuffle(this.myCards)
        // let myCards = testCards;
        let i = 0
        this.players.forEach(player =>{
            let j = i + 1;
            let k = i + 2;
            player.cards = [this.myCards[i], this.myCards[j],this.myCards[k]];
            i = k + 1;
            if(player.isMain) player.bet = 0;
            else if(player.isMyPlayer) {
                if(player.lastGamePoint < 5) player.bet=10;
                else player.bet = shuffle([20,30,40])[0];
            }
            else player.bet = shuffle(bet)[0];
            console.log(player.cards);
            console.log(player.bet);
        })
    }

    makeMain(player: Player){
        this.players.forEach(p => p.isMain = false);
        player.isMain = true;
        player.timeAsMain = player.timeAsMain + 1;
        this.mainPlayer = player;
    }

    assignLastGamePoint(){
        this.players.forEach(p => p.lastGamePoint = p.totalPoint().totalPoint)
    }

    chooseNewMain(){
        let nominees : Player[] = [];
        this.players.forEach(p => {
            if(p.totalPoint().totalPoint == 10){
                nominees.push(p);
            }
        });
        if(nominees.length == 1){
            this.makeMain(nominees[0])
        }
        else if(nominees.length > 1){
            let max = -100;
            let newMain: Player;
            nominees.forEach(n => {
                if(n.totalPoint().maxValue > max){
                    max = n.totalPoint().maxValue;
                    newMain = n;
                }
            })
            this.makeMain(newMain);
        }
    }

    calculateWinningMoney(){
        this.players.forEach(player => {
            if(!player.isMain){
                if(player.totalPoint().totalPoint > this.mainPlayer.totalPoint().totalPoint ){
                    if(player.totalPoint().totalPoint == 10){
                        let res = ExchangeMoney(player,2, this.mainPlayer);
                        player.win= res.playerWin
                        this.mainPlayer.win = res.mainPlayerWin;    
                    }else{
                        let res = ExchangeMoney(player,1, this.mainPlayer);
                        player.win= res.playerWin
                        this.mainPlayer.win = res.mainPlayerWin;
                    }
                }
                else if (player.totalPoint().totalPoint == this.mainPlayer.totalPoint().totalPoint){
                    if(player.totalPoint().maxValue > this.mainPlayer.totalPoint().maxValue){
                        if(player.totalPoint().totalPoint == 10){
                            let res = ExchangeMoney(player,2, this.mainPlayer);
                            player.win= res.playerWin
                            this.mainPlayer.win = res.mainPlayerWin;
                        }
                        else{
                            let res = ExchangeMoney(player,1, this.mainPlayer);
                            player.win= res.playerWin
                            this.mainPlayer.win = res.mainPlayerWin;
                        }
                    }else{
                        if(this.mainPlayer.totalPoint().totalPoint == 10){
                            let res = ExchangeMoney(player,-2, this.mainPlayer);
                            player.win= res.playerWin
                            this.mainPlayer.win = res.mainPlayerWin;
                        }else
                        {let res = ExchangeMoney(player,-1, this.mainPlayer);
                        player.win= res.playerWin
                        this.mainPlayer.win = res.mainPlayerWin;}
                    }
                }else{
                    let res = ExchangeMoney(player,-1, this.mainPlayer);
                    player.win= res.playerWin
                    this.mainPlayer.win = res.mainPlayerWin;
                }
            }
        })
    }

    printResult(){
        this.players.forEach(p => {
           if(p.isMain){
               console.log(p.id+" Main player win "+ p.win)
           }else{
               console.log(p.id + " Player win ", p.win)
           }
           console.log(p.id + " Time as main: " + p.timeAsMain)
        })
    }

    play(numberOfTimes: number): void {
        this.makeMain(this.players[0]);
        for (let i = 0; i < (numberOfTimes); i++) {
            this.bootstrap();
            this.calculateWinningMoney();
            this.printResult();
            this.assignLastGamePoint();
            this.chooseNewMain();
            
        }

    }


}