namespace game {
    export interface Msg { }

    export interface InitMsg {
        roomId: string;
        playerId: string;
        isJudge: boolean;
        cardId: string;
    }
}