window.addEventListener("load", ()=>{
    let header = document.querySelector("header");
    window.addEventListener("scroll", (ev)=>{
        let height = Math.max(150 - window.scrollY, 50);
        if (height >= 50){
            header.style.height = height + "px";
            console.log("www");        }
    });
});