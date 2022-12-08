
// Has to return a promise as Reading happens asynchronously.
// does not return result of promise as the promise needs to be dealt 
// with in the method calling this helper method 
export const fileToDataURL = (file) => {

    try {
        const promise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function () {
              resolve(reader.result);
            }
            reader.readAsDataURL(file);
        });
        return promise;  
    } catch (e) {
        throw "No document or wront file type!"
    }  
}

export const dataURLToFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]), 
    n = bstr.length, 
    u8arr = new Uint8Array(n);
    
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }   

    return new File([u8arr], filename, {type:mime});
}
