module.exports = function(app) {
    // init directive constructor
    app.directive('smallCalendar', directive);

    function directive() {
        return {
            template: require('./view.html'),
            scope: {
                time: '=',
                options: '=?'
            },
            link: function (scope, element, $document) {
                // init elements for bind scroll
                var hoursBox = element[0].children[1].children[1].children[0].children[0];
                var minutesBox = element[0].children[1].children[1].children[0].children[2];
                // var calendarBox = element[0].children[0].children[1].children[0];
                // define scroll handler listener
                var scrollListener = function(element, upMethod, downMethod) {

                    var handler = function(event) {
                        if (event.wheelDeltaY > 0) {
                            downMethod();
                        } else {
                            upMethod();
                        }

                        scope.$apply();
                    }

                    element.addEventListener('mousewheel', handler, false);

                    // scope.$on('$destroy', function() {
                    //     $document.off('mousewheel', handler);
                    // });
                }
                // Show calendar panel
                scope.showCalendar = false;
                // Show time panel
                scope.showTime = false;
                // Get time
                var timeInfo;
                scope.getData = (data) => {
                    scope.showCalendar = false;
                    if (scope.options.controller === 'todo') {
                        scope.todoTime = {
                            hours: 0,
                            minutes: 0
                        };
                        timeInfo = data;
                        scope.showTime = true;
                    } else {
                        scope.time = data;
                    }
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
                // Next hour
                scope.nextHour = () => {
                    scope.todoTime.hours < 23 ? scope.todoTime.hours++ : 23;
                };
                // Prev hour
                scope.prevHour = () => {
                    scope.todoTime.hours > 0 ? scope.todoTime.hours-- : 0;
                };
                // Next minute
                scope.nextMinute = () => {
                    scope.todoTime.minutes < 60 ? scope.todoTime.minutes++ : 59;
                };
                // Prev minute
                scope.prevMinute = () => {
                    scope.todoTime.minutes > 0 ? scope.todoTime.minutes-- : 0;
                };
                // init scroll handlers
                var hoursScroll = new scrollListener(hoursBox, scope.nextHour, scope.prevHour);
                var minutesScroll = new scrollListener(minutesBox, scope.nextMinute,  scope.prevMinute);
                // var calendarScroll = new scrollListener(calendarBox, scope.getNextMonth, scope.getPrevMonth);

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