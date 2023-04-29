import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum BoardNodeType {
    BNT_NONE = -1,
    BNT_ONE,
    BNT_TWO,
    BNT_THREE,
};

enum OptionsNodeType {
    ONT_ONE = 0,
    ONT_TWO,
    ONT_THREE,
};

@ccclass('GameManager')
export class GameManager extends Component {

    // board相关变量声明
    @property(Node)
    public board: Node = null!;
    @property({ type: Prefab })
    public boardNodePrefab: Prefab | null = null;
    public boardSize: number = 5;
    public boardGap: number = 10;
    public boardNodeSize: number = 100;
    public boardWholeSize: number = this.boardSize * this.boardNodeSize + (this.boardSize - 1) * this.boardGap;
    private _board: BoardNodeType[][] = [];

    // option相关变量声明
    @property(Node)
    public options: Node = null!;
    @property({ type: Prefab })
    public optionsNodePrefab: Prefab | null = null;
    public optionsSize: number = 5;
    public optionsGap: number = 10;
    public optionsNodeSize: number = 100;
    public optionsWholeSize: number = this.optionsSize * this.optionsNodeSize + (this.optionsSize - 1) * this.optionsGap;
    private _options: OptionsNodeType[] = [];
    private _curMaxOptions: number = 0;

    start() {
        this.init();
    }

    init() {

        // 初始化board
        this.board.removeAllChildren();

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                //实例化boardNode,默认都是BNT_NONE
                this._board[i] = [];
                this._board[i][j] = BoardNodeType.BNT_NONE;
                let boardNode: Node | null = instantiate(this.boardNodePrefab);
                if (boardNode) {
                    this.board.addChild(boardNode);
                    let pos = new Vec3(this.boardNodeSize / 2 + i * (this.boardNodeSize + this.boardGap) - this.boardWholeSize / 2, this.boardNodeSize * 2 + j * (this.boardNodeSize + this.boardGap) - this.boardWholeSize / 2, 0);
                    boardNode.setPosition(pos);
                }

            }
        }

        // 初始化option
        this.options.removeAllChildren();
        this._curMaxOptions = 2;

        for (let i = 0; i < this.optionsSize; i++) {
            //实例化optionsNode，随机生成ONT_ONE,ONT_TWO,ONT_THREE
            this._options[i] = Math.floor(Math.random() * (this._curMaxOptions + 1));
            console.warn('option is ' + this._options[i] + '');
            let optionsNode: Node | null = this.spawnOptionsNodeByType(this._options[i]);
            if (optionsNode) {
                this.options.addChild(optionsNode);
                let pos = new Vec3(this.optionsNodeSize / 2 + i * (this.optionsNodeSize + this.optionsGap) - this.optionsWholeSize / 2, 100, 0);
                optionsNode.setPosition(pos);
            }
            //this.spawnOptionsNodeByType(i, this.options[i]);
        }

    }

    // 实例化optionsNode
    spawnOptionsNodeByType(type: OptionsNodeType) {
        if (!this.optionsNodePrefab) {
            console.warn('optionsNodePrefab is null');
            return null;
        }
        let optionsNode: Node | null;
        switch (type) {
            case OptionsNodeType.ONT_ONE:
                optionsNode = instantiate(this.optionsNodePrefab);
                console.warn('case is ' + type + ' before break');
                break;
        }
        return optionsNode;
    }
    /*
if (!this.optionsNodePrefab) {
 console.warn('optionsNodePrefab is null');
 return null;
}
let optionsNode: Node | null = null;
switch (type) {
 case OptionsNodeType.ONT_ONE:
     optionsNode = instantiate(this.optionsNodePrefab);
     break;
 case OptionsNodeType.ONT_TWO:
     optionsNode = instantiate(this.optionsNodePrefab);
     break;
 case OptionsNodeType.ONT_THREE:
     optionsNode = instantiate(this.optionsNodePrefab);
     break;
}
return optionsNode;
*/

    update(deltaTime: number) {

    }
}