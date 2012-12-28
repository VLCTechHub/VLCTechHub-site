var Planner = (function(){

	var JANUARY = 0;
    var FEBRARY = 1;
    var MARCH = 2;
    var APRIL = 3;
    var MAY = 4;
    var JUNE = 5;
    var JULY = 6;
    var AUGUST = 7;
    var SEPTEMBER = 8;
    var OCTOBER = 9;
    var NOVEMBER = 10;
    var DECEMBER = 11;

    var year = 2013;
  
    var planner = [];
    

    function setupMonth(month, frontHoles){
      planner[month] = { numeral: month, frontHoles: frontHoles, daysInMonth:daysInMonth(month) }
    }

    function setupPlanner(){
      setupMonth(JANUARY, 1);
      setupMonth(FEBRARY, 4);
      setupMonth(MARCH, 4);
      setupMonth(APRIL, 0);
      setupMonth(MAY, 2);
      setupMonth(JUNE, 5);
      setupMonth(JULY, 0);
      setupMonth(AUGUST, 3);
      setupMonth(SEPTEMBER, 6);
      setupMonth(OCTOBER, 1);
      setupMonth(NOVEMBER, 4);
      setupMonth(DECEMBER, 6);
    }

    function setup(){
    	setupPlanner();
    }

    function month(index){
    	return planner[index];
    }

    function totalOfMonths(){
    	return planner.length;
    }

    function forEachMonth(next){
    	for(var i=0, l = planner.length; i < l; i++){
    		next(month(i));
    	}
    }

    function daysInMonth(month){
      return new Date(year, month + 1, 0).getDate();
    }




	return {
		setup: setup,
		month: month,
		totalOfMonths: totalOfMonths,
		forEachMonth: forEachMonth
	}

})();