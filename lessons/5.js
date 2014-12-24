//
// Lesson 5
// Advanced streams
//

var Rx = require('rx');
var assert = require('assert');

describe('lesson 5', function() {
  it('instant merging', function() {
    var result = [];
    var number$ = Rx.Observable.fromArray([1, 2, 3]);
    var letter$ = Rx.Observable.fromArray(________);

    number$
      .merge(letter$)
      .subscribe(function(x) { result.push(x); });

    assert.equal(result.join(','), '1,a,2,b,3,c');
  });

  it('delayed merging', function() {
    var result = [];
    var number$ = Rx.Observable.fromArray([1, 2, 3]).delay(10);
    var letter$ = Rx.Observable.fromArray(['a', 'b', 'c']);

    number$
      .merge(letter$)
      .subscribe(
        function(x){ result.push(x); },                          // onNext
        function() { },                                          // onError
        function() { assert.equal(result.join(','), ________); } // onCompleted
      );
  });

  it('grouping with composition', function() {
    var odds = [];
    var evens = [];
    var number$ = Rx.Observable.range(1,10);
    var grouped$ = number$.groupBy(function(n) { return n % ________; });

    var odd$ = grouped$
      .filter(function(g) { return g.key === 1; })
      .flatMap(function(g) { return g; });

    var even$ = grouped$
      .filter(function(g) { return g.key === 0; })
      .flatMap(function(g) { return g; });

    odd$.subscribe(function(n) { odds.push(n); });
    even$.subscribe(function(n) { evens.push(n); });

    assert.equal(odds.join(','), '1,3,5,7,9');
    assert.equal(evens.join(','), '2,4,6,8,10');
  });

  it('averaging over groups', function() {
    var averages = [0.0, 0.0];
    var number$ = Rx.Observable.fromArray([10, 10, 19, 21, 10, 10]);
    var grouped$ = number$.groupBy(function(n) { return n % 2; });

    grouped$.subscribe(function(g) {
      g.average()
        .________(function(a) { averages[g.key] = a; });
    });

    assert.equal(averages[0], 10);
    assert.equal(averages[1], 20);
  });

  it('multiple subscribers', function() {
    var number$ = new Rx.Subject();
    var sum = 0;
    var average = 0;

    number$
      .sum()
      .subscribe(function(n) { sum = n; });

    number$
      .average()
      .subscribe(function(n) { average = n; });

    number$.onNext(1);
    number$.onNext(1);
    number$.onNext(2);
    number$.onNext(2);
    number$.onCompleted(); // `sum` and `average` don't kick in until the
                           // observable is finished

    assert.equal(sum, 6);
    assert.equal(average, ________);
  });

  it('sending and recieving with subjects', function(done) {
    var observer = Rx.Observer.create(
      function(x) { assert.equal(x, 'hello'); done(); }
    );

    var observable = Rx.Observable.create(function(x) {
      setTimeout(function() {
        x.onNext('hello');
        x.onCompleted();
      }, 25);
    });

    var combined$ = new Rx.Subject(observer, observable);

    combined$.________('hello');
  });
});
