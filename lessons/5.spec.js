jasmine.DEFAULT_TIMEOUT_INTERVAL = 250;
//
// Lesson 5
// Advanced streams
//

var Rx = require('rxjs/Rx');
var assert = require('assert');

describe('lesson 5', function() {
  it('instant merging', function() {
    var result = [];
    var number$ = Rx.Observable.from([1, 2, 3]);
    var letter$ = Rx.Observable.from(________);

    number$
      .merge(letter$)
      .subscribe(function(x) { result.push(x); });

    assert.equal(result.join(','), '1,2,3,a,b,c');
  });

  it('delayed merging', function(done) {
    var result = [];
    var number$ = Rx.Observable.from([1, 2, 3]).delay(10);
    var letter$ = Rx.Observable.from(['a', 'b', 'c']);

    number$
      .merge(letter$)
      .subscribe(
        function(x){ result.push(x); },                                   // next
        function() { },                                                   // error
        function() { assert.equal(result.join(','), ________); done(); }  // complete
      );
  });

  it('grouping with composition', function() {
    var odds = [];
    var evens = [];
    var number$ = Rx.Observable.range(1, 10);
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
    var number$ = Rx.Observable.from([10, 10, 19, 21, 10, 10]);
    var grouped$ = number$.groupBy(function(n) { return n % 2; });

    grouped$.subscribe(function(g) {
      // `scan` and `map` together here simply do an average of the numbers
      g
        .scan(function(acc, n) {
          return {
            count: acc.count + 1,
            sum: acc.sum + n
          };
        }, { count: 0, sum: 0 })
        .map(function(sumObj) {
          return sumObj.sum / sumObj.count;
        })
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
      .scan(function(acc, n) { return acc + n; }, 0)
      .subscribe(function(n) { sum = n; });

    // `scan` and `map` together here simply do an average of the numbers
    number$
      .scan(function(acc, n) {
        return {
          count: acc.count + 1,
          sum: acc.sum + n
        };
      }, { count: 0, sum: 0 })
      .map(function(sumObj) {
        return sumObj.sum / sumObj.count;
      })
      .subscribe(function(n) { average = n; });

    number$.next(1);
    number$.next(1);
    number$.next(2);
    number$.next(2);
    number$.complete(); // `sum` and `average` don't kick in until the
                        // observable is finished

    assert.equal(sum, 6);
    assert.equal(average, ________);
  });

  // TODO: this example could be cleaned up with test schedulers
  it('combining the latest', function(done) {
    var number$ = Rx.Observable.from([1, 2, 3]);
    var letter$ = Rx.Observable.from(['a', 'b', 'c']).delay(10);

    // `combineLatest` only fires once all of its dependents have fired at
    // least once. It fires any time any of the children fire and grabs the
    // latest from each of them.
    var latest$ = Rx.Observable.combineLatest(
      number$,
      letter$,
      function(number, letter) {
        return {
          number: number,
          letter: letter
        };
      }
    );

    // Take the first element
    latest$
      .take(1)
      .subscribe(function(x) {
        assert.deepEqual(x, { number: 3, letter: 'a' });
      });

    // Take the second element
    latest$
      .skip(1)
      .take(1)
      .subscribe(function(x) {
        assert.deepEqual(x, { number: 3, letter: 'b' });
      });

    // Take the third element
    latest$
      .skip(2)
      .take(1)
      .subscribe(function(x) {
        assert.deepEqual(x, { number: ________, letter: 'c' });
        done();
      });
  });

  it('combining the latest when a single observable fires', function(done) {
    var slow$ = Rx.Observable.range(1, 3).delay(15);
    var fast$ = Rx.Observable.range(1, 3).delay(5);

    var withLatest$ = slow$.withLatestFrom(
      fast$,
      function(slow, fast) {
        return {
          slow: slow,
          fast: fast
        };
      }
    );

    // Take the first element
    withLatest$
      .take(1)
      .subscribe(function(x) {
        assert.deepEqual(x, { slow: 1, fast: 3 });
      });

    // Take the third element
    withLatest$
      .skip(2)
      .take(1)
      .subscribe(function(x) {
        assert.deepEqual(x, { slow: 3, fast: ________ });
        done();
      });

  });

  it('throwing out old responses if a newer one comes in', function(done) {
    var request$ = Rx.Observable.from([true, false]);

    var slow$ = Rx.Observable.of('slow').delay(20); // slow, but requested first
    var fast$ = Rx.Observable.of('fast').delay(5);  // fast, but requested second

    request$
      .switchMap(function(x) {
        return x ? slow$ : fast$;
      })
      .subscribe(function(x) {
        // Only called once
        assert.equal(x, ________);
        done();
      });
  });
});
