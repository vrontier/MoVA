////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                             Museum of Virtual Arts (MoVA), Aetheria, Decentraland
//                                               "The Stack"
//
//                                CryptoVrontier https://github.com/vrontier/MoVA
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import {Building} from "./mova/library"
import {Elevator} from "./mova/elevator"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Define required variables

let moduleDimension: Vector3
let openingDimension: Vector3
let connectorDimension: Vector3
let position: Vector3
let rotation: Quaternion
let scale: Vector3
let layout: string[][][]
let floatingHeight: number = 6 // meters

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Create a minimalist MoVA with a single floating module that fits on a single LAND

moduleDimension = new Vector3(12, 6, 0.1)
openingDimension = new Vector3(4, 4, 0.1)
connectorDimension = new Vector3(0, 0, 0)
position = new Vector3(4, floatingHeight,2)
rotation = Quaternion.Euler(0,0,0)
scale = new Vector3(1,1,1)
layout = [
    [
        ['W']
    ]
]
let MoVASimple: Building = new Building(layout, moduleDimension, openingDimension, connectorDimension)
MoVASimple.addComponent(new Transform({position: position, rotation: rotation, scale: scale}))
engine.addEntity(MoVASimple)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Create the elevator

let elevator: Elevator = new Elevator(floatingHeight, new Vector3(2, 0, 8), new Vector3(4,0.1, 4))
engine.addEntity(elevator)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Create a 1:20 model of MoVA as an exhibition piece

moduleDimension = new Vector3(24, 8, 0.1)
openingDimension = new Vector3(4, 4, 0.1)
connectorDimension = new Vector3(4, 1, 0.1)
position = new Vector3(8, floatingHeight + 0.8,6)
rotation = Quaternion.Euler(0,0,0)
scale = new Vector3(0.05,0.05,0.05)
layout = [
    [
        ['SE', 'WSE', 'WS'],
        ['NS', 'NSE', 'WNS'],
        ['NE', 'WNSE', 'WN']
    ],
    [
        ['SE', 'WSE', 'WS'],
        ['NS', 'NSE', 'WNS'],
        ['NE', 'WNSE', 'WN']
    ],
    [
        ['SE', 'WSE', 'WS'],
        ['NS', 'NSE', 'WNS'],
        ['NE', 'WNSE', 'WN']
    ]
]
let MoVAModel: Building = new Building(layout, moduleDimension, openingDimension, connectorDimension)
MoVAModel.addComponent(new Transform({position: position, rotation: rotation, scale: scale}))
engine.addEntity(MoVAModel)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Ground and landscape

let ground: Entity = new Entity()
ground.addComponent(new GLTFShape("models/FloorBaseGrass_02/FloorBaseGrass_02.glb"))
ground.addComponent(new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1, 1, 1)
}))
engine.addEntity(ground)

let tree01: Entity = new Entity()
tree01.addComponent(new GLTFShape("models/TreeSycamore_01/TreeSycamore_01.glb"))
tree01.addComponent(new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1, 1, 1)
}))
engine.addEntity(tree01)

let tree02: Entity = new Entity()
tree02.addComponent(new GLTFShape("models/TreeSycamore_02/TreeSycamore_02.glb"))
tree02.addComponent(new Transform({
    position: new Vector3(7, 0, 13),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0,0.5, 0)
}))
engine.addEntity(tree02)

let tree03: Entity = new Entity()
tree03.addComponent(new GLTFShape("models/TreeSycamore_03/TreeSycamore_03.glb"))
tree03.addComponent(new Transform({
    position: new Vector3(3, 0, 12),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0,0.7, 0)
}))
engine.addEntity(tree03)

let tree04: Entity = new Entity()
tree04.addComponent(new GLTFShape("models/TreeSycamore_03/TreeSycamore_03.glb"))
tree04.addComponent(new Transform({
    position: new Vector3(7, 0, 4),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0,0.1, 0)
}))
engine.addEntity(tree04)

let tree05: Entity = new Entity()
tree05.addComponent(new GLTFShape("models/TreeSycamore_02/TreeSycamore_02.glb"))
tree05.addComponent(new Transform({
    position: new Vector3(12, 0, 13),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0,0.66, 0)
}))
engine.addEntity(tree05)

let tree06: Entity = new Entity()
tree06.addComponent(new GLTFShape("models/TreeSycamore_01/TreeSycamore_01.glb"))
tree06.addComponent(new Transform({
    position: new Vector3(12, 0, 3),
    scale: new Vector3(1, 1, 1),
    rotation: Quaternion.Euler(0,0.89, 0)
}))
engine.addEntity(tree06)
