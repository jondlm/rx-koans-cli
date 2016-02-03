//
// Lesson 2
// Composable observations
//

var Rx = require('rxjs/Rx');
var assert = require('assert');

describe('lesson 2', function() {
  it('composable addition', function() {
    var result = 0;
    var numbers = [10, 100, ________];

    Rx.Observable
      .fromArray(numbers)
      .scan(function(acc, x) { return acc + x; })
      .subscribe(function(x) { result = x; });

    assert.equal(result, 1110);
  });

  it('composable before and after', function() {
    var numbers = [1,2,3,4,5,6];
    var a = '';
    var b = '';

    Rx.Observable
      .fromArray(numbers)
      .do(function(n) { a += String(n); })
      .filter(function(n) { return n % 2 === 0; })
      .do(function(n) { b += String(n); })
      .subscribe();

    assert.equal(a, ________);
    assert.equal(b, '246');
  });

  it('we wrote this', function() {
    var result = [];
    var names = ['Jon', 'Jameson', 'Joe', 'Franky', 'Suella'];

    Rx.Observable
      .fromArray(names)
      .filter(function(name) { return name.length <= ________})
      .subscribe(function(name) { result.push(name); });

    assert.equal(result.join(','), 'Jon,Joe');
  });

  it('converting events', function() {
    var result = [];
    var words = ['wE', 'hOpE', 'yOU', 'aRe', 'eNJoyIng', 'tHiS'];

    Rx.Observable
      .fromArray(words)
      .map(function(word) { return ________; })
      .subscribe(function(word) { result.push(word); });

    assert.equal(result.join(' '), 'we hope you are enjoying this');
  });

  it('creating a move relevant event stream', function() {
    var result = [];
    var mouseXMovements = [100, 200, 150];
    var windowTopX = 50;

    // The `$` suffix is a naming convention for observable streams
    var relativeMouse$ = Rx.Observable
      .fromArray(mouseXMovements)
      .map(function(x) { return x - ________; });

    relativeMouse$
      .subscribe(function(x) { result.push(x); });

    assert.equal(result.join(','), '50,150,100');
  });

  it('checking everything', function() {
    var result = null;
    var numbers = [2, 4, 6, 8];

    Rx.Observable
      .fromArray(numbers)
      .every(function(x) { return x % 2 === 0; })
      .subscribe(function(x) { result = x; });

    assert.equal(result, ________);
  });

  it('composition means the sum is greater than the parts', function() {
    var result = 0;

    Rx.Observable
      .range(1,10)
      .filter(function(x) { return x > ________; })
      .scan(function(acc, x) { return acc + x; })
      .subscribe(function(x) { result = x; });

    assert.equal(result, 19);
  });
});
