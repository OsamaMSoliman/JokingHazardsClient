
namespace game {

    /** New System */
    export class PlayerInputSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach([game.PlayerInput],
                (playerInput) => {
                    
                    playerInput.Space = false
                    if (ut.Runtime.Input.getKeyDown(ut.Core2D.KeyCode.Space))
                        playerInput.Space = true


                    let axis = new Vector2()
                    if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.A)) { axis.x -= 1 }
                    if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.D)) { axis.x += 1 }
                    if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.W)) { axis.y += 1 }
                    if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.S)) { axis.y -= 1 }
                    playerInput.Axis = axis

                    console.log(axis)
                });
        }
    }
}
