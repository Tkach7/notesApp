module.exports = function(app) {


    //init directive styles;

     // init directive constructor
    app.directive('smallCalendar', directive);

    function directive() {
        return {
            template: require('./view.html'),
            scope: {
            },
            link: function (scope, element, attrs, Calendar) {

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
                // Show calendar panel
                $scope.showCalendar = false;
                // Show time panel
                $scope.showTime = false;
            }           
        }
    };
}