import 'mova/library'
import {Ceiling, Floor, Wall} from "./mova/library"

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
