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
        var start;
        switch (daysPreviousMonth) {
            case 0: start = -5; break;
            case 1: start = 1; break;
            case 2: start = 0; break;
            case 3: start = -1; break;
            case 4: start = -2; break;
            case 5: start = -3; break;
            case 6: start = -4; break;    
        }
        // days of the following month
        var daysFollowingMonth = endOfCurrent.weekday();
        // end of month
        var end = daysFollowingMonth === 0 ? 31 : current.daysInMonth() + (7 - daysFollowingMonth);
        // build month's days grid
        for (var i = start; i <= end; i++) {
            month.days.push({
                mute: (current > moment(new Date(current.year(), current.month(), i)) || endOfCurrent < moment(new Date(current.year(), current.month(), i))),
                value: moment(new Date(current.year(), current.month(), i)).format()
            });
        }

        return month;
    };
    this.getIndex = function(time) {
        return moment(time).startOf('month').diff(moment().startOf('month'), 'month');
    };
});
