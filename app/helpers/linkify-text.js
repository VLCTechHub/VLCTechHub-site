import Ember from 'ember';

export function linkfy([text]) {
  if(Ember.isEmpty(text)) { return text; }

  text = text.replace(/\n/g, "<br />");
  text = text.replace(/https?:\/\/\S+[.][^\s.,;:<>)\]\\]+/gi, function (s) {
      return '<a href="' + s + '">' + s + '</a>';
  });

  text = text.replace(/(^|)@(\w+)/gi, function (s) {
      return '<a href="https://twitter.com/' + s + '">' + s + '</a>';
  });

  text = text.replace(/(^|)#(\w+)/gi, function (s) {
      return '<a href="https://twitter.com/hashtag/' + s.replace(/^#/,'') + '">' + s + '</a>';
  });
  return text;
}

export default Ember.Helper.helper(linkfy);
