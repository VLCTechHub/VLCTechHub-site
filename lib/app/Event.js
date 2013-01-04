var Event = (function(){
	
	var events = [];
	
	function parse(rawEvents){

		for(var i=0, l = rawEvents.length; i < l; i++){
			var cell = parseCell(rawEvents[i]);
			if(cell.isHeader) continue;
			var theEvent = findOrCreateEvent(cell);
			updateField(theEvent, cell);
			events[cell.number] = theEvent;
		}

		removeUnpublished();
		sortByDate();

		console.log('events', events);

	}

	var toDate = function(stringDate){
		var dateParts = stringDate.split("/");
		return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
	}

	var removeUnpublished = function(){
		events = events.filter(
    		function (theEvent) {
        		return theEvent.published;
    		}
		);
	}

	var sortByDate = function(){
		
		events.sort(function(a, b){
			return a.date > b.date
		});
	}


	var updateField = function(theEvent, cell){
		var field = '';
		if(cell.letter === 'B') field = 'title';
		if(cell.letter === 'C') field = 'description';
		if(cell.letter === 'D') field = 'date';
		if(cell.letter === 'E') field = 'time';
		if(cell.letter === 'F') field = 'link';
		if(cell.letter === 'G') field = 'published';
		if(field === '') return;
		theEvent[field] = cell.content;
		if(field === 'date') theEvent[field] = toDate(theEvent[field]);
		if(field === 'published') theEvent[field] = (cell.content === '1');
	}

	var createEvent = function(){
		return {
			title: '',
			description: '',
			date: '',
			time: '',
			link: '',
			published: false
		}
	}

	var findOrCreateEvent = function(cell){
		var foundEvent = events[cell.number];
		if(foundEvent == undefined)	foundEvent = createEvent();
		return foundEvent;
	}

	function parseCell(rawEvent){

		var title = rawEvent.title['$t'];
		var content = rawEvent.content['$t'];

		var letter = title.substring(0,1);
		var number = title.substring(1);

		var cell = {
			letter: letter,
			number: number,
			content: content,
			isHeader: (number === '1')
		};

		return cell;

	}

	return {
		parse: parse
	}

	
})();