### Procedure
#### Hardware Setup:
Review the provided instructions thoroughly, then proceed with the circuit assembly as outlined in the accompanying circuit diagram.
1. **Connect the Relay to the Raspberry Pi**:
   - Connect the **3.3V pin** (Physical Pin 1) of the Raspberry Pi to the **VCC pin** of the relay to supply power.
   - Connect a **GND pin** (e.g., Physical Pin 9) of the Raspberry Pi to the **GND pin** of the relay to complete the control circuit.
   - Connect **GPIO21** (Physical Pin 40) of the Raspberry Pi to the **Input pin** of the relay to control its switching.
2. **Connect the Relay to the Motor and Battery**:
   - Connect the **COM (Common) pin** of the relay to the **positive (+ve) terminal** of the 9V battery (voltage source).
   - Connect the **NO (Normally Open) pin** of the relay to the **positive (+ve) terminal** of the DC motor.
   - Connect the **negative (-ve) terminal** of the 9V battery to the **negative (-ve) terminal** of the DC motor to complete the motor circuit.
3. **Verify Connections**: Double-check all connections to ensure they are accurate and securely wired.
4. After completing the connections, click the "Code" button and then click the "Submit" button 
5. Ensure the circuit works correctly and matches the diagram.

#### Software Setup:
1. **Update the Raspberry Pi**: Open the terminal and ensure the system is up-to-date by running:

#### Installation Of Python:
1. Ensure your Raspberry Pi is running the latest version of all the software. Run the following two commands on your Raspberry Pi to update it.
``` sudo apt-get update
    sudo apt-get upgrade
```
2. Install the python 2.7 dev package:
```
    sudo apt-get install python2.7-dev
```
3. Execution of Motor:Open the terminal on the Raspberry and type:
```  
    sudo nano moto.py
```
#### Python code:

    import RPi.GPIO as GPIO
    import time

    # Set up GPIO
     GPIO.setmode(GPIO.BCM)
     GPIO.setup(relay_pin, GPIO.OUT)

    # Function to turn on the motor
     def turn_on_motor():
        GPIO.output(relay_pin, GPIO.HIGH)
        print("Motor ON")

    # Function to turn off the motor
     def turn_off_motor():
        GPIO.output(relay_pin, GPIO.LOW)
        print("Motor OFF")

    try:
         # Set the GPIO pin for the relay
         relay_pin = 17 

        # Main loop
        while True:
                turn_on_motor()
                time.sleep(5)  # Run the motor for 5 seconds
                turn_off_motor()
                time.sleep(2)  # Wait for 2 seconds before turning on again

    except KeyboardInterrupt:
        # Clean up GPIO on keyboard interrupt
         GPIO.cleanup()
