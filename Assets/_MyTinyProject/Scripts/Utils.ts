
namespace game {

    export class Utils {

        static readonly AtlasName = "JokingHazardSpriteAtlas"
        static readonly AtlasPageSize = 18
        static readonly ServerIP: string = "https://jokinghazards.herokuapp.com/"
        static GameConfig: game.GameConfig = null

        static getPointerWorldPosition(world: ut.World, cameraEntity: ut.Entity): Vector3 {
            const displayInfo = world.getConfigData(ut.Core2D.DisplayInfo);
            const displaySize = new Vector2(displayInfo.width, displayInfo.height);
            const inputPosition = ut.Runtime.Input.getInputPosition();
            return ut.Core2D.TransformService.windowToWorld(world, cameraEntity, inputPosition, displaySize);
        }

        static getImageById(world: ut.World, id: string) {
            const path = "assets/sprites/" + Utils.AtlasName + "/Page_" + (id == "-1" ? "Cover" : id);
            return world.getEntityByName(path);
        }

        static getRandomImage(world) {
            // variation of a sprite is contained in another Sprite Atlas
            // e.g. "assets/sprites/Day/bg" and "assets/sprites/Night/bg"
            const path = "assets/sprites/" + Utils.AtlasName + "/Page_" + Utils.getRandomInt() + "_" + Utils.getRandomInt();
            return world.getEntityByName(path);
        }

        static getRandomInt(max: number = Utils.AtlasPageSize): number { return Math.floor(Math.random() * Math.floor(max)); }

        private static GetNewRandomCard() { return `${Utils.getRandomInt()}_${Utils.getRandomInt()}` }

        static RequestInitFromServer(world: ut.World) {
            Utils.GameConfig = world.getConfigData(game.GameConfig)
            Utils.GameConfig.FieldCards = ["-1", "-1", "-1"];
            for (let i = 0; i < 7; i++)
                Utils.GameConfig.HandCards[i] = Utils.GetNewRandomCard();

            fetch(Utils.ServerIP)
                .then(res => res.json())
                .then((json) => {
                    const data: InitMsg = json
                    Utils.GameConfig.RoomId = data.roomId
                    Utils.GameConfig.PlayerId = data.playerId
                    Utils.GameConfig.IsJudge = data.isJudge
                    Utils.GameConfig.FieldCards[0] = data.cardId
                    Utils.GameConfig.CanPlay = data.isJudge

                    Utils.UpdateCardsTextures(world)
                    Utils.GameConfig.State = data.isJudge ? State.SEND_CARD : State.GET_JUDGE_CARD
                })
                .catch(console.log)
        }

        private static postObject(data: MidMatchMsg) {
            data["roomId"] = Utils.GameConfig.RoomId
            data["playerId"] = Utils.GameConfig.PlayerId
            return {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }

        // static async GetJudgeCard() {
        //     const response1 = await fetch(Utils.ServerIP, Utils.postObject({ cardId: "-1" }))
        //     const json1 = await response1.json()
        //     Utils.GameConfig.FieldCards[1] = json1.listOfCardIds
        // }

        static GetJudgeCard(world: ut.World) {
            fetch(Utils.ServerIP, Utils.postObject({ cardId: "-1" } as MidMatchMsg))
                .then(res => res.json())
                .then(json => {
                    Utils.GameConfig.FieldCards[1] = json.listOfCardIds[0]
                    Utils.UpdateCardsTextures(world)
                    Utils.GameConfig.State = State.SEND_CARD
                })
        }

        static SendSelectdCardToServer(selectdCardPos: number) {
            Utils.GameConfig.CanPlay = false
            const temp = Utils.GameConfig.HandCards[selectdCardPos]
            Utils.GameConfig.HandCards[selectdCardPos] = Utils.GetNewRandomCard()

            fetch(Utils.ServerIP, Utils.postObject({ cardId: temp } as MidMatchMsg))
                .then(res => res.json())
                .then(json => {

                    if (Utils.GameConfig.IsJudge) {
                        // TODO:

                    } else {

                    }
                    // Utils.GameConfig.FieldCards[1] = json.listOfCardIds[0]
                    // Utils.UpdateCardsTextures(world)
                    // Utils.GameConfig.State = State.SEND_CARD
                })
        }

        static UpdateCardsTextures(world: ut.World) {
            world.forEach([ut.Core2D.Sprite2DRenderer, game.CardTag], (renderer, tag) => {
                const arr = tag.IsInHand ? Utils.GameConfig.HandCards : Utils.GameConfig.FieldCards
                renderer.sprite = Utils.getImageById(world, arr[tag.Position])
            })
        }
    }
}