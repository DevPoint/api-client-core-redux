
export default {

    loadingStart: function(nameSpace, viewId, itemType, loadingMeta) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'SET_VIEW',
            id: viewId,
            payload: {
                itemType: itemType,
                ready: false,
                loading: true,
                loadingFailed: false,
                loadingMeta: {
                    eagerType: loadingMeta.eagerType,
                    offset: loadingMeta.offset,
                    count: loadingMeta.count,
                    pageSize: loadingMeta.pageSize,
                    totalCount: 0
                },
                itemsIds: [],
                errors: [],
                validationErrors: {}
            }
        };
    },


    loadingReady: function(nameSpace, viewId, itemsIds) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_VIEW',
            id: viewId,
            payload: {
                ready: true,
                outdated: false,
                loading: false,
                loadingFailed: false,
                loadingMeta: {
                    eagerType: loadingMeta.eagerType,
                    offset: loadingMeta.offset,
                    count: loadingMeta.count,
                    pageSize: loadingMeta.pageSize,
                    totalCount: loadingMeta.totalCount
                },
                itemsIds: itemsIds;
                errors: [],
                validationErrors: {}
            }
        };
    },

    loadingFailed: function(nameSpace, viewId, errors, validationErrors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_VIEW',
            id: viewId,
            payload: {
                ready: true,
                loading: false,
                failed: true,
                errors: errors,
                validationErrors: validationErrors
            }
        };
    },
};
