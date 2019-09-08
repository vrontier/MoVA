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

                        // if (moduleId >= 1) {
                        //     let connector: Connector = new Connector(connectorDimension, defaultWithCollisions)
                        //     let connectorPosition: Vector3 = (new Vector3(moduleDimension.x, 0, moduleDimension.x/2 - connectorDimension.x/2 - connectorDimension.z)).add(position)
                        //     connector.addComponent(new Transform({position: connectorPosition}))
                        //     connector.setParent(this)
                        // }
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
// MoVA Connector entity
//
export class Connector extends Entity {

    constructor(dimension: Vector3, withCollisions: boolean = true) {

        // Instantiate an Entity
        super()

        // Default shape
        let wallShape: BoxShape = new BoxShape()
        wallShape.withCollisions = withCollisions

        let wall_S: Wall = new Wall(dimension, new Vector3(0,0,0), withCollisions)
        wall_S.addComponent(new Transform({
            position: new Vector3(0, 0, 0)
        }))
        wall_S.setParent(this)

        let floor: Floor = new Floor(new Vector3(dimension.x, dimension.z, dimension.x), withCollisions)
        floor.addComponent(new Transform({
            position: new Vector3(dimension.x/2, 0, dimension.x/2)
        }))
        floor.setParent(this)

        let wall_N: Wall = new Wall(dimension, new Vector3(0,0,0), withCollisions)
        wall_N.addComponent(new Transform({
            position: new Vector3(dimension.x, 0, dimension.x),
            rotation: Quaternion.Euler(0, 180, 0)
        }))
        wall_N.setParent(this)

        if (logging) log(msgDEBUG + 'Connector created')

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
