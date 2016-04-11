window.onload = function() {
    var imgs = document.getElementById("imgs");
    var pre = document.getElementById("pre");
    var next = document.getElementById("next");
    console.log(next);

    function moveRight() {
        var newleft = parseInt(imgs.style.left) - 800;
        imgs.style.left = newleft + "px";
        console.log(imgs.style.left);
    };

    next.onclick = moveRight;
};