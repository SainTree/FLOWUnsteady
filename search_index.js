var documenterSearchIndex = {"docs":
[{"location":"tutorials/first-steps/#First-Steps-1","page":"First Steps","title":"First Steps","text":"","category":"section"},{"location":"tutorials/first-steps/#Geometry-Basics-1","page":"First Steps","title":"Geometry Basics","text":"","category":"section"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"In this tutorial, we'll begin by defining the geometry for a simple wing.  Note that all the functions used are described in the Reference section of this documentation if you would like further information at any point.  Before you begin this tutorial, it is expected that you've already installed the necessary components of FLOWUnsteady, and that you are familiar with visualization in Paraview.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"First things first, we need to include the FLOWUnsteady components","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"import FLOWUnsteady\nuns = FLOWUnsteady\nvlm = uns.vlm\n\nspan = 1.0\naspectratio = 10.0\ntaperratio = 0.5\nwingtwist = 0.0\nwingsweep = 10.0 #degrees\nwingdihedral = 7.0 #degrees","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"import FLOWUnsteady\nuns = FLOWUnsteady\nvlm = uns.vlm","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Let's begin with a single section, symmetric wing.  We'll start by defining some basic geometry.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"span = 1.0\naspectratio = 10.0\ntaperratio = 0.5\nwingtwist = 0.0\nwingsweep = 10.0 #degrees\nwingdihedral = 7.0 #degrees","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Then we'll call the simpleWing() function to create a simple wing object.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"mainwing = vlm.simpleWing(span,aspectratio,taperratio,wingtwist,wingsweep,wingdihedral)","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Congratulations! You've created your first wing object.  If you want, you can take a moment to explore the contents of your newly created mainwing.  You can do so using fieldnames(mainwing) and poking around. The Reference section will have more info on the contents of the wing object.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Next, let's create a wing system.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"system = vlm.WingSystem()","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"You now have an empty wing system, so let's add our mainwing object to it with the name \"mainwing.\"","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"vlm.addwing(system,\"mainwing\",mainwing)","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Now that we have a wing system, let's save it as a .vtk file so we can view it in paraview.  In order to do so, we are required to define a freestream velocity.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Vinf(x,t) = [1,0,0]\nvlm.setVinf(system, Vinf)","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"We will also want to set some parameters for saving files and set up our file system to put the files where we want.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"run_name = \"tutorial\"\nsave_path = \"./simplewing/\"\n\nrun(`rm -rf $save_path`)\nrun(`mkdir $save_path`)","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Finally, we can save the files.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"vlm.save(system, run_name; path=save_path)","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"And now we can view our wing in Paraview using the command run(`paraview --data=\"$(save_path)/$(run_name)_mainwing_vlm.vtk\"`) (assuming you've set up an alias for paraview on your computer).","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"(Image: alt text)","category":"page"},{"location":"tutorials/first-steps/#Adding-a-Rotor-1","page":"First Steps","title":"Adding a Rotor","text":"","category":"section"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Now that we have a basic wing, let's go ahead and add a rotor.  We'll use some data for the rotor that already exists in FLOWUnsteady.  You can visit the How-to guides for more information on creating your own rotor database.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"rotor_file = \"apc10x7.csv\"          # Rotor geometry\ndata_path = uns.def_data_path       # Path to rotor database","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"With the rotor data, we can generate our rotor. This might take a minute or so to run. We supress the output here with a semi-colon as it prints a large output.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"rotor_file = \"apc10x7.csv\"          # hide\ndata_path = uns.def_data_path       # hide\nrotor = uns.generate_rotor(rotor_file; pitch=0.0,\n                                            n=10, CW=true, ReD=1.5e6,\n                                            verbose=true, xfoil=false,\n                                            data_path=data_path,\n                                            plot_disc=false);","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"And then we can generate a rotor object, where we again supress the output.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"rotors = vlm.Rotor[rotor];","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"This will put the rotor at the default location and orientation which we will define here since we now need to move the rotor relative to the wing which is already at this location.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"vehicleorigin = [0.0; 0.0; 0.0]\nvehicleaxis = [1.0 0.0 0.0; 0.0 1.0 0.0; 0.0 0.0 1.0]","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"To move the rotor, we need to define a new origin point.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"rotororigin = [-0.1; 0.0; 0.0]","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Then we can use that origin to set the rotor coordinate system in order to move the rotor.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"for rotor in rotors\n    vlm.setcoordsystem(rotor, rotororigin, vehicleaxis; user=true)\nend","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"which we can put in a tuple that stores our rotor system(s).","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"rotors_system = (rotor,);","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"We also need to add it to our overall system.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"for rotor in rotors; vlm.addwing(system, run_name, rotor); end;","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"Like setting the Vinf parameter for the main wing, we need to give our rotor an RPM as well.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"for rotor in rotors; vlm.setRPM(rotor, 6000); end;","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"We should now be able to visualize our wing with a rotor.","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"run(`rm -rf $save_path`)\nrun(`mkdir $save_path`)\n\nvlm.save(system, run_name; path=save_path)\nrun(`paraview --data=\"$(save_path)/tutorial_mainwing_vlm.vtk;tutorial_tutorial_Blade1_vlm.vtk;tutorial_tutorial_Blade2_vlm.vtk;tutorial_tutorial_Blade1_loft.vtk;tutorial_tutorial_Blade2_loft.vtk;\"`)","category":"page"},{"location":"tutorials/first-steps/#","page":"First Steps","title":"First Steps","text":"(Image: alt text)","category":"page"},{"location":"tutorials/first-steps/#Other-Systems-1","page":"First Steps","title":"Other Systems","text":"","category":"section"},{"location":"tutorials/first-steps/#VLM-Systems-1","page":"First Steps","title":"VLM Systems","text":"","category":"section"},{"location":"tutorials/first-steps/#Wake-Systems-1","page":"First Steps","title":"Wake Systems","text":"","category":"section"},{"location":"tutorials/first-steps/#Tilting-Systems-1","page":"First Steps","title":"Tilting Systems","text":"","category":"section"},{"location":"tutorials/first-steps/#Kinematic-Maneuvers-1","page":"First Steps","title":"Kinematic Maneuvers","text":"","category":"section"},{"location":"tutorials/first-steps/#Setting-up-a-Basic-Simulation-1","page":"First Steps","title":"Setting up a Basic Simulation","text":"","category":"section"},{"location":"reference/FLOWVLM/#FLOWVLM-1","page":"FLOWVLM","title":"FLOWVLM","text":"","category":"section"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"FLOWVLM is a vortex lattice method (VLM) code for solving aerodynamics, but is far more than that. FLOWVLM has a general three-dimensional geometric engine that powers much of the geometry of FLOWUnsteady and is also the foundation of the blade-element rotor solver. In this section we describe how wing geometries are defined, how multiple wings can be grouped into a wing system, and how objects can be rotated and translated in space.","category":"page"},{"location":"reference/FLOWVLM/#Wing-Definition-1","page":"FLOWVLM","title":"Wing Definition","text":"","category":"section"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"A FLOWVLM.Wing object is simply a data structure that encapsulates a collection of horseshoes vortices (or a vortex lattice). A horseshoe vortex is made out of one bound vortex located at the quarter-chord position, two trailing bound vortices going back to the trailing edge, and two semi-infinite vortices extending from the trailing edge out in the direction of the freestream, as shown below.","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"(Image: )","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"A control point is associated to every horseshoe, which is located at the three-quarter chord position. At this point, the no-flow-through boundary condition is imposed, canceling the component of the freestream that is normal to the surface.","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"note: Unsteady wake\nIn the unsteady solver of FLOWUnsteady, semi-infinite trailing vortices of the horseshoes are replaced by vortex particles that are shed off the trailing edge at every time step.","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"There are three ways of defining a VLM wing. The first one is to manually add chord stations along the wing and discretize the sections in between into horseshoes. This approach is tedious and is rarely used. The second one is through the function FLOWVLM.SimpleWing that takes the parameters of the root and tip of the wing and interpolates and discretizes everything in between, which works well for most conventional wings. Finally, for complex geometries (for instance, an asymmetric wing or a wing with winglets), the user can call FLOWVLM.ComplexWing that works pretty much like the option of manually building the wing but in a friendlier way.","category":"page"},{"location":"reference/FLOWVLM/#Manually-Building-the-Wing-1","page":"FLOWVLM","title":"Manually Building the Wing","text":"","category":"section"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"You can build a wing by adding each chord station manually and indicating the discretization in between.   This is done by indicating the leading edge position and chord length at each station, and the number of horseshoes in between stations.   This approach uses the FLOWVLM.Wing constructor to initialize the wing and the FLOWVLM.addwing function to add each chord.","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"FLOWVLM.Wing","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"FLOWVLM.addchord","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"This requires the user to do all the calculations of what the geometry should look like based on the desired aspect ratio, taper ratio, etc.   In the following line we are doing such calculations for a 40^circ-swept-back wing with an aspect ratio of 5.0.","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"  # Wing parameters\n  b = 98*0.0254                   # (m) span\n  ar = 5.0                        # Aspect ratio (span over tip chord)\n  tr = 1.0                        # Taper ratio\n  lambda = 45.0                   # (deg) sweep\n  gamma = 0.0                     # (deg) dihedral\n  twist_tip = 0.0                 # (deg) tip twist\n  twist_root = 0.0                # (deg) root twist\n  n = 4                           # Horseshoes in between chord stations\n\n  # Calculations\n  cr = 1/tr                       # Chord ratio (inverse of taper ratio)\n  c_tip = b/ar                    # Chord at tip\n  c_root = cr*c_tip               # Chord at root\n  y_tip = b/2                     # y-position of tip leading edge\n  x_tip = y_tip*tan(lambda*pi/180)# x-position of tip leading edge\n  z_tip = y_tip*tan(gamma*pi/180) # z-position of tip leading edge","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"We initialize the wing by giving it the first chord station, which corresponds to the left chord.","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"import FLOWVLM\nvlm = FLOWVLM\n\n# Initialize the wing with the left tip chord\nwing = vlm.Wing(x_tip, -y_tip, z_tip, c_tip, twist_tip)","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"Then we go on to add the root and the right tip chord.","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"  # Add the root chord\n  vlm.addchord(wing, 0.0, 0.0, 0.0, c_root, twist_root, n)\n\n  # Add the right tip chord\n  vlm.addchord(wing, x_tip, y_tip, z_tip, c_tip, twist_tip, n)","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"Notice that we placed the root at the (0, 0, 0) position.   This doesn't always have to be this way, but remember to move the other chord stations accordingly if you want to place the nose somewhere else.","category":"page"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"tip: Build wings from left to right\nIt is recommended that wings are build from left to right, or from -y to +y. Otherwise, the normals of the surface will point down in the negative z-direction and the circulation of the wing will be negative when generating upwards lift (positive z-direction). This is not a problem for the solver, but could be difficult to wrap your head around a negative circulation being associated to a positive lift.","category":"page"},{"location":"reference/FLOWVLM/#SimpleWing-1","page":"FLOWVLM","title":"SimpleWing","text":"","category":"section"},{"location":"reference/FLOWVLM/#","page":"FLOWVLM","title":"FLOWVLM","text":"asdasd","category":"page"},{"location":"reference/FLOWVLM/#ComplexWing-1","page":"FLOWVLM","title":"ComplexWing","text":"","category":"section"},{"location":"tutorials/tutorials/#Tutorials-1","page":"Tutorials","title":"Tutorials","text":"","category":"section"},{"location":"tutorials/tutorials/#","page":"Tutorials","title":"Tutorials","text":"Here in the tutorials we go through step-by-step instructions for the basic usage of FLOWUnsteady.  Our goal here is to get you from little/no knowledge to a basic working knowledge of how to use the code.  Tutorials follow a pattern of copy/pasting commands and comparing expected output. The current list of tutorials can be found below, but before you get started, you need to install the code. In addition, the majority of graphical outputs are for visualization in Paraview.  Go to the Getting Started an Paraview Visualiztion how-to guides to get everything set up, then come back here to learn how to start using FLOWUnsteady.","category":"page"},{"location":"#FLOWUnsteady-1","page":"Home","title":"FLOWUnsteady","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Documentation for FLOWUnsteady","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: )","category":"page"}]
}
