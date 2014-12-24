//
// Lesson 2
// Composable observations
//

var Rx = require('rx');
var assert = require('assert');

describe('lesson 2, composable observations: ', function() {
  it('ComposableAddition', function() {
    var result = 0;
    var numbers = [10, 100, 1000/*TODO:underscore*/];

    Rx.Observable
      .fromArray(numbers)
      .sum()
      .subscribe(function(x) { result = x; });

    assert.equal(result, 1110);
  });

  it('ComposeableBeforeAndAfter', function() {
    var numbers = [1,2,3,4,5,6];
    var a = '';
    var b = '';

    Rx.Observable
      .fromArray(numbers)
      .tap(function(n) { a += String(n); })
      .filter(function(n) { return n % 2 === 0; })
      .tap(function(n) { b += String(n); })
      .subscribe();

    assert.equal(a, '123456'/*TODO:underscore*/);
    assert.equal(b, '246');
  });

  it('WeWroteThis', function() {
    var result = [];
    var names = ['Jon', 'Jameson', 'Joe', 'Franky', 'Suella'];

    Rx.Observable
      .fromArray(names)
      .filter(function(name) { return name.length <= 3; /*TODO:underscore*/})
      .subscribe(function(name) { result.push(name); });

    assert.equal(result.join(','), 'Jon,Joe');
  });

  it('ConvertingEvents', function() {
    var result = [];
    var words = ['wE', 'hOpE', 'yOU', 'aRe', 'eNJoyIng', 'tHiS'];

    Rx.Observable
      .fromArray(words)
      .map(function(word) { return word.toLowerCase();/*TODO:underscore*/ })
      .subscribe(function(word) { result.push(word); });

    assert.equal(result.join(' '), 'we hope you are enjoying this');
  });

  it('CreatingAMoveRelevantEventStream', function() {
    var result = [];
    var mouseXMovements = [100, 200, 150];
    var windowTopX = 50;

    // The `$` suffix is a naming convention for observable streams
    var relativeMouse$ = Rx.Observable
      .fromArray(mouseXMovements)
      .map(function(x) { return x - windowTopX;/*TODO:underscore*/ });

    relativeMouse$
      .subscribe(function(x) { result.push(x); });

    assert.equal(result.join(','), '50,150,100');
  });

  it('CheckingEverything', function() {
    var result = null;
    var numbers = [2, 4, 6, 8];

    Rx.Observable
      .fromArray(numbers)
      .every(function(x) { return x % 2 === 0; })
      .subscribe(function(x) { result = x; });

    assert.equal(result, true/*TODO:underscore*/);
  });

  it('CompositionMeansTheSumIsGreaterThanTheParts', function() {
    var result = 0;

    Rx.Observable
      .range(1,10)
      .filter(function(x) { return x > 8/*TODO:underscore*/; })
      .sum()
      .subscribe(function(x) { result = x; });

    assert.equal(result, 19);
  });
});
