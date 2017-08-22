
const assign = Object.assign;

export const defaultView = {
    viewId: null,
    ready: true,
    outdated: false,
    loading: false,
    loadingFailed: false,
    loadingMeta: {
        eagerType: '',
        offset: 0,
        count: 0,
        pageSize: 0,
        totalCount: 0,
        errors: []
    },
    itemIds: itemIds;
    errors: [],
    validationErrors: null
};

const reducer = (state, action) => {
    const actionTypeFrags = action.type.split('_');
    const updateView = { viewId: action.id };
    if (action.payload) {
        for (let propKey in action.payload) {
            if (propKey === 'loadingMeta' || propKey === 'validationErrors') {
                updateView[propKey] = assign({}, action.payload[propKey]);
            }
            else if (propKey === 'errors') {
                updateView[propKey] = action.payload[propKey].slice(0));
            }
            else {
                updateView[propKey] = action.payload[propKey];
            }
        }
    }
    let newState = null;
    switch (actionTypeFrags[0]) {
        case 'ADD':
            newState = assign({}, state);
            newState[action.id] = defaultView;
            state = assign({}, state, newState);
            break;
        case 'SET':
            newState = assign({}, state);
            newState[action.id] = assign({}, defaultView, actionView);
            state = assign({}, state, newState);
            break;
        case 'UPDATE':
            newState = assign({}, state);
            newState[action.id] = assign({}, state[action.id], actionView);
            state = assign({}, state, newState);
            break;
        case 'REMOVE':
            state = assign({}, state);
            delete state[action.id];
            break;
    }
    return state;
};

export default reducer;
