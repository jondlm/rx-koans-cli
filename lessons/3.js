//
// Lesson 3
// Time
//

var Rx = require('rx');
var assert = require('assert');

describe('lesson 3', function() {
  it('LaunchingAnActionInTheFuture', function(done) {
    var result = '';
    var delay = 10/*TODO:underscore*/;

    Rx.Scheduler.timeout
      .scheduleWithRelative(delay, function() { result = 'done'; });

    assert.equal(result, '');

    setTimeout(function() {
      assert.equal(result, 'done');
      done();
    }, 25);
  });

  it('ImmediatelyLaunchingAnAction', function() {
    var result = '';

    Rx.Scheduler.immediate
      .schedule(function() { result = 'done'; });

    assert.equal(result, 'done'/*TODO:underscore*/);
  });

  it('LaunchingAnEventInTheFuture', function(done) {
    var result = '';
    var delay = 10/*TODO:underscore*/;

    Rx.Observable
      .just('done', Rx.Scheduler.immediate)
      .delay(delay)
      .subscribe(function(x) { result = x; });

    setTimeout(function() {
      assert.equal(result, 'done');
      done();
    }, 25);
  });

  it('AWatchedPot', function(done) {
    var result = '';
    var timeToBoil = 10;
    var timeout = 15/*TODO:underscore*/;
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
