[RoboComp](http://robocomp.org)
===============================

[![Join the chat at https://gitter.im/robocomp/robocomp](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/robocomp/robocomp?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

by [RoboLab](http://robolab.unex.es), [ISIS](http://www.grupoisis.uma.es/index.php?option=com_jresearch&view=staff&Itemid=3&lang=es) and many other collaborators.

RoboComp is an open-source Robotics framework providing the tools to create and modify software components that communicate through public interfaces. Components may *require*, *subscribe*, *implement* or *publish*
interfaces in a seamless way. Building new components is done using two domain specific languages, IDSL and CDSL. With IDSL you define an interface and with CDSL you specify how the component will communicate with the world. With this information, a code generator creates C++ and/or Python sources, based on CMake, that compile and execute flawlessly. When some of these features have to be changed, the component can be easily regenerated and all the user specific code is preserved thanks to a simple inheritance mechanism.

If you already have RoboComp installed, jump to [tutorials!](doc/README.md) to start coding! 

-
# Installation in Ubuntu from PPA

Coming soon...
<!--If you are not planning on modifying RoboComp itself (its libraries or tools), there's no need to go through all the compilation process. In this case, Ubuntu users of versions from 14.10 to 15.04 can install a packaged version of RoboComp. Just run the following commands:

    sudo add-apt-repository  ppa:imnmfotmal/robocomp
    sudo apt-get update
    sudo apt-get install robocomp

Remember to start a new bash session before continue using RoboComp: new variables included must be included in your shell environment.
-->

# Installation from source

Tested in Ubuntu 14.04, 14.10, 15.04, 15.10, 16.04 and 17.04
<!--If you are not an Ubuntu user, need to modify the core of RoboComp, or just feel like installing from sources, you can follow these instructions (they have been tested in Ubuntu 14.04, 14.10, 15.04, 16.04). If you're not in any of these scenarios, please use the packaged version.
-->

## Requirements
So if you have already a version of robocomp runing on your system then you will have to remove the package zeroc-ice35 and older version of robocomp, then follow the instructions below to install the new version. 
To remove the package zeroc-ice35 - 
    apt-get purge zeroc-ice35
If we do not do this, then it conflicts with the new installation.
This removes all the configuration and data files too with the binaries. So we have to rebuild robocomp later on. In short after this we follow the steps as given below.

First we install nodejs and npm - 
    sudo apt-get install nodejs
    sudo apt install npm
    sudo apt-get install nodejs-legacy

Test: Run node -v. The version should be higher than v0.10.32.

We also update npm to latest just for being on a safer side:
    npm install npm@latest -g
Test: Run npm -v. The version should be higher than 2.1.8.

Now we fix the npm permissions : follow [this link](https://docs.npmjs.com/getting-started/fixing-npm-permissions) to fix the npm permissions.

Now after setting up npm and node successfully we go forward and start with installing ice-3.6.3 - 
    If you are a new user please install git first by -
    sudo apt-get install git
First we install Ice for C++, Java, PHP, and all Ice services.
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 5E6DA83306132997
    sudo apt-add-repository "deb http://zeroc.com/download/apt/ubuntu$(lsb_release -rs) stable main"
    sudo apt-get update
    sudo apt-get install zeroc-ice-all-runtime zeroc-ice-all-dev

Second, we install Ice for JS -
    npm install -g slice2js
    npm install -g ice

Third we install Ice for Python (install pip first if not already installed and also the bzlib libraries which are required while installing Ice)- 
    sudo apt install python-pip
    sudo apt-get install libbz2-1.0 libbz2-dev libbz2-ocaml libbz2-ocaml-dev
    pip install zeroc-ice

Now we comeback to installation of robocomp:
Make sure you have installed the following packages from the Ubuntu repository:
    sudo apt-get update
    sudo apt-get install git-annex cmake g++ libgsl0-dev libopenscenegraph-dev cmake-qt-gui freeglut3-dev libboost-system-dev libboost-thread-dev qt4-dev-tools yakuake python-pyparsing python-numpy python-pyside pyside-tools libxt-dev pyqt4-dev-tools qt4-designer libboost-test-dev libboost-filesystem-dev libqt4-dev libqt4-opengl-dev 
    
## Installation itself

*cd* to your user (/home/your-linux-user) directory (you are probably in it already) and type:

    git clone https://github.com/lovemehta/RoboComp-JS.git robocomp

Now we will create a symbolic link so RoboComp can find everything. You will have to enter your password:

    sudo ln -s ~ /home/robocomp
    
(the ~ is in Alt-4)
    
Edit your ~/.bashrc file 

    gedit ~/.bashrc

Add these lines at the end:
    export ROBOCOMP=~/robocomp
    export PATH=$PATH:/opt/robocomp/bin
    export ICEROOT=/usr/lib/x86_64-linux-gnu/
   
make bash process the modified file by typing: 

    source ~/.bashrc

Done! Now let's compile and install the whole thing:

    sudo [ -d /opt/robocomp ] && rm -r /opt/robocomp
    cd robocomp
    mkdir build
    cd build
    cmake ..
    make
    sudo make install
<!--
If you want to compile Robocomp with support for FCL, follow the instructions in the [Robocomp with FCL](doc/Compiling RoboComp with collision detection.md) tutorial"
-->
The RoboComp's core libraries and simulator should now be compiled and installed in `/opt/robocomp`.

Let's now tell Linux where to find RoboComp's libraries:

    sudo nano /etc/ld.so.conf

and add the following line:

    /opt/robocomp/lib/
   
save the file and type:

    sudo ldconfig

Done! Now let's have some fun.

# Testing the installation using the RCIS robotics simulator
We will first fetch some meshes and textures used by the simulator (it will take a while):

    cd ~/robocomp
    git annex get .
    
Now let's run the simulator. 

    cd ~/robocomp/files/innermodel
    rcis simpleworld.xml
    
Congratulations! RCIS should be up and running with a simple robot endowed with a laser and an RGBD camera, moving on a wooden floor. Don't forget to turn around the floor to see the robot from above.
 
#### Installing some RoboLab's components from GitHub

The software of the robots using RoboComp is composed of different software components working together, communicating among them. What we just installed is just the core of RoboComp (the simulator, a component generator and some libraries). To have other features like joystick control we have to run additional software components available from other repositories, for example robocomp-robolab:

    cd ~/robocomp/components
    git clone https://github.com/robocomp/robocomp-robolab.git
    
The RoboLab's set of basic robotics components are now dowloaded. You can see them in `~/robocomp/components/robocomp-robolab/components`

## Connecting a JoyStick (if no JoyStick available skip to the next section)

If you have a joystick around, connect it to the USB port and:

    cd ~/robocomp/components/robocomp-robolab/components/joystickComp
    cmake .
    make
    cd bin
    sudo addgroup your-user dialout   // To solve some permissions issues in Ubuntu
    ./startJoyStick.sh 
    
Your joystick should be now running. It will make the robot advance and turn at your will. If the component does not start or the robot does not move stop joystickcomp with:

    ./forceStopJoyStickComp.sh
    
and check where the joystick device file has been created (e.g., `/dev/input/js0`). If it is not `/dev/input/js0`, edit `~/robocomp/components/robocomp-robolab/components/joystickComp/etc/config` change it accordingly and restart. Note that you might want to save the *config* file to the component's home directory so it does not interfere with future github updates.


## Using the keyboard as a JoyStick

If you don't have a JoyStick install this component,

    cd ~/robocomp/components/robocomp-robolab/components/keyboardrobotcontroller
    cmake .
    make
    src/keyboardrobotcontroller.py --Ice.Config=etc/config
    
and use the arrow keys to navigate the robot, the space bar to stop it an 'q' to exit.


---------------------------------------------------------------------
You can find more tutorials on RoboComp in [tutorials!](doc/README.md) 

Drop comments and ask questions in:

- https://groups.google.com/forum/?hl=es#!forum/robocomp-dev
- https://gitter.im/robocomp

Please, report any bugs to pbustos@unex.es



    
    
    



