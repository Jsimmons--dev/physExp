import * as vec from "../js/vec";

let ID = 0;
let DRAG = .01;

export class Body {
    constructor(x, v, m, options, forces) {
        this.x = x;
        this.v = v;
        this.m = m;
        this.forces = forces || [];
        this.id = "id_" + ID++;
        let ops = options || {};
        if (ops.drag === true)
            this.drag = this.v.slice().map((d) => -d * DRAG)

    }
}

export

function updateBodies(bodies) {
    bodies.forEach((d) => updateBody(d));
}

export

function updateBody(body) {
    body.x = vec.add(body.x, body.v);
    body.forces.forEach((d, i) => {
        body.v = vec.add(body.v, body.forces[i][0]);
        body.forces[i][1] = body.forces[i][1] - 1;
        if (body.forces[i][1] === 0) body.forces.splice(i);
    })
    if (body.drag !== undefined) {
        body.v = vec.add(body.v, body.drag);
        body.drag = body.v.slice().map((d) => -d * DRAG)
    }

}
