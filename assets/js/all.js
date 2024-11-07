window.addEventListener("load", ()=>{
    let header = document.querySelector("header");
    let ex_left = document.getElementById("ex_left");
    let ex_right = document.getElementById("ex_right");
    let needChange = true;
    window.addEventListener("scroll", (ev)=>{
        let ws = window.scrollY;
        let height = Math.max(150 - window.scrollY, 50);
        if (height === 50 && needChange){
            needChange = false;
            header.style.height = height + "px";
            ex_left.style.transform = "rotate(-" + ws + "deg)";
            ex_right.style.transform = "rotate(" + ws + "deg)";
        }
        if (height > 50){
            needChange = true;
            header.style.height = height + "px";
            ex_left.style.transform = "rotate(-" + ws + "deg)";
            ex_right.style.transform = "rotate(" + ws + "deg)";
        }
    });
});