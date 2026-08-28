/* Skills graph — D3 force-directed network.
   Structure: skill categories connect to the tools they use. Tools
   shared across categories (e.g. Grasshopper3D) end up with multiple
   links, which is real information, not noise — it shows breadth.

   Below the site's mobile breakpoint the tool-level nodes are collapsed
   away entirely and replaced with direct category-to-category links
   wherever two categories share a tool — same connectivity, a tenth of
   the nodes, readable on a phone instead of a wall of tiny labels.

   The container is sized by CSS (flex fill — see custom.css, the Skills
   panel is a fixed one-screen layout with no scrolling), and a
   ResizeObserver re-renders against its *actual* pixel size rather than
   a fixed viewBox. That matters for the labels: a fixed viewBox scaled
   down by CSS on a narrow phone would shrink 11px SVG text to a few
   real pixels. Measuring real size means 1 SVG unit stays 1 real px, so
   font-size behaves exactly like normal CSS text at every width. It
   also means the ResizeObserver fires (with a real size) the moment the
   Skills panel is actually opened, so nothing needs measuring while the
   panel is still display:none.

   The simulation is kept at a low non-zero alphaTarget forever instead
   of letting it settle to a stop, so the layout keeps drifting gently —
   a living diagram rather than a frozen one. */
(function () {
  // Category (main) nodes carry no color — they're told apart by shape
  // instead, drawn with d3.symbol below. Tool nodes are all a uniform
  // mid-grey circle (see nodeMark/CSS), so shape is the only channel
  // distinguishing one category from another.
  const categories = [
    { id: "Complex Modelling", shape: "circle", tools: ["Rhino3D", "Grasshopper3D", "Blender3D", "Zbrush", "Sketchup", "CloudCompare", "Dynamo", "Python", "C#", ".NET", "C++"] },
    { id: "Software Dev", shape: "square", tools: ["Python", "C#", ".NET", "C++", "Grasshopper3D", "Blender3D", "Revit"] },
    { id: "Interoperability", shape: "triangle", tools: ["ArchiCad", "Revit", "Grasshopper3D", "Blender3D", "QGis", "Rhino.inside", "Speckle", "IFCjs"] },
    { id: "Animation VFX", shape: "diamond", tools: ["Houdini", "Blender3D", "3dsMax", "Adobe Creative Suite", "ProcessingJS", "P5js", "TouchDesigner", "VVVV"] },
    { id: "Fabrication", shape: "star", tools: ["CAM/CNC", "Gcode", "3D Printing", "VR", "AR", "IOT", "XR", "Grasshopper3D"] },
    { id: "Immersive", shape: "cross", tools: ["Unity3D", "Armoury3D", "Unreal", "Igloo", "ThreeJS", "BabylonJS", "C++", "IFCjs"] },
    { id: "Web Dev", shape: "wye", tools: ["HTML/CSS", "ThreeJS", "Unity3D", "BabylonJS", "Python", "Unreal", "ProcessingJS", "P5js", "IFCjs"] },
    { id: "Creative Coding", shape: "square2", tools: ["ProcessingJS", "P5js", "TouchDesigner", "VVVV"] },
    { id: "Simulation", shape: "triangle2", tools: ["Grasshopper3D", "DesignBuilder", "Unity3D", "Unreal", "Houdini", "Blender3D"] },
    { id: "Data Capture", shape: "diamond2", tools: ["Reality Capture", "CloudCompare", "VR", "AR", "IOT", "XR"] },
  ];

  // d3.symbol's `size` is the shape's area in square pixels, but equal
  // areas don't read as equal-sized across shapes (a star's points reach
  // much further from center than a square's corners do for the same
  // area) — these factors correct for that so every category shape's
  // *outer reach* comes out close to nodeRadius(d), matched by eye
  // against a plain circle rather than by exact geometry. Kept small and
  // close together on purpose: these are meant to read as minimal glyphs
  // next to the grey tool circles, not as oversized icons. (Only the
  // solid, fillable symbol types are used — the thin stroke-oriented
  // ones like plus/x/asterisk collapse into an near-invisible sliver at
  // this size.)
  const SYMBOL_TYPES = {
    circle: [d3.symbolCircle, 1],
    square: [d3.symbolSquare, 0.62],
    triangle: [d3.symbolTriangle, 0.5],
    diamond: [d3.symbolDiamond, 0.62],
    star: [d3.symbolStar, 0.5],
    cross: [d3.symbolCross, 0.6],
    wye: [d3.symbolWye, 0.55],
    square2: [d3.symbolSquare2, 0.55],
    triangle2: [d3.symbolTriangle2, 0.5],
    diamond2: [d3.symbolDiamond2, 0.5],
  };

  function categorySymbolPath(d) {
    const [type, scale] = SYMBOL_TYPES[d.shape] || SYMBOL_TYPES.circle;
    const r = nodeRadius(d);
    return d3.symbol().type(type).size(Math.PI * r * r * scale)();
  }

  const MOBILE_WIDTH = 767.98;
  const IDLE_ALPHA = 0.025;
  // The "my skills" title overlays the top of the canvas (see custom.css)
  // instead of pushing the graph down, so nodes are kept below this band
  // instead of settling underneath the text. TITLE_TOP_OFFSET matches the
  // 70px top offset custom.css gives the title (to line it up with the
  // other panels' headings); the ratio covers the title's own height on
  // top of that.
  const TITLE_TOP_OFFSET = 70;
  // Mobile's title is much shorter (smaller font, "my skills" wraps to
  // less height) than desktop's, which runs as large as an unscaled
  // 201px — a shared ratio undersizes one or the other, so this is
  // split by breakpoint instead.
  const TOP_EXCLUSION_RATIO_MOBILE = 0.1;
  const TOP_EXCLUSION_RATIO_DESKTOP = 0.24;

  function buildFullGraph() {
    const categoryNodes = categories.map((c) => ({ id: c.id, type: "category", shape: c.shape, toolCount: c.tools.length }));

    const toolUses = new Map();
    categories.forEach((c) => c.tools.forEach((t) => toolUses.set(t, (toolUses.get(t) || 0) + 1)));
    const toolNodes = Array.from(toolUses, ([id, uses]) => ({ id, type: "tool", uses }));

    const links = [];
    categories.forEach((c) => c.tools.forEach((t) => links.push({ source: c.id, target: t, kind: "tool" })));

    return { nodes: [...categoryNodes, ...toolNodes], links };
  }

  function buildCollapsedGraph() {
    const nodes = categories.map((c) => ({ id: c.id, type: "category", shape: c.shape, toolCount: c.tools.length }));

    const links = [];
    for (let i = 0; i < categories.length; i++) {
      for (let j = i + 1; j < categories.length; j++) {
        const shared = categories[i].tools.filter((t) => categories[j].tools.includes(t)).length;
        if (shared > 0) {
          links.push({ source: categories[i].id, target: categories[j].id, kind: "category", weight: shared });
        }
      }
    }

    return { nodes, links };
  }

  function nodeRadius(d) {
    if (d.type === "category") return 18 + Math.sqrt(d.toolCount) * 4.2;
    return 10 + Math.min(d.uses - 1, 3) * 3;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function render(container, width, height) {
    container.innerHTML = "";

    const collapsed = width <= MOBILE_WIDTH;
    const { nodes, links } = collapsed ? buildCollapsedGraph() : buildFullGraph();

    const topExclusion = TITLE_TOP_OFFSET + height * (collapsed ? TOP_EXCLUSION_RATIO_MOBILE : TOP_EXCLUSION_RATIO_DESKTOP);
    const availableHeight = height - topExclusion;
    const centerY = topExclusion + availableHeight / 2;
    // "spread" (the narrower usable dimension) sizes link distance, so
    // connected nodes stay a sane distance apart on any screen. "reach"
    // (the wider one) sizes the repulsion, so on a wide screen the layout
    // actually pushes out to use the full width rather than forming a
    // circle sized by the shorter dimension and leaving the sides empty.
    const spread = Math.min(width, availableHeight);
    const reach = Math.max(width, availableHeight);

    const svg = d3.select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("role", "img")
      .attr("aria-label", "Interactive network graph of skill categories and the tools within each");

    // Plain <g> wrapper, not a zoom/pan surface — zooming is intentionally
    // disabled so the graph can't be scaled away from its full-bleed layout.
    const zoomLayer = svg.append("g").attr("class", "zoom-layer");

    const linkSel = zoomLayer.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", (d) => `graph-link graph-link-${d.kind}`)
      .attr("stroke-width", (d) => (d.kind === "category" ? Math.min(3, 1 + d.weight * 0.5) : 1));

    const nodeSel = zoomLayer.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", (d) => `graph-node graph-node-${d.type}`)
      .attr("tabindex", 0)
      .call(drag());

    nodeSel.append("title").text((d) => d.id);

    // Category nodes are drawn as a d3.symbol shape (see categorySymbolPath);
    // tool nodes stay plain circles. Both share the "graph-node-mark" class
    // so CSS can give them a uniform stroke/transition without caring which
    // element type it is.
    nodeSel.each(function (d) {
      const el = d3.select(this);
      if (d.type === "category") {
        el.append("path")
          .attr("class", "graph-node-mark")
          .attr("d", categorySymbolPath);
      } else {
        el.append("circle")
          .attr("class", "graph-node-mark")
          .attr("r", nodeRadius);
      }
    });

    nodeSel.append("text")
      .attr("dy", (d) => nodeRadius(d) + 13)
      .attr("text-anchor", "middle")
      .attr("class", (d) => `graph-label graph-label-${d.type}`)
      .text((d) => d.id);

    // Adjacency lookup for the hover/focus highlight below.
    const neighbors = new Map();
    links.forEach((l) => {
      const s = typeof l.source === "object" ? l.source.id : l.source;
      const t = typeof l.target === "object" ? l.target.id : l.target;
      if (!neighbors.has(s)) neighbors.set(s, new Set());
      if (!neighbors.has(t)) neighbors.set(t, new Set());
      neighbors.get(s).add(t);
      neighbors.get(t).add(s);
    });

    function setFocus(id) {
      const related = id ? neighbors.get(id) : null;
      nodeSel.classed("is-dim", (d) => !!related && d.id !== id && !related.has(d.id));
      linkSel.classed("is-dim", (d) => {
        if (!related) return false;
        const s = typeof d.source === "object" ? d.source.id : d.source;
        const t = typeof d.target === "object" ? d.target.id : d.target;
        return s !== id && t !== id;
      });
    }

    nodeSel
      .on("mouseenter", (event, d) => setFocus(d.id))
      .on("mouseleave", () => setFocus(null))
      .on("focus", (event, d) => setFocus(d.id))
      .on("blur", () => setFocus(null));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(collapsed ? spread * 0.32 : spread * 0.17).strength(0.55))
      .force("charge", d3.forceManyBody().strength(-(collapsed ? reach * 0.55 : reach * 0.8)))
      .force("collide", d3.forceCollide().radius((d) => nodeRadius(d) + (collapsed ? 46 : 34)).strength(0.9))
      // Weak, so charge (above) does the actual work of spreading nodes
      // out to the edges — these just keep the whole cloud roughly
      // centered instead of drifting off to one side. Categories are
      // pulled a little harder than tools so they anchor near the
      // middle while their tools fan out further.
      .force("x", d3.forceX(width / 2).strength(collapsed ? 0.07 : (d) => (d.type === "category" ? 0.05 : 0.02)))
      .force("y", d3.forceY(centerY).strength(collapsed ? 0.09 : (d) => (d.type === "category" ? 0.09 : 0.045)))
      .on("tick", ticked)
      .alphaTarget(IDLE_ALPHA)
      .alphaDecay(0.05);

    function ticked() {
      nodes.forEach((d) => {
        // A node being dragged (fx/fy set) is under direct user control —
        // don't fight that by clamping it back out of the title band or
        // canvas edges. The clamp only keeps the *unattended* layout tidy.
        if (d.fx != null || d.fy != null) return;
        const r = nodeRadius(d) + 26;
        d.x = clamp(d.x, r, width - r);
        d.y = clamp(d.y, topExclusion + r, height - r);
      });
      linkSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodeSel.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    function drag() {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(IDLE_ALPHA);
        d.fx = null;
        d.fy = null;
      }
      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }
  }

  function init() {
    const container = document.getElementById("graphskill");
    if (!container || typeof d3 === "undefined") return;

    let lastWidth = 0;
    let lastHeight = 0;
    let frame = null;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width < 40 || height < 40) return; // panel still closed/animating
      if (Math.abs(width - lastWidth) < 4 && Math.abs(height - lastHeight) < 4) return;
      lastWidth = width;
      lastHeight = height;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => render(container, Math.round(width), Math.round(height)));
    });

    observer.observe(container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
