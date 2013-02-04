var Events = (function(){
  
  var events = [];
  
  var sortByDate = function(){
    events.sort(function(a, b){
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0;
    });
  }

  var filterFromNowOn = function(){
    return events.filter(function(element){
      var startOfTheDay = new Date();
      startOfTheDay.setHours(0, 0, 0, 0);
      return (element.date >= startOfTheDay);
    });
  }

  var get = function(index){
    return events[index];
  }

  var getAll = function(){
    return events;
  }

  var set = function(allEvents){
    events = allEvents;
    sortByDate();
  }

  var size = function(){
    return events.length;
  }


  return {
    sortByDate: sortByDate,
    filterFromNowOn: filterFromNowOn,
    get: get,
    getAll: getAll,
    set: set,
    size: size
  }
  
})();


VLCTechHub = {};
VLCTechHub.Parser = (function(){

  var events = [];
  
  function parse(rawEvents){

    for(var i=0, l = rawEvents.length; i < l; i++){
      var cell = parseCell(rawEvents[i]);
      var theEvent = findOrCreateEvent(cell);
      updateField(theEvent, cell);
      events[cell.number] = theEvent;
    }

    return events;
  }

  var toDate = function(stringDate){
    var dateParts = stringDate.split("/");
    return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
  }


  var updateField = function(theEvent, cell){
    var field = '';
    if(cell.letter === 'A') field = 'title';
    if(cell.letter === 'B') field = 'description';
    if(cell.letter === 'C') field = 'date';
    if(cell.letter === 'D') field = 'time';
    if(cell.letter === 'E') field = 'link';
    if(field === '') return;
    theEvent[field] = cell.content;
    if(field === 'date') theEvent[field] = toDate(theEvent[field]);
  }

  var findOrCreateEvent = function(cell){
    var foundEvent = events[cell.number];
    if(foundEvent == undefined)  foundEvent = createEvent(); 
    return foundEvent;
  }

  var createEvent = function(){
    return {
      title: '',
      description: '',
      date: '',
      time: '',
      link: ''
    }
  }

  function parseCell(rawEvent){

    var title = rawEvent.title['$t'];
    var content = rawEvent.content['$t'];

    var letter = title.substring(0,1);
    var number = parseInt(title.substring(1)) - 1 ;

    var cell = {
      letter: letter,
      number: number,
      content: content
    };

    return cell;

  }

  return {
    parse: parse
  }

})();

VLCTechHub = VLCTechHub || {};
VLCTechHub.Service = (function(){

  function getJSONP(url, success) {
    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);
  }

  var getEvents = function(next){
     getJSONP('http://spreadsheets.google.com/feeds/cells/0AsqlSYFO18QfdC1oSU1qMzBZYUwxbWY2T0JUZjVvc3c/od5/public/basic?alt=json&callback=?', function(data){
          var events = VLCTechHub.Parser.parse(data.feed.entry);
          Events.set(events);
          next();
    });
  }

  return {
    getEvents: getEvents          
  }

})();

VLCTechHub = VLCTechHub || {};
VLCTechHub.View = (function(){

  Handlebars.registerHelper('toDate', function(date) {
    var day = zeroPad(date.getDate());
    var month = zeroPad(1 + date.getMonth());
    var year = ("" + date.getFullYear()).slice(-2);
    
    return day + '.' + month + '.' + year;
  });

  Handlebars.registerHelper('toTime', function(time) {
    return time ? time.substring(0,5) : '';
  });

  Handlebars.registerHelper('crop', function(text) {
    var limit = 450;
    return text.length < limit ? text : text.substring(0,limit) + '...';
  });

  Handlebars.registerHelper('linkToCalendar', function(anEvent) {
    var title = encodeURIComponent(anEvent.title);
    var dateStart = new Date(anEvent.date);
    addTime(dateStart, anEvent.time);
    var dateEnd = new Date(anEvent.date);
    dateEnd.setHours(dateStart.getHours() + 1 );
    var dates =  isoDate(dateStart) + '/' + isoDate(dateEnd);
    var details = encodeURIComponent('Más info: ' + anEvent.link);
    return 'http://www.google.com/calendar/event?action=TEMPLATE&text=' + title + '&dates=' + dates + '&details='+ details;
  });

  var addTime = function(date, time){
    var fields = time.split(':');
    date.setHours(fields[0], fields[1], 0, 0);
  }
  
  var zeroPad = function(number){
    return ("0" + number).slice(-2);
  };

  var isoDate = function(d) {
    return d.getUTCFullYear() +  zeroPad(d.getUTCMonth() + 1) + zeroPad(d.getUTCDate()) + 'T' +
         zeroPad(d.getUTCHours()) + zeroPad(d.getUTCMinutes()) + zeroPad(d.getUTCSeconds()) + 'Z';
  };

  var render = function(){

      var source   = document.getElementById("event-template").innerHTML;
      var template = Handlebars.compile(source);
      var html = template({events: Events.filterFromNowOn()});
      document.getElementById('events').innerHTML = html;

  };

  return {
    render: render
  }

})();

