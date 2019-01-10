const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function(selector) {
  if (selector instanceof HTMLElement){
    let matches = [selector];
    return new DOMNodeCollection(matches);
  } else {
      let matches = document.querySelectorAll(selector);
      let matchesArr = Array.from(matches);
      let matchedDom = new DOMNodeCollection(matchesArr);
      return matchedDom;
  }
};

// const documentReadyCallback = () =>{




