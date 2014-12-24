//
// Lesson 3
// Time
//

var Rx = require('rx');
var assert = require('assert');

describe('lesson 3', function() {
  it('launching an action in the future', function(done) {
    var result = '';
    var delay = ________;

    Rx.Scheduler.timeout
      .scheduleWithRelative(delay, function() { result = 'done'; });

    assert.equal(result, '');

    setTimeout(function() {
      assert.equal(result, 'done');
      done();
    }, 25);
  });

  it('immediately launching an action', function() {
    var result = '';

    Rx.Scheduler.immediate
      .schedule(function() { result = 'done'; });

    assert.equal(result, ________);
  });

  it('launching an event in the future', function(done) {
    var result = '';
    var delay = ________;

    Rx.Observable
      .just('done', Rx.Scheduler.immediate)
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
    var timeout = ________;
    var timeout$ = Rx.Observable.just('cold');

    Rx.Observable
      .just('boiling')
      .delay(timeToBoil)
      .timeout(timeout, timeout$)
      .subscribe(function(x) { result = x; });

    setTimeout(function() {
      assert.equal(result, 'boiling');
      done();
    }, 25);
  });

});
