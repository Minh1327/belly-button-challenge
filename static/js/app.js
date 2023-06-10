//store url link
const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to initialize the dash board
function init() {
  const selector = d3.select("#selDataset");

  // Fetch the JSON data from url and use the list of sample names for select option
  d3.json(url).then((data) => {
    const names = data.names;
    console.log(names);

    names.forEach((id, index) => {
      selector.append("option").text(id).property("value", index);
    });

    // Use the first id create the initial plots
    create_Plots(0);
    get_DemoInfo(0);
  });
}

init();

// Function for the change event when new sample is selected
function optionChanged(index) {
  create_Plots(index);
  get_DemoInfo(index);
}

// Function to create Demographic Info panel
function get_DemoInfo(index) {
  // Fetch data from url by using json d3
  d3.json(url).then((data) => {
    const names = data.names;

    // Create variable to hold all metadata
    const metadata = data.metadata;

    // Filter meta data based on the id of the index and get the first index
    const result = metadata.filter((meta) => meta.id == names[index])[0];

    // Log the array of metadata objects after the have been filtered
    console.log(result);

    // Clear out metadata
    d3.select("#sample-metadata").html("");

    // Appending each key - value pair to the info panel by using Object.entries
    Object.entries(result).forEach(([key, value]) => {
      // Log the individual key/value pairs as they are being appended to the metadata panel
      console.log(key, value);

      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });
}

// Function for creating grapphs
function create_Plots(index) {
  // Fetch data by using json D3
  d3.json(url).then((data) => {
    console.log(data);

    // Create variable to hold all sample data
    const samples = data.samples;

    // Create three variables to hold the otu_ids, lables, and sample values
    const ids = samples[index].otu_ids;
    console.log(ids);

    const sample_values = samples[index].sample_values.slice(0, 10).reverse();
    console.log(sample_values);

    const labels = samples[index].otu_labels.slice(0, 10);
    console.log(labels);

    // Retrieve only top 10 otu ids and reversing it.
    const OTU_top = samples[index].otu_ids.slice(0, 10).reverse();

    // Retrieve the otu id's to the desired form for the plot
    const OTU_id = OTU_top.map((d) => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`);

    // Retrieve the top 10 labels for the plot
    const OTU_labels = samples[index].otu_labels.slice(0, 10);
    console.log(`OTU_labels: ${labels}`);

    const trace_1 = {
      x: sample_values,
      y: OTU_id,
      text: OTU_labels,
      marker: {
        color: "blue",
      },
      type: "bar",
      orientation: "h",
    };
    //  Create data variable
    const data_1 = [trace_1];

    // Create layout variable for bar plot
    const layout_1 = {
      title: "Top 10 OTU",
      yaxis: {
        tickmode: "linear",
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30,
      },
    };

    // Create the bar plot
    Plotly.newPlot("bar", data_1, layout_1);

    // The bubble chart
    const trace_2 = {
      x: samples[index].otu_ids,
      y: samples[index].sample_values,
      mode: "markers",
      marker: {
        size: samples[index].sample_values,
        color: samples[index].otu_ids,
      },
      text: samples[index].otu_labels,
    };

    // set the layout for the bubble plot
    const layout_2 = {
      xaxis: { title: "OTU ID" },
      height: 600,
      width: 1000,
    };

    // creating data variable
    const data_2 = [trace_2];

    // create the bubble plot
    Plotly.newPlot("bubble", data_2, layout_2);
  });
}
