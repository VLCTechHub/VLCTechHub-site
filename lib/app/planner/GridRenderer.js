var GridRenderer = (function(){
	
	var START_X = 70;
	var START_Y = 40;

	var DAY_WIDTH = 30;
	var DAY_HEIGHT = 35;
	var MAX_DAYS = 37;
	var MAX_MONTHS = 12;

	
	var DAYS_BEFORE_FIRST_SATURDAY = 5;
	
	var WIDTH = DAY_WIDTH * (MAX_DAYS - 1);
	var HEIGHT = DAY_HEIGHT * 11;

	var eventSymbol, pastEventSymbol;

	function draw(){
		initEventSymbols();
		drawGridLines();
		drawDayNames();		
	}

	function drawGridLines(){
		var start = new paper.Point(START_X, START_Y);
		for(var i=0, l = MAX_MONTHS; i <= l ; i++){
			var line = new paper.Path.Line(start, start.add([WIDTH + DAY_WIDTH, 0]));        
			start = start.add([0, DAY_HEIGHT]);
			line.strokeColor = '#999999';
		}

		start = new paper.Point(START_X, START_Y);
		for(var i=0, l = MAX_DAYS; i <= l ; i++){
			var line = new paper.Path.Line(start, start.add([ 0, HEIGHT + DAY_HEIGHT]));        
			start = start.add([DAY_WIDTH, 0]);
			line.strokeColor = '#999999';
		}
	}

	

	function createPoint(row, column){
		var x = row; //(row < MAX_DAYS) ? row : MAX_DAYS - 1;
		var y = column; //(column < MAX_MONTHS) ? column : MAX_MONTHS - 1;
		return new paper.Point(START_X + (DAY_WIDTH * x), START_Y + (DAY_HEIGHT * y));
	}

	function createRectangle(day1, month1, day2, month2){
		var origin = createPoint(day1, month1);
		var destination = createPoint(day2, month2+1);
		return new paper.Path.Rectangle(origin, destination);
	}

	function centerOfCell(row, column){
		return createPoint(row + 0.5, column + 0.5);
	}

	function initEventSymbols(){
		var raster = new paper.Raster('icon');
		eventSymbol = new paper.Symbol(raster);
		raster.remove();

		var pastRaster = new paper.Raster('icon-off');
		pastEventSymbol= new paper.Symbol(pastRaster);
		pastRaster.remove();
		
	}

	function drawEvent(day, month){
		eventSymbol.place(centerOfCell(day,month));

	}

	function drawPastEvent(day, month){
		pastEventSymbol.place(centerOfCell(day,month));
	}

	function drawMonthName(name, month){

		var text = new paper.PointText(new paper.Point(0, START_Y + (DAY_HEIGHT * month ) + DAY_HEIGHT / 2));
		text.fillColor = 'white';
		text.content = name;
	}

	function drawDayName(name, day){
		var text = new paper.PointText(new paper.Point( START_X + (DAY_WIDTH * day) + (DAY_WIDTH / 3), START_Y - 10));
		text.fillColor = 'white';
		text.content = name;
	}

	function drawDayNames(){
		var i = 0;
		for(i = 0, l = MAX_DAYS; i < l - 7; i = i + 7){
			drawDayName('L',0 + i);
			drawDayName('M',1 + i);
			drawDayName('X',2 + i);
			drawDayName('J',3 + i);
			drawDayName('V',4 + i);
			drawDayName('S',5 + i);
			drawDayName('D',6 + i);
		}
		if(i < MAX_DAYS) drawDayName('L',i++);
		if(i < MAX_DAYS) drawDayName('M',i++);
		if(i < MAX_DAYS) drawDayName('X',i++);
		if(i < MAX_DAYS) drawDayName('J',i++);
		if(i < MAX_DAYS) drawDayName('V',i++);
		if(i < MAX_DAYS) drawDayName('S',i++);
		if(i < MAX_DAYS) drawDayName('D',i++);
	}



	return {
		createRectangle: createRectangle,
		centerOfCell: centerOfCell,
		draw: draw,
		drawEvent: drawEvent,
		drawPastEvent: drawPastEvent,
		drawMonthName: drawMonthName
	}

})();