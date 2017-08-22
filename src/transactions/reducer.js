
const assign = Object.assign;

const _objectProps = [
    'credentials', 'data', 'validationErrors'
];

const _arrayProps = [
    'errors'
];

export const defaultInsertTransaction = {
    transactionId: null,
    itemType: '',
    type: 'insert',
    ready: false,
    processing: true,
    failed: false,
    itemId: null,
    data: {},
    errors: [],
    validationErrors: {}
};

export const defaultUpdateTransaction = {
    transactionId: null,
    itemType: '',
    type: 'update',
    ready: false,
    processing: true,
    failed: false,
    itemId: null,
    data: {},
    errors: [],
    validationErrors: {}
};

export const defaultDeleteTransaction = {
    transactionId: null,
    itemType: '',
    type: 'delete',
    ready: false,
    processing: true,
    failed: false,
    itemId: null,
    errors: []
};

export const defaultLoginTransaction = {
    transactionId: null,
    itemType: '',
    type: 'login',
    ready: false,
    processing: true,
    failed: false,
    userId: null,
    credentials: {},
    errors: [],
    validationErrors: {}
};

export const defaultRegisterTransaction = {
    transactionId: null,
    itemType: '',
    type: 'register',
    ready: false,
    processing: true,
    failed: false,
    errors: []
};

export const defaultState = {};

function reducer(state, action) {
    if (typeof state === 'undefined') {
        state = defaultState;
    } 
    const actionTypeFrags = action.type.split('_');
    if (actionTypeFrags[1] === 'TRANSACTION') {
        const updateTransaction = { transactionId: action.id };
        if (action.payload) {
            for (let propKey in action.payload) {
                if (_objectProps.indexOf(propKey) >= 0) {
                    updateTransaction[propKey] = assign({}, action.payload[propKey]);
                }
                else if (_arrayProps.indexOf(propKey) >= 0) {
                    updateTransaction[propKey] = action.payload[propKey].slice(0);
                }
                else {
                    updateTransaction[propKey] = action.payload[propKey];
                }
            }
        }
        let defaultTransaction = {};
        if (actionTypeFrags.length >= 3) {
            switch (actionTypeFrags[2]) {
                case 'INSERT':
                    defaultTransaction = defaultInsertTransaction;
                    break;
                case 'UPDATE':
                    defaultTransaction = defaultUpdateTransaction;
                    break;
                case 'DELETE':
                    defaultTransaction = defaultDeleteTransaction;
                    break;
                case 'LOGIN':
                    defaultTransaction = defaultLoginTransaction;
                    break;
                case 'REGISTER':
                    defaultTransaction = defaultRegisterTransaction;
                    break;
            }
        }
        let updateState = null;
        switch (actionTypeFrags[0]) {
            case 'ADD':
            case 'SET':
                updateState = assign({}, state);
                updateState[action.id] = assign({}, defaultTransaction, updateTransaction);
                state = assign({}, state, updateState);
                break;
            case 'UPDATE':
                updateState = assign({}, state);
                updateState[action.id] = assign({}, state[action.id], updateTransaction);
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
