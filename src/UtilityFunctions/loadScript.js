function x(scriptUrl) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptUrl;
    script.onload = () => {
      console.log("script loading");
      resolve();
    };
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("the script has been added to the head");
  });
}

export default x;
