  if ('serviceWorker' in navigator) {
    console.log("Will the service worker register?");
    navigator.serviceWorker.register('/sw.js',{scope: "/"})
      .then(function(reg){
        console.log("service worker registered", reg);
      }).catch(function(err) {
        console.log("failed to register service worker with error : ", err)
      });
  }