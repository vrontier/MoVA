////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                             Museum of Virtual Arts (MoVA), Aetheria, Decentraland
//                                               "The Stack"
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Master control switch for logging
let logging: boolean = true
let msgERROR: string = "MoVA - ERROR: "
let msgWARNING: string = "MoVA - WARNING: "
let msgDEBUG: string = "MoVA - DEBUG: "

const defaultWithCollisions: boolean = false
const defaultModuleDimension: Vector3 = new Vector3(24, 8, 0.1)
const defaultModuleOpeningDimension: Vector3 = new Vector3(4,4,0.1)

const defaultExteriorWallMaterial = new Material()
defaultExteriorWallMaterial.albedoColor = Color3.Black()
defaultExteriorWallMaterial.metallic = 0.2
defaultExteriorWallMaterial.roughness = 0.2
defaultExteriorWallMaterial.disableLighting = false

const defaultInnerWallMaterial = new Material()
defaultInnerWallMaterial.albedoColor = Color3.White()
defaultInnerWallMaterial.metallic = 0.3
defaultInnerWallMaterial.roughness = 0.2
defaultInnerWallMaterial.disableLighting = false

const defaultFloorMaterial = new Material()
defaultFloorMaterial.albedoColor = new Color3(.6,.6,.6)
defaultFloorMaterial.metallic = 0.5
defaultFloorMaterial.roughness = 0.2
defaultFloorMaterial.disableLighting = false

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MoVA Building entity
//
export class Building extends Entity {

    private _moduleCount: number
    private _moduleSurface: number
    private _buildingSurface: number

    constructor(moduleLayout: any[][][], moduleDimension: Vector3, openingDimension: Vector3,
                connectorDimension: Vector3) {

        // Instantiate an Entity
        super()

        // Module type and count
        let moduleId: number = 0
        this._moduleCount = 0
        let moduleLevelSpacer = 2

        // Build museum from layout area
        for (let level: number = 0; level < moduleLayout.length; level++) {
            for (let row: number = 0; row < moduleLayout[level].length; row++) {
                for (let column: number = 0; column < moduleLayout[level][row].length; column++) {
                    moduleId = Number(moduleLayout[level][row][column])
                    if (moduleId > 0) {
                        this._moduleCount++
                        let position: Vector3 = new Vector3(
                            column * moduleDimension.x + column * openingDimension.x,
                            level * (moduleDimension.y + moduleLevelSpacer),
                            (moduleLayout[level].length - 1 - row) * moduleDimension.x + (moduleLayout[level].length - 1 - row) * openingDimension.x
                        )
                        if (logging) log(msgDEBUG + 'Creating module ' + moduleId +
                            ' at level ' + (level + 1) + ' of ' + moduleLayout.length +
                            ', column ' + (column + 1) + ', row ' + (row + 1) +
                            ' of [' + moduleLayout[level][row] + ']' +
                            ' at position ' + position
                        )
                        let module: Module = new Module()
                        module.addComponent(new Transform({position: position}))
                        module.setParent(this)
                    }
                }
            }
        }

        this._moduleSurface = moduleDimension.x * moduleDimension.x
        this._buildingSurface = this._moduleCount * moduleDimension.x * moduleDimension.x

    }

    get moduleCount(): number {
        return this._moduleCount
    }

    get moduleSurface(): number {
        return this._moduleSurface
    }

    get buildingSurface(): number {
        return this._buildingSurface
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MoVA Module entity
//
export class Module extends Entity {

    private _DEFAULT_WITH_COLLISIONS: boolean = defaultWithCollisions
    private _DEFAULT_DIMENSION: Vector3 = defaultModuleDimension
    private _DEFAULT_OPENING_DIMENSION: Vector3 = defaultModuleOpeningDimension

    constructor(type?: string, moduleDimension?: Vector3, wallOpeningDimension?: Vector3) {

        // Instantiate an Entity
        super()

        // Default module has four openings
        if (!type) type = "N:opening,E:opening,W:opening,S:opening"
        let dimension: Vector3 = this._DEFAULT_DIMENSION
        if (moduleDimension) dimension = moduleDimension
        let openingDimension: Vector3 = this._DEFAULT_OPENING_DIMENSION
        if (wallOpeningDimension) openingDimension = wallOpeningDimension

        // Debug message
        if (logging) log(msgDEBUG + 'Creating module ' + type + ' (' + dimension + ') with opening (' + openingDimension + ')')

        // Create walls with openings
        let openings: string[] = type.split(',')
        if (openings.length >= 1 && openings.length <= 4) {

            // Initial position and rotation
            let relativePosition: Vector3 = new Vector3(0, 0, 0)
            let relativeRotation: Quaternion = Quaternion.Euler(0, 0, 0)

            // Iterate through array
            for (let opening in openings) {
                let wallOpening: string[] = openings[opening].split(':')

                if (wallOpening[0].toUpperCase() == 'S') {
                    let thisWallOpening: Vector3 = openingDimension
                    if (wallOpening[1].toLowerCase() != 'opening') thisWallOpening = new Vector3(0, 0, 0)
                    let wall: Wall = new Wall(dimension, thisWallOpening, this._DEFAULT_WITH_COLLISIONS)
                    relativePosition = new Vector3(0, 0, 0)
                    relativeRotation = Quaternion.Euler(0, 0, 0)
                    wall.addComponent(new Transform({
                        position: relativePosition,
                        rotation: relativeRotation
                    }))
                    wall.setParent(this)
                    if (logging) log(msgDEBUG + 'Wall "' + wallOpening[0].toUpperCase() + '" (' + dimension + ') created with opening (' + openingDimension + ')')
                }

                if (wallOpening[0].toUpperCase() == 'W') {
                    let thisWallOpening: Vector3 = openingDimension
                    if (wallOpening[1].toLowerCase() != 'opening') thisWallOpening = new Vector3(0, 0, 0)
                    let wall: Wall = new Wall(dimension, thisWallOpening, this._DEFAULT_WITH_COLLISIONS)
                    relativePosition = new Vector3(0, 0, dimension.x)
                    relativeRotation = Quaternion.Euler(0, 90, 0)
                    wall.addComponent(new Transform({
                        position: relativePosition,
                        rotation: relativeRotation
                    }))
                    wall.setParent(this)
                    if (logging) log(msgDEBUG + 'Wall "' + wallOpening[0].toUpperCase() + '" (' + dimension + ') created with opening (' + openingDimension + ')')
                }

                if (wallOpening[0].toUpperCase() == 'E') {
                    let thisWallOpening: Vector3 = openingDimension
                    if (wallOpening[1].toLowerCase() != 'opening') thisWallOpening = new Vector3(0, 0, 0)
                    let wall: Wall = new Wall(dimension, thisWallOpening, this._DEFAULT_WITH_COLLISIONS)
                    relativePosition = new Vector3(dimension.x, 0, 0)
                    relativeRotation = Quaternion.Euler(0, 270, 0)
                    wall.addComponent(new Transform({
                        position: relativePosition,
                        rotation: relativeRotation
                    }))
                    wall.setParent(this)

                    if (logging) log(msgDEBUG + 'Wall "' + wallOpening[0].toUpperCase() + '" (' + dimension + ') created with opening (' + openingDimension + ')')
                }

                if (wallOpening[0].toUpperCase() == 'N') {
                    let thisWallOpening: Vector3 = openingDimension
                    if (wallOpening[1].toLowerCase() != 'opening') thisWallOpening = new Vector3(0, 0, 0)
                    let wall: Wall = new Wall(dimension, thisWallOpening, this._DEFAULT_WITH_COLLISIONS)
                    relativePosition = new Vector3(dimension.x, 0, dimension.x)
                    relativeRotation = Quaternion.Euler(0, 180, 0)
                    wall.addComponent(new Transform({
                        position: relativePosition,
                        rotation: relativeRotation
                    }))
                    wall.setParent(this)
                    if (logging) log(msgDEBUG + 'Wall "' + wallOpening[0].toUpperCase() + '" (' + dimension + ') created with opening (' + openingDimension + ')')
                }

            }

            let floor: Floor = new Floor(new Vector3(dimension.x, dimension.z, dimension.x))
            floor.addComponent(new Transform({
                position: new Vector3(dimension.x / 2, 0, dimension.x / 2)
            }))
            floor.setParent(this)

            let ceiling: Ceiling = new Ceiling(new Vector3(dimension.x, dimension.z, dimension.x))
            ceiling.addComponent(new Transform({
                position: new Vector3(dimension.x / 2, dimension.y, dimension.x / 2)
            }))
            ceiling.setParent(this)

        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MoVA Wall entity
//
export class Wall extends Entity {

    constructor(dimension: Vector3, opening?: Vector3, withCollisions: boolean = true) {

        // Instantiate an Entity
        super()

        // Default shape
        let wallShape: BoxShape = new BoxShape()
        wallShape.withCollisions = withCollisions

        // Wall has an opening
        if (opening && opening.x > 0 && opening.y > 0 && opening.z > 0) {

            let wallSegment_1 = new Entity()
            wallSegment_1.setParent(this)
            wallSegment_1.addComponent(defaultExteriorWallMaterial)
            wallSegment_1.addComponent(wallShape)
            wallSegment_1.addComponent(new Transform({
                position: new Vector3((dimension.x/2 - opening.x/2)/2, dimension.y/2, dimension.z/2),
                scale: new Vector3(dimension.x/2 - opening.x/2, dimension.y, dimension.z),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let innerSegment_1 = new Entity()
            innerSegment_1.setParent(this)
            innerSegment_1.addComponent(defaultInnerWallMaterial)
            innerSegment_1.addComponent(wallShape)
            innerSegment_1.addComponent(new Transform({
                position: new Vector3((dimension.x/2 - opening.x/2)/2, dimension.y/2, dimension.z + 0.01),
                scale: new Vector3(dimension.x/2 - opening.x/2  - (2 * dimension.z), dimension.y  - (2 * dimension.z), .01),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let wallSegment_2 = new Entity()
            wallSegment_2.setParent(this)
            wallSegment_2.addComponent(defaultExteriorWallMaterial)
            wallSegment_2.addComponent(wallShape)
            wallSegment_2.addComponent(new Transform({
                position: new Vector3(dimension.x/2, dimension.y/2 + opening.y/2, dimension.z/2),
                scale: new Vector3(opening.x, dimension.y - opening.y, dimension.z),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let innerSegment_2 = new Entity()
            innerSegment_2.setParent(this)
            innerSegment_2.addComponent(defaultInnerWallMaterial)
            innerSegment_2.addComponent(wallShape)
            innerSegment_2.addComponent(new Transform({
                position: new Vector3(dimension.x/2, dimension.y/2 + opening.x/2, dimension.z + 0.01),
                scale: new Vector3(opening.x + (2 * dimension.z), dimension.y - opening.y - (2 * dimension.z), .01),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let wallSegment_3 = new Entity()
            wallSegment_3.setParent(this)
            wallSegment_3.addComponent(defaultExteriorWallMaterial)
            wallSegment_3.addComponent(wallShape)
            wallSegment_3.addComponent(new Transform({
                position: new Vector3((dimension.x/2 - opening.x/2) + opening.x + (dimension.x/2 - opening.x/2)/2, dimension.y/2, dimension.z/2),
                scale: new Vector3(dimension.x/2 - opening.x/2, dimension.y, dimension.z),
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let innerSegment_3 = new Entity()
            innerSegment_3.setParent(this)
            innerSegment_3.addComponent(defaultInnerWallMaterial)
            innerSegment_3.addComponent(wallShape)
            innerSegment_3.addComponent(new Transform({
                position: new Vector3((dimension.x/2 - opening.x/2) + opening.x + (dimension.x/2 - opening.x/2)/2, dimension.y/2, dimension.z + .01),
                scale: new Vector3(dimension.x/2 - opening.x/2 - (2 * dimension.z), dimension.y - (2 * dimension.z), .01),
                rotation: Quaternion.Euler(0,0, 0)
            }))

        // Wall is closed
        } else {

            let wallSegment_1 = new Entity()
            wallSegment_1.setParent(this)
            wallSegment_1.addComponent(wallShape)
            wallSegment_1.addComponent(defaultExteriorWallMaterial)
            wallSegment_1.addComponent(new Transform({
                position: new Vector3(dimension.x/2, dimension.y/2, dimension.z/2),
                scale: dimension,
                rotation: Quaternion.Euler(0,0, 0)
            }))
            let innerSegment_1 = new Entity()
            innerSegment_1.setParent(this)
            innerSegment_1.addComponent(defaultInnerWallMaterial)
            innerSegment_1.addComponent(wallShape)
            innerSegment_1.addComponent(new Transform({
                position: new Vector3(dimension.x/2, dimension.y/2, dimension.z + 0.01),
                scale: new Vector3(dimension.x - (2 * dimension.z), dimension.y - (2 * dimension.z), .01),
                rotation: Quaternion.Euler(0,0, 0)
            }))
        }

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MoVA Floor Entity
//
export class Floor extends Entity {

    constructor(dimension: Vector3, withCollision: boolean = true) {

        // Instantiate an Entity
        super()

        // Default shape
        let floorShape: BoxShape = new BoxShape()
        floorShape.withCollisions = withCollision

        // Exterior
        let floorSegment_1 = new Entity()
        floorSegment_1.setParent(this)
        floorSegment_1.addComponent(floorShape)
        floorSegment_1.addComponent(defaultExteriorWallMaterial)
        floorSegment_1.addComponent(new Transform({
            scale: dimension,
            rotation: Quaternion.Euler(0, 0, 0)
        }))
        floorSegment_1.setParent(this)

        // Interior
        let innerFloorSegment_1 = new Entity()
        innerFloorSegment_1.setParent(this)
        innerFloorSegment_1.addComponent(floorShape)
        innerFloorSegment_1.addComponent(defaultFloorMaterial)
        innerFloorSegment_1.addComponent(new Transform({
            position: new Vector3(0, dimension.y + .01, 0),
            scale: new Vector3(dimension.x - (2 * dimension.y), .01, dimension.z - (2 * dimension.y)),
            rotation: Quaternion.Euler(0, 0, 0)
        }))
        innerFloorSegment_1.setParent(this)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MoVA Ceiling Entity
//
export class Ceiling extends Entity {

    constructor(dimension: Vector3, withCollision: boolean = true) {

        // Instantiate an Entity
        super()

        // Default shape
        let ceilingShape: BoxShape = new BoxShape()
        ceilingShape.withCollisions = withCollision

        // Exterior
        let ceilingSegment_1 = new Entity()
        ceilingSegment_1.setParent(this)
        ceilingSegment_1.addComponent(ceilingShape)
        ceilingSegment_1.addComponent(defaultExteriorWallMaterial)
        ceilingSegment_1.addComponent(new Transform({
            //position: new Vector3(dimension.x / 2, dimension.y / 2, dimension.z / 2),
            scale: dimension,
            rotation: Quaternion.Euler(0, 0, 0)
        }))
        ceilingSegment_1.setParent(this)

        // Interior
        let innerCeilingSegment_1 = new Entity()
        innerCeilingSegment_1.setParent(this)
        innerCeilingSegment_1.addComponent(ceilingShape)
        innerCeilingSegment_1.addComponent(defaultInnerWallMaterial)
        innerCeilingSegment_1.addComponent(new Transform({
            position: new Vector3(0, -0.1, 0),
            scale: new Vector3(dimension.x - (2 * dimension.y), .01, dimension.z - (2 * dimension.y)),
            rotation: Quaternion.Euler(0, 0, 0)
        }))
        innerCeilingSegment_1.setParent(this)

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

export function createMuseum(testMode:Boolean = false, moduleLayout:number[][][], position: Vector3, dimension: Vector3, moduleOffset:Vector3) {
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

    for (let level in moduleLayout) {
        for (let positionX in moduleLayout[level]) {
            for (let positionZ in moduleLayout[level][positionX]) {
                let modulePresent:number = moduleLayout[level][positionX][positionZ]
                x = Number(positionX)
                y = Number(level)
                z = Number(positionZ)
                if (modulePresent == 1) {
                    log('The Stack: level', level, 'of', moduleLayout.length, '- x:',
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
                    log('The Stack: level', level, 'of', moduleLayout.length, '- x:',
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


