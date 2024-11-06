window.addEventListener("load", ()=>{
    let header = document.querySelector("header");
    let needChange = true;
    window.addEventListener("scroll", (ev)=>{
        let height = Math.max(150 - window.scrollY, 50);
        if (height === 50 && needChange){
            needChange = false;
            header.style.height = height + "px";
        }
        if (height > 50){
            needChange = true;
            header.style.height = height + "px";
        }
    });
});