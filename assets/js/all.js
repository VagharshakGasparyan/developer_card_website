window.addEventListener("load", () => {
    let ws = window.scrollY;
    let header = document.querySelector("header");
    let ex_left = document.getElementById("ex_left");
    let ex_right = document.getElementById("ex_right");
    let exLeftRole = ex_left ? ex_left.getAttribute("role") : "rotate";
    let exRightRole = ex_right ? ex_right.getAttribute("role") : "rotate";
    let cogwheel_round = document.getElementById("cogwheel_round");
    let cogwheel_line = document.getElementById("cogwheel_line");
    let needChange = true;
    //-------------------------------------------------------------------------------
    let anim_numbers = document.querySelectorAll(".anim-number");
    let anim_arr = [];
    anim_numbers.forEach((anim_number, index) => {
        let start = parseInt(anim_number.getAttribute("data-start") ?? "0");
        let end = parseInt(anim_number.getAttribute("data-end") ?? "99");
        let interval = parseInt(anim_number.getAttribute("data-interval") ?? "50");
        anim_arr.push({el: anim_number, start: start, end: end, interval: interval, bul: false});
        anim_number.addEventListener("mouseenter", () => {
            anim_number.style.transition = "all 0ms ease-in-out";
            anim_number.style.transform = "scale(5)";
            anim_number.style.opacity = "0";
            setTimeout(() => {
                anim_number.style.transition = "all 300ms ease-in-out";
                anim_number.style.transform = "scale(1)";
                anim_number.style.opacity = "1";
            }, 50);
        });
        // anim_number.addEventListener("mouseleave", () => {
        //     anim_number.style.transition = "all 300ms ease-in-out";
        //     anim_number.style.transform = "scale(1)";
        // });
    });
    //---------------------------------------------------------------------------------
    fLightning();

    function fLightning() {
        if (!cogwheel_round) {
            return 0;
        }
        let c = cogwheel_round.getBoundingClientRect();
        let cx = c.left + c.width / 2;
        let cy = c.top + c.height / 2;
        let lightning_el = document.createElement("canvas");
        lightning_el.style.zIndex = "1550";
        lightning_el.style.position = "fixed";
        lightning_el.style.width = "0";
        lightning_el.style.height = "0";
        lightning_el.style.left = "0";
        lightning_el.style.top = "0";
        lightning_el.style.display = "none";
        // lightning_el.style.backgroundColor = "black";
        document.body.appendChild(lightning_el);

        let interval_id = null;
        function drawPixel (canvasData, w, h, x, y, r, g, b, a) {
            let index = (x + y * w) * 4;
            canvasData.data[index] = r;
            canvasData.data[index + 1] = g;
            canvasData.data[index + 2] = b;
            canvasData.data[index + 3] = a;
        }
        document.addEventListener("mousemove", (ev) => {
            if(interval_id !== null){
                clearInterval(interval_id);
            }
            let r = Math.sqrt((ev.x - cx) ** 2 + (ev.y - cy) ** 2);

            if (r <= 100) {
                let w = Math.round(Math.abs(ev.x - cx));
                let h = Math.round(Math.abs(ev.y - cy));
                let w1 = w + 20;
                let h1 = h + 20;
                lightning_el.style.display = "inline-block";
                lightning_el.style.left = (Math.min(ev.x, cx) - 10) + "px";
                lightning_el.style.top = (Math.min(ev.y, cy) - 10) + "px";
                lightning_el.width = w1;
                lightning_el.style.width = w1 + "px";
                lightning_el.height = h1;
                lightning_el.style.height = h1 + "px";
                // console.log(w, h, w1, h1);
                interval_id = setInterval(() => {
                    // console.log("a", w, h);
                    let is_hi = ((ev.x < cx && ev.y > cy) || (ev.x > cx && ev.y < cy));
                    let is_hmw = h > w;
                    let ctx = lightning_el.getContext("2d");
                    ctx.clearRect(0, 0, w1, h1);
                    let canvasData = ctx.getImageData(0, 0, w1, h1);

                    let points = [];
                    let prev = 0;
                    if(is_hmw){
                        for(let i = 0; i < h; i++){
                            let x = Math.floor(Math.random() * 3) - 1 + prev;
                            prev = x;
                            points.push({x: x, y: i});
                        }
                        let last_x = points[points.length - 1].x;
                        for(let i = 0; i < points.length; i++){
                            let x = is_hi
                                ? w - ((w - last_x) / h) * i - points[i].x
                                : ((w - last_x) / h) * i +  points[i].x;
                            x = Math.round(x);
                            drawPixel(canvasData, w1, h1, x + 10, i + 10, 255, 255, 255, 255);
                        }
                    }else{
                        for(let i = 0; i < w; i++){
                            let y = Math.floor(Math.random() * 3) - 1 + prev;
                            prev = y;
                            points.push({x: i, y: y});
                        }
                        let last_y = points[points.length - 1].y;
                        for(let i = 0; i < points.length; i++){
                            let y = is_hi
                                ? h - ((h - last_y) / w) * i - points[i].y
                                : ((h - last_y) / w) * i +  points[i].y;
                            y = Math.round(y);
                            drawPixel(canvasData, w1, h1, i + 10, y + 10, 255, 255, 255, 255);
                        }
                    }


                    ctx.putImageData(canvasData, 0, 0);
                }, 40);
            }else{
                lightning_el.style.display = "none";
                if(interval_id !== null){
                    clearInterval(interval_id);
                }
            }
        });
    }

    fAnimArr();

    function fAnimArr() {
        anim_arr.forEach((item) => {
            let anim_number = item.el;
            let bottom = anim_number.getBoundingClientRect().bottom;
            if (bottom < window.innerHeight && !item.bul) {
                let i = item.start;
                item.bul = true;
                let intervalId = setInterval(() => {
                    anim_number.innerHTML = i.toString();
                    i++;
                    if (i > item.end) {
                        clearInterval(intervalId);
                    }
                }, item.interval);
            }
        });
    }

    //-------------------------------------------------------------------------------
    window.addEventListener("scroll", (ev) => {
        ws = window.scrollY;
        //----------------------------------anim_numbers-begin-----------------------------------------------
        fAnimArr();
        //----------------------------------anim_numbers-end-------------------------------------------------
        let ws_min = Math.min(ws, 100);
        let height = Math.max(150 - ws, 50);
        if (height === 50 && needChange) {
            needChange = false;
            header.style.height = height + "px";
            fEx(ws_min, ws);
        }
        if (height > 50) {
            needChange = true;
            header.style.height = height + "px";
            fEx(ws_min, ws);
        }
        fCogwheel(ws);
    });

    function fEx(ws_min, ws) {
        if (ex_left) {
            if (exLeftRole === "rotate") {
                ex_left.style.transform = "rotate(-" + ws_min + "deg)";
            } else if (exLeftRole === "width") {
                ex_left.style.top = (150 - ws_min) + "px";
                ex_left.style.width = "calc(" + (50 - ws_min / 2) + "% + 15px)";
            } else if (exLeftRole === "height") {
                ex_left.style.top = (150 - ws_min) + "px";
                ex_left.style.height = (30 - ws_min * 0.3 < 0 ? 0 : 30 - ws_min * 0.3) + "px";
            }
        }
        if (ex_right) {
            if (exRightRole === "rotate") {
                ex_right.style.transform = "rotate(" + ws_min + "deg)";
            } else if (exLeftRole === "width") {
                ex_right.style.top = (150 - ws_min) + "px";
                ex_right.style.width = "calc(" + (50 - ws_min / 2) + "% + 15px)";
            } else if (exLeftRole === "height") {
                ex_right.style.top = (150 - ws_min) + "px";
                ex_right.style.height = (30 - ws_min * 0.3 < 0 ? 0 : 30 - ws_min * 0.3) + "px";
            }
        }
    }

    function fCogwheel(ws) {
        //342 12   342/12~60deg
        if (!cogwheel_round || !cogwheel_line) {
            return 0;
        }
        let dh = 342;
        let start = 124;
        let kr = (360 / 6) / (dh / 12);
        let rotate = Math.min((Math.max(ws - start, 0) * kr), dh * kr);
        // cogwheel_round.style.top = (50 + ws) + "px";
        cogwheel_round.style.transform = "rotate(-" + rotate + "deg)";
    }
});