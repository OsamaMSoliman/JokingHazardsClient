
namespace game {

    /** New System */
    @ut.executeAfter(game.PlayerInputSystem)
    export class PlayerMovementSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach([game.PlayerInput, ut.Core2D.TransformLocalPosition],
                 (playerInput, transform) => {
                     let x = transform.position.x + playerInput.Axis.x * this.scheduler.deltaTime()
                     let y = transform.position.y + playerInput.Axis.y * this.scheduler.deltaTime()

                     transform.position = new Vector3(x,y,0)
            });
        }
    }
}
