### Theory

* DC motor - Any of a group of rotating electric motors that use direct current (DC) electricity to create mechanical energy is referred to as a DC motor. The most prevalent kinds depend on the forces created by induced magnetic fields brought on by current flowing through the coil. For a portion of the motor's current to sometimes shift direction, almost all types of DC motors contain an internal mechanism that is either electromechanical or electronic.

* Relay switch - The electro-mechanical relay is a type of output device (actuator) that may be used in a wide variety of electrical circuits. It is available in a wide variety of forms, sizes, and designs. But even if electrical relays may be used to turn relatively high currents or voltages "ON" or "OFF" in low power electronic or computer type circuits, a relay switch circuit must be employed to do so.The advantage of relays is that it takes a relatively small amount of power to operate the relay coil. However, a relay switch circuit can be used to control motors, heaters, lamps or AC circuits which themselves can draw a lot more electrical voltage, current and therefore power.

* Bread Board - Temporary circuits are constructed using a breadboard, often known as a plugblock. Designers may quickly remove and change components because to its usefulness. It is helpful for someone who wants to construct a circuit to show how it works before reusing the parts in another Circuit.

#### Components:
 1. Raspberry Pi 3
 2. DC motor
 3. Relay Switch 
 4. Breadboard
 5. 9V battery
* Connection Diagram Basics - To interface a DC motor with a Raspberry Pi using a relay, the relay acts as an intermediary switch. The Raspberry Pi’s GPIO pin (e.g., GPIO17) connects to the relay’s input (control) pin to activate the coil, while the relay’s output (normally open, NO, and common, COM) terminals connect the DC motor to an external power source, such as a 9V battery. The relay’s ground is tied to the Raspberry Pi’s GND, and the motor circuit remains isolated from the Raspberry Pi’s low-voltage system, protecting it from high current demands.

* Working Principle - The working principle involves the Raspberry Pi sending a HIGH (3.3V) or LOW (0V) signal via its GPIO pin to the relay’s coil. When the GPIO pin outputs HIGH, the relay coil energizes, closing the switch and completing the motor’s circuit with the 9V battery, causing the motor to run. When the GPIO pin outputs LOW, the coil de-energizes, opening the switch and stopping the motor. This setup leverages the relay’s ability to isolate and control high-power devices with the Raspberry Pi’s low-power logic signals.