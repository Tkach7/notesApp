module.exports = angular.module('app').controller('CalendarCtrl', controller);

function controller($scope, Calendar)  {
        $scope.calendar = Calendar;
        $scope.increaseYear = () => {
            Calendar.increaseYear();
            $scope.weekdaysWithNum = Calendar.weekdaysWithNum;
        };
        $scope.reduceYear = () => {
            Calendar.reduceYear();
            $scope.weekdaysWithNum = Calendar.weekdaysWithNum;
        };
        $scope.increaseMonth = () => {
            Calendar.increaseMonth();
            $scope.weekdaysWithNum = Calendar.weekdaysWithNum;
        };
        $scope.reduceMonth = () => {
            Calendar.reduceMonth();
            $scope.weekdaysWithNum = Calendar.weekdaysWithNum;
        }
        $scope.daysOfTheWeek = ['Mo','Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        $scope.weekdaysWithNum = Calendar.weekdaysWithNum;
 };

