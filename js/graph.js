var dirDist50 = "#c93e70",
  dirDist51 = "#280F36",
  dirDist52 = "#174EA6",
  dirDist53 = "#292965",
  dirDist54 = "#CE751D",
  dirDist55 = "#E7A553",

  dirDist10 = "#c46e8d",
  dirDist11 = "#795c8a",
  dirDist12 = "#7397d1",
  dirDist13 = "#4d4d63",
  dirDist14 = "#eba057",
  dirDist15 = "#857766",
  dirDistLess10 = "#2AA775";



Highcharts.chart("graphskill", {
  chart: {
    type: "networkgraph",
    marginTop: 10,
    backgroundColor: '#101010',
    
  },

  title: {
    text: ""
  },

  // tooltip: {
  //   formatter: function () {
  //     var info = "";
  //     switch (this.color) {
  //       case dirDist50:
  //         console.log(dirDist50);
  //         info = "is an aiport <b>more than 50</b> direct distinations";
  //         break;
  //       case dirDist10:
  //         console.log(dirDist10);
  //         info = "is an aiport <b>more than 10</b> direct distinations";
  //         break;
  //       case dirDistLess10:
  //         console.log(dirDistLess10);
  //         info = "is an aiport <b>less than 10</b> direct distinations";
  //         break;
  //     }
  //     return "<b>" + this.key + "</b>: " + info;
  //   }
  // },

  plotOptions: {
    networkgraph: {
      keys: ["from", "to"],
      layoutAlgorithm: {
        enableSimulation: true,
        integration: "verlet",
        linkLength: 150,
        gravitationalConstant: 1
      }
    }
  },

  series: [
    {
      marker: {
        radius: 13,
        enabled: true
      },
      dataLabels: {
        enabled: true,
        linkFormat: "",
        allowOverlap: true,
        color: '#ffffff',
        align: 'center',
        y: 10,

        style: {
          // fontWeight: 'bold',
          fontSize: '20',
          textColor: '#000000',
        }
      },
      data: [
        ["Modelling", "Rhino3D"],
        ["Modelling", "Grasshopper3D"],
        ["Modelling", "Blender3D"],
        ["Modelling", "Zbrush"],
        ["Modelling", "Sketchup"],

        ["BIM and Point cloud ", "ArchiCad"],
        ["BIM and Point cloud ", "ReCap"],
        ["BIM and Point cloud ", "RealityCapture"],
        ["BIM and Point cloud ", "Blender3D"],

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
          id: "BIM and Point cloud ",
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
        {
          id: "Rhino3D",
          marker: {
            radius: 20
          },
          color: dirDist10
        },
        {
          id: "Grasshopper3D",
          marker: {
            radius: 20
          },
          color: dirDist10
        },
        {
          id: "Blender3D",
          marker: {
            radius: 20
          },
          color: dirDist10
        },
        {
          id: "Zbrush",
          marker: {
            radius: 20
          },
          color: dirDist10
        },  
        {
          id: "Sketchup",
          marker: {
            radius: 20
          },
          color: dirDist10
        },  
        {
          id: "ArchiCad",
          marker: {
            radius: 20
          },
          color: dirDist11
        },
        {
          id: "ReCap",
          marker: {
            radius: 20
          },
          color: dirDist11
        },
        {
          id: "RealityCapture",
          marker: {
            radius: 20
          },
          color: dirDist11
        },
        {
          id: "Unity3D",
          marker: {
            radius: 20
          },
          color: dirDist12
        },  
        {
          id: "Armoury3D",
          marker: {
            radius: 20
          },
          color: dirDist12
        },
                {
          id: "Unreal",
          marker: {
            radius: 20
          },
          color: dirDist12
        },
        {
          id: "Houdini",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
        {
          id: "3dsMax",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
        {
          id: "Adobe_creativesuite",
          marker: {
            radius: 20
          },
          color: dirDist13
        },  
        {
          id: "Lumion",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
                {
          id: "Octane",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
        {
          id: "Vray",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
        {
          id: "Omniverse",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
        {
          id: "TouchDesigner",
          marker: {
            radius: 20
          },
          color: dirDist13
        },  
        {
          id: "VVVV",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
                {
          id: "ProcessingJS",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
        {
          id: "P5js",
          marker: {
            radius: 20
          },
          color: dirDist13
        },
        {
          id: "Python",
          marker: {
            radius: 20
          },
          color: dirDist14
        },
        {
          id: "HTML/CSS",
          marker: {
            radius: 20
          },
          color: dirDist14
        },  
        {
          id: "C#(Grasshopper API)",
          marker: {
            radius: 20
          },
          color: dirDist14
        },
                {
          id: "ThreeJS",
          marker: {
            radius: 20
          },
          color: dirDist14
        },
        {
          id: "WebGL",
          marker: {
            radius: 20
          },
          color: dirDist14
        },
        {
          id: "Ecotect",
          marker: {
            radius: 20
          },
          color: dirDist12
        },
        {
          id: "ROS_gazebo",
          marker: {
            radius: 20
          },
          color: dirDist12
        },  
        {
          id: "DesignBuilder",
          marker: {
            radius: 20
          },
          color: dirDist12
        },
        {
          id: "CAM/CNC",
          marker: {
            radius: 20
          },
          color: dirDist11
        },  
        {
          id: "3D printing",
          marker: {
            radius: 20
          },
          color: dirDist11  
        },
        {
          id: "VR/AR",
          marker: {
            radius: 20
          },
          color: dirDist11
        },  
        {
          id: "Gcode",
          marker: {
            radius: 20
          },
          color: dirDist11
        }, 
        {
          id: "ExtendedReality",
          marker: {
            radius: 20
          },
          color: dirDist11
        },
        {
          id: "Photogrammetry",
          marker: {
            radius: 20
          },
          color: dirDist10
        },  
        {
          id: "SyntheticData",
          marker: {
            radius: 20
          },
          color: dirDist10
        },
        {
          id: "LiDAR",
          marker: {
            radius: 20
          },
          color: dirDist10
        },
        {
          id: "IOT",
          marker: {
            radius: 20
          },
          color: dirDist10
        },  
        {
          id: "Arduino/RaspberryPi",
          marker: {
            radius: 20
          },
          color: dirDist10
        },
      ]
    }
  ]
});
