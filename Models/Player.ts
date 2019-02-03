import { Card } from "./Card";
import { Result } from "./Result";
import { shuffle } from "../Helpers/Shuffle";
import { bet } from "../data";
export class Player {
    id: number;
    name: string;
    cards: Card[];
    win: number = 0;
    bet: number;
    isMain: boolean = false;
    isMyPlayer: boolean = false;
    timeAsMain: number = 0;
    /**
     *
     */

     /**
      *
      */
     constructor(id: number) {
         this.id = id;
     }

    totalPoint(): Result {
        let sum = 0;
        let maxValue = -10000;
        this.cards.forEach(card => {
            sum = sum + card.point;
            if(card.property.value > maxValue){
                maxValue = card.property.value;
            }
        });
        let totalPoint = sum % 10;
        if(totalPoint == 0){
            totalPoint = 10;
        }
        let result: Result = {totalPoint: totalPoint, maxValue: maxValue}
        return result;
        
    }

    
}
