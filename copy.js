const fs = require('fs');

fs.cpSync('./dist/js-jokesters/browser/', './docs', { recursive: true });
