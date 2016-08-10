module.exports = angular.module('app').controller('CalendarCtrl', controller);

function controller($scope, Calendar)  {
        $scope.calendar = Calendar;
        $scope.increaseYear = () => {
            $scope.calendar.currentYear = String(+$scope.calendar.currentYear + 1);
            $scope.weekdaysWithNum = Calendar.getWeekdaysWithNum(Calendar.currentYear, Calendar.currentMonth);
        };
        $scope.reduceYear = () => {
            $scope.calendar.currentYear = +$scope.calendar.currentYear > 0 ?
                String(+$scope.calendar.currentYear - 1)
                :
                $scope.calendar.currentYear;
            $scope.weekdaysWithNum = Calendar.getWeekdaysWithNum(Calendar.currentYear, Calendar.currentMonth);
        };
        $scope.increaseMonth = () => {
            $scope.calendar.currentMonth = +$scope.calendar.currentMonth  < 12 ?
                String(+$scope.calendar.currentMonth + 1)
                :
                $scope.calendar.currentMonth;
                $scope.calendar.currentMonth = +$scope.calendar.currentMonth < 10 ?
                    '0' + $scope.calendar.currentMonth
                    :
                    $scope.calendar.currentMonth;
            $scope.weekdaysWithNum = Calendar.getWeekdaysWithNum(Calendar.currentYear, Calendar.currentMonth);
        };
        $scope.reduceMonth = () => {
            $scope.calendar.currentMonth = +$scope.calendar.currentMonth > 0 ?
                String(+$scope.calendar.currentMonth - 1)
                :
                $scope.calendar.currentMonth;
                $scope.calendar.currentMonth = +$scope.calendar.currentMonth < 10 ?
                    '0' + $scope.calendar.currentMonth
                    :
                    $scope.calendar.currentMonth;
            $scope.weekdaysWithNum = Calendar.getWeekdaysWithNum(Calendar.currentYear, Calendar.currentMonth);
        }

        $scope.daysOfTheWeek = ['Mo','Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        $scope.weekdaysWithNum = Calendar.getWeekdaysWithNum(Calendar.currentYear, Calendar.currentMonth);
 };

