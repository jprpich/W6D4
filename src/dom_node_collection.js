class DOMNodeCollection {
  constructor(array){
    this.array = array;
    this.listener = '';
  }

  html(str){
    if(str){
      this.array.forEach(element => {
        element.innerHTML= str;
      });
    } else {
      return this.array[0].innerHTML;
    }
  }

  empty(){
    this.array.forEach(element => {
      element.innerHTML = '';
    });
  }

  append(arg){
    if (arg instanceof DOMNodeCollection) {
      this.array.forEach(ele1 => {
        arg.array.forEach(ele2 => {
          ele1.innerHTML += ele2.outerHTML;
        });
      });
    } else {
      this.array.forEach(element => {
        element.innerHTML += arg;
      });
    }
    
  }

  attr(attribute, val){
    if(val){
      this.array.forEach(element => {
        element.setAttribute(attribute, val);
      });
    } else {
      return this.array[0].getAttribute(attribute);

    }

  }

  addClass(arg){
    this.array.forEach(element => {
      element.classList.add(arg);
    });
  }

  removeClass(arg){
    this.array.forEach(element => {
      element.classList.remove(arg);
    });
  }

  children(){
    let result = [];
    this.array.forEach(element => {
      result.push(element.children);
    });
    return new DOMNodeCollection(result);
  }
  
  parent(){
    let result = [];
    this.array.forEach(element => {
      if (!result.includes(element.parentNode)) result.push(element.parentNode);
    });
    return new DOMNodeCollection(result);
    // return new DOMNodeCollection(this.array[0].parentNode(attribute));

  }

  find(selector){
    // this.array.forEach(element => {
    // });
    let arr = [];
    this.array.forEach(element => {
      let nodes = element.querySelectorAll(selector);
      arr = arr.concat(Array.from(nodes));
    });
    return new DOMNodeCollection(arr);
  }

  remove(){ 
    this.array.forEach(element => {
      element.parentNode.removeChild(element);
    });
  }

  on(type, cb){
    this.array.forEach(element => {
      element.addEventListener(type, cb);
      element[`${type}Listeners`] = element[`${type}Listeners`] || [];
      element[`${type}Listeners`].push(cb);
    });
  }

  off(type){
    debugger
    this.array.forEach(element => {
      element[`${type}Listeners`].forEach(callback => {
        element.removeEventListener(type, callback);
    });
  }


}

module.exports = DOMNodeCollection;