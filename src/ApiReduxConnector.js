
const assign = Object.assign;

class ApiReduxConnector {

    constructor(api, nameSpace) {
        this._api = api;
        this._store = null;
        this._nameSpace = nameSpace;
        this._reducer = this._createReducer(nameSpace);
        this._listener = this._listener.bind(this);
    }

    _createReducer(nameSpace) {
        const defaultState = {
            cache: {}
            transactions: {},
            views: {},
        };
        return (state, action) => {
            if (typeof state === 'undefined') {
                state = defaultState;
            } 
            const actionTypeFrags = action.type.split('_');
            if (actionTypeFrags[0] === nameSpace) {
                actionTypeFrags.shift();
            }
            if (actionTypeFrags.length >= 2) {
                if (actionTypeFrags[1] === 'CACHE' && actionTypeFrags.length >= 3) {
                    const cacheUpdateState = {};
                    const itemType = actionTypeFrags[2].toLowerCase();
                    switch (actionTypeFrags[0]) {
                        case 'ADD':
                        case 'SET':
                            cacheUpdateState[itemType] = assign({}, defaultState['cache'][itemType], action.payload);
                            break;
                        case 'UPDATE':
                            cacheUpdateState[itemType] = assign({}, state['cache'][itemType], action.payload);
                            break;
                    }
                    const updateState = {};
                    updateState[updateKey] = assign({}, state['cache'], cacheUpdateState);
                    state = assign({}, state, updateState);
                }
                else {
                    const updateState = {};
                    const updateKey = .toLowerCase();
                    switch (actionTypeFrags[0]) {
                        case 'ADD':
                        case 'SET':
                            updateState[updateKey] = assign({}, defaultState[updateKey], action.payload);
                            break;
                        case 'UPDATE':
                            updateState[updateKey] = assign({}, state[updateKey], action.payload);
                            break;
                    }
                    state = assign({}, state, updateState);
                }
            }
            else (actionTypeFrags.length == 1) {
                switch (actionTypeFrags[0]) {
                    case 'ADD':
                    case 'SET':
                        state = assign({}, defaultState, action.payload);
                        break;
                    case 'UPDATE':
                        state = assign({}, state, action.payload);
                        break;
                }
            }
        };
    }

    _listener() {
        
        // retrieve current state
        const state = this._store.getState();

        // build update cache state
        const updateCacheState = {};
        let updateCacheMapCount = 0;
        for (let itemType in this._api.getCacheItemTypes()) {
            const cacheMap = this._api.cache(itemType);
            const updateCacheMapState = !cacheMap.changed ? state.cache[itemType] : {};
            if (cacheMap.changed) {
                updateCacheMapCount += 1;
                for (let itemId in cacheMap.ids()) {
                    const entry = cacheMap.find(itemId);
                    if (entry.changed) {
                        updateCacheMapState[itemId] = entry.toObject();
                    }
                    else {
                        // TODO: add exception if itemId could not be found in state
                        updateCacheMapState[itemId] = state.cache[itemType][itemId];
                    }
                }
            }
            updateCacheState[itemType] = updateCacheMapState;
        }

        // optimization: if none of the cache maps have changed
        // use last cache state as a whole
        if (!updateCacheMapCount) {
            updateCacheState = state.cache;
        }

        // build update transactions state
        const transactionMap = this._api.transactions();
        const updateTransactionState = !transactionMap.changed ? state.transactions : {};
        if (transactionMap.changed) {
            for (let transactionId in transactionMap.ids()) {
                const transaction = transactionMap.find(transactionId);
                if (transaction.changed) {
                    updateTransactionState[transactionId] = transaction.toObject();
                }
                else {
                    // TODO: add exception if transactionId could not be found in state
                    updateTransactionState[transactionId] = state.transactions[transactionId];
                }
            }
        }

        // build update views state
        const viewMap = this._api.views();
        const updateViewState = !viewMap.changed ? state.views : {};
        if (viewMap.changed) {
            for (let viewId in viewMap.ids()) {
                const view = viewMap.find(viewId);
                if (view.changed) {
                    updateViewState[viewId] = view.toObject();
                }
                else {
                    // TODO: add exception if viewId could not be found in state
                    updateViewState[viewId] = state.views[viewId];
                }
            }
        }

        // dispatch store state update
        const actionType = this._nameSpace ? this._nameSpace + '_UPDATE' : 'UPDATE',
        this._store.dispatch(state, {
            type: actionType;
            payload: {
                cache: updateCacheState,
                transactions: updateTransactionState,
                views: updateViewState
            }
        });
    }

    _addListeners() {
        for (let itemType in this._api.getCacheItemTypes()) {
            this._api.cache(itemType).addListener(this._listener);
        }
        this._api.transactions().addListener(this._listener);
        this._api.views().addListener(this._listener);
    }

    _removeListeners() {
        for (let itemType in this._api.getCacheItemTypes()) {
            this._api.cache(itemType).removeListener(this._listener);
        }
        this._api.transactions().removeListener(this._listener);
        this._api.views().removeListener(this._listener);
    }

    reducer() {
        return this._reducer;
    }

    connectStore(store) {
        this._store = store;
        this._addListeners();
    }

    disconnectStore() {
        this._removeListeners();
        this._store = null;
    }
};

export default ApiReduxConnector;