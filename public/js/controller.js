import {
    Body
}
from "../js/model";
import * as view from "../js/view";
import * as model from "../js/model";

let bodies = [];
bodies.push(new Body([0, 0], [1, 1], 15, {
    "drag": true
}, [
    [
        [.1, .3], 10
    ]
]))
bodies.push(new Body([10, 30], [2, 2], 5, {
    "drag": true
}))

let context = view.setup();

var mainloop = () => {
    model.updateBodies(bodies);
    view.drawBodies(context, bodies);
};

var recursiveAnim = () => {
    mainloop();
    window.requestAnimationFrame(recursiveAnim);
}

window.requestAnimationFrame(recursiveAnim);

//window.requestAnimationFrame(mainloop);
setTimeout(() => {
    let focusBody;
    document.querySelector("#id_0").addEventListener("mousedown", (e) => {
        console.log('dragstart')
        focusBody = bodies[0];
    })
    document.querySelector("#id_0").addEventListener("mousemove", (e) => {
        console.log('drag')
        focusBody.x = [e.clientX, e.clientY]
    })
    document.querySelector("#id_0").addEventListener("mouseup", (e) => {
        console.log('dragend')
        focusBody = undefined;
    })
}, 0)
