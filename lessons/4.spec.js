jasmine.DEFAULT_TIMEOUT_INTERVAL = 250;
//
// Lesson 4
// Listening to events
//

var Rx = require('rxjs/Rx');
var assert = require('assert');
var events = require('events');
var util = require('util');

function TestEvent() {}
util.inherits(TestEvent, events.EventEmitter);

describe('lesson 4', function() {
  var emitter;

  beforeEach(function() {
    emitter = new TestEvent();
  });

  it('subscribing to events', function() {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    emitter.emit('data', 'o');

    assert.equal(result, ________);
  });

  it('unsubscribing subscriptions', function() {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    subscription.unsubscribe();
    emitter.emit('data', 'o');

    assert.equal(result, ________);
  });

  it('throttling events', function(done) {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .throttleTime(10)
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    emitter.emit('data', 'o');

    setTimeout(function() {
      assert.equal(result, ________);
      done();
    }, 20);
  });

  it('debouncing events', function(done) {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .debounceTime(10)
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    emitter.emit('data', 'o');

    setTimeout(function() {
      assert.equal(result, ________);
      done();
    }, 20);
  });

  it('filtering events', function() {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .filter(function(x) { return x === ________; })
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    emitter.emit('data', 'o');

    assert.equal(result, 'll');
  });
});
