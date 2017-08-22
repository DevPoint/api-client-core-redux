
import transactionsReducer from './transactions/reducer';
import viewsReducer from './views/reducer';

const assign = Object.assign;

const defaultState = {
    cache: {}
    transactions: {},
    views: {},
};

const reducer = (state, action) => {
    const actionTypeFrags = action.type.split('_');
    if (actionTypeFrags.length >= 2) {
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
    }
    else if (actionTypeFrags.length == 1) {
        switch (actionTypeFrags[0]) {
            case 'ADD':
                state = assign({}, defaultState);
                break;
            case 'SET':
                state = assign({}, defaultState, action.payload);
                break;
            case 'UPDATE':
                state = assign({}, state, action.payload);
                break;
        }
    }
    return state;
};

export defaultState;
export transactionsReducer;
export viewsReducer;
export default reducer;
