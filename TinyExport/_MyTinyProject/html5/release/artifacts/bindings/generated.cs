using UTiny;
using UTiny.Core2D;
using UTiny.Math;
using UTiny.Shared;
using ut;
using UTiny.HTML;
using UTiny.Rendering;
using ut.EditorExtensions;
using UTiny.Interpolation;
using UTiny.Tilemap2D;

/*
 * !!! TEMP UNITL PROPER SCENE FORMAT !!!
 */
namespace entities.game
{
    namespace CardsInHand
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace CardsPlayed
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace Start
    {
        public struct Component : IComponentData
        {
        }
    }
}

namespace game
{
    public struct CardTag : IComponentData
    {
        public sbyte Position;
        public bool IsInHand;
    }
    public enum State
    {
        INIT = 0
        , WAIT = 1
        , GET_JUDGE_CARD = 2
        , SEND_CARD = 3
    }
    [Configuration]
    public struct GameConfig : IComponentData
    {
        public string PlayerId;
        public string RoomId;
        public bool IsJudge;
        public DynamicArray<string> FieldCards;
        public bool CanPlay;
        public DynamicArray<string> HandCards;
        public game.State State;
    }
}

namespace ut.Core2D
{
    namespace layers
    {
        public struct Default : IComponentData
        {
        }
        public struct TransparentFX : IComponentData
        {
        }
        public struct IgnoreRaycast : IComponentData
        {
        }
        public struct Water : IComponentData
        {
        }
        public struct UI : IComponentData
        {
        }
        public struct Grid : IComponentData
        {
        }
        public struct Cutscene : IComponentData
        {
        }
    }
}

namespace ut.Math
{
}

namespace ut
{
}

namespace ut.Shared
{
}

namespace ut.Core2D
{
}

namespace ut
{
}

namespace ut.Core2D
{
}

namespace ut.Core2D
{
}

namespace ut.HTML
{
}

namespace ut.HTML
{
}

namespace ut.Rendering
{
}

namespace ut.Rendering
{
}

namespace ut.Rendering
{
}

namespace ut.Rendering
{
}

namespace ut.EditorExtensions
{
    public struct AssetReferenceAnimationClip : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceAudioClip : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceSprite : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceSpriteAtlas : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTexture2D : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTileBase : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTMP_FontAsset : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct CameraCullingMask : IComponentData
    {
        public int mask;
    }
    public struct EntityLayer : IComponentData
    {
        public int layer;
    }
}

namespace ut.Interpolation
{
}

namespace ut.Tilemap2D
{
}
namespace game
{
    public class MainStartJS : IComponentSystem
    {
    }
}
namespace game
{
    public class SelectingCardJS : IComponentSystem
    {
    }
}
