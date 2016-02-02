/* jshint expr:true */
import { expect } from 'chai';
import  moment from 'moment';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'event',
  'Event',
  {
    // Specify the other units that are required for this test.

  },
  function() {
    it('should know if it is a past event', function() {
      let model = this.subject();
      var lastYear = moment().add(-1, 'year');
      model.set('date', lastYear);
      expect(model.get('isPastEvent')).to.be.true;
    });

    it('should change the time in Madrid timezone', function(){
      let model = this.subject();
      var date = new Date('2000-01-01T12:00:00-01');
      model.set('date', date);
      model.set('time', '18:30');
      var madridDate = moment.tz('2000-01-01 18:30','YYYY-MM-DD HH:mm','Europe/Madrid');
      expect(model.get('time').toString()).to.equal(madridDate.format('HH:mm'));
    });
  }
);
