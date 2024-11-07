window.addEventListener("load", ()=>{
    let header = document.querySelector("header");
    let ex_left = document.getElementById("ex_left");
    let ex_right = document.getElementById("ex_right");
    let needChange = true;
    window.addEventListener("scroll", (ev)=>{
        let ws = window.scrollY;
        let ws_min = Math.min(2 * ws, 100);
        let height = Math.max(150 - window.scrollY, 50);
        if (height === 50 && needChange){
            needChange = false;
            header.style.height = height + "px";
            ex_left.style.transform = "rotate(-" + ws_min + "deg)";
            ex_right.style.transform = "rotate(" + ws_min + "deg)";
        }
        if (height > 50){
            needChange = true;
            header.style.height = height + "px";
            ex_left.style.transform = "rotate(-" + ws_min + "deg)";
            ex_right.style.transform = "rotate(" + ws_min + "deg)";
        }
    });
});