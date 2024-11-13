window.addEventListener('load', function () {
    //------------------user settings--------------------------
    let hexagon_side = 20;
    let lineWidth = 3;
    //------------------user settings--------------------------
    let c = document.getElementById("canvas-hexagon");
    if(!c){
        return 0;
    }
    let cxy = {x: 0, y: 0, c: false};
    c.addEventListener("mousemove", (ev) => {
        cxy.x = ev.offsetX;
        cxy.y = ev.offsetY;
    });
    c.addEventListener("mousedown", (ev) => {
        cxy.c = true;
    });
    c.addEventListener("mouseup", (ev) => {
        cxy.c = false;
    });
    c.width = c.getBoundingClientRect().width;
    c.height = c.getBoundingClientRect().height;
    let ctx = c.getContext('2d');//CanvasRenderingContext2D
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#970";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    let kx = Math.cos(Math.PI / 6) * hexagon_side * 2;
    let ky = hexagon_side * 1.5;
    let g = {
        hexes: [],
        hexMoment: "x0y0"
    };

    requestAnimationFrame(draw);

    function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        f1();
        requestAnimationFrame(draw);
    }
    function fMakeHexByCenter(hex, i) {
        let x0 = hex.x, y0 = hex.y, t = hex.t;
        let m = 100;
        let opacity = (Math.floor(15.99999 * Math.max(m - t, 0) / m)).toString(16);
        ctx.strokeStyle = "#970" + opacity;
        ctx.beginPath();
        ctx.moveTo(x0 - 0.5 * kx, y0 - 0.5 * hexagon_side);
        ctx.lineTo(x0, y0 - hexagon_side);
        ctx.lineTo(x0 + 0.5 * kx, y0 - 0.5 * hexagon_side);
        ctx.lineTo(x0 + 0.5 * kx, y0 + 0.5 * hexagon_side);
        ctx.lineTo(x0, y0 + hexagon_side);
        ctx.lineTo(x0 - 0.5 * kx, y0 + 0.5 * hexagon_side);
        ctx.closePath();
        ctx.stroke();// Draw the Path
        g.hexes[i].t = t + 1;
        if (t > m){
            g.hexes.splice(i, 1);
        }
    }
    function fFindCenter() {
        //1)x=0, kx, 2kx, ...
        //2)x=0.5kx, 1.5kx, 2.5kx, ...
        //y=0, ky, 2ky, 3ky, 4ky
        let ny = Math.round(cxy.y / ky);
        let y0 = ny * ky;
        let x0 = ny % 2 === 0
            ? Math.round(cxy.x / kx) * kx
            : (Math.round(cxy.x / kx - 0.5) + 0.5) * kx;
        let hexMoment = "x" + x0 + "y" + y0;
        if(hexMoment !== g.hexMoment){
            g.hexMoment = hexMoment;
            g.hexes.push({x: x0, y: y0, t: 0});
        }
        g.hexes.forEach((hex, i)=>{
            fMakeHexByCenter(hex, i);
        });

    }

    function f1() {

        fFindCenter();
    }
});