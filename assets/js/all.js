window.addEventListener("load", () => {
    let header = document.querySelector("header");
    let ex_left = document.getElementById("ex_left");
    let ex_right = document.getElementById("ex_right");
    let exLeftRole = ex_left ? ex_left.getAttribute("role") : "rotate";
    let exRightRole = ex_right ? ex_right.getAttribute("role") : "rotate";
    let cogwheel_round = document.getElementById("cogwheel_round");
    let cogwheel_line = document.getElementById("cogwheel_line");
    let needChange = true;
    window.addEventListener("scroll", (ev) => {
        let ws = window.scrollY;
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