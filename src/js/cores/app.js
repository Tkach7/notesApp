'use strict';

import settings from '../../conf/settings.json';
import api from '../../conf/rest.json';



let http = {
	get: (url) => {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			let res = {};
			let err = {};

			request.open("GET", url, true);
			request.setRequestHeader(settings.auth.headerName, localStorage.getItem(settings.auth.sessionName) || null);
			request.send();
			request.onreadystatechange = () => {
				if (request.status >= 400 || request.status == 0) {
					err.status = request.status;
					return reject(err);
				}

				if (request.readyState == 4) {
					res.data = JSON.parse(request.response)
					res.status = request.status;
					resolve(res);
				}
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

let __root = (settings, user) => {
	require.ensure([], function(require) {
        require('./root')(settings, user);
        angular.bootstrap(document, ['app']);
    });
}

http.get(settings.backend + api.auth.check).then((res) => {
	__root(settings, res.data);
}, (err) => {
	__guest(settings);
});

