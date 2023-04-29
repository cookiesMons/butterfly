import { _decorator, Component, Node, random, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoardNode')
export class BoardNode extends Component {

    @property(SpriteFrame)
    public flowerSprites: SpriteFrame[] = [];

    @property(Node)
    public button: Node = null!;

    @property(Node)
    public flower: Node = null!;

    start() {

    }

    update(deltaTime: number) {

    }

    // 按钮点击后变为花
    onClick() {
        this.setFlowerSprite(Math.floor(Math.random() * 3));
        this.flower.active = true;
        this.button.active = false;
    }

    // 消除花，变回按钮
    clearFlowerSprite() {
        this.flower.active = false;
        this.button.active = true;
    }

    // 设置花的样式
    setFlowerSprite(index: number) {
        this.flower.active = true
        this.flower.getComponent(Sprite)!.spriteFrame = this.flowerSprites[index];
    }
}

