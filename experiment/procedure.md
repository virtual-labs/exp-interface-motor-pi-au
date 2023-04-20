### Procedure

* The output side of the relay decides the on/off operation. If the orange cable (as seen in the diagram below) is connected to the bottom, then it is OFF/ON.
* If you connect the orange cable to the upper slot the operation will be ON/OFF.
* Once you turn the Raspberry on, the red light on the relay should light up. The green light will only light up if the relay is activated.

Software:
On the Raspberry open the terminal and use the following codes:
* sudo apt-get update
* sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer

Installation Of Python:
* Ensure your Raspberry Pi is running the latest version of all the software. Run the following two commands on your Raspberry Pi to update it.
sudo apt-get update
sudo apt-get upgrade
* Install the python 2.7 dev package:
Sudo apt-get install python2.7-dev
* Execution of Motor:Open the terminal on the Raspberry and type:
sudo nano moto.py

Python code:

    import RPi.GPIO as GPIO
    import time
    channel = 21
    #GPIO setup
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(channel, GPIO.OUT, initial=GPIO.HIGH)

    def motor_on(pin):

    GPIO.output(pin, GPIO.LOW)  # Turn motor on

    def motor_off(pin):


    GPIO.output(pin, GPIO.HIGH)  # Turn motor off


    if __name__ == '__main__':


    try:


        motor_on(channel)


        print("ON")


        time.sleep(5)


        motor_off(channel)


        print("OFF")


        GPIO.cleanup()


    except KeyboardInterrupt:


        GPIO.cleanup()

