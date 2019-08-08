////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                             Museum of Virtual Arts (MoVA), Aetheria, Decentraland
//                                               "The Stack"
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const defaultExteriorWallMaterial = new Material()
defaultExteriorWallMaterial.albedoColor = Color3.Black()
defaultExteriorWallMaterial.metallic = 0.2
defaultExteriorWallMaterial.roughness = 0.2
defaultExteriorWallMaterial.disableLighting = false

const defaultInnerWallMaterial = new Material()
defaultInnerWallMaterial.albedoColor = Color3.White()
defaultInnerWallMaterial.metallic = 0.1
defaultInnerWallMaterial.roughness = 0.1
defaultInnerWallMaterial.disableLighting = false

const defaultFloorMaterial = new Material()
defaultFloorMaterial.albedoColor = new Color3(.6,.6,.6)
defaultFloorMaterial.metallic = 0.5
defaultFloorMaterial.roughness = 0.4
defaultFloorMaterial.disableLighting = false

export class MoVA {
    private _position: Vector3

    constructor(position?: Vector3) {
        if (position) this._position = position
    }

    get position(): Vector3 {
        return this._position
    }

    set position(value: Vector3) {
        this._position = value
    }
}

export class Wall extends Entity {

    constructor(dimension: Vector3, opening?: Vector3) {
        super()

        if (opening) {
            let wallSegment_1 = new Entity()
            wallSegment_1.setParent(this)
            wallSegment_1.addComponent(defaultExteriorWallMaterial)
            wallSegment_1.addComponent(new BoxShape())
            wallSegment_1.addComponent(new Transform({
                position: new Vector3((dimension.x/2 - opening.x/2)/2, dimension.y/2, dimension.z/2),
                scale: new Vector3(dimension.x/2 - opening.x/2, dimension.y, dimension.z),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let innerSegment_1 = new Entity()
            innerSegment_1.setParent(this)
            innerSegment_1.addComponent(defaultInnerWallMaterial)
            innerSegment_1.addComponent(new BoxShape())
            innerSegment_1.addComponent(new Transform({
                position: new Vector3((dimension.x/2 - opening.x/2)/2, dimension.y/2, dimension.z + 0.01),
                scale: new Vector3(dimension.x/2 - opening.x/2  - (2 * dimension.z), dimension.y  - (2 * dimension.z), .01),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let wallSegment_2 = new Entity()
            wallSegment_2.setParent(this)
            wallSegment_2.addComponent(defaultExteriorWallMaterial)
            wallSegment_2.addComponent(new BoxShape())
            wallSegment_2.addComponent(new Transform({
                position: new Vector3(dimension.x/2, dimension.y/2 + opening.y/2, dimension.z/2),
                scale: new Vector3(opening.x, dimension.y - opening.y, dimension.z),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let innerSegment_2 = new Entity()
            innerSegment_2.setParent(this)
            innerSegment_2.addComponent(defaultInnerWallMaterial)
            innerSegment_2.addComponent(new BoxShape())
            innerSegment_2.addComponent(new Transform({
                position: new Vector3(dimension.x/2, dimension.y/2 + opening.x/2, dimension.z + 0.01),
                scale: new Vector3(opening.x + (2 * dimension.z), dimension.y - opening.y - (2 * dimension.z), .01),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let wallSegment_3 = new Entity()
            wallSegment_3.setParent(this)
            wallSegment_3.addComponent(defaultExteriorWallMaterial)
            wallSegment_3.addComponent(new BoxShape())
            wallSegment_3.addComponent(new Transform({
                position: new Vector3((dimension.x/2 - opening.x/2) + opening.x + (dimension.x/2 - opening.x/2)/2, dimension.y/2, dimension.z/2),
                scale: new Vector3(dimension.x/2 - opening.x/2, dimension.y, dimension.z),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let innerSegment_3 = new Entity()
            innerSegment_3.setParent(this)
            innerSegment_3.addComponent(defaultInnerWallMaterial)
            innerSegment_3.addComponent(new BoxShape())
            innerSegment_3.addComponent(new Transform({
                position: new Vector3((dimension.x/2 - opening.x/2) + opening.x + (dimension.x/2 - opening.x/2)/2, dimension.y/2, dimension.z + .01),
                scale: new Vector3(dimension.x/2 - opening.x/2 - (2 * dimension.z), dimension.y - (2 * dimension.z), .01),
                rotation: Quaternion.Euler(0,0, 0)
            }))
        } else {
            let wallSegment_1 = new Entity()
            wallSegment_1.setParent(this)
            wallSegment_1.addComponent(new BoxShape())
            wallSegment_1.addComponent(defaultExteriorWallMaterial)
            wallSegment_1.addComponent(new Transform({
                position: new Vector3(dimension.x/2, dimension.y/2, dimension.z/2),
                scale: dimension,
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let innerSegment_1 = new Entity()
            innerSegment_1.setParent(this)
            innerSegment_1.addComponent(defaultInnerWallMaterial)
            innerSegment_1.addComponent(new BoxShape())
            innerSegment_1.addComponent(new Transform({
                position: new Vector3(dimension.x/2, dimension.y/2, dimension.z + 0.01),
                scale: new Vector3(dimension.x - (2 * dimension.z), dimension.y - (2 * dimension.z), .01),
                rotation: Quaternion.Euler(0,0, 0)
            }))
        }

    }

}

export class Floor extends Entity {

    constructor(dimension: Vector3) {
        super()

        let floorSegment_1 = new Entity()
        floorSegment_1.setParent(this)
        floorSegment_1.addComponent(new BoxShape())
        floorSegment_1.addComponent(defaultExteriorWallMaterial)
        floorSegment_1.addComponent(new Transform({
            position: new Vector3(dimension.x / 2, dimension.y / 2, dimension.z / 2),
            scale: dimension,
            rotation: Quaternion.Euler(0, 0, 0)
        }))
        let innerFloorSegment_1 = new Entity()
        innerFloorSegment_1.setParent(this)
        innerFloorSegment_1.addComponent(new BoxShape())
        innerFloorSegment_1.addComponent(defaultFloorMaterial)
        innerFloorSegment_1.addComponent(new Transform({
            position: new Vector3(dimension.x / 2, dimension.y + .01, dimension.z / 2),
            scale: new Vector3(dimension.x - (2 * dimension.y), .01, dimension.z - (2 * dimension.y)),
            rotation: Quaternion.Euler(0, 0, 0)
        }))
    }
}

export class Ceiling extends Entity {

    constructor(dimension: Vector3) {
        super()

        let ceilingSegment_1 = new Entity()
        ceilingSegment_1.setParent(this)
        ceilingSegment_1.addComponent(new BoxShape())
        ceilingSegment_1.addComponent(defaultExteriorWallMaterial)
        ceilingSegment_1.addComponent(new Transform({
            position: new Vector3(dimension.x / 2, dimension.y / 2, dimension.z / 2),
            scale: dimension,
            rotation: Quaternion.Euler(0, 0, 0)
        }))
        let innerCeilingSegment_1 = new Entity()
        innerCeilingSegment_1.setParent(this)
        innerCeilingSegment_1.addComponent(new BoxShape())
        innerCeilingSegment_1.addComponent(defaultInnerWallMaterial)
        innerCeilingSegment_1.addComponent(new Transform({
            position: new Vector3(dimension.x / 2, -1 * dimension.y - .01, dimension.z / 2),
            scale: new Vector3(dimension.x - (2 * dimension.y), .01, dimension.z - (2 * dimension.y)),
            rotation: Quaternion.Euler(0, 0, 0)
        }))

    }
}


export function createWall(testMode:Boolean = false, position: Vector3, dimension: Vector3, rotation:Vector3, wallMaterial: Material) {
    let wall:Entity = new Entity()
    let wallShape:BoxShape = new BoxShape()
    if (testMode) {
        wallShape.withCollisions = false
    } else {
        wallShape.withCollisions = true
    }
    wall.addComponent(wallShape)
    wall.addComponent(wallMaterial)

    wall.addComponent(
        new Transform({
            position: position,
            scale: dimension,
            rotation: Quaternion.Euler(rotation.x, rotation.y, rotation.z)
        })
    )
    engine.addEntity(wall)

    const myEntity = new Entity()
    const myText = new TextShape(
        "Position: x=" + position.x + ", y=" + position.y+ ", z=" + position.z + "\n" +
        "Size: x=" + dimension.x + ", y=" + dimension.y+ ", z=" + dimension.z)
    myEntity.addComponent(myText)
    myEntity.addComponent(new Transform({
        position: new Vector3(position.x-0.2, 1.2, position.z-0.2),
        scale: new Vector3(5, 5, 5),
        rotation: Quaternion.Euler(rotation.x, rotation.y, rotation.z)
    }))
    myText.fontSize = 3
    myText.hTextAlign = "left"
    myText.color = Color3.Red()
    engine.addEntity(myEntity)
}


export function createMoVAModule(testMode, position: Vector3, rotation:Vector3, wallMaterial:Material, innerWallMaterial:Material) {

    let innerWallDim:Vector2 = new Vector2(24, 8)
    let wallWidth:number = 0.1
    let floorWidth:number = 0.1
    let ceilingWidth:number = 0.1
    let innerWallOffset:number = .01

    let calculatedPosition:Vector3 = new Vector3(
        position.x + innerWallDim.x/2 - wallWidth*1,
        position.y + innerWallDim.y/2 + floorWidth*1,
        position.z - wallWidth/2
    )
    let calculatedSize:Vector3 = new Vector3(innerWallDim.x + wallWidth * 2, innerWallDim.y + floorWidth + ceilingWidth, wallWidth )
    createWall(testMode, calculatedPosition, calculatedSize, rotation, wallMaterial)

    let innerWall:Entity = new Entity()
    const innerWallShape = new PlaneShape()
    if (testMode) {
        innerWallShape.withCollisions = false
    } else {
        innerWallShape.withCollisions = true
    }
    innerWall.addComponent(innerWallShape)
    innerWall.addComponent(innerWallMaterial)
    innerWall.addComponent(
        new Transform({
            position: new Vector3(calculatedPosition.x, calculatedPosition.y, calculatedPosition.z + wallWidth/2 + innerWallOffset),
            scale: new Vector3(innerWallDim.x, innerWallDim.y, 1),
            rotation: Quaternion.Euler(rotation.x, rotation.y, rotation.z)
        })
    )
    engine.addEntity(innerWall)

    calculatedPosition = new Vector3(
        position.x + innerWallDim.x/2 - wallWidth*1,
        position.y + floorWidth*1/2,
        position.z + innerWallDim.x/2
    )
    createWall(testMode, calculatedPosition, new Vector3(24,0.1, 24), rotation, wallMaterial)

    calculatedPosition = new Vector3(
        position.x + innerWallDim.x/2 - wallWidth*1,
        position.y + innerWallDim.y + ceilingWidth + floorWidth/2,
        position.z + innerWallDim.x/2
    )
    createWall(testMode, calculatedPosition, new Vector3(24,0.1, 24), rotation, wallMaterial)


    // coordX = position.x - wallWidth/2
    // coordY = position.y + innerWallDim.y/2
    // coordZ = position.z + innerWallDim.x/2
    //
    // let myWall_2:Entity = createWall(testMode, new Vector3(coordX,coordY,coordZ), new Vector3(0.1, 8, 24 + 2*(wallWidth)), rotation, wallMaterial)
    // engine.addEntity(myWall_2)
    //
    // coordX = position.x + innerWallDim.x/2
    // coordY = position.y + innerWallDim.y/2
    // coordZ = position.z + wallWidth/2 + innerWallDim.x
    //
    // let myWall_3:Entity = createWall(testMode, new Vector3(coordX,coordY,coordZ), innerWallDim, rotation, wallMaterial)
    // engine.addEntity(myWall_3)
    //
    // coordX = position.x + innerWallDim.x
    // coordY = position.y + innerWallDim.y/2
    // coordZ = position.z + innerWallDim.x/2
    //
    // let myWall_4:Entity = createWall(testMode, new Vector3(coordX,coordY,coordZ), new Vector3(0.1, 8, 24 + 2*(wallWidth)), rotation, wallMaterial)
    // engine.addEntity(myWall_4)
}

export function createMuseum(testMode:Boolean = false, theStackModules:number[][][], position: Vector3, dimension: Vector3, moduleOffset:Vector3) {
    let moduleLength: number = dimension.x
    let moduleWidth: number = dimension.z
    let moduleHeight: number = dimension.y

    let module : any[] = []
    let m: number = 0
    let x: number = 0
    let y: number = 0
    let z: number = 0

    const wallMaterial = new Material()
    wallMaterial.albedoColor = Color3.Black()
    wallMaterial.metallic = 0.2
    wallMaterial.roughness = 0.2
    wallMaterial.disableLighting = true

    const innerWallMaterial = new Material()
    innerWallMaterial.albedoColor = Color3.White()
    innerWallMaterial.metallic = 0.1
    innerWallMaterial.roughness = 0.1
    innerWallMaterial.disableLighting = true

    for (let level in theStackModules) {
        for (let positionX in theStackModules[level]) {
            for (let positionZ in theStackModules[level][positionX]) {
                let modulePresent:number = theStackModules[level][positionX][positionZ]
                x = Number(positionX)
                y = Number(level)
                z = Number(positionZ)
                if (modulePresent == 1) {
                    log('The Stack: level', level, 'of', theStackModules.length, '- x:',
                        positionX, '- z:', positionZ, '-> module present')
                    x = (moduleLength + moduleOffset.x) * x
                    y = (moduleHeight + moduleOffset.y) * y
                    z = (moduleWidth + moduleOffset.z) * z
                    let offset_position: Vector3 = position.add(new Vector3(x, y, z))
                    //
                    // module[m] = createModule(offset_position, dimension, wallMaterial)
                    // engine.addEntity(module[m])

                    module[m] = createMoVAModule(testMode, offset_position, new Vector3(0,0,0), wallMaterial, innerWallMaterial)
                    //engine.addEntity(module[m])

                } else {
                    log('The Stack: level', level, 'of', theStackModules.length, '- x:',
                        positionX, '- z:', positionZ, '-> empty space')
                }
            }
        }
    }
}

export function randomScaping(landscape:number[][], startFromPosition:Vector3, density:number, offSetX:number[], offSetZ:number[]){
    let scapedLand:Vector3[] = []
    let mapX:number = 0
    for (let x in landscape) {
        let mapZ:number = 0
        for (let z in landscape[x]) {
            let offSetXValue = Math.random() * (offSetX[1] - offSetX[0]) + offSetX[0]
            let offSetZValue = Math.random() * (offSetZ[1] - offSetZ[0]) + offSetZ[0]
            let elementPosition:Vector3 = startFromPosition.add(new Vector3(mapX * density + offSetXValue, 0, mapZ * density + offSetZValue))
            if (landscape[x][z] == 1) {
                scapedLand.push(elementPosition)
            }
            mapZ += 1
        }
        mapX += 1
    }
    return scapedLand
}


