const categories = [
  { id: "Complex Modelling", color: "#c93e70", tools: ["Rhino3D", "Grasshopper3D", "Blender3D", "Zbrush", "Sketchup", "CloudCompare", "Dynamo", "Python","C#",".NET","C++"] },
  { id: "Software Dev", color: "#280F36", tools: ["Python","C#",".NET","C++", "Grasshopper3D", "Blender3D","Revit"] },
  { id: "Interoperability", color: "#280F36", tools: ["ArchiCad", "Revit","Grasshopper3D", "Blender3D", "QGis", "Rhino.inside", "Speckle", "IFCjs"] },
  { id: "Animation VFX", color: "#292965", tools: ["Houdini", "Blender3D", "3dsMax", "Adobe_creativesuite","ProcessingJS", "P5js", "TouchDesigner", "VVVV"] },
  { id: "Fabrication", color: "#CE751D", tools: ["CAM/CNC","Gcode","3D Printing", "VR", "AR", "IOT", "XR", "Grasshopper3D"] },
  { id: "Immersive", color: "#E7A553", tools: ["Unity3D", "Armoury3D", "Unreal", "Igloo", "ThreeJS", "BabylonJS","C++", "IFCjs"] },
  { id: "Web Dev", color: "#E7A553", tools: ["HTML/CSS", "ThreeJS", "Unity3D", "BabylonJS", "Python", "Unreal","ProcessingJS", "P5js", "IFCjs"] },
  { id: "Creative coding", color: "#292965", tools: ["ProcessingJS", "P5js", "TouchDesigner", "VVVV"] },
  { id: "Simulation", color: "#174EA6", tools: ["Grasshopper3D", "DesignBuilder", "Unity3D", "Unreal", "Houdini", "Blender3D"] },
  { id: "Data Capture", color: "#280F36", tools: ["Reality Capture", "Cloud Compare",  "VR", "AR", "IOT", "XR"] },
];

const toolNodes = categories.flatMap(category =>
  category.tools.map(tool => ({
    id: tool,
    marker: { radius: 20, fillOpacity: 0.7 },
    color: "#2a2a2a",
    dataLabels: { style: { fontSize: "10px", fontFamily: "Arial, sans-serif", fontWeight: "normal", color: "#ffffff" } }
  }))
);

const categoryNodes = categories.map(category => ({
  id: category.id,
  marker: { radius: 30 },
  color: category.color
}));

const dataLinks = categories.flatMap(category =>
  category.tools.map(tool => [category.id, tool])
);

Highcharts.chart("graphskill", {
  chart: {
    type: "networkgraph",
    marginTop: 1,
    backgroundColor: "#101010",
  },
  title: { text: "" },
  plotOptions: {
    networkgraph: {
      keys: ["from", "to"],
      layoutAlgorithm: {
        enableSimulation: true,
        initialPositions: "random",
        integration: "verlet",
        gravitationalConstant: 5,
        linkLength: 150,
      },
    },
  },
  tooltip: { enabled: false },
  credits: { enabled: false },
  series: [
    {
      marker: { radius: 13 },
      dataLabels: {
        enabled: true,
        linkFormat: "",
        allowOverlap: true,
        color: "#ffffff",
        align: "center",
        style: { fontSize: "20", fontFamily: "Arial, sans-serif", fontWeight: "normal" },
      },
      data: dataLinks,
      nodes: [...categoryNodes, ...toolNodes],
    },
  ],
});
