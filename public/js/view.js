export

function drawBody(context, body) {
    let bodyEl = context.selectAll(`#${body.id}`)
        .data([body])

    bodyEl.attr({
        "cx": body.x[0],
        "cy": body.x[1]
    })

    bodyEl.enter()
        .append('circle')
        .attr({
            "cx": body.x[0],
            "cy": body.x[1],
            "r": body.m,
            "id": body.id
        })
}

export

function drawBodies(context, bodies) {
    bodies.forEach((d) => {
        drawBody(context, d);
    })
}

export

function setup() {
    let sel = d3.select("body").append("svg");
    sel.attr({
            "id": "board"
        })
        .style({
            "width": "98vw",
            "height": "98vh"
        })
    return sel;
}
