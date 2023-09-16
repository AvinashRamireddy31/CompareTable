// Function to fetch data from CSV file
function fetchCSVFile(filename, callback) {
  fetch(filename)
      .then(response => response.text())
      .then(data => callback(data))
      .catch(error => console.error('Error:', error));
}

// Function to convert CSV data to a dictionary
function csvToDictionary(csvData) {
  const dictionary = {};

  // Split the CSV data into lines
  const lines = csvData.trim().split('\n');

  // Iterate through each line
  lines.forEach(line => {
    // Split each line into name and values using a comma as the separator
    const parts = line.split(',');
    const name = parts[0].trim().replace(/"/g, '');
    const values = parts.slice(1).join(',').split(',').map(value => value.trim().replace(/"/g, ''));

    // Store the values as an array in the dictionary using the name as the key
    dictionary[name] = values;
  });

  return dictionary;
}

function compareAndHighlightDictionaries(info, dictionaryA, dictionaryB) {
  const table = document.getElementById(info.tableId);
  const tbody = table.querySelector("tbody");

  document.getElementById(info.list_A_Heading_ID).textContent = info.list_A_Heading
  document.getElementById(info.list_B_Heading_ID).textContent = info.list_B_Heading

  // Get a combined list of all unique keys from both dictionaries
  const allKeys = new Set([...Object.keys(dictionaryA), ...Object.keys(dictionaryB)]);

  // Iterate through each key
  allKeys.forEach(key => {
    const valuesA = dictionaryA[key] || [];
    const valuesB = dictionaryB[key] || [];
    const row = document.createElement("tr");
    const cellKey = document.createElement("td");
    const cellValuesA = document.createElement("td");
    const cellValuesB = document.createElement("td");

    // Highlight the name if there are any matches in listA and listB values
    if (valuesA.some(valueA => valuesB.includes(valueA))) {
        cellKey.innerHTML = `<span class="highlight">${key}</span>`;
    } else {
      cellKey.innerHTML = `<span class="non-match">${key}</span>`;
    }

    // Create arrays to store highlighted values for each dictionary
    const highlightedValuesA = [];
    const highlightedValuesB = [];

      // Iterate through the values for this key in dictionaryA
    valuesA.forEach(valueA => {
      if (valuesB.includes(valueA)) {
          // Highlight the value if it matches in both dictionaries
          highlightedValuesA.push(`<span class="highlight">${valueA}</span>`);
      } else {
          highlightedValuesA.push(`<span class="non-match">${valueA}</span>`);
      }
    });

    // Iterate through the values for this key in dictionaryB
    valuesB.forEach(valueB => {
      if (valuesA.includes(valueB)) {
          // Highlight the value if it matches in both dictionaries
          highlightedValuesB.push(`<span class="highlight">${valueB}</span>`);
      } else {
          highlightedValuesB.push(`<span class="non-match">${valueB}</span>`);
      }
    });

    // Populate the cells with highlighted values
    cellValuesA.innerHTML = highlightedValuesA.join("<br>");
    cellValuesB.innerHTML = highlightedValuesB.join("<br>");

    // Append cells to the row and row to the table
    row.appendChild(cellKey);
    row.appendChild(cellValuesA);
    row.appendChild(cellValuesB);
    tbody.appendChild(row);
  });
}

// Call the function to fetch CSV data and generate the table when the page loads
window.addEventListener("load", function () {
  fetchCSVFile(list_uat_file, function (csvData1) {
    fetchCSVFile(list_blue_file, function (csvData2) {
      fetchCSVFile(list_green_file, function (csvData3) {
        const dictionaryUAT = csvToDictionary(csvData1);
        const dictionaryBlue = csvToDictionary(csvData2);
        const dictionaryGreen = csvToDictionary(csvData3);

        const info1 = {
          tableId: "comparisonTable1",
          list_A_Heading_ID: "list_A_Heading1",
          list_B_Heading_ID: "list_B_Heading1",
          list_A_Heading: "UAT",
          list_B_Heading: "PROD-BLUE",
        }

        const info2 = {
          tableId: "comparisonTable2",
          list_A_Heading_ID: "list_A_Heading2",
          list_B_Heading_ID: "list_B_Heading2",
          list_A_Heading: "PROD-GREEN",
          list_B_Heading: "UAT",
        }

        compareAndHighlightDictionaries(info1, dictionaryUAT, dictionaryBlue);
        compareAndHighlightDictionaries(info2, dictionaryGreen, dictionaryUAT);
      });
    });
  });
});
