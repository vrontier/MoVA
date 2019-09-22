import 'mova/library'
import {Building} from "./mova/library"

let moduleDimension: Vector3 = new Vector3(24, 8, 0.1)
let openingDimension: Vector3 = new Vector3(4, 4, 0.1)
let connectorDimension: Vector3 = new Vector3(4, 1, 0.1)
let position: Vector3 = new Vector3(6,1,6)
let rotation: Quaternion = Quaternion.Euler(0,0,0)
let scale: Vector3 = new Vector3(1/20,1/20,1/20)
let layout: string[][][] = [
    [
        ['SE', 'WSE', 'WS'],
        ['NS', 'NSE', 'WNS'],
        ['NE', 'WNSE', 'WN']
    ]]
let MoVA: Building = new Building(layout, moduleDimension, openingDimension, connectorDimension)
MoVA.addComponent(new Transform({position: position, rotation: rotation, scale: scale}))
engine.addEntity(MoVA)
log('Created MoVA in scale ' + scale + ' with ' + MoVA.moduleCount + ' modules (each ' + MoVA.moduleSurface + ' m2) and a total surface of ' + MoVA.buildingSurface  + ' m2!')

