// the IIFE that redirects the logs and error of the console to the game console.
(function() {
    let _log = console.log;
    let _error = console.error;

    console.error = function(errMessage) {
        document.getElementById('console').innerHTML = 'Error: ' + errMessage;
        _error.apply(console, arguments);
    };

    console.log = function(logMessage) {
        document.getElementById('console').innerHTML = logMessage;
        _log.apply(console, arguments);
    };
})();