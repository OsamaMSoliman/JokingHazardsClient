var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    /** New System function as the main/starting point and Manage Cards */
    var MainStart = /** @class */ (function (_super) {
        __extends(MainStart, _super);
        function MainStart() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainStart.prototype.OnUpdate = function () {
            if (game.Utils.GameConfig == null) {
                game.Utils.RequestInitFromServer(this.world);
                entities.game.CardsPlayed.load(this.world);
                entities.game.CardsInHand.load(this.world);
                game.Utils.UpdateCardsTextures(this.world); // temp as the game init
            }
            else {
                switch (game.Utils.GameConfig.State) {
                    case game.State.GET_JUDGE_CARD:
                        game.Utils.GameConfig.State = game.State.WAIT;
                        game.Utils.GetJudgeCard(this.world);
                        break;
                    case game.State.SEND_CARD:
                        game.Utils.GameConfig.State = game.State.WAIT;
                        setTimeout(function () {
                            game.Utils.GameConfig.CanPlay = true;
                        }, game.Utils.GameConfig.IsJudge ? 2500 : 100);
                        break;
                    case game.State.WAIT:
                    default:
                        break;
                }
            }
        };
        return MainStart;
    }(ut.ComponentSystem));
    game.MainStart = MainStart;
})(game || (game = {}));
var game;
(function (game) {
    /** New System */
    var SelectingCard = /** @class */ (function (_super) {
        __extends(SelectingCard, _super);
        function SelectingCard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.buildUp = 0;
            _this.selectdCardPos = -1;
            return _this;
        }
        // posSecAgo: Vector3 = new Vector3()
        // lastPosInY: number
        SelectingCard.prototype.OnUpdate = function () {
            var _this = this;
            if (SelectingCard.holder == null)
                SelectingCard.holder = this.world.getEntityByName("HOLDER");
            else if (!this.world.hasComponent(SelectingCard.holder, ut.Disabled))
                this.world.addComponent(SelectingCard.holder, ut.Disabled);
            var touchHoldDown = ut.Runtime.Input.getMouseButton(0) || (ut.Runtime.Input.touchCount() == 1 && ut.Runtime.Input.getTouch(0).phase == ut.Core2D.TouchState.Stationary);
            if (touchHoldDown) {
                var inputPos_1 = game.Utils.getPointerWorldPosition(this.world, this.world.getEntityByName("Camera"));
                var highest_1 = -1;
                this.world.forEach([ut.Core2D.TransformLocalPosition, ut.Core2D.LayerSorting, ut.Core2D.Sprite2DRenderer, game.CardTag], function (transfrom, layer, renderer, tag) {
                    var dx = Math.abs(transfrom.position.x - inputPos_1.x);
                    var dy = Math.abs(transfrom.position.y - inputPos_1.y);
                    if (dx <= 3 / 2 && dy <= 4 / 2) {
                        if (highest_1 < layer.order) {
                            highest_1 = layer.order;
                            _this.world.usingComponentData(SelectingCard.holder, [ut.Core2D.Sprite2DRenderer, ut.Core2D.TransformLocalPosition], function (r, t) {
                                r.sprite = renderer.sprite;
                            });
                            if (_this.world.hasComponent(SelectingCard.holder, ut.Disabled)) {
                                _this.world.removeComponent(SelectingCard.holder, ut.Disabled);
                            }
                            _this.selectdCardPos = tag.Position;
                        }
                    }
                });
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
            if (!game.Utils.GameConfig || !game.Utils.GameConfig.CanPlay)
                return;
            if (ut.Runtime.Input.getMouseButtonUp(0) || (ut.Runtime.Input.touchCount() == 1 && ut.Runtime.Input.getTouch(0).phase == ut.Core2D.TouchState.Ended)) {
                // console.log("UP = " + this.selectdCardId);
                if (this.selectdCardPos != -1 && game.Utils.getPointerWorldPosition(this.world, this.world.getEntityByName("Camera")).y > 0) {
                    console.log("selectdCardId = " + this.selectdCardPos);
                    //TODO: send it if player swiped up 
                    game.Utils.SendSelectdCardToServer(this.selectdCardPos);
                    //TODO: change the card
                    this.selectdCardPos = -1;
                }
            }
        };
        SelectingCard.holder = null;
        return SelectingCard;
    }(ut.ComponentSystem));
    game.SelectingCard = SelectingCard;
})(game || (game = {}));
var game;
(function (game) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.getPointerWorldPosition = function (world, cameraEntity) {
            var displayInfo = world.getConfigData(ut.Core2D.DisplayInfo);
            var displaySize = new Vector2(displayInfo.width, displayInfo.height);
            var inputPosition = ut.Runtime.Input.getInputPosition();
            return ut.Core2D.TransformService.windowToWorld(world, cameraEntity, inputPosition, displaySize);
        };
        Utils.getImageById = function (world, id) {
            var path = "assets/sprites/" + Utils.AtlasName + "/Page_" + (id == "-1" ? "Cover" : id);
            return world.getEntityByName(path);
        };
        Utils.getRandomImage = function (world) {
            // variation of a sprite is contained in another Sprite Atlas
            // e.g. "assets/sprites/Day/bg" and "assets/sprites/Night/bg"
            var path = "assets/sprites/" + Utils.AtlasName + "/Page_" + Utils.getRandomInt() + "_" + Utils.getRandomInt();
            return world.getEntityByName(path);
        };
        Utils.getRandomInt = function (max) {
            if (max === void 0) { max = Utils.AtlasPageSize; }
            return Math.floor(Math.random() * Math.floor(max));
        };
        Utils.GetNewRandomCard = function () { return Utils.getRandomInt() + "_" + Utils.getRandomInt(); };
        Utils.RequestInitFromServer = function (world) {
            Utils.GameConfig = world.getConfigData(game.GameConfig);
            Utils.GameConfig.FieldCards = ["-1", "-1", "-1"];
            for (var i = 0; i < 7; i++)
                Utils.GameConfig.HandCards[i] = Utils.GetNewRandomCard();
            fetch(Utils.ServerIP)
                .then(function (res) { return res.json(); })
                .then(function (json) {
                var data = json;
                Utils.GameConfig.RoomId = data.roomId;
                Utils.GameConfig.PlayerId = data.playerId;
                Utils.GameConfig.IsJudge = data.isJudge;
                Utils.GameConfig.FieldCards[0] = data.cardId;
                Utils.GameConfig.CanPlay = data.isJudge;
                Utils.UpdateCardsTextures(world);
                Utils.GameConfig.State = data.isJudge ? game.State.SEND_CARD : game.State.GET_JUDGE_CARD;
            })
                .catch(console.log);
        };
        Utils.postObject = function (data) {
            data["roomId"] = Utils.GameConfig.RoomId;
            data["playerId"] = Utils.GameConfig.PlayerId;
            return {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        };
        // static async GetJudgeCard() {
        //     const response1 = await fetch(Utils.ServerIP, Utils.postObject({ cardId: "-1" }))
        //     const json1 = await response1.json()
        //     Utils.GameConfig.FieldCards[1] = json1.listOfCardIds
        // }
        Utils.GetJudgeCard = function (world) {
            fetch(Utils.ServerIP, Utils.postObject({ cardId: "-1" }))
                .then(function (res) { return res.json(); })
                .then(function (json) {
                Utils.GameConfig.FieldCards[1] = json.listOfCardIds[0];
                Utils.UpdateCardsTextures(world);
                Utils.GameConfig.State = game.State.SEND_CARD;
            });
        };
        Utils.SendSelectdCardToServer = function (selectdCardPos) {
            Utils.GameConfig.CanPlay = false;
            var temp = Utils.GameConfig.HandCards[selectdCardPos];
            Utils.GameConfig.HandCards[selectdCardPos] = Utils.GetNewRandomCard();
            fetch(Utils.ServerIP, Utils.postObject({ cardId: temp }))
                .then(function (res) { return res.json(); })
                .then(function (json) {
                if (Utils.GameConfig.IsJudge) {
                    // TODO:
                }
                else {
                }
                // Utils.GameConfig.FieldCards[1] = json.listOfCardIds[0]
                // Utils.UpdateCardsTextures(world)
                // Utils.GameConfig.State = State.SEND_CARD
            });
        };
        Utils.UpdateCardsTextures = function (world) {
            world.forEach([ut.Core2D.Sprite2DRenderer, game.CardTag], function (renderer, tag) {
                var arr = tag.IsInHand ? Utils.GameConfig.HandCards : Utils.GameConfig.FieldCards;
                renderer.sprite = Utils.getImageById(world, arr[tag.Position]);
            });
        };
        Utils.AtlasName = "JokingHazardSpriteAtlas";
        Utils.AtlasPageSize = 18;
        Utils.ServerIP = "https://jokinghazards.herokuapp.com/";
        Utils.GameConfig = null;
        return Utils;
    }());
    game.Utils = Utils;
})(game || (game = {}));
var ut;
(function (ut) {
    var EntityGroup = /** @class */ (function () {
        function EntityGroup() {
        }
        /**
         * @method
         * @desc Creates a new instance of the given entity group by name and returns all entities
         * @param {ut.World} world - The world to add to
         * @param {string} name - The fully qualified name of the entity group
         * @returns Flat list of all created entities
         */
        EntityGroup.instantiate = function (world, name) {
            var data = this.getEntityGroupData(name);
            if (data == undefined)
                throw "ut.EntityGroup.instantiate: No 'EntityGroup' was found with the name '" + name + "'";
            return data.load(world);
        };
        ;
        /**
         * @method
         * @desc Destroys all entities that were instantated with the given group name
         * @param {ut.World} world - The world to destroy from
         * @param {string} name - The fully qualified name of the entity group
         */
        EntityGroup.destroyAll = function (world, name) {
            var type = this.getEntityGroupData(name).Component;
            world.forEach([ut.Entity, type], function (entity, instance) {
                // @TODO This should REALLY not be necessary
                // We are protecting against duplicate calls to `destroyAllEntityGroups` within an iteration
                if (world.exists(entity)) {
                    world.destroyEntity(entity);
                }
            });
        };
        /**
         * @method
         * @desc Returns an entity group object by name
         * @param {string} name - Fully qualified group name
         */
        EntityGroup.getEntityGroupData = function (name) {
            var parts = name.split('.');
            if (parts.length < 2)
                throw "ut.Streaming.StreamingService.getEntityGroupData: name entry is invalid";
            var shiftedParts = parts.shift();
            var initialData = entities[shiftedParts];
            if (initialData == undefined)
                throw "ut.Streaming.StreamingService.getEntityGroupData: name entry is invalid";
            return parts.reduce(function (v, p) {
                return v[p];
            }, initialData);
        };
        return EntityGroup;
    }());
    ut.EntityGroup = EntityGroup;
})(ut || (ut = {}));
var ut;
(function (ut) {
    var EntityLookupCache = /** @class */ (function () {
        function EntityLookupCache() {
        }
        EntityLookupCache.getByName = function (world, name) {
            var entity;
            if (name in this._cache) {
                entity = this._cache[name];
                if (world.exists(entity))
                    return entity;
            }
            entity = world.getEntityByName(name);
            this._cache[name] = entity;
            return entity;
        };
        EntityLookupCache._cache = {};
        return EntityLookupCache;
    }());
    ut.EntityLookupCache = EntityLookupCache;
})(ut || (ut = {}));
//# sourceMappingURL=tsc-emit.js.map