const belly_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Plug in JSON data and print it using console.log
d3.json(belly_url).then(function(data) {
  console.log(data);
});

// Initialize the dashboard
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        // Use Let "variable name" to create variable names
        let info = data.names;
        
        // Then add the id into the drop down menu

        nams.forEach((id) => {

            // print using console.log
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        }); 
    })};