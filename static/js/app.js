// Define constant URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use d3 to read data from URL
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize and populate dropdown menu
function init() {
    var dropdownMenu = d3.select('#selDataset');
    
    // Use d3 to fetch sample names from samples.json
    d3.json("samples.json").then((data) => {
        var samples = data.names;
        
        // Loop through samples array to populate dropdown menu
        samples.forEach(sample => {
            dropdownMenu
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        // Use the first sample to create initial plots
        var sampleOne = samples[0];
        buildCharts(sampleOne);
        buildMetadata(sampleOne);
    });
}

init();

// Function to update plots when a new sample is selected from dropdown menu
function optionChanged(newSample) {
    // Call buildCharts and buildMetadata functions with the new sample
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Update the dropdown menu to call the optionChanged function
d3.select('#selDataset').on('change', function() {
    var newSample = d3.select(this).property('value');
    optionChanged(newSample);
});

// Function to build charts
function buildCharts(sample) {
    // Fetch sample data from samples.json
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        
        // Filter the samples array for the selected sample
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        
        // Get sample values, OTU ids, and OTU labels for the bar chart
        var BarsampleValues = resultArray[0].sample_values.slice(0, 10).reverse();
        var BarsampleIds = resultArray[0].otu_ids.slice(0, 10).reverse();
        var BarsampleLabels = resultArray[0].otu_labels.slice(0, 10).reverse();
        
        // Create trace for the bar chart
        var trace1 = {
            x: BarsampleValues,
            y: BarsampleIds.map(id => `OTU ${id}`),
            text: BarsampleLabels,
            type: "bar",
            orientation: "h"
        };
        
        // Create data array for the bar chart
        var data = [trace1];
        
        // Create layout for the bar chart
        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };
        
        // Plot the bar chart
        Plotly.newPlot("bar", data, layout);

    });
}

// Fetch initial sample data from samples.json
var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
var metaResult = filteredMeta[0];
var otuId = resultArray[0].otu_ids;
var otuLabel = resultArray[0].otu_labels;
var sampleValue = resultArray[0].sample_values;

// Create trace for the bar chart
var barData1 = [{
    x: sampleValue.slice(0, 10).reverse(),
    y: otuId.slice(0, 10).map((i) => `OTU ID ${i}`),
    type: "bar",
}];