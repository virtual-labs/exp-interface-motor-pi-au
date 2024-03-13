### Procedure

* The output side of the relay decides the on/off operation. If the orange cable (as seen in the diagram below) is connected to the bottom, then it is OFF/ON.
* If you connect the orange cable to the upper slot the operation will be ON/OFF.
* Once you turn the Raspberry on, the red light on the relay should light up. The green light will only light up if the relay is activated.

#### Software:
On the Raspberry open the terminal and use the following codes:
```
sudo apt-get update
sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer
```

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
