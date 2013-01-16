var PlannerRenderer = (function(){


	var START_X = 70;
	var START_Y = 40;

	var DAY_WIDTH = 30;
	var DAY_HEIGHT = 35;
	var MAX_DAYS = 37;
	var MAX_MONTHS;
	
	var DAYS_BEFORE_FIRST_SATURDAY = 5;
	
	var WIDTH = DAY_WIDTH * (MAX_DAYS - 1);
	var HEIGHT = DAY_HEIGHT * 11;

	var planner;
	var grid;

	function draw(_planner){
		planner = _planner;
		grid = GridRenderer;
		MAX_MONTHS = planner.totalOfMonths() - 1;
		fillBackground();
		drawWeekends();
		drawEmptyDays();
		grid.draw();
		drawMonthNames();
	}

	function drawEvents(){
		for(var i=0,l=Events.size();i<l;i++){
              drawEvent(Events.get(i).date);
          }
	}

	function drawEvent(date){
		grid.drawEvent(date.getDate(), date.getMonth());
	}

	function fillBackground(){
		var rect = grid.createRectangle(0,0,MAX_DAYS, MAX_MONTHS);
		rect.fillColor = '#EBEBE9';
	}
	

	function drawWeekends(){
		var weekendDay = DAYS_BEFORE_FIRST_SATURDAY;
		while(weekendDay < MAX_DAYS){
			var weekend = grid.createRectangle(weekendDay,0,weekendDay+2,MAX_MONTHS);
			weekend.fillColor = '#DBE230';
			weekendDay += 7;
		}
	}

	function drawEmptyDays(){
		planner.forEachMonth(function(month){
			if(month.frontHoles != 0){
				var emptyFirstDays = grid.createRectangle(0,month.numeral, month.frontHoles,month.numeral);
				emptyFirstDays.fillColor = 'white';
			}
			var emptyLastDays = grid.createRectangle(month.frontHoles + month.daysInMonth,month.numeral, MAX_DAYS,month.numeral);
			emptyLastDays.fillColor = 'white';

		});
	}

	function drawMonthNames(){
		grid.drawMonthName('Enero',0);
		grid.drawMonthName('Febrero',1);
		grid.drawMonthName('Marzo',2);
		grid.drawMonthName('Abril',3);
		grid.drawMonthName('Mayo',4);
		grid.drawMonthName('Junio',5);
		grid.drawMonthName('Julio',6);
		grid.drawMonthName('Agosto',7);
		grid.drawMonthName('Setptiembre',8);
		grid.drawMonthName('Octubre',9);
		grid.drawMonthName('Noviembre',10);
		grid.drawMonthName('Diciembre',11);
	}

	


    return {
    	draw: draw,
    	drawEvents: drawEvents
    }

})();