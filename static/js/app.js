//store url link
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Function to initialize the dash board
function init() {

    var selector = d3.select("#selDataset");
  
    // Fetch the JSON data from url and use the list of sample names for select option
    d3.json(url).then((data) => {
      var names = data.names;
  
      names.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample create the initial plots
      sample_one = names[0];
      create_Plots(sample_one);
      get_DemoInfo(sample_one);
    });
  }

  init();

  // Function for the change event when new sample is selected
  function optionChanged(sample) {
    create_Plots(sample);
    get_DemoInfo(sample);
}



// Function to create Demographic Info panel
function get_DemoInfo (sample) {

  // Fetch data from url by using json d3
    d3.json(url).then((data) => {

        // Create variable to hold all metadata
        var metadata = data.metadata;

        // Filter meta data based on the id of the sample and get the first index
        var result = metadata.filter(meta => meta.id == sample)[0];

        // Log the array of metadata objects after the have been filtered
        console.log(result)

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Appending each key - value pair to the info panel by using Object.entries 
        Object.entries(result).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};



// Function for creating grapphs
function create_Plots (sample) {
  // Fetch data by using json D3
  d3.json(url).then((data) => {
    console.log(data);

    // Create variable to hold all sample data
    var samples = data.samples;

    // Get the otu_ids, lables, and sample values
    var ids = samples[0].otu_ids;
    console.log(ids)
    var samplevalues =  samples[0].sample_values.slice(0,10).reverse();
    console.log(samplevalues)
    var labels =  samples[0].otu_labels.slice(0,10);
    console.log (labels)

    // get only top 10 otu ids for the plot OTU and reversing it. 
    var OTU_top = ( samples[0].otu_ids.slice(0, 10)).reverse();

    // get the otu id's to the desired form for the plot
    var OTU_id = OTU_top.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`)

     // get the top 10 labels for the plot
    var labels =  samples[0].otu_labels.slice(0,10);
    console.log(`OTU_labels: ${labels}`)

    var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
          };
    // create data variable
    var data = [trace];

    // create layout variable to set plots layout
    var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

    // create the bar plot
    Plotly.newPlot("bar", data, layout);

     // The bubble chart
        var trace1 = {
            x: samples[0].otu_ids,
            y: samples[0].sample_values,
            mode: "markers",
            marker: {
                size: samples[0].sample_values,
                color: samples[0].otu_ids
            },
            text:  samples[0].otu_labels

        };

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // creating data variable 
        var data1 = [trace1];

    // create the bubble plot
    Plotly.newPlot("bubble", data1, layout_2); 
    
    });
};
