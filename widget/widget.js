'use strict'
// Write your module here
// It must send an event "frames:loaded" from the top frame containing a list of { name:label } pairs,
// which describes all the fields in each frame.

// This is a template to help you get started, feel free to make your own solution.
function execute() {
	try {
    // Step 1 Scrape Fields and Create Fields list object.
     function scrapeFields() {
      const fields = [];
      // Example of scraping input elements, adjust selectors as necessary
      const inputs = document.querySelectorAll('input[name]', 'select[name]');
      inputs.forEach(input => {
        const name = input.name;
        const label = document.querySelector(`label[for="${name}"]`)?.innerText || name;
        fields.push({ [name]: label });
      });

      console.log(fields);
      return fields;
    }


    // Step 2 Add Listener for Top Frame to Receive Fields.
    if (isTopFrame()) {
      const allFields = [];
      window.addEventListener('message', (event) => {

        if (event.data.fields) {
        console.log(fields);
        }
      });
    } else if (!isTopFrame()) {
      // Child frames sends Fields up to Top Frame.
      const fields = scrapeFields();
      sendFieldsToTop(fields);
    }
console.log(fields);
	} catch (e) {
		console.error(e)
	}
}



execute();

// Utility functions to check and get the top frame
// as Karma test framework changes top & context frames.
// Use this instead of "window.top".
function getTopFrame() {
  return window.top.frames[0];
}

function isTopFrame() {
  return window.location.pathname == '/context.html';
}