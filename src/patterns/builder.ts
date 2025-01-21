import { Maze, Door, Room, Wall, Direction, MazeGame } from "./template-maze";
// import { MazeGame } from "./abstract-factory";

class MazeBuilder {
        buildMaze(): void { }
        buildRoom(room: number): void { }
        buildDoor(roomFrom: number, roomTo: number): void { }
        getMaze(): Maze { return new Maze() }

        protected mazeBuilder() {};
};

class MazeGameBuilder extends MazeGame {
    createMaze (builder: MazeBuilder) {
        builder.buildMaze();

        builder.buildRoom(1);
        builder.buildRoom(2);
        builder.buildDoor(1, 2);

        return builder.getMaze();
    }
}

class StandardMazeBuilder extends MazeBuilder {
    private _currentMaze: Maze;

    buildMaze(): void { this._currentMaze = new Maze; }
    buildDoor(roomFrom: number, roomTo: number): void { 
        const r1 = this._currentMaze.roomNo(roomFrom);
        const r2 = this._currentMaze.roomNo(roomTo);
        const d = new Door(r1, r2);
        r1.setSide(this.commonWall(r1, r2), d);
        r2.setSide(this.commonWall(r2, r1), d);
    }
    buildRoom (n: number) {
        if (!this._currentMaze.roomNo(n)) {
            const room = new Room(n);
            this._currentMaze.addRoom(room);
            room.setSide(Direction.North, new Wall);
            room.setSide(Direction.South, new Wall);
            room.setSide(Direction.East, new Wall);
            room.setSide(Direction.West, new Wall);
        }
    }

    getMaze(): Maze { return this._currentMaze; }

    private commonWall(r1: Room, r2: Room): Direction { return Direction.East }
};

const game = new MazeGameBuilder()
const builder = new StandardMazeBuilder;
game.createMaze(builder);
const maze = builder.getMaze();

class CountingMazeBuilder extends MazeBuilder {
    private _doors: number;
    private _rooms: number;

    constructor() {
        super();
        this._rooms = this._doors = 0;
    }

    buildMaze(): void { }
    buildRoom(room: number): void { this._rooms++; }
    buildDoor(roomFrom: number, roomTo: number): void { this._doors++; }
    addWall(int, Direction): void {};
    getCounts() {
        return {
            rooms: this._rooms,
            doors: this._doors,
        } 
    };

};

const game2 = new MazeGameBuilder();
const builder2 = new CountingMazeBuilder();
game2.createMaze(builder2);
builder2.getCounts();
