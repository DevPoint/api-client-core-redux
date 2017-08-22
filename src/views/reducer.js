
const assign = Object.assign;

const _objectProps = [
    'loadingMeta', 'validationErrors'
];

const _arrayProps = [
    'itemsIds', 'errors'
];

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
    },
    itemsIds: itemsIds;
    errors: [],
    validationErrors: {}
};

const reducer = (state, action) => {
    const actionTypeFrags = action.type.split('_');
    if (actionTypeFrags[1] === 'VIEW') {
        const updateView = { viewId: action.id };
        if (action.payload) {
            for (let propKey in action.payload) {
                if (_objectProps.indexOf(propKey) >= 0) {
                    updateView[propKey] = assign({}, action.payload[propKey]);
                }
                else if (_arrayProps.indexOf(propKey) >= 0) {
                    updateView[propKey] = action.payload[propKey].slice(0);
                }
                else {
                    updateView[propKey] = action.payload[propKey];
                }
            }
        }
        let updateState = null;
        switch (actionTypeFrags[0]) {
            case 'ADD':
            case 'SET':
                updateState = assign({}, state);
                updateState[action.id] = assign({}, defaultView, updateView);
                state = assign({}, state, updateState);
                break;
            case 'UPDATE':
                updateState = assign({}, state);
                updateState[action.id] = assign({}, state[action.id], updateView);
                state = assign({}, state, updateState);
                break;
            case 'REMOVE':
                state = assign({}, state);
                delete state[action.id];
                break;
        }
    }
    return state;
};

export default reducer;
