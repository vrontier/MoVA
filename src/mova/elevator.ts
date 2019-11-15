////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                             Museum of Virtual Arts (MoVA), Aetheria, Decentraland
//                                                 "Elevator"
//
//                                CryptoVrontier https://github.com/vrontier/MoVA
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import utils from "../../node_modules/decentraland-ecs-utils/index"
import {ToggleState} from "../../node_modules/decentraland-ecs-utils/toggle/toggleComponent"

// Master control switch for logging
let logging: boolean = true
let msgERROR: string = "MoVA - ERROR: "
let msgWARNING: string = "MoVA - WARNING: "
let msgDEBUG: string = "MoVA - DEBUG: "

export class Elevator extends Entity {
    constructor(upperLevel: number, elevatorPosition?: Vector3, elevatorDimension?: Vector3) {

        // Instantiate an Entity
        super()

        if (!elevatorDimension) elevatorDimension = new Vector3(4, 0.1, 4)
        if (!elevatorPosition) elevatorPosition = new Vector3(10, 0, 10)

        // Features
        let withCollision: boolean = true
        let elevatorTravelTime: number = 5 // secs
        let doorOpenCloseTime: number = 2 // secs
        let controlDisplayDelay: number = 0.2 // secs
        let doorClosure: number = 1 // percentage

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
        defaultFloorMaterial.albedoColor = new Color3(.6, .6, .6)
        defaultFloorMaterial.metallic = 0.5
        defaultFloorMaterial.roughness = 0.2
        defaultFloorMaterial.disableLighting = false

        const elevatorGlassWall: Material = new Material()
        elevatorGlassWall.albedoColor = new Color4(0, 0, 0, 0.6)
        elevatorGlassWall.metallic = 0.2
        elevatorGlassWall.roughness = 0.2
        elevatorGlassWall.disableLighting = false

        const controlSwitchMaterial: Material = new Material()
        controlSwitchMaterial.albedoColor = new Color4(1, 1, 1, 0.6)
        controlSwitchMaterial.metallic = 0.2
        controlSwitchMaterial.roughness = 0.2
        controlSwitchMaterial.disableLighting = false

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        // Structural components
        //

        let controlUpSwitch = false
        let controlDownSwitch = false

        let elevatorShape: BoxShape = new BoxShape()
        elevatorShape.withCollisions = withCollision
        this.addComponentOrReplace(new Transform({
            position: elevatorPosition
        }))
        if (logging) log(msgDEBUG + 'Elevator at position: ' + this.getComponent(Transform).position + ', dimension: ' + this.getComponent(Transform).scale)


        let elevatorDoors: Entity = new Entity()
        elevatorDoors.addComponent(new Transform({
            position: new Vector3(0,0,0),
            scale: new Vector3(1,0,1)
        }))
        elevatorDoors.setParent(this)
        elevatorDoors.addComponent(new OnClick(() => controlUpSwitch = true))
        if (logging) log(msgDEBUG + 'ElevatorDoors at position: ' + elevatorDoors.getComponent(Transform).position + ', dimension: ' + elevatorDoors.getComponent(Transform).scale)

        // Northern wall
        let elevatorWall_N: Entity = new Entity()
        elevatorWall_N.addComponent(elevatorShape)
        elevatorWall_N.addComponent(elevatorGlassWall)
        elevatorWall_N.addComponent(new Transform({
            scale: new Vector3(elevatorDimension.x, elevatorDimension.x, elevatorDimension.y),
            position: new Vector3(0, elevatorDimension.x / 2, elevatorDimension.x / 2 - elevatorDimension.y / 2)
        }))
        elevatorWall_N.setParent(elevatorDoors)
        if (logging) log(msgDEBUG + 'elevatorWall_N at position: ' + elevatorWall_N.getComponent(Transform).position + ', dimension: ' + elevatorWall_N.getComponent(Transform).scale)

        // Western wall
        let elevatorWall_W: Entity = new Entity()
        elevatorWall_W.addComponent(elevatorShape)
        elevatorWall_W.addComponent(elevatorGlassWall)
        elevatorWall_W.addComponent(new Transform({
            scale: new Vector3(elevatorDimension.y, elevatorDimension.x, elevatorDimension.x),
            position: new Vector3(-1 * (elevatorDimension.x / 2 - elevatorDimension.y / 2), elevatorDimension.x / 2, 0)
        }))
        elevatorWall_W.setParent(elevatorDoors)
        if (logging) log(msgDEBUG + 'elevatorWall_W at position: ' + elevatorWall_W.getComponent(Transform).position + ', dimension: ' + elevatorWall_W.getComponent(Transform).scale)

        // Eastern wall
        let elevatorWall_E: Entity = new Entity()
        elevatorWall_E.addComponent(elevatorShape)
        elevatorWall_E.addComponent(elevatorGlassWall)
        elevatorWall_E.addComponent(new Transform({
            scale: new Vector3(elevatorDimension.y, elevatorDimension.x, elevatorDimension.x),
            position: new Vector3(elevatorDimension.x / 2 - elevatorDimension.y / 2, elevatorDimension.x / 2, 0)
        }))
        elevatorWall_E.setParent(elevatorDoors)
        if (logging) log(msgDEBUG + 'elevatorWall_E at position: ' + elevatorWall_E.getComponent(Transform).position + ', dimension: ' + elevatorWall_E.getComponent(Transform).scale)

        // Southern wall
        let elevatorWall_S: Entity = new Entity()
        elevatorWall_S.addComponent(elevatorShape)
        elevatorWall_S.addComponent(elevatorGlassWall)
        elevatorWall_S.addComponent(new Transform({
            scale: new Vector3(elevatorDimension.x, elevatorDimension.x, elevatorDimension.y),
            position: new Vector3(0, elevatorDimension.x / 2, -1 * (elevatorDimension.x / 2 - elevatorDimension.y / 2))
        }))
        elevatorWall_S.setParent(elevatorDoors)
        if (logging) log(msgDEBUG + 'elevatorWall_S at position: ' + elevatorWall_S.getComponent(Transform).position + ', dimension: ' + elevatorWall_S.getComponent(Transform).scale)

        // Cabin floor
        let elevatorFloor: Entity = new Entity()
        elevatorFloor.addComponent(elevatorShape)
        elevatorFloor.addComponent(defaultExteriorWallMaterial)
        elevatorFloor.addComponent(new Transform({
            scale: elevatorDimension
        }))
        elevatorFloor.setParent(this)
        if (logging) log(msgDEBUG + 'ElevatorFloor at position: ' + elevatorFloor.getComponent(Transform).position + ', dimension: ' + elevatorFloor.getComponent(Transform).scale)

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        // Controller
        //

        let elevatorBell: Entity = new Entity()
        let elevatorBellAudioClip: AudioClip = new AudioClip("sounds/264594__cdrk__reception-bell.mp3")
        let elevatorBellAudioSource: AudioSource = new AudioSource(elevatorBellAudioClip)
        elevatorBellAudioSource.playing = true
        elevatorBellAudioSource.volume = 0.8
        elevatorBell.addComponent(elevatorBellAudioSource)
        elevatorBell.addComponent(new Transform({
            position: new Vector3(0,0.70, 0)
        }))
        elevatorBell.setParent(this)

        let elevatorControl: Entity = new Entity()
        elevatorControl.addComponent(elevatorShape)
        elevatorControl.addComponent(controlSwitchMaterial)
        elevatorControl.addComponent(new Transform({
            position: new Vector3(0,1.39, 0),
            scale: new Vector3(0.1, 0.02, 0.1)
        }))
        elevatorControl.setParent(this)

        // Control up
        let elevatorUpControl: Entity = new Entity()
        elevatorUpControl.addComponent(new GLTFShape("models/elevator_pyramid_indicator.glb"))
        elevatorUpControl.addComponent(new Transform({
            position: new Vector3(0, 1.46, 0),
            scale: new Vector3(0.05, 0.05, 0.05)
        }))
        elevatorUpControl.setParent(this)

        // Toggle for elevatorUpControl
        elevatorUpControl.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
            if (value == utils.ToggleState.On){
                // Hide control
                engine.removeEntity(elevatorUpControl)
                engine.removeEntity(elevatorDownControl)
                // Lift doors
                elevatorDoors.addComponentOrReplace(new utils.ScaleTransformComponent(elevatorDoors.getComponent(Transform).scale, Vector3.Add(elevatorDoors.getComponent(Transform).scale, new Vector3(0, doorClosure, 0)), 2))
                // Move up
                this.addComponentOrReplace(new utils.MoveTransformComponent(elevatorPosition, Vector3.Add(elevatorPosition, new Vector3(0,upperLevel,0)), elevatorTravelTime))
                // Lower doors
                let elevatorDoorTimer: Entity = new Entity()
                elevatorDoorTimer.setParent(this)
                elevatorDoorTimer.addComponentOrReplace(new utils.Delay((elevatorTravelTime - doorOpenCloseTime) * 1000, () => {
                    elevatorDoors.addComponentOrReplace(new utils.ScaleTransformComponent(elevatorDoors.getComponent(Transform).scale, Vector3.Add(elevatorDoors.getComponent(Transform).scale, new Vector3(0, -1*doorClosure, 0)), 2))
                }))
                // Bell sound
                let elevatorBellTimer: Entity = new Entity()
                elevatorBellTimer.setParent(this)
                elevatorBellTimer.addComponentOrReplace(new utils.Delay((elevatorTravelTime) * 1000, () => {
                    elevatorBell.getComponent(AudioSource).playOnce()
                }))
                // Show control
                let elevatorControlTimer: Entity = new Entity()
                elevatorControlTimer.setParent(this)
                elevatorControlTimer.addComponentOrReplace(new utils.Delay((elevatorTravelTime + controlDisplayDelay) * 1000, () => {
                    elevatorDownControl.getComponent(GLTFShape).visible = true
                    engine.addEntity(elevatorDownControl)
                    elevatorUpControl.getComponent(utils.ToggleComponent).set(ToggleState.Off)
                }))
            }
        }))

        //listen for click on elevatorUpControl and toggle it's state
        elevatorUpControl.addComponent(new OnClick(event=>{
            elevatorUpControl.getComponent(utils.ToggleComponent).toggle()
        }))
        if (logging) log(msgDEBUG + 'elevatorControl at position: ' + elevatorUpControl.getComponent(Transform).position + ', dimension: ' + elevatorUpControl.getComponent(Transform).scale)

        // Control down
        let elevatorDownControl: Entity = new Entity()
        elevatorDownControl.addComponent(new GLTFShape("models/elevator_pyramid_indicator.glb"))
        elevatorDownControl.addComponent(new Transform({
            position: new Vector3(0, 1.46, 0),
            scale: new Vector3(0.05, 0.05, 0.05),
            rotation: Quaternion.Euler(0,0,180)
        }))
        elevatorDownControl.getComponent(GLTFShape).visible = false
        elevatorDownControl.setParent(this)

        // Toggle for elevatorDownControl
        elevatorDownControl.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
            if (value == utils.ToggleState.On){
                // Hide control
                engine.removeEntity(elevatorUpControl)
                engine.removeEntity(elevatorDownControl)
                // Lift doors
                elevatorDoors.addComponentOrReplace(new utils.ScaleTransformComponent(elevatorDoors.getComponent(Transform).scale, Vector3.Add(elevatorDoors.getComponent(Transform).scale, new Vector3(0, doorClosure, 0)), 2))
                // Move down
                this.addComponentOrReplace(new utils.MoveTransformComponent(Vector3.Add(elevatorPosition, new Vector3(0,upperLevel,0)), elevatorPosition, elevatorTravelTime))
                // Lower doors
                let elevatorDoorTimer: Entity = new Entity()
                elevatorDoorTimer.setParent(this)
                elevatorDoorTimer.addComponentOrReplace(new utils.Delay((elevatorTravelTime - doorOpenCloseTime) * 1000, () => {
                    elevatorDoors.addComponentOrReplace(new utils.ScaleTransformComponent(elevatorDoors.getComponent(Transform).scale, Vector3.Add(elevatorDoors.getComponent(Transform).scale, new Vector3(0, -1*doorClosure, 0)), 2))
                }))
                // Bell sound
                let elevatorBellTimer: Entity = new Entity()
                elevatorBellTimer.setParent(this)
                elevatorBellTimer.addComponentOrReplace(new utils.Delay((elevatorTravelTime) * 1000, () => {
                    elevatorBell.getComponent(AudioSource).playOnce()
                }))
                // Show control
                let elevatorControlTimer: Entity = new Entity()
                elevatorControlTimer.setParent(this)
                elevatorControlTimer.addComponentOrReplace(new utils.Delay((elevatorTravelTime + controlDisplayDelay) * 1000, () => {
                    engine.addEntity(elevatorUpControl)
                    elevatorDownControl.getComponent(utils.ToggleComponent).set(ToggleState.Off)
                }))
            }
        }))

        //listen for click on elevatorDownControl and toggle it's state
        elevatorDownControl.addComponent(new OnClick(event=>{
            elevatorDownControl.getComponent(utils.ToggleComponent).toggle()
        }))
        if (logging) log(msgDEBUG + 'elevatorControl at position: ' + elevatorDownControl.getComponent(Transform).position + ', dimension: ' + elevatorDownControl.getComponent(Transform).scale)

    }
}
