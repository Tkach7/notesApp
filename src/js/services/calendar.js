module.exports = angular.module('app').service('Calendar', function() {
    this.currentYear = moment().format('YYYY');
    this.currentMonth = moment().format('MM');
    this.increaseYear = () => {
        let year = +this.currentYear;
        year += 1;
        this.currentYear = String(year);
        this.weekdaysWithNum = this.getWeekdaysWithNum(this.currentYear, this.currentMonth);
    };
    this.reduceYear = () => {
        let year = +this.currentYear;
        year = year < 0 ? year : year - 1;
        this.currentYear = String(year);
        this.weekdaysWithNum = this.getWeekdaysWithNum(this.currentYear, this.currentMonth);
    };
    this.increaseMonth = () => {
        let month = +this.currentMonth;
        month = month > 11 ? month : month + 1;
        month = month < 10 ? '0' + month : month;
        this.currentMonth = String(month);
        this.weekdaysWithNum = this.getWeekdaysWithNum(this.currentYear, this.currentMonth);
    };
    this.reduceMonth = () => {
        let month = +this.currentMonth;
        month = month < 2 ? month : month - 1;
        month = month < 10 ? '0' + month : month;
        this.currentMonth = String(month);
        this.weekdaysWithNum = this.getWeekdaysWithNum(this.currentYear, this.currentMonth);
    };
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
        var dayName, day;
        for (var i = 0; i < countDaysInMonth; i++) {
            day = startPeriod.format('DD');
            dayName = startPeriod.format('dd');
            sortMonth[dayName].push(day);
            startPeriod = startPeriod.add(1, 'day');
        };
        if (sortMonth.Mo[0] != '01') {
            let currentDay = moment().startOf('week').add(1, 'day');
            while (sortMonth[currentDay.format('dd')][0] != '01') {
                sortMonth[currentDay.format('dd')].unshift('.');
                currentDay = currentDay.add(1, 'day');
            }
        }
        return sortMonth;
    };
    this.weekdaysWithNum = this.getWeekdaysWithNum(this.currentYear, this.currentMonth);
});