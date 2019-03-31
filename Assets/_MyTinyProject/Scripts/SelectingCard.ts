namespace game {

    /** New System */
    export class SelectingCard extends ut.ComponentSystem {

        static holder: ut.Entity = null
        buildUp: number = 0
        selectdCardId = -1
        // posSecAgo: Vector3 = new Vector3()
        // lastPosInY: number

        OnUpdate(): void {

            if (SelectingCard.holder == null)
                SelectingCard.holder = this.world.getEntityByName("HOLDER")
            else if (!this.world.hasComponent(SelectingCard.holder, ut.Disabled))
                this.world.addComponent(SelectingCard.holder, ut.Disabled);

            let touchHoldDown = ut.Runtime.Input.getMouseButton(0) || (ut.Runtime.Input.touchCount() == 1 && ut.Runtime.Input.getTouch(0).phase == ut.Core2D.TouchState.Stationary);

            if (touchHoldDown) {
                let inputPos = Utils.getPointerWorldPosition(this.world, this.world.getEntityByName("Camera"));
                let highest = -1
                this.world.forEach([ut.Core2D.TransformLocalPosition, ut.Core2D.LayerSorting, ut.Core2D.Sprite2DRenderer, game.CardTag],
                    (transfrom, layer, renderer, tag) => {
                        let dx = Math.abs(transfrom.position.x - inputPos.x)
                        let dy = Math.abs(transfrom.position.y - inputPos.y)
                        if (dx <= 3 / 2 && dy <= 4 / 2) {
                            if (highest < layer.order) {
                                highest = layer.order
                                this.world.usingComponentData(SelectingCard.holder, [ut.Core2D.Sprite2DRenderer, ut.Core2D.TransformLocalPosition],
                                    (r, t) => {
                                        r.sprite = renderer.sprite
                                    })
                                if (this.world.hasComponent(SelectingCard.holder, ut.Disabled)) {
                                    this.world.removeComponent(SelectingCard.holder, ut.Disabled);
                                }
                                this.selectdCardId = tag.Position
                            }
                        }
                    })

                // this.buildUp += this.scheduler.deltaTime()
                // if (this.buildUp >= 1) {
                //     this.buildUp = 0
                //     if (selectdCardId != -1) {
                //         console.log("selectdCardId = " + selectdCardId);
                //         console.log("dy = " + (inputPos.y - this.posSecAgo.y));
                //         //TODO: send it if player swiped up and change the card
                //     }
                //     this.posSecAgo = inputPos
                // }
            }

            if (ut.Runtime.Input.getMouseButtonUp(0) || (ut.Runtime.Input.touchCount() == 1 && ut.Runtime.Input.getTouch(0).phase == ut.Core2D.TouchState.Ended)) {
                // console.log("UP = " + this.selectdCardId);
                if (this.selectdCardId != -1 && Utils.getPointerWorldPosition(this.world, this.world.getEntityByName("Camera")).y > 0) {
                    console.log("selectdCardId = " + this.selectdCardId);
                    //TODO: send it if player swiped up and change the card
                    this.selectdCardId = -1
                }
            }

        }
    }
}
