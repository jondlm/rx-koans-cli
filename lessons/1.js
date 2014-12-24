//
// Lesson 1
// Observable streams
//

var Rx = require('rx');
var assert = require('assert');

describe('lesson 1, observable streams: ', function() {
  it('SampleSubscription', function() {
    Rx.Observable
      .just(45)
      .subscribe(function(x) { assert.equal(x, 45/*TODO:underscore*/); });
  });

  it('SimpleReturn', function() {
    var result = '';

    Rx.Observable
      .just('foo')
      .subscribe(function(x) { result = x; });

    assert.equal(result, 'foo'/*TODO:underscore*/);
  });

  it('TheLastEvent', function() {
    var result = '';
    var strings = ['foo','bar'];

    Rx.Observable
      .fromArray(strings)
      .subscribe(function(x) { result = x; });

    assert.equal(result, 'bar'/*TODO:underscore*/);
  });

  it('EverythingCounts', function() {
    var result = 0;
    var numbers = [1, 2, 3];

    Rx.Observable
      .fromArray(numbers)
      .subscribe(function(x) { result += x; });

    assert.equal(result, 6/*TODO:underscore*/);
  });

  it('RestOnSunday', function() {
    var result = [];

    Rx.Observable
      .range(1, 7)
      .subscribe(function(d) {
        result.push(d === 7 ? 'rest' : 'work'/*TODO:underscore*/);
      });

    assert.equal(result.join(' '), 'work work work work work work rest');
  });

  it('NothingListensUntilYouSubscribe', function() {
    var sum = 0;
    var numbers$ = Rx.Observable
      .range(1, 10)
      .tap(function(n) { sum += n; });

    assert.equal(sum, 0);

    numbers$.subscribe()/*TODO:underscore*/;

    assert.equal(sum, 55);
  });
});
