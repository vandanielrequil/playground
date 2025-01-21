import { Maze, Door, Room, Wall, Direction, MazeGame } from "./template-maze";

export class MazeFactory {
    makeMaze(): Maze {
        return new Maze();
    }
    makeWall(): Wall {
        return new Wall();
    }
    makeRoom(i: number): Room {
        return new Room(i);
    }
    makeDoor(r1: Room, r2: Room): Door {
        return new Door(r1, r2);
    }
};

class MazeGameFactory extends MazeGame {
    public createMaze(factory: MazeFactory): Maze {
        const aMaze = factory.makeMaze();
        const r1 = factory.makeRoom(1);
        const r2 = factory.makeRoom(2);
        const aDoor = factory.makeDoor(r1,r2);

        aMaze.addRoom(r1);
        aMaze.addRoom(r2);

        r1.setSide( Direction.North, factory.makeWall());
        r1.setSide( Direction.East, aDoor);
        r1.setSide( Direction.South, factory.makeWall());
        r1.setSide( Direction.West, factory.makeWall());

        r2.setSide( Direction.North, factory.makeWall());
        r2.setSide( Direction.East, factory.makeWall());
        r2.setSide( Direction.South, factory.makeWall());
        r2.setSide( Direction.West, aDoor);

        return aMaze;
    }
}

type Spell = string;
class EnchantedRoom extends Room {
    constructor(roomN: number, castSpell: Spell) {
        super(roomN);
    }
};
class DoorNeedingSpell extends Door {};
export class EnchantedMazeFactory extends MazeFactory {
    makeRoom(n: number): Room { return new EnchantedRoom(n, this.castSpell()); }
    makeDoor(r1: Room, r2: Room): Door { return new DoorNeedingSpell(r1, r2); }

    protected castSpell(): Spell { return 'avadacedavra' }
};

class RoomWithABomb extends Room {};
class BombedWall extends Wall {};
export class BombedMazeFactory extends MazeFactory {
    makeWall(): Wall { return new BombedWall(); }
    makeRoom(n: number): Room { return new RoomWithABomb(n); }
};

const maze = new MazeGameFactory();

const enchantedMaze = maze.createMaze(new EnchantedMazeFactory());

const bombMaze = maze.createMaze(new BombedMazeFactory());
