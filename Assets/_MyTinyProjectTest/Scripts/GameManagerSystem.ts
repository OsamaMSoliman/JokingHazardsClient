
namespace game {

    /** New System */
    export class GameManagerSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach([game.GameContext, game.PlayerInput],
                (context, playerInput) => {
                    switch (context.state) {
                        case "Menu":
                            if (playerInput.Space) {
                                context.state = "Game"
                                entities.game.Player.load(this.world)
                            }
                            break;
                        case "Game":
                            break;
                        default:
                            break;
                    }
                    console.log(context.state);
                });
        }
    }
}
