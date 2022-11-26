
// allows us to listen and dispatch events from independant components.
// implements the PubSub pattern, events will be fired from other components so they
// dont have direct dependencies between each other.
const eventBus = {
    // attaches EventListener to document object, the callback will be called when 
    // event gets fired.
    on(event, callback) {
      document.addEventListener(event, (e) => callback(e.detail));
    },
    // fires an event using the CustomEvent API
    dispatch(event, data) {
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    // removes the attached event from the document object
    remove(event, callback) {
      document.removeEventListener(event, callback);
    },
  };
  
  export default eventBus;