module.exports = angular.module('app').service('Calendar', function() {
    this.currentYear = moment().format('YYYY');
    this.currentMonth = moment().format('MM');
    this.getWeekdaysWithNum = (year, month) => {
        var sortMonth = {
            Mo: [],
            Tu: [],
            We: [],
            Th: [],
            Fr: [],
            Sa: [],
            Su: []
        };
        var dateFormat = year.concat('-', month);
        var startPeriod = moment(dateFormat).startOf('month');
        var countDaysInMonth = startPeriod.daysInMonth();
        var dayName, dayNum;
        for (let i = 0; i < countDaysInMonth; i++) {
            dayNum = startPeriod.format('DD');
            dayName = startPeriod.format('dd');
            sortMonth[dayName].push(dayNum);
            startPeriod = startPeriod.add(1, 'day');
        };
        // add days previous month
        if (sortMonth.Mo[0] != '01') {
            let countNotStartDays = 0;
            for (let day in sortMonth) {
                if (sortMonth[day][0] === '01') break;
                countNotStartDays += 1;
            }
            let nextDay = moment().startOf('week').add(1, 'day');
            let previousDay = moment()
                .endOf('month')
                .subtract(1, 'month')
                .subtract(countNotStartDays - 1,'day').format('DD');
            while (sortMonth[nextDay.format('dd')][0] != '01') {
                sortMonth[nextDay.format('dd')].unshift(previousDay);
                nextDay = nextDay.add(1, 'day');
                previousDay = String(+previousDay + 1);
            }
        }
        // add days next month
        if (sortMonth.Su[sortMonth.Su.length - 1] != String(countDaysInMonth)) {
            let indexLastDay = 1;
            for (let day in sortMonth) {
                if (sortMonth[day][sortMonth[day].length - 1] === String(countDaysInMonth)) break;
                indexLastDay += 1;
            }
            let dayInNextMonth = '01';
            startPeriod = moment().startOf('month').format('dd');
            for (let i = 1; i <= 7; i++) {
                if (i <= indexLastDay) {
                    startPeriod = moment().startOf('month').add(i, 'day').format('dd');
                } else {
                    sortMonth[startPeriod].push(dayInNextMonth);
                    dayInNextMonth = '0' + (+dayInNextMonth + 1);
                    startPeriod = moment().startOf('month').add(i, 'day').format('dd');
                }
            }
        }

        return sortMonth;
    };
});