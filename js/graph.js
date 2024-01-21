var dirDist50 = "#c93e70",
  dirDist51 = "#280F36",
  dirDist52 = "#174EA6",
  dirDist53 = "#292965",
  dirDist54 = "#CE751D",
  dirDist55 = "#E7A553",

  dirDist10 = "#2a2a2a",
  dirDistLess10 = "#a2a2a2";

Highcharts.chart("graphskill", {
  chart: {
    type: "networkgraph",
    marginTop: 1,
    backgroundColor: '#101010',
  },

  title: {
    text: ""
  },

  plotOptions: {
    networkgraph: {
      keys: ["from", "to"],
      layoutAlgorithm: {
        enableSimulation: true,
        initialPositions: 'random',

        integration: 'verlet',
        // Half of the repulsive force
        gravitationalConstant: 5,
        linkLength: 150
      }
    }
  },

  tooltip: {
    enabled: false,
  },

  credits: {
    enabled: false,
  },

  series: [
    {
      marker: {
        radius: 13
      },
      dataLabels: {
        enabled: true,
        linkFormat: "",
        allowOverlap: true,
        color: '#ffffff',
        align: 'center',

        style: {
          // fontWeight: 'bold',
          fontSize: '20',
          textColor: '#000000',
        }
      },
      
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 100,
        borderWidth: 0
      },
      data: [
        ["Modelling", "Rhino3D"],
        ["Modelling", "Grasshopper3D"],
        ["Modelling", "Blender3D"],
        ["Modelling", "Zbrush"],
        ["Modelling", "Sketchup"],
        ["Modelling", "nTopology"],
        ["Modelling", "CloudCompare"],

        ["Point cloud ", "Recap"],
        ["Point cloud ", "RealityCapture"],
        ["Point cloud ", "CloudCompare"],
        ["Point cloud ", "MeshLab"],

        ["Interoperability",  "ArchiCad"],
        ["Interoperability",  "Revit"],
        ["Interoperability", "Blender3D"],
        ["Interoperability", "QGis"],
        ["Interoperability", "Rhino.inside"],
        ["Interoperability", "Speckle"],
        ["Interoperability", "IFCjs"],

        ["Animation VFX", "Houdini"],
        ["Animation VFX", "Blender3D"],       
        ["Animation VFX", "3dsMax"],
        ["Animation VFX", "Adobe_creativesuite"],

        ["Visualization", "Houdini"],
        ["Visualization", "Blender3D"],
        ["Visualization", "Lumion"],
        ["Visualization", "Octane"],
        ["Visualization", "Vray"],
        ["Visualization", "Unity3D"],
        ["Visualization", "Unreal"],
        ["Visualization", "Omniverse"],

        ["GameDev", "Unity3D"],
        ["GameDev", "Armoury3D"],
        ["GameDev", "Unreal"],

        ["Visual Scripting", "Grasshopper3D"],
        ["Visual Scripting", "Houdini"],
        ["Visual Scripting", "Blender3D"],
        ["Visual Scripting", "TouchDesigner"],
        ["Visual Scripting", "VVVV"],
        ["Visual Scripting", "Unreal"],

        ["Coding", "ProcessingJS"],
        ["Coding", "P5js"],
        ["Coding", "Python"],
        ["Coding", "HTML/CSS"],
        ["Coding", "C#(Grasshopper API)"],
        ["Coding", "ThreeJS"],
        ["Coding", "WebGL"],


        ["Creative coding", "ProcessingJS"],
        ["Creative coding", "P5js"],
        ["Creative coding", "TouchDesigner"],
        ["Creative coding", "VVVV"],


        ["Simulation/Analysis", "Ecotect"],
        ["Simulation/Analysis", "Grasshopper3D"],
        ["Simulation/Analysis", "ROS_gazebo"],
        ["Simulation/Analysis", "DesignBuilder"],
        ["Simulation/Analysis", "Unity3D"],
        ["Simulation/Analysis", "DesignBuilder"],

        ["Fabrication", "CAM/CNC"],
        ["Fabrication", "3D printing"],
        ["Fabrication", "VR/AR"],
        ["Fabrication", "Gcode"], 
        ["Fabrication", "ExtendedReality"], 

        ["Data Capture", "Photogrammetry"],
        ["Data Capture", "SyntheticData"],
        ["Data Capture", "LiDAR"],
        ["Data Capture", "IOT"], 
        ["Data Capture", "Arduino/RaspberryPi"], 
        





      ],
      nodes: [
        {
          id: "Modelling",
          marker: {
            radius: 30
          },
          color: dirDist50
          
        },
        {
          id: "Point cloud ",
          marker: {
            radius: 30
          },
          color: dirDist51
        },

        {
          id: "Interoperability",
          marker: {
            radius: 30
          },
          color: dirDist51
        },
        {
          id: "GameDev",
          marker: {
            radius: 30
          },
          color: dirDist52
        },
        {
          id: "Animation VFX",
          marker: {
            radius: 30
          },
          color: dirDist53
        },
        {
          id: "Visualization",
          marker: {
            radius: 30
          },
          color: dirDist54
        },
        {
          id: "Visual Scripting",
          marker: {
            radius: 30
          },
          color: dirDist55
        },
        {
          id: "Coding",
          marker: {
            radius: 30
          },
          color: dirDist54
        },
        {
          id: "Creative coding",
          marker: {
            radius: 30
          },
          color: dirDist53
        },
        {
          id: "Simulation/Analysis",
          marker: {
            radius: 30
          },
          color: dirDist52
        },
        {
          id: "Fabrication",
          marker: {
            radius: 30
          },
          color: dirDist51
        },
        {
          id: "Data Capture",
          marker: {
            radius: 30
          },
          color: dirDist50
        },
        
        
//----------------    

// ["Point cloud ", "Recap"],
// ["Point cloud ", "RealityCapture"],
// ["Point cloud ", "CloudCompare"],
// ["Point cloud ", "MeshLab"],

// ["Interpoblity", "ArchiCad"],
// ["Interpoblity", "Revit"],
// ["Interpoblity ", "Blender3D"],
// ["Interpoblity ", "QGis"],
// ["Interpoblity ", "Rhino.inside"],
// ["Interpoblity ", "Speckle"],
// ["Interpoblity ", "IFCjs"],
        {
          id: "Speckle",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "Recap",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "QGis",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "IFCjs",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        }, 
        {
          id: "Rhino.inside",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        }, 
        {
          id: "CloudCompare",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        }, 
        {
          id: "MeshLab",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        }, 
        {
          id: "Revit",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "nTopology",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Rhino3D",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Grasshopper3D",
          marker: {
            radius: 20
          },
          
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Blender3D",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Zbrush",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "Sketchup",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "ArchiCad",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "RealityCapture",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Unity3D",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "Armoury3D",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
                {
          id: "Unreal",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Houdini",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "3dsMax",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Adobe_creativesuite",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "Lumion",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
                {
          id: "Octane",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Vray",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Omniverse",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "TouchDesigner",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "VVVV",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
                {
          id: "ProcessingJS",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "P5js",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Python",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "HTML/CSS",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "C#(Grasshopper API)",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
                {
          id: "ThreeJS",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "WebGL",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Ecotect",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "ROS_gazebo",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "DesignBuilder",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "CAM/CNC",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "3D printing",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "VR/AR",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "Gcode",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "CAM/CNC",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "ExtendedReality",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "Photogrammetry",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "SyntheticData",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "LiDAR",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
        {
          id: "IOT",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },  
        {
          id: "Arduino/RaspberryPi",
          marker: {
            radius: 20
          },
          color: dirDist10,
          dataLabels: {style: {fontSize: '10px'}}
        },
      ]
    }
  ]
});
