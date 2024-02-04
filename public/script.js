document.addEventListener('DOMContentLoaded', () => {
    // Ensure the DOM is fully loaded before attaching event listeners
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchLaws);
  });
  
  function searchLaws() {
    const searchInput = document.getElementById('searchInput').value;
  
    // Make a request to the search endpoint
    fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(searchInput)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle the search results
        console.log(data);
  
        // Update your UI with the search results
        updateUI(data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Display an error message to the user or handle the error appropriately
      });
  }
  
  function updateUI(results) {
    const searchResultsContainer = document.getElementById('searchResults');
  
    // Clear previous search results
    searchResultsContainer.innerHTML = '';
  
    if (results.length === 0) {
      // Display a message when there are no search results
      searchResultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
      // Display each search result
      results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `
          <h3>${result.title}</h3>
          <p>Article Name: ${result.articleName || 'N/A'}</p>
          <p>Article Number: ${result.articleNumber || 'N/A'}</p>
          <p>${result.content}</p>
        `;
        searchResultsContainer.appendChild(resultElement);
      });
    }
  }
  