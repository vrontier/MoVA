// *********************************************************************************************************************
//
//                                 Mike Quest (Cryptovrontier) & Luke Escobar (ile)
//                            DCL LANDSCAPES - an open library for programmed landscapes
//
// *********************************************************************************************************************
// import * as dclLandscapes from "./dcl-landscapes/library"
//
// // Variable taking positioning raw data
// let layerRawData: string = ""
//
// // Create model repository
// let entityRepositoryItems: dclLandscapes.EntityRepositoryItems = [
//     { id: 100, type: 'gltf', fileName: 'museum_cube_2_door_cornered.gltf' },
//     { id: 101, type: 'gltf', fileName: 'museum_cube_2_door_opposite.gltf' },
//     { id: 102, type: 'gltf', fileName: 'museum_cube_3_door.gltf' },
//     { id: 103, type: 'gltf', fileName: 'museum_cube_4_door.gltf' },
//     { id: 104, type: 'gltf', fileName: 'museum_cube_connect.gltf' }
// ]
// let entityRepository: dclLandscapes.EntityRepository = new dclLandscapes.EntityRepository(entityRepositoryItems)
//
// let scale: number = 1
//
// let offSet_x: number = 40
// let offSet_y: number = 0
// let offSet_z: number = 40
//
// let offSet_Connector_x: number = 14
// let offSet_Connector_y: number = 0
// let offSet_Connector_z: number = 14
//
// layerRawData =
//     "0,0 103\n"
//     + "0,1 103\n"
//     + "1,0 103\n"
//     + "1,1 103\n"
//
// let movaModuleLayer1: dclLandscapes.Layer = new dclLandscapes.Layer(
//     "MoVA",
//     new Vector3(2,0,2),
//     layerRawData,
//     new Vector3(offSet_x,offSet_y,offSet_z),
//     Quaternion.Euler(0,0,0),
//     28,
//     new Vector3(scale,scale,scale),
//     true
// )
//
// dclLandscapes.placeLayer(movaModuleLayer1,entityRepository)
//
// layerRawData =
//     "0,0 104\n"
//   + "1,0 104\n"
//
// let movaConnectorLayer1: dclLandscapes.Layer = new dclLandscapes.Layer(
//     "MoVA",
//     new Vector3(2,0,2),
//     layerRawData,
//     new Vector3(offSet_x, offSet_y, offSet_z + offSet_Connector_z * scale),
//     Quaternion.Euler(0,0,0),
//     28,
//     new Vector3(scale,scale,scale),
//     true
// )
//
// dclLandscapes.placeLayer(movaConnectorLayer1,entityRepository)
//
// layerRawData =
//     "0,0 104 0 0,90,0\n"
//     + "0,1 104 0 0,90,0\n"
//
// let movaConnectorLayer2: dclLandscapes.Layer = new dclLandscapes.Layer(
//     "MoVA",
//     new Vector3(2,0,2),
//     layerRawData,
//     new Vector3(offSet_x + offSet_Connector_x * scale, offSet_y, offSet_z),
//     Quaternion.Euler(0,0,0),
//     28,
//     new Vector3(scale,scale,scale),
//     true
// )
//
// dclLandscapes.placeLayer(movaConnectorLayer2,entityRepository)
