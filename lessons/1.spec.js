//
// Lesson 1
// Observable streams
//

var Rx = require('rxjs/Rx');
var assert = require('assert');

describe('lesson 1', function() {
  it('sample subscription', function() {
    var result = '';

    Rx.Observable
      .of(45)
      .subscribe(function(x) { result = x });

    assert.equal(result, ________);
  });

  it('simple of', function() {
    var result = '';

    Rx.Observable
      .of('foo')
      .subscribe(function(x) { result = x; });

    assert.equal(result, ________);
  });

  it('the last event', function() {
    var result = '';
    var strings = ['foo','bar'];

    Rx.Observable
      .from(strings)
      .subscribe(function(x) { result = x; });

    assert.equal(result, ________);
  });

  it('everything counts', function() {
    var result = 0;
    var numbers = [1, 2, 3];

    Rx.Observable
      .from(numbers)
      .subscribe(function(x) { result += x; });

    assert.equal(result, ________);
  });

  it('rest on sunday', function() {
    var result = [];

    Rx.Observable
      .range(1, 7)
      .subscribe(function(d) {
        result.push(d === 7 ? 'rest' : ________);
      });

    assert.equal(result.join(' '), 'work work work work work work rest');
  });

  it('nothing listens until you subscribe', function() {
    var sum = 0;
    var number$ = Rx.Observable
      .range(1, 10)
      .do(function(n) { sum += n; });

    assert.equal(sum, 0);

    number$.________();

    assert.equal(sum, 55);
  });

  it('starting with something different', function(done) {
    var sum = 0;
    var number$ = Rx.Observable
      .range(1, 10)
      .startWith('here, have some numbers')
      .do(function(n) { sum += n; });

    number$
      .take(1)
      .subscribe(function(x) {
        assert.equal(x, ________);
        done();
      });
  });
});
