namespace game {
    interface Msg {
        roomId: string
        playerId: string
        cardId: string;
    }

    export interface InitMsg extends Msg {
        readonly isJudge: boolean;
    }

    export interface MidMatchMsg extends Msg {
        readonly isWinnerCard?: boolean
    }
}