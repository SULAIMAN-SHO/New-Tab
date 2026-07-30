
function clock() {
    const d = new Date();
    time.innerHTML = d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    date.innerHTML = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
clock();
setInterval(clock, 1000);

// Canvas Background
const c = document.getElementById("bg");
const ctx = c.getContext("2d");
let w, h, p = [];
function resize() {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
}
addEventListener("resize", resize);
resize();

for (let i = 0; i < 2000; i++) {
    p.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - .5) * .15,
        vy: (Math.random() - .5) * .15,

        alpha: Math.random(),                 // شفافية البداية
        twinkle: Math.random() * 0.01 + 0.001  // سرعة الوميض
    });
}

let t = 0;
function draw() {
    t += 0.002;
    ctx.clearRect(0, 0, w, h);

    let g = ctx.createRadialGradient(
        w / 2 + Math.cos(t) * 700,
        h / 2 + Math.sin(t * .8) * 386,
        80,
        w / 2, h / 2,
        900
    );
    g.addColorStop(0, "rgba(0,170,255,.30)");
    g.addColorStop(.5, "rgba(0,80,255,.10)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (const a of p) {
        a.alpha += a.twinkle;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0) a.x = w;
        if (a.x > w) a.x = 0;
        if (a.y < 0) a.y = h;
        if (a.y > h) a.y = 0;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle =
            `rgba(128,212,255,${0.3 + Math.abs(Math.sin(a.alpha)) * 0.7})`;
        ctx.fill();
    }
    requestAnimationFrame(draw);
}
draw();









const toggle = document.getElementById("toggleApps");

const apps = document.getElementById("googleApps");

const arrow = document.getElementById("arrow");

toggle.onclick = () => {

    apps.classList.toggle("show");

    arrow.innerHTML = apps.classList.contains("show")

        ? "▲"

        : "▼";

}