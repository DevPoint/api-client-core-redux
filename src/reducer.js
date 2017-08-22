
import transactionsReducer from './transactions/reducer';
import viewsReducer from './views/reducer';

const assign = Object.assign;

const reducer = (state, action) => {
	const actionTypeFrags = action.type.split('_');
	if (actionTypeFrags[1] === 'TRANSACTION') {
		state = assign({}, state, {
			transactions: transactionsReducer(state.transactions, action)
		});
	}
	if (actionTypeFrags[1] === 'VIEW') {
		state = assign({}, state, {
			views: viewsReducer(state.views, action)
		});
	}
	return state;
};

export transactionsReducer;
export viewsReducer;
export default reducer;
