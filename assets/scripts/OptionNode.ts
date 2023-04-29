import { _decorator, Component, Node, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OptionNode')
export class OptionNode extends Component {

    @property(SpriteFrame)
    public flowerSprites: SpriteFrame[] = [];
    @property(Node)
    public flower: Node = null!;

    private _moveTime: number = 0.1;
    private _moveXSpeed: number = 0;
    private _moveYSpeed: number = 0;
    private _startMove: boolean = false;
    private _curPos: Vec3 = new Vec3(0, 0, 0);
    private _curMoveTime: number = 0;
    private _targetX: number = 0;
    private _targetY: number = 0;

    start() {

    }

    // 设置花的样式
    setFlowerSprite(index: number) {
        this.flower.active = true
        this.flower.getComponent(Sprite)!.spriteFrame = this.flowerSprites[index];
    }

    // 移动到指定位置后消失
    moveAndDisappear(x: number, y: number) {
        if (this._startMove) {
            return;
        }

        this._startMove = true;
        this._moveXSpeed = (x - this.node.position.x) / this._moveTime;
        this._moveYSpeed = (y - this.node.position.y) / this._moveTime;
        this.node.getPosition(this._curPos);
        this._targetX = x;
        this._targetY = y;
    }

    update(deltaTime: number) {

        // 移动动画
        if (this._startMove) {
            this._curMoveTime += deltaTime;
        }
        if (this._curMoveTime >= this._moveTime) {
            this.node.setPosition(this._targetX, this._targetY, 0);
            this._startMove = false;
            this.node.destroy();
        } else {
            this.node.getPosition(this._curPos);
            this.node.setPosition(this._curPos.x + this._moveXSpeed * deltaTime, this._curPos.y + this._moveYSpeed * deltaTime, 0);
        }

    }



}

