//Extensions that read or write to web pages utilize a content script. 
//The content script contains JavaScript that executes in the contexts 
//of a page that has been loaded into the browser. Content scripts read 
//and modify the DOM of web pages the browser visits.
//Content scripts can communicate with their parent extension 
//by exchanging messages and storing values using the storage API.



console.log('from content-scripts')