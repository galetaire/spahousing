// Create the tooltip only ONCE and make it available to all gauges.
const tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0)
    .style("background", "rgba(0, 0, 0, 0.75)")
    .style("color", "white")
    .style("padding", "8px")
    .style("border-radius", "5px")
    .style("font-size", "14px")
    .style("pointer-events", "none")
    .style("transition", "opacity 0.2s ease-in-out");

/**
 * Creates a D3 gauge chart in a specified SVG container.
 * @param {string} containerId - The ID selector for the SVG element (e.g., "#gauge1").
 * @param {number} value - The numerical value to display on the gauge.
 * @param {Array<object>} data - The data array for the gauge segments.
 */
function createGauge(containerId, value, data) {
    const width = 300;
    const height = 170;
    const radius = Math.min(width, height * 2) / 2;

    const svg = d3.select(containerId) // Use the containerId parameter
        .attr("width", width)
        .attr("height", height);

    // Clear previous gauge content if any
    svg.selectAll("*").remove();

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height - 15})`);

    const arcGenerator = d3.arc()
        .innerRadius(radius - 40) // Adjusted for better proportions
        .outerRadius(radius)
        .padAngle(0.01);

    const angleScale = d3.scaleLinear()
        .domain([0, 100])
        .range([-90, 90]);

    let startAngle = -90;
    g.selectAll("path")
        .data(data) // Use the data parameter
        .enter().append("path")
        .attr("fill", d => d.color)
        .attr("d", d => {
            const endAngle = startAngle + (d.value / 100) * 180;
            const path = arcGenerator({
                startAngle: (startAngle) * (Math.PI / 180),
                endAngle: (endAngle) * (Math.PI / 180)
            });
            startAngle = endAngle;
            return path;
        })
        .on("mouseover", function(event, d) {
            d3.select(this).transition().duration(150).style("opacity", 0.85);
            tooltip.style("opacity", 1).html(d.label);
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 15) + "px")
                   .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function() {
            d3.select(this).transition().duration(150).style("opacity", 1);
            tooltip.style("opacity", 0);
        });

    g.append("polygon")
        .attr("points", `-5,0 5,0 0,-${radius - 20}`)
        .attr("fill", "#333")
        .transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .attr("transform", `rotate(${angleScale(value)})`); // Use the value parameter

    g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 35) // Adjusted for better proportions
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 0);

    g.append("text")
        .attr("class", "value-label")
        .attr("text-anchor", "middle")
        .attr("y", -8)
        .style("font-size", "22px")
        .style("font-weight", "bold")
        .text(value); // Use the value parameter

    let currentRange = 0;
    const category = data.find(d => { // Use the data parameter
        currentRange += d.value;
        return value <= currentRange;
    });

    g.append("text")
        .attr("class", "category-label")
        .attr("text-anchor", "middle")
        .attr("y", 12)
        .style("font-size", "17px")
        .style("font-weight", "bold")
        .style("fill", category ? category.color : 'black')
        .text(category ? category.label : '');
}
