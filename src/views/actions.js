
export default {

    loadingStart: function(nameSpace, viewId, loadingMeta) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_VIEW',
            id: viewId,
            payload: {
                ready: false,
                loading: true,
                loadingFailed: false,
                loadingMeta: {
                    eagerType: loadingMeta.eagerType,
                    offset: loadingMeta.offset,
                    count: loadingMeta.count,
                    pageSize: loadingMeta.pageSize,
                    totalCount: 0,
                    errors: []
                },
                itemIds: [];
            }
        };
    },


    loadingReady: function(nameSpace, viewId, itemIds) {
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
                    totalCount: loadingMeta.totalCount,
                    errors: []
                },
                itemIds: itemIds;
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
                processing: false,
                failed: true,
                errors: errors,
                validationErrors: validationErrors
            }
        };
    },

};
