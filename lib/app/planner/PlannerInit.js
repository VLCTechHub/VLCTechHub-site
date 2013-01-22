(function() {
        
    var canvas = document.getElementById('planner');
    paper.setup(canvas);
    Planner.setup();
    PlannerRenderer.draw(Planner);
    PlannerRenderer.drawEvents();   
    paper.view.draw();
})();