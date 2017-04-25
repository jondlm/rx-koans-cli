//
// Lesson 3
// Time
//

var Rx = require('rxjs/Rx');
var assert = require('assert');

describe('lesson 3', function() {
  it('launching an event in the future', function(done) {
    var result = '';
    var delay = 10;

    Rx.Observable
      .of('done')
      .delay(delay)
      .subscribe(function(x) { result = x; });

    setTimeout(function() {
      assert.equal(result, 'done');
      done();
    }, 25);
  });

  it('a watched pot', function(done) {
    var result = '';
    var timeToBoil = 10;
    var timeout = 15;
    var timeout$ = Rx.Observable.of('cold');

    Rx.Observable
      .of('boiling')
      .delay(timeToBoil)
      .timeoutWith(timeout, timeout$)
      .subscribe(function(x) { result = x; });

    setTimeout(function() {
      assert.equal(result, 'boiling');
      done();
    }, 30);
  });

});
