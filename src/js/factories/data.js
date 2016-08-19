module.exports = angular.module('app').factory('Data', function(Rest, Session, __api) {
    return {
        savePersonalInfo: function(sign) {
            Rest.patch(__api.user.data, {
                name: sign.name,
                birthday: sign.birthday,
            });
        },
        saveTodo: function(todoModel) {
            // Put new todo
            return Rest.put(__api.user.todo, todoModel);
        },
        changeStatusTodo: function(todo) {
            // Patch status todo
            return Rest.patch(__api.user.todo, {todo: todo});
        },
        changeTimeTodo: function(todo) {
            // Patch time todo
            return Rest.patch(__api.user.todotime, todo);
        },
        deleteTodo: function(todoId) {
            return Rest.delete(__api.user.todo + '/' + todoId);
        },
        deleteSession: function(sessionId) {
            return Rest.delete(__api.user.sessions + '/' + sessionId);
        },
        savePic: function(img) {
            // Patch status todo
            return Rest.patch(__api.user.image, {data: img});
        }
    };
});
