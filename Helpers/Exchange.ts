import { Player } from "../Models/Player";

export const ExchangeMoney = (player: Player, multiplier: number, mainPlayer: Player) => {
    return {playerWin : player.win + multiplier*player.bet,
    mainPlayerWin: mainPlayer.win - multiplier*player.bet
    }
}