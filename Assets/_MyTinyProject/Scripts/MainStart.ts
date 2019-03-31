namespace game {
    /** New System function as the main/starting point and Manage Cards */
    export class MainStart extends ut.ComponentSystem {

        private start: boolean = true
        private round: number = 0
        private nextRound: number = 0

        OnUpdate(): void {
        //     if (this.start) {
        //         Utils.RequestInitFromServer(this.world)
        //         entities.game.CardsPlayed.load(this.world)
        //         entities.game.CardsInHand.load(this.world)
        //         this.start = false 
        //     } else if (this.round < this.nextRound) {
        //         this.round = this.nextRound
        //         Utils.GetJudgeCard()

        //         // this.world.forEach([ut.Core2D.Sprite2DRenderer, game.CardTag], (renderer, tag) => {
        //         //     const arr = tag.IsInHand ? Utils.GameConfig.HandCards : Utils.GameConfig.FieldCards
        //         //     renderer.sprite = Utils.getImageById(this.world, arr[tag.Position])
        //         // })
        //     }
        }
    }
}
