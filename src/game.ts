import 'mova/library'
import {Ceiling, Floor, Module, Building, Wall} from "./mova/library"

let moduleDimension: Vector3 = new Vector3(24, 8, 0.1)
let openingDimension: Vector3 = new Vector3(4, 4, 0.1)
let connectorDimension: Vector3 = new Vector3(4, 1, 4)
let position: Vector3 = new Vector3(0,0,0)
let rotation: Quaternion = Quaternion.Euler(0,0,0)
let scale: Vector3 = new Vector3(1,1,1)
let layout: number[][][] = [
    [
        [1, 0, 1],
        [1, 1, 1],
        [0, 1, 1]
    ],
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ]]
let MoVA: Building = new Building(layout, moduleDimension, openingDimension, connectorDimension)
MoVA.addComponent(new Transform({position: position, rotation: rotation, scale: scale}))
engine.addEntity(MoVA)
log('Created MoVA in scale ' + scale + ' with ' + MoVA.moduleCount + ' modules (each ' + MoVA.moduleSurface + ' m2) and a total surface of ' + MoVA.buildingSurface  + ' m2!')

/*
let module0: Module = new Module(
    new Vector3(5,0,5),
    'N:opening,S:opening,E:opening,W:opening',
    new Vector3(24,8,0.1),
    new Vector3(4,4,0.1)
)
engine.addEntity(module0)

let module1: Module = new Module(
    new Vector3(5 + 4 + 24,0,5),
    'N:opening,S:opening,E:opening,W:opening',
    new Vector3(24,8,0.1),
    new Vector3(4,4,0.1)
)
engine.addEntity(module1)

let module2: Module = new Module(
    new Vector3(5 + 4 + 24,0,5 + 4 + 24),
    'N:opening,S:opening,E:opening,W:opening',
    new Vector3(24,8,0.1),
    new Vector3(4,4,0.1)
)
engine.addEntity(module2)

let module3: Module = new Module(
    new Vector3(5,0,5 + 4 + 24),
    'N:opening,S:opening,E:opening,W:opening',
    new Vector3(24,8,0.1),
    new Vector3(4,4,0.1)
)
engine.addEntity(module3)

let module0_1: Module = new Module(
    new Vector3(5,10,5),
    'N:opening,S:opening,E:opening,W:opening',
    new Vector3(24,8,0.1),
    new Vector3(4,4,0.1)
)
engine.addEntity(module0_1)

let module1_1: Module = new Module(
    new Vector3(5 + 4 + 24,10,5),
    'N:opening,S:opening,E:opening,W:opening',
    new Vector3(24,8,0.1),
    new Vector3(4,4,0.1)
)
engine.addEntity(module1_1)

let module2_1: Module = new Module(
    new Vector3(5 + 4 + 24,10,5 + 4 + 24),
    'N:opening,S:opening,E:opening,W:opening',
    new Vector3(24,8,0.1),
    new Vector3(4,4,0.1)
)
engine.addEntity(module2_1)

let module3_1: Module = new Module(
    new Vector3(5,10,5 + 4 + 24),
    'N:opening,S:opening,E:opening,W:opening',
    new Vector3(24,8,0.1),
    new Vector3(4,4,0.1)
)
engine.addEntity(module3_1)
*/

/*
let wall_1: Wall = new Wall(new Vector3(24,8,0.1), new Vector3(4, 4, 0.1))
wall_1.addComponent(new Transform({
    position: new Vector3(5,0,5)
}))
engine.addEntity(wall_1)

let wall_2: Wall = new Wall(new Vector3(24,8,0.1), new Vector3(4, 4,0.1))
wall_2.addComponent(new Transform({
    position: new Vector3(5,0,29),
    rotation: Quaternion.Euler(0,90,0)
}))
engine.addEntity(wall_2)

let wall_3: Wall = new Wall(new Vector3(24,8,0.1), new Vector3(4, 4,0.1))
wall_3.addComponent(new Transform({
    position: new Vector3(29,0,5),
    rotation: Quaternion.Euler(0,270,0)
}))
engine.addEntity(wall_3)

let wall_4: Wall = new Wall(new Vector3(24,8,0.1))
wall_4.addComponent(new Transform({
    position: new Vector3(29,0,29),
    rotation: Quaternion.Euler(0,180,0)
}))
engine.addEntity(wall_4)

let floor: Floor = new Floor(new Vector3(24, 0.1, 24))
floor.addComponent(new Transform({
    position: new Vector3(5, 0, 5)
}))
engine.addEntity(floor)

let ceiling: Ceiling = new Ceiling(new Vector3(24, 0.1, 24))
ceiling.addComponent(new Transform({
    position: new Vector3(5, 8, 5)
}))
engine.addEntity(ceiling)
*/
