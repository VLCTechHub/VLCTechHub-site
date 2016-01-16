import Ember from 'ember';

export function linkfy([text]) {
  text = text.replace(/\n/g, "<br />");
  text = text.replace(/https?:\/\/\S+[.][^\s.,;:<>)\]\\]+/gi, function (s) {
      return '<a href="' + s + '">' + s + '</a>';
  });

  text = text.replace(/(^|)@(\w+)/gi, function (s) {
      return '<a href="http://twitter.com/' + s + '">' + s + '</a>';
  });

  text = text.replace(/(^|)#(\w+)/gi, function (s) {
      return '<a href="http://search.twitter.com/search?q=' + s.replace(/#/,'%23') + '">' + s + '</a>';
  });
  return text;
}

export default Ember.Helper.helper(linkfy);
