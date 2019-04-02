namespace game {
    /** New System function as the main/starting point and Manage Cards */
    export class MainStart extends ut.ComponentSystem {

        OnUpdate(): void {
            if (Utils.GameConfig == null) {
                Utils.RequestInitFromServer(this.world)
                entities.game.CardsPlayed.load(this.world)
                entities.game.CardsInHand.load(this.world)
                Utils.UpdateCardsTextures(this.world) // temp as the game init
            } else {
                switch (Utils.GameConfig.State) {
                    case State.GET_JUDGE_CARD:
                        Utils.GameConfig.State = State.WAIT
                        Utils.GetJudgeCard(this.world)
                        break;

                    case State.SEND_CARD:
                        Utils.GameConfig.State = State.WAIT
                        setTimeout(() => {
                            Utils.GameConfig.CanPlay = true
                        }, Utils.GameConfig.IsJudge ? 2500 : 100);
                        break;

                    case State.WAIT:
                    default:
                        break;
                }
            }
        }
    }
}
