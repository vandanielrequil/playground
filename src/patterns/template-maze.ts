export enum Direction {North, South, East, West};

abstract class MapSite {
    public abstract enter(): void;
}

export class Room implements MapSite {
    private _sides: MapSite[] = Array(4).fill(null);
    private _roomNumber: number;

    constructor(roomN: number) { this._roomNumber = roomN; }

    public getSide(d: Direction): MapSite { return this._sides[d]; }    
    public setSide(d: Direction, m: MapSite): void { this._sides[d] = m; }
    public enter(): void {}
}

export class Door implements MapSite {
    private _room1: Room;
    private _room2: Room;
    private _isOpen: boolean;

    constructor(room1: Room, room2: Room) {
        this._room1 = room1;
        this._room2 = room2;
    }

    public enter(): void {}
    public otherSideRoom(room: Room): Room { return room }
}

export class Wall implements MapSite {
    public enter(): void {}
}

export class Maze {
    public addRoom(room: Room): void {}

    public roomNo(roomN: number): Room { return {} as Room }
}

export abstract class MazeGame {
    abstract createMaze(...args): Maze;
}
