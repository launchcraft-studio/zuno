// Simple vertical slide navigation

var panels = document.querySelectorAll(".panel");
var navButtons = document.querySelectorAll(".slide-nav button");
var activePanel = 0;

// Show one screen at a time
function showPanel(number) {
    if (number < 0) {
        number = panels.length - 1;
    }

    if (number >= panels.length) {
        number = 0;
    }

    activePanel = number;

    panels[0].classList.remove("active");
    panels[1].classList.remove("active");
    panels[2].classList.remove("active");
    panels[3].classList.remove("active");
    panels[activePanel].classList.add("active");

    navButtons[0].classList.remove("active");
    navButtons[1].classList.remove("active");
    navButtons[2].classList.remove("active");
    navButtons[3].classList.remove("active");
    navButtons[activePanel].classList.add("active");
}

// Vertical swipe
var touchStartX = 0;
var touchStartY = 0;

document.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener("touchend", function (event) {
    var touchEndX = event.changedTouches[0].screenX;
    var touchEndY = event.changedTouches[0].screenY;
    var differenceY = touchStartY - touchEndY;
    var differenceX = touchStartX - touchEndX;

    if (Math.abs(differenceY) > 55 && Math.abs(differenceY) > Math.abs(differenceX)) {
        if (differenceY > 0) {
            showPanel(activePanel + 1);
        } else {
            showPanel(activePanel - 1);
        }
    }
}, { passive: true });

// Keyboard support
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        showPanel(activePanel + 1);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        showPanel(activePanel - 1);
    }
});

// Start on the requested slide when using a hash
if (window.location.hash === "#video") {
    showPanel(1);
} else if (window.location.hash === "#contact") {
    showPanel(2);
} else if (window.location.hash === "#about") {
    showPanel(3);
} else {
    showPanel(0);
}

// Keep the slide indicator in sync
navButtons[0].addEventListener("click", function () { showPanel(0); });
navButtons[1].addEventListener("click", function () { showPanel(1); });
navButtons[2].addEventListener("click", function () { showPanel(2); });
navButtons[3].addEventListener("click", function () { showPanel(3); });


// Mouse drag on desktop uses the same vertical swipe gesture as touch.
var mouseStartY = 0;
var mouseStartX = 0;
var mouseIsDown = false;
var appArea = document.querySelector(".app");

appArea.addEventListener("mousedown", function (event) {
    if (event.target.closest("a, button, video")) {
        return;
    }
    mouseIsDown = true;
    mouseStartX = event.clientX;
    mouseStartY = event.clientY;
    appArea.classList.add("is-dragging");
});

document.addEventListener("mouseup", function (event) {
    if (!mouseIsDown) {
        return;
    }
    mouseIsDown = false;
    appArea.classList.remove("is-dragging");
    var differenceY = mouseStartY - event.clientY;
    var differenceX = mouseStartX - event.clientX;
    if (Math.abs(differenceY) > 55 && Math.abs(differenceY) > Math.abs(differenceX)) {
        if (differenceY > 0) {
            showPanel(activePanel + 1);
        } else {
            showPanel(activePanel - 1);
        }
    }
});

// Prevent the browser's native drag behaviour from interrupting the swipe gesture.
document.addEventListener("dragstart", function (event) {
    event.preventDefault();
});
