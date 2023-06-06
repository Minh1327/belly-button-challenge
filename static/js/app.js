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


// Function to create Demographic Info panel
function get_DemoInfo (sample) {

  // Fetch the JSON data from url
    d3.json(url).then((data) => {

        // Fetch all metadata
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

// Function for the change event when new sample is selected
function optionChanged(sample) {
    create_Plots(sample);
    get_DemoInfo(sample);
}


// Function for creating grapphs
