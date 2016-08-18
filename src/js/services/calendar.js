module.exports = angular.module('app').service('Calendar', function() {
    this.getMonth = function(index) {
        index = index ? index : 0;
        var current = moment().add(index, 'months').startOf('month');
        var endOfCurrent = moment().add(index, 'months').endOf('M');

        var month = {
            title: current.format(),
            days: []
        }
        // the days of the previous month
        var daysPreviousMonth = current.weekday();
        // start of month
        var start = daysPreviousMonth === 0 ? 1 : 1 - daysPreviousMonth;
        // days of the following month
        var daysFollowingMonth = endOfCurrent.weekday();
        // end of month
        var end = current.daysInMonth() + (6 - daysFollowingMonth);
        // build month's days grid
        for (var i = start; i <= end; i++) {
            month.days.push({
                mute: (current > moment(new Date(current.year(), current.month(), i)) || endOfCurrent < moment(new Date(current.year(), current.month(), i))),
                value: moment(new Date(current.year(), current.month(), i)).format(),
                events: []
            });
        }

        return month;
    };
    this.getIndex = function(time) {
        return moment(time).startOf('month').diff(moment().startOf('month'), 'month');
    };
});
