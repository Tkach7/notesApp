'use strict';

import settings from './settings.json';

let http = {
	get: (url) => {
		return new Promise((resolve, reject) => {
			if (1 != 1) {
				resolve('ok');
			} else {
				reject('error');
			}
		});
	}
}

// Define applications
let __guest = (settings) => {
	require.ensure([], function(require) {
        require('./guest')(settings);
        angular.bootstrap(document, ['app']);
    });
}

// let __root = (settings) => {
// 	require.ensure([], function(require) {
//         require('./root')(settings);
//         angular.bootstrap(document, ['app']);
//     });
// }

http.get().then((res) => {
	//__root(settings);
}, (err) => {
	__guest(settings);
});
