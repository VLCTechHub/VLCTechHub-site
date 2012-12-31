(function() {
        
    var canvas = document.getElementById('planner');
    paper.setup(canvas);
    Planner.setup();
    PlannerRenderer.draw(Planner);   
    /*var tool = new paper.Tool();
    tool.onMouseMove = function(event) {
        console.log('event.point', event.point);
    }*/

    paper.view.draw();
    console.log(matchMedia('(min-width: 1250px)'));
})();