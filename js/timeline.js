(function(H) {
  H.seriesTypes.timeline.prototype.getXExtremes = function(xData) {
    var series = this;

    return {
      min: H.arrayMin(xData),
      max: H.arrayMax(xData)
    };
  }
}(Highcharts));

Highcharts.dateFormats = {
  q: function(timestamp) {
    var date = new Date(timestamp),
      quarter = Math.floor(date.getUTCMonth() / 3) + 1;
    return quarter;
  }
};

Highcharts.chart('timeline_container', {
  chart: {
    zoomType: 'x',
    backgroundColor: null,
    type: 'timeline'
  },
  xAxis: {
    type: 'datetime',
    units: [
      ['year', [1]]
    ],
    labels: {
      format: '{value:%Y}'
    }
  },
  yAxis: {
    gridLineWidth: 1,
    title: null,
    labels: {
      enabled: false
    }
  },
  legend: {
    enabled: true
    
  },
  title: {
    text: '<strong><font size="+10"></font></strong>'
  },
  subtitle: {
    text: ''
  },
  tooltip: {
    style: {
      width: 300
    }
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    timeline: {
      lineWidth: 0,
      legendType: '',
      showInLegend: true,
      colorByPoint: false,
      dataLabels: {
        allowOverlap: true,
        format: '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
          '{point.x:%Y}</span><br/>{point.label}'
      },
      marker: {
        symbol: 'circle'
      },
    }
  },
  series: [
    {
      name: 'Education',
      dataLabels: {
        distance: 40
      },
      data: [
        {
          x: Date.UTC(2014, 0),
          name: 'Education',
          label: 'SPAV',
          description: 'Design studios I - VII, Urban design, Theory of design, Architectural drawings , Building Construction I- VI, Building services, Costing and Estimating, Principles of Human , Research Methodology, Computational architecture.'
          
        },
        {
          x: Date.UTC(2022, 0),
          name: 'Education',
          label: 'UPC MPDA',
          description: 'As a student in the UPC School MPDA Master’s degree program in Parametric Design in Architecture, I worked on applying parametric design principles to create efficient and sustainable building solutions. Through practical workshops and real-world applications, I gained experience in using advanced software tools and integrating diverse disciplines such as BIM, urban design, and climate analysis into the design process. The program provided me with the skills and knowledge needed to become a builder of efficient and sustainable architectural systems, contributing to a more sustainable built environment.'
        }
      ]
    },
    {
      name: 'Work',
      dataLabels: {
        distance: 90
      },
      data: [
        {
          x: Date.UTC(2021, 0),
          name: 'coFounder',
          label: 'xBuild',
          description: '1. We have designed a semi automated workflow to optimize 3d model and host online as immersive architectural experience. 2. To unlock easy access for people, our workflow works with digital archiving for existing monumental structures. 3. Proposed a automated design generation tool which generates apartment design optimizing against various tangible and intangible design parameters(in Conceptual development ) 4. Experimenting with WebGL and IFC tools on intersection of digital twin and metaverse'
        },
        {
          x: Date.UTC(2020, 0),
          name: 'Design Architect',
          label: 'Sustecture',
          description: '1. Worked on achieving sustainable residential and commercial design using computational design.', 
          description: '2.  Worked on various levels of interior and execution projects.'
        },
        {
          x: Date.UTC(2019, 0),
          name: 'Junior Researcher',
          label: 'Indian Institute of Hyderabad',
          description: '1. Developed a pipeline to optimize textured point cloud data and use it for VR applications. 2. Worked on projection mapping and holographic installation as designer using creative code and real time feedback sensors 3. Worked with IITH DIC(Design Innovation center) on creating VR narrative of various heritage structure in Hyderabad using Drone photogrammetry, terrestrial LIDAR scanning and 3D optimization. 4. Experimented with Gcode generation of 3D printer using non planar and load based adaptive slicing techniques 5. Experimented on Flight path generation for drone using parametric design, object detection and feeding it back using ROS.'
        },
        {
          x: Date.UTC(2018, 0),
          name: 'Research Assistant',
          label: 'Sri Design Lab',
          description: 'Description for Series 2'
        },
      ]
    },
    {
      dataLabels: {
        distance: 140
      },
      data: [
        {
          x: Date.UTC(2016, 0),
          name: 'Series 3',
          label: 'Series 3',
          description: 'Description for Series 3'
        },

      ]
    },
    {
      dataLabels: {
        distance: 190
      },
      data: [
        {
          x: Date.UTC(2015, 0),
          name: 'Series 4',
          label: 'Series 4',
          description: 'Description for Series 4'
        },

      ]
    }
  ]
});
