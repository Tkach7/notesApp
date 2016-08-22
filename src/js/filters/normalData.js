module.exports = angular.module('app').filter('normData', function () {
	return function (item, format) {
		if (!item) return '';
		let day = moment(item).format('DD');
		let year = moment(item).year();
		let month = moment(item).format('MMMM')[0].toUpperCase() + moment(item).format('MMMM').slice(1);
		if (format === 'caption') return month + ' ' + year;
		if (format === 'todo') {
			let months = {
				'Январь': 'Января',
				'Февраль': 'Февраля',
				'Март': 'Марта',
				'Апрель': 'Апреля',
				'Май': 'Мая',
				'Июнь': 'Июня',
				'Июль': 'Июля',
				'Август': 'Августа',
				'Сентябрь': 'Сентября',
				'Октябрь': 'Октября',
				'Ноябрь': 'Ноября',
				'Декабрь': 'Декабря'
			}
			return day + ' ' + months[month] + ' ' + year;
		}
		if (format === 'month') 
			return moment(item).month() < 10 ? '0' + moment(item).month() : moment(item).month();
  	};
});