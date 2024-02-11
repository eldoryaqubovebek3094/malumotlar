// Variables for storing data
var originalData = [];
var filteredData = [];
var tableBody = document.querySelector("#data-table tbody");
var filterInput = document.querySelector("#filter-input");
var totalAmountElement = document.querySelector("#total-amount");

// Clear the table
function clearTable() {
  tableBody.innerHTML = "";
}

// Populate the table with data
function populateTable(data) {
  var rows = [];
  var totalAmount = 0;

  data.forEach(function(item) {
    var imageHtml = `<td><a href="rasmlar/${item.image}"><img src="rasmlar/${item.image}" alt="Image"></a></td>`;
    var rowHtml = `<tr>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.message}</td>
      <td>${item.phoneNumber}</td>
      <td>${item.amount}</td>
      ${imageHtml}
    </tr>`;
    rows.push(rowHtml);
    var rowAmount = parseInt(item.amount, 10);
    totalAmount += rowAmount;
  });

  tableBody.innerHTML = rows.join("");
  totalAmountElement.textContent = totalAmount;
}

// Filter the table
function filterTable() {
  var keyword = filterInput.value.toLowerCase();
  if (keyword === "") {
    populateTable(originalData);
    return;
  }
  filteredData = originalData.filter(function(item) {
    return (
      item.name.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword) ||
      item.message.toLowerCase().includes(keyword) ||
      item.phoneNumber.toLowerCase().includes(keyword) ||
      item.amount.toString().includes(keyword) ||
      item.image.toLowerCase().includes(keyword)
    );
  });
  clearTable();
  populateTable(filteredData);
}

// Fetch JSON data and populate the table
fetch("data.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    originalData = data;
    populateTable(originalData);
  })
  .catch(function(error) {
    console.error(error);
  });

// Add event listener to the filter button
var filterButton = document.querySelector("#filter-button");
filterButton.addEventListener("click", filterTable);