import {rasberryPiConnectors, rasberryPiPinsMaps} from './componentList.js';

export const codeLogic = (connectedPointSequence) => {

    if(connectedPointSequence.length==0) {
        return {
            "error": "No connection found"
        }
    }
    
    const requiedConnections = [
      "GPIO",
      "GND",
      "relayPin2",
      "relayPin3",
      "relayConnector1",
      "relayConnector2",
      "relayConnector3",
      "3.3v",
      "batteryP",
        "batteryN",
        "m1",
        "m2"
    ]

    let count = 0;



    connectedPointSequence.forEach(connections => {
        
        if( requiedConnections.find( e => e == connections.connector)){
            console.log("found"  , connections.connector)
            count++;
            return;
        }

        if(rasberryPiPinsMaps[connections.connector] == 'GND' || rasberryPiPinsMaps[connections.connector] == '3.3v' ) {
            console.log("found", connections.connector)
            count++;
            return;
        }

        if(!rasberryPiConnectors[connections.connector]) {
            return; 
        }

        if(rasberryPiPinsMaps[connections.connector].includes('GPIO')) {
            count++
        }


    });
    return  (count == 10)
}