
namespace game {

    export class NewBehaviourFilter extends ut.EntityFilter {
        node: ut.Core2D.TransformNode;
        position?: ut.Core2D.TransformLocalPosition;
        rotation?: ut.Core2D.TransformLocalRotation;
        scale?: ut.Core2D.TransformLocalScale;
    }

    export class NewBehaviour extends ut.ComponentBehaviour {

        data: NewBehaviourFilter;

        // ComponentBehaviour lifecycle events
        // uncomment any method you need

        // this method is called for each entity matching the NewBehaviourFilter signature, once when enabled
        OnEntityEnable(): void {
            Utils.RequestInitFromServer(this.world)
            entities.game.CardsPlayed.load(this.world)
            entities.game.CardsInHand.load(this.world)
        }

        // this method is called for each entity matching the NewBehaviourFilter signature, every frame it's enabled
        //OnEntityUpdate():void { }

        // this method is called for each entity matching the NewBehaviourFilter signature, once when disabled
        //OnEntityDisable():void { }

    }
}
