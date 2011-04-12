module("Chronos");

asyncTest("Simple timeout", function () {
    var fired = false;
    chronos.setTimeout(function () {
        fired = true;
    }, 50);
    ok(fired === false, "The setTimeout call should be async.");
    window.setTimeout(function () {
        ok(fired === true, "The function should have fired by now.");
        start();
    }, 100);
});

asyncTest("Simple interval", function () {
    var timesFired = 0;
    chronos.setInterval(function () {
        timesFired++;
    }, 50);
    ok(timesFired === 0, "The setInterval call should be async.");
    window.setTimeout(function () {
        ok(timesFired === 4, "The function should have fired 4 times by now.");
        start();
    }, 200);
});

asyncTest("Simple clear timeout", function () {
    var fired = false;
    var id = chronos.setTimeout(function () {
        fired = true;
    }, 50);
    chronos.clearTimeout(id);
    window.setTimeout(function () {
        ok(fired === false, "The function shouldn't have fired.");
        start();
    }, 100);
});

asyncTest("Simple clear interval", function () {
    var fired = false;
    var id = chronos.setInterval(function () {
        fired = true;
    }, 50);
    chronos.clearInterval(id);
    window.setTimeout(function () {
        ok(fired === false, "The function shouldn't have fired.");
        start();
    }, 100);
});

asyncTest("With args", function () {
    chronos.setTimeout(function (one, two) {
        ok(arguments.length === 2 && one === 1 && two === 2,
           "The arguments are passed successfully");
        start();
    }, 50, 1, 2);
});

asyncTest("clearInterval doesn't cancel timeouts", function () {
    var fired = false;
    var id = chronos.setTimeout(function () {
        fired = true;
    }, 50);
    chronos.clearInterval(id);
    window.setTimeout(function () {
        ok(fired === true, "the timeout should not have been canceled.");
        start();
    }, 100);
});

asyncTest("clearTimeout doesn't cancel intervals", function () {
    var fired = false;
    var id = chronos.setInterval(function () {
        fired = true;
    }, 50);
    chronos.clearTimeout(id);
    window.setTimeout(function () {
        ok(fired === true, "the interval should not have been canceled.");
        start();
    }, 100);
});

test("patchGlobals will monkey patch chronos' methods on to window", function () {
    var oldSetTimeout = setTimeout,
        oldSetInterval = setInterval,
        oldClearTimeout = clearTimeout,
        oldClearInterval = clearInterval;

    chronos.patchGlobals();
    ok(setTimeout === chronos.setTimeout);
    ok(setInterval === chronos.setInterval);
    ok(clearTimeout === chronos.clearTimeout);
    ok(clearInterval === chronos.clearInterval);

    setTimeout = oldSetTimeout;
    setInterval = oldSetInterval;
    clearTimeout = oldClearTimeout;
    clearInterval = oldClearInterval;
});