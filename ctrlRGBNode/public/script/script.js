$(document).ready(function () {
    let socket = io();

    let c = {
        r: 0,
        g: 0,
        b: 0
    };

    setColor(c);

    function setColor(color) {
        $("#rgb").css("background-color", `rgb(${color.r}, ${color.g}, ${color.b})`);
        $("#txtRGB").text(`R = ${color.r} | G = ${color.g} | B = ${color.b}`);
    }

    socket.on("color", (msg) => {
        console.log(msg);
        setColor(msg)
    });
});