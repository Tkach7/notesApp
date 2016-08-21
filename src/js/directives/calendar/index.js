module.exports = function(app) {
    // init directive constructor
    app.directive('smallCalendar', directive);

    function directive() {
        return {
            template: require('./view.html'),
            scope: {
                time: '='
            },
            link: function (scope, element, attrs, Calendar) {
                 // Show calendar panel
                scope.showCalendar = false;
                // Show time panel
                scope.showTime = false;
                // Get time
                var timeInfo;
                scope.getData = (data) => {
                    timeInfo = data;
                    scope.showCalendar = false;
                    scope.showTime = true;
                };
                // Init time todo
                scope.todoTime = {
                    hours: '',
                    minutes: ''
                };
                scope.saveTimeTodo = () => {
                    timeInfo = moment(timeInfo).hours(scope.todoTime.hours).minutes(scope.todoTime.minutes);
                    scope.time = timeInfo;
                    scope.showTime = false;
                };
                // Valid time
                scope.checkTime = () => {
                    return scope.todoTime.hours >= 0
                        && scope.todoTime.hours
                        && scope.todoTime.minutes
                        && scope.todoTime.hours < 24
                        && scope.todoTime.minutes >= 0
                        && scope.todoTime.minutes <= 60
                }

            },
            controller: function ($scope, $element, $attrs, Calendar) {
                $scope.month = Calendar.getMonth(0);
                // Month counter
                $scope.counterMonth = 0;
                // Move to previous month
                $scope.getPrevMonth = () => {
                    $scope.month = Calendar.getMonth(--$scope.counterMonth);
                };
                // Move to next month
                $scope.nextMonth = () => {
                    $scope.month = Calendar.getMonth(++$scope.counterMonth);        
                }
                // Check current day
                $scope.checkCurrentDay = (day) => {
                    return moment(day).format('DD') === moment().format('DD')
                        && moment(day).format('MM') === moment().format('MM')
                }
               
            }           
        }
    };
}