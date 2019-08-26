// const initial_state = {
//     user: null,
//     tasks: []
// };

// const reducer = (state = initial_state, action) => {
//     switch (action.type) {
//         case 'ADD_TASK': {
//             const { tasks } = state;
//             let newArr = tasks.concat(action.task);

//             return { ...state, tasks: newArr };
//         }
//         case 'UPDATE_TASK': {
//             let i = action.index;
//             let newArr = [ ...state.tasks ];
//             newArr[i].task.taskName = action.task.taskName;
//             newArr[i].task.isEdit = action.task.isEdit;
//             newArr[i].task.editDate = action.task.editDate;
//             return { ...state, tasks: newArr };
//         }

//         case 'REMOVE_TASK': {
//             let newArr = [];

//             return { ...state, tasks: newArr };
//         }
//         default: {
//             return state;
//         }
//     }
// };

// export default reducer;
