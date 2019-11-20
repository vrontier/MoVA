# Museum of Virtual Arts (MoVA)
![Cryptovrontier's Museum of Virtual Arts (MoVA)](https://github.com/vrontier/assets/blob/master/mova/MoVA_alpha.jpg)

## Description
This is the code for the Museum of Virtual Arts (MoVA), a flexible virtual structure for the exhibition of virtual 
artworks. Key vision of this project is to create a "Building as Code" that can adapt in its layout and sizing (capacity) 
to the needs of its builder. I publish the building and its code as open source under the Apache License 2.0 
so feel free to copy and re-use! 

MoVA will be placed in Aetheria, Decentraland (coordinates will be published here). 

## Structural components
The building consists of square modules being linked with each via bridges forming a module level. Levels can be stacked on top 
of each other to from a larger structure (got inspired by the "The Stacks" in Ready Player One). The modules are all of 
the same size which can be configured by the builder. 

In order to access the different levels of the building, an elevator has been implemented. 

## Sample creation of a building 
In order to create a 3 x 3 x 3 structure of 6m (length and width) and 4m (height) modules with 10cm 
thick walls you will need the following code:

```typescript
// Module (6m length, 6m width, 4m height and 10cm thick walls)
let moduleDimension: Vector3 = new Vector3(6, 4, 0.1)

// Opening passage of a module (4m height, 4m width and 10cm thick)
let openingDimension: Vector3 = new Vector3(4, 4, 0.1)

// Connector between modules (4m width, 4m length and 10cm thick)
let connectorDimension: Vector3 = new Vector3(4, 4, 0.1)

// Position of the building (x, y, z coordinate)
let position: Vector3 = new Vector3(4, 6, 2)

// Rotation of the building (x, y, z using the Euler method)
let rotation: Vector3 = Quaternion.Euler(0, 0, 0)

// Scale of the building (0-100% x, 0-100% y, 0-100%z)
let scale: Vector3 = new Vector3(1, 1, 1)

// Layout of the building (3 levels a 3 x 3 modules with openings to all sides: North, East, South and West)
layout = [
    [
        ['NESW'], ['NESW'], ['NESW'],
        ['NESW'], ['NESW'], ['NESW'],
        ['NESW'], ['NESW'], ['NESW'] 
    ],
    [
        ['NESW'], ['NESW'], ['NESW'],
        ['NESW'], ['NESW'], ['NESW'],
        ['NESW'], ['NESW'], ['NESW'] 
    ],
    [
        ['NESW'], ['NESW'], ['NESW'],
        ['NESW'], ['NESW'], ['NESW'],
        ['NESW'], ['NESW'], ['NESW'] 
    ]
]

// Create the building entity
let MoVASimple: Building = new Building(layout, moduleDimension, openingDimension, connectorDimension)
// Position, rotate and scale it
MoVASimple.addComponent(new Transform({position: position, rotation: rotation, scale: scale}))
// Add building entity to engine
engine.addEntity(MoVASimple)
```
