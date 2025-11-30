(function(){
  // Static timeline chart using Highcharts. Education = circle, Experience = square.
  // Data taken from the education and experience sections in `index.html`.
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof Highcharts === 'undefined') {
      console.warn('Highcharts not found. Timeline chart will not render.');
      return;
    }

    // -- Data --
    // Education (use the start year for positioning)
    var education = [
      { year: 2024, title: 'IIT Ropar', subtitle: 'Minor in Artificial Intelligence', range: '2024 - 2025' },
      { year: 2022, title: 'Universitat Politècnica de Catalunya', subtitle: 'Masters in Parametric Design', range: '2022 - 2023' },
      { year: 2021, title: 'GUVI IIT Madras', subtitle: 'Deep Learning', range: '2021 - 2022' },
      { year: 2014, title: 'School of Planning and Architecture Vijayawada', subtitle: 'Bachelors in Architecture', range: '2014 - 2019' }
    ];

    // Experience
    var experience = [
      { year: 2024, title: 'Atkins Realis', subtitle: 'Automation Engineer', range: '2024 - present' },
      { year: 2021, title: 'xBuild', subtitle: 'coFounder', range: '2021 - present' },
      { year: 2020, title: 'Sustecture', subtitle: 'Design Architect', range: '2020 - 2022' },
      { year: 2019, title: 'IIT Hyderabad', subtitle: 'Junior researcher', range: '2019 - 2020' },
      { year: 2018, title: 'Sri Design Lab', subtitle: 'Research Assistant', range: '2018 - 2021' },
      { year: 2017, title: 'Digital IntuitionX', subtitle: 'Assistant Tutor', range: '2017 - 2019' },
      { year: 2017.2, title: 'Cadence Architects', subtitle: 'Intern Architect', range: '2017 - 2018' }
    ];

    // compute year range
    var years = education.concat(experience).map(function (d) { return Math.floor(d.year); });
    var minYear = Math.min.apply(null, years) - 1;
    var maxYear = Math.max.apply(null, years) + 1;

    // Assign vertical positions: education above center (positive), experience below (negative)
    var eduSpacing = 1; // increment
    var expSpacing = -1;
    var eduMap = {}, expMap = {};

    var eduPoints = education.map(function (d, i) {
      var y = 3 - i * eduSpacing; // stack upward
      eduMap[d.title] = y;
      return {
        x: d.year,
        y: y,
        name: d.title,
        description: d.subtitle,
        range: d.range,
        marker: { symbol: 'circle', radius: 8 }
      };
    });

    var expPoints = experience.map(function (d, i) {
      var y = -1 - i * Math.abs(expSpacing); // stack downward
      expMap[d.title] = y;
      return {
        x: d.year,
        y: y,
        name: d.title,
        description: d.subtitle,
        range: d.range,
        marker: { symbol: 'square', radius: 9 }
      };
    });

    var allPoints = eduPoints.concat(expPoints);

    Highcharts.chart('timeline_chart', {
      chart: {
        type: 'scatter',
        backgroundColor: '#101010',
        styledMode: false,
        zoomType: 'x',
        spacing: [20, 20, 40, 20]
      },
      title: { text: '' },
      xAxis: {
        title: { text: 'Year', style: { color: '#fff' } },
        gridLineWidth: 1,
        min: minYear,
        max: maxYear,
        tickInterval: 1,
        labels: { style: { color: '#d0d0d0' } }
      },
      yAxis: {
        title: { text: null },
        labels: { enabled: false },
        gridLineWidth: 0,
        min: -8,
        max: 6
      },
      legend: {
        enabled: true,
        itemStyle: { color: '#d0d0d0' }
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          return '<div style="min-width:200px;padding:8px;color:#fff;background:rgba(0,0,0,0.85);border-radius:4px">'
            + '<strong style="display:block;margin-bottom:6px">' + this.point.name + '</strong>'
            + '<div style="font-size:13px;margin-bottom:4px">' + this.point.description + '</div>'
            + '<div style="font-size:12px;opacity:0.8">' + this.point.range + '</div>'
            + '</div>';
        }
      },
      plotOptions: {
        scatter: {
          marker: {
            lineColor: '#ffffff',
            lineWidth: 1
          }
        }
      },
      series: [
        {
          name: 'Education',
          color: '#c93e70',
          data: eduPoints,
          marker: { radius: 8 }
        },
        {
          name: 'Experience',
          color: '#2a9d8f',
          data: expPoints,
          marker: { radius: 9 }
        }
      ],
      credits: { enabled: false }
    });
  });
})();
