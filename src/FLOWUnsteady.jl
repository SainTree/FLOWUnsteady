"""
Mixed-fidelity unsteady aerodynamics simulation engine.

    # AUTHORSHIP
      * Author    : Eduardo J. Alvarez
      * Email     : Edo.AlvarezR@gmail.com
      * Created   : Oct 2019
      * License   : MIT
"""
module FLOWUnsteady

# ------------ GENERIC MODULES -------------------------------------------------
import Dierckx
import CSV
import JLD
using PyPlot
using LinearAlgebra: norm, dot, cross, I

# ------------ FLOW CODES ------------------------------------------------------
# FLOWVLM https://github.com/byuflowlab/FLOWVLM
import FLOWVLM
const vlm = FLOWVLM

# MyVPM https://github.com/EdoAlvarezR/MyVPM
try                     # Load MyVPM if available
    import MyVPM
catch e                 # Otherwise load a dummy version of MyVPM
    include("FLOWUnsteady_dummy_MyVPM.jl")
end
const vpm = MyVPM

# GeometricTools https://github.com/byuflowlab/GeometricTools.jl
import GeometricTools
const gt = GeometricTools

# ------------ GLOBAL VARIABLES ------------------------------------------------
const module_path = splitdir(@__FILE__)[1]                # Path to this module
const def_data_path = joinpath(module_path, "../data/")   # Default path to data folder


# ------------ HEADERS ---------------------------------------------------------
# Load modules
for module_name in ["vehicle", "vehicle_vlm",
                    "maneuver", "rotor",
                    "simulation_types", "simulation", "utils",
                    "processing", "noise", "monitors"]
    include("FLOWUnsteady_"*module_name*".jl")
end

end # END OF MODULE
