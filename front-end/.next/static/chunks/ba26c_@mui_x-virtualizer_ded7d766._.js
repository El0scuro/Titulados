(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/colspan.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Colspan",
    ()=>Colspan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js [app-client] (ecmascript)");
;
/* eslint-disable import/export, @typescript-eslint/no-redeclare */ const selectors = {};
const Colspan = {
    initialize: initializeState,
    use: useColspan,
    selectors
};
function initializeState(_params) {
    return {
        colspanMap: new Map()
    };
}
function useColspan(store, params, api) {
    var _params_colspan;
    const getColspan = (_params_colspan = params.colspan) === null || _params_colspan === void 0 ? void 0 : _params_colspan.getColspan;
    const resetColSpan = ()=>{
        store.state.colspanMap = new Map();
    };
    const getCellColSpanInfo = (rowId, columnIndex)=>{
        var _store_state_colspanMap_get;
        return (_store_state_colspanMap_get = store.state.colspanMap.get(rowId)) === null || _store_state_colspanMap_get === void 0 ? void 0 : _store_state_colspanMap_get[columnIndex];
    };
    // Calculate `colSpan` for each cell in the row
    const calculateColSpan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(getColspan ? ({
        "useColspan.useEventCallback[calculateColSpan]": (rowId, minFirstColumn, maxLastColumn, columns)=>{
            for(let i = minFirstColumn; i < maxLastColumn; i += 1){
                const cellProps = calculateCellColSpan(store.state.colspanMap, i, rowId, minFirstColumn, maxLastColumn, columns, getColspan);
                if (cellProps.colSpan > 1) {
                    i += cellProps.colSpan - 1;
                }
            }
        }
    })["useColspan.useEventCallback[calculateColSpan]"] : ({
        "useColspan.useEventCallback[calculateColSpan]": ()=>{}
    })["useColspan.useEventCallback[calculateColSpan]"]);
    api.calculateColSpan = calculateColSpan;
    return {
        resetColSpan,
        getCellColSpanInfo,
        calculateColSpan
    };
}
function calculateCellColSpan(lookup, columnIndex, rowId, minFirstColumnIndex, maxLastColumnIndex, columns, getColspan) {
    const columnsLength = columns.length;
    const column = columns[columnIndex];
    const colSpan = getColspan(rowId, column, columnIndex);
    if (!colSpan || colSpan === 1) {
        setCellColSpanInfo(lookup, rowId, columnIndex, {
            spannedByColSpan: false,
            cellProps: {
                colSpan: 1,
                width: column.computedWidth
            }
        });
        return {
            colSpan: 1
        };
    }
    let width = column.computedWidth;
    for(let j = 1; j < colSpan; j += 1){
        const nextColumnIndex = columnIndex + j;
        // Cells should be spanned only within their column section (left-pinned, right-pinned and unpinned).
        if (nextColumnIndex >= minFirstColumnIndex && nextColumnIndex < maxLastColumnIndex) {
            const nextColumn = columns[nextColumnIndex];
            width += nextColumn.computedWidth;
            setCellColSpanInfo(lookup, rowId, columnIndex + j, {
                spannedByColSpan: true,
                rightVisibleCellIndex: Math.min(columnIndex + colSpan, columnsLength - 1),
                leftVisibleCellIndex: columnIndex
            });
        }
        setCellColSpanInfo(lookup, rowId, columnIndex, {
            spannedByColSpan: false,
            cellProps: {
                colSpan,
                width
            }
        });
    }
    return {
        colSpan
    };
}
function setCellColSpanInfo(colspanMap, rowId, columnIndex, cellColSpanInfo) {
    let columnInfo = colspanMap.get(rowId);
    if (!columnInfo) {
        columnInfo = {};
        colspanMap.set(rowId, columnInfo);
    }
    columnInfo[columnIndex] = cellColSpanInfo;
}
}),
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/models/core.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-redeclare */ __turbopack_context__.s([
    "PinnedColumns",
    ()=>PinnedColumns,
    "PinnedRows",
    ()=>PinnedRows,
    "ScrollDirection",
    ()=>ScrollDirection,
    "ScrollPosition",
    ()=>ScrollPosition,
    "Size",
    ()=>Size
]);
const Size = {
    EMPTY: {
        width: 0,
        height: 0
    },
    equals: (a, b)=>a.width === b.width && a.height === b.height
};
const PinnedRows = {
    EMPTY: {
        top: [],
        bottom: []
    }
};
const PinnedColumns = {
    EMPTY: {
        left: [],
        right: []
    }
};
const ScrollPosition = {
    EMPTY: {
        top: 0,
        left: 0
    },
    equals: (a, b)=>a.top === b.top && a.left === b.left
};
let ScrollDirection = /*#__PURE__*/ function(ScrollDirection) {
    ScrollDirection[ScrollDirection["NONE"] = 0] = "NONE";
    ScrollDirection[ScrollDirection["UP"] = 1] = "UP";
    ScrollDirection[ScrollDirection["DOWN"] = 2] = "DOWN";
    ScrollDirection[ScrollDirection["LEFT"] = 3] = "LEFT";
    ScrollDirection[ScrollDirection["RIGHT"] = 4] = "RIGHT";
    return ScrollDirection;
}({});
(function(_ScrollDirection) {
    function forDelta(dx, dy) {
        if (dx === 0 && dy === 0) {
            return ScrollDirection.NONE;
        }
        /* eslint-disable */ if (Math.abs(dy) >= Math.abs(dx)) {
            if (dy > 0) {
                return ScrollDirection.DOWN;
            } else {
                return ScrollDirection.UP;
            }
        } else {
            if (dx > 0) {
                return ScrollDirection.RIGHT;
            } else {
                return ScrollDirection.LEFT;
            }
        }
    /* eslint-enable */ }
    _ScrollDirection.forDelta = forDelta;
})(ScrollDirection || (ScrollDirection = {}));
}),
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/dimensions.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dimensions",
    ()=>Dimensions,
    "observeRootNode",
    ()=>observeRootNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.19_react-dom@19.2.7_react@19.2.7__react@19.2.7/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useLazyRef$2f$useLazyRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$throttle$2f$throttle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/throttle/throttle.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$isDeepEqual$2f$isDeepEqual$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/isDeepEqual/isDeepEqual.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$math$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/math/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/store/useStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/store/createSelector.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/models/core.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
/* eslint-disable import/export, @typescript-eslint/no-redeclare */ /* eslint-disable no-underscore-dangle */ // Max time between hasScrollY flips that still counts as the same render
// chain. Feedback loops (#20539) flip within one browser frame; user-paced
// resize (#22510) flips are separated by ResizeObserver ticks + resizeThrottleMs.
const OSCILLATION_FLIP_WINDOW_MS = 100;
const EMPTY_DIMENSIONS = {
    isReady: false,
    root: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].EMPTY,
    viewportOuterSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].EMPTY,
    viewportInnerSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].EMPTY,
    contentSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].EMPTY,
    minimumSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].EMPTY,
    hasScrollX: false,
    hasScrollY: false,
    scrollbarSize: 0,
    rowWidth: 0,
    rowHeight: 0,
    columnsTotalWidth: 0,
    leftPinnedWidth: 0,
    rightPinnedWidth: 0,
    topContainerHeight: 0,
    bottomContainerHeight: 0,
    autoHeight: false,
    minimalContentHeight: undefined
};
const selectors = {
    rootSize: (state)=>state.rootSize,
    dimensions: (state)=>state.dimensions,
    rowHeight: (state)=>state.dimensions.rowHeight,
    columnsTotalWidth: (state)=>state.dimensions.columnsTotalWidth,
    contentHeight: (state)=>state.dimensions.contentSize.height,
    autoHeight: (state)=>state.dimensions.autoHeight,
    minimalContentHeight: (state)=>state.dimensions.minimalContentHeight,
    rowsMeta: (state)=>state.rowsMeta,
    rowPositions: (state)=>state.rowsMeta.positions,
    columnPositions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])((_, columns)=>{
        const positions = [];
        let currentPosition = 0;
        for(let i = 0; i < columns.length; i += 1){
            positions.push(currentPosition);
            currentPosition += columns[i].computedWidth;
        }
        return positions;
    }),
    needsHorizontalScrollbar: (state)=>state.dimensions.viewportOuterSize.width > 0 && state.dimensions.columnsTotalWidth > state.dimensions.viewportOuterSize.width
};
const Dimensions = {
    initialize: initializeState,
    use: useDimensions,
    selectors
};
function initializeState(params) {
    const dimensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, EMPTY_DIMENSIONS, params.dimensions, {
        autoHeight: params.dimensions.autoHeight,
        minimalContentHeight: params.dimensions.minimalContentHeight
    });
    const { rowCount } = params;
    const { rowHeight } = dimensions;
    const rowsMeta = {
        currentPageTotalHeight: rowCount * rowHeight,
        positions: Array.from({
            length: rowCount
        }, (_, i)=>i * rowHeight),
        pinnedTopRowsTotalHeight: 0,
        pinnedBottomRowsTotalHeight: 0
    };
    const rowHeights = new Map();
    return {
        rootSize: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].EMPTY,
        dimensions,
        rowsMeta,
        rowHeights
    };
}
function useDimensions(store, params, _api) {
    const isFirstSizing = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](true);
    // Vertical scrollbar oscillation detector. Counts consecutive hasScrollY
    // flips with no row-height change. After 2 flips within
    // OSCILLATION_FLIP_WINDOW_MS it is a layout feedback loop, so hasScrollY is
    // forced off. The counter resets on row-height changes or when the previous
    // flip is older than the window (user-paced resize, not a loop).
    // Only vertical scrollbar can oscillate because column widths are never 'auto'.
    // https://github.com/mui/mui-x/issues/20539
    // https://github.com/mui/mui-x/issues/22510
    const scrollYOscillation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]({
        counter: 0,
        heights: {
            content: 0,
            pinnedTop: 0,
            pinnedBottom: 0
        },
        lastFlipTimestamp: 0
    });
    const { layout, dimensions: { rowHeight, columnsTotalWidth, leftPinnedWidth, rightPinnedWidth, topPinnedHeight, bottomPinnedHeight }, onResize } = params;
    const updateDimensions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useDimensions.useCallback[updateDimensions]": (firstUpdate)=>{
            if (firstUpdate) {
                isFirstSizing.current = false;
            }
            if (isFirstSizing.current) {
                return;
            }
            const containerNode = layout.refs.container.current;
            const rootSize = selectors.rootSize(store.state);
            const rowsMeta = selectors.rowsMeta(store.state);
            // All the floating point dimensions should be rounded to .1 decimal places to avoid subpixel rendering issues
            // https://github.com/mui/mui-x/issues/9550#issuecomment-1619020477
            // https://github.com/mui/mui-x/issues/15721
            const scrollbarSize = measureScrollbarSize(containerNode, params.dimensions.scrollbarSize);
            const topContainerHeight = topPinnedHeight + rowsMeta.pinnedTopRowsTotalHeight;
            const bottomContainerHeight = bottomPinnedHeight + rowsMeta.pinnedBottomRowsTotalHeight;
            const contentSize = {
                width: columnsTotalWidth,
                height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$math$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundToDecimalPlaces"])(rowsMeta.currentPageTotalHeight, 1)
            };
            const prevDimensions = store.state.dimensions;
            let viewportOuterSize;
            let viewportInnerSize;
            let hasScrollX = false;
            let hasScrollY = false;
            if (params.dimensions.autoHeight) {
                hasScrollY = false;
                hasScrollX = Math.round(columnsTotalWidth) > Math.round(rootSize.width);
                viewportOuterSize = {
                    width: rootSize.width,
                    height: topContainerHeight + bottomContainerHeight + contentSize.height
                };
                viewportInnerSize = {
                    width: Math.max(0, viewportOuterSize.width - (hasScrollY ? scrollbarSize : 0)),
                    height: Math.max(0, viewportOuterSize.height - (hasScrollX ? scrollbarSize : 0))
                };
            } else {
                viewportOuterSize = {
                    width: rootSize.width,
                    height: rootSize.height
                };
                viewportInnerSize = {
                    width: Math.max(0, viewportOuterSize.width),
                    height: Math.max(0, viewportOuterSize.height - topContainerHeight - bottomContainerHeight)
                };
                const content = contentSize;
                const container = viewportInnerSize;
                const hasScrollXIfNoYScrollBar = content.width > container.width;
                const hasScrollYIfNoXScrollBar = content.height > container.height;
                if (hasScrollXIfNoYScrollBar || hasScrollYIfNoXScrollBar) {
                    hasScrollY = hasScrollYIfNoXScrollBar;
                    hasScrollX = content.width + (hasScrollY ? scrollbarSize : 0) > container.width;
                    // We recalculate the scroll y to consider the size of the x scrollbar.
                    if (hasScrollX) {
                        hasScrollY = content.height + scrollbarSize > container.height;
                    }
                }
                // Detect vertical scrollbar oscillation — caused by stale rootSize or
                // the horizontal scrollbar's height cascading. See scrollYOscillation.
                {
                    const osc = scrollYOscillation.current;
                    const heightsChanged = rowsMeta.currentPageTotalHeight !== osc.heights.content || rowsMeta.pinnedTopRowsTotalHeight !== osc.heights.pinnedTop || rowsMeta.pinnedBottomRowsTotalHeight !== osc.heights.pinnedBottom;
                    if (heightsChanged) {
                        osc.counter = 0;
                        osc.heights = {
                            content: rowsMeta.currentPageTotalHeight,
                            pinnedTop: rowsMeta.pinnedTopRowsTotalHeight,
                            pinnedBottom: rowsMeta.pinnedBottomRowsTotalHeight
                        };
                    }
                    if (prevDimensions.isReady && hasScrollY !== prevDimensions.hasScrollY) {
                        // performance.now is monotonic; Date.now can jump (NTP, clock change).
                        const now = performance.now();
                        if (now - osc.lastFlipTimestamp > OSCILLATION_FLIP_WINDOW_MS) {
                            osc.counter = 0;
                        }
                        osc.lastFlipTimestamp = now;
                        if (!heightsChanged) {
                            osc.counter += 1;
                        }
                        if (osc.counter >= 2) {
                            hasScrollY = false;
                            // Recompute hasScrollX without the vertical scrollbar's width impact,
                            // otherwise the cascade (hasScrollY → narrower viewport → hasScrollX)
                            // keeps the horizontal scrollbar/filler alive and the root keeps resizing.
                            hasScrollX = hasScrollXIfNoYScrollBar;
                        }
                    }
                }
                if (hasScrollY) {
                    viewportInnerSize.width -= scrollbarSize;
                }
                if (hasScrollX) {
                    viewportInnerSize.height -= scrollbarSize;
                }
            }
            if (params.disableHorizontalScroll) {
                hasScrollX = false;
            }
            if (params.disableVerticalScroll) {
                hasScrollY = false;
            }
            const rowWidth = Math.max(viewportOuterSize.width, columnsTotalWidth + (hasScrollY ? scrollbarSize : 0));
            const minimumSize = {
                width: columnsTotalWidth,
                height: topContainerHeight + contentSize.height + bottomContainerHeight
            };
            const newDimensions = {
                isReady: true,
                root: rootSize,
                viewportOuterSize,
                viewportInnerSize,
                contentSize,
                minimumSize,
                hasScrollX,
                hasScrollY,
                scrollbarSize,
                rowWidth,
                rowHeight,
                columnsTotalWidth,
                leftPinnedWidth,
                rightPinnedWidth,
                topContainerHeight,
                bottomContainerHeight,
                autoHeight: params.dimensions.autoHeight,
                minimalContentHeight: params.dimensions.minimalContentHeight
            };
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$isDeepEqual$2f$isDeepEqual$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDeepEqual"])(prevDimensions, newDimensions)) {
                return;
            }
            store.update({
                dimensions: newDimensions
            });
            onResize === null || onResize === void 0 ? void 0 : onResize(newDimensions.root);
        }
    }["useDimensions.useCallback[updateDimensions]"], [
        store,
        layout.refs.container,
        params.dimensions.scrollbarSize,
        params.dimensions.autoHeight,
        params.dimensions.minimalContentHeight,
        params.disableHorizontalScroll,
        params.disableVerticalScroll,
        onResize,
        rowHeight,
        columnsTotalWidth,
        leftPinnedWidth,
        rightPinnedWidth,
        topPinnedHeight,
        bottomPinnedHeight
    ]);
    const { resizeThrottleMs } = params;
    const updateDimensionCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(updateDimensions);
    const debouncedUpdateDimensions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useDimensions.useMemo[debouncedUpdateDimensions]": ()=>resizeThrottleMs > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$throttle$2f$throttle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["throttle"])(updateDimensionCallback, resizeThrottleMs) : undefined
    }["useDimensions.useMemo[debouncedUpdateDimensions]"], [
        resizeThrottleMs,
        updateDimensionCallback
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useDimensions.useEffect": ()=>debouncedUpdateDimensions === null || debouncedUpdateDimensions === void 0 ? void 0 : debouncedUpdateDimensions.clear
    }["useDimensions.useEffect"], [
        debouncedUpdateDimensions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(updateDimensions, [
        updateDimensions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useDimensions.useLayoutEffect": ()=>{
            store.update({
                dimensions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, store.state.dimensions, {
                    autoHeight: params.dimensions.autoHeight,
                    minimalContentHeight: params.dimensions.minimalContentHeight
                })
            });
        }
    }["useDimensions.useLayoutEffect"], [
        store,
        params.dimensions.autoHeight,
        params.dimensions.minimalContentHeight
    ]);
    const rowsMeta = useRowsMeta(store, params, updateDimensions);
    return {
        updateDimensions,
        debouncedUpdateDimensions,
        rowsMeta
    };
}
function useRowsMeta(store, params, updateDimensions) {
    const heightCache = store.state.rowHeights;
    const { rows, getRowHeight: getRowHeightProp, getRowSpacing, getEstimatedRowHeight } = params;
    const lastMeasuredRowIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](-1);
    const hasRowWithAutoHeight = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const isHeightMetaValid = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const pinnedRows = params.pinnedRows;
    const rowHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(store, selectors.rowHeight);
    const getRowHeightEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useRowsMeta.useEventCallback[getRowHeightEntry]": (rowId)=>{
            let entry = heightCache.get(rowId);
            if (entry === undefined) {
                entry = {
                    content: store.state.dimensions.rowHeight,
                    spacingTop: 0,
                    spacingBottom: 0,
                    detail: 0,
                    autoHeight: false,
                    needsFirstMeasurement: true
                };
                heightCache.set(rowId, entry);
            }
            return entry;
        }
    }["useRowsMeta.useEventCallback[getRowHeightEntry]"]);
    const { applyRowHeight } = params;
    const processHeightEntry = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useRowsMeta.useCallback[processHeightEntry]": (row)=>{
            // HACK: rowHeight trails behind the most up-to-date value just enough to
            // mess the initial rowsMeta hydration :/
            eslintUseValue(rowHeight);
            const dimensions = selectors.dimensions(store.state);
            const baseRowHeight = dimensions.rowHeight;
            const entry = getRowHeightEntry(row.id);
            if (!getRowHeightProp) {
                entry.content = baseRowHeight;
                entry.needsFirstMeasurement = false;
            } else {
                const rowHeightFromUser = getRowHeightProp(row);
                if (rowHeightFromUser === 'auto') {
                    if (entry.needsFirstMeasurement) {
                        const estimatedRowHeight = getEstimatedRowHeight ? getEstimatedRowHeight(row) : baseRowHeight;
                        // If the row was not measured yet use the estimated row height
                        entry.content = estimatedRowHeight !== null && estimatedRowHeight !== void 0 ? estimatedRowHeight : baseRowHeight;
                    }
                    hasRowWithAutoHeight.current = true;
                    entry.autoHeight = true;
                } else {
                    // Default back to base rowHeight if getRowHeight returns null value.
                    entry.content = rowHeightFromUser !== null && rowHeightFromUser !== void 0 ? rowHeightFromUser : dimensions.rowHeight;
                    entry.needsFirstMeasurement = false;
                    entry.autoHeight = false;
                }
            }
            if (getRowSpacing) {
                const spacing = getRowSpacing(row);
                var _spacing_top;
                entry.spacingTop = (_spacing_top = spacing.top) !== null && _spacing_top !== void 0 ? _spacing_top : 0;
                var _spacing_bottom;
                entry.spacingBottom = (_spacing_bottom = spacing.bottom) !== null && _spacing_bottom !== void 0 ? _spacing_bottom : 0;
            } else {
                entry.spacingTop = 0;
                entry.spacingBottom = 0;
            }
            applyRowHeight === null || applyRowHeight === void 0 ? void 0 : applyRowHeight(entry, row);
            return entry;
        }
    }["useRowsMeta.useCallback[processHeightEntry]"], [
        store,
        getRowHeightProp,
        getRowHeightEntry,
        getEstimatedRowHeight,
        rowHeight,
        getRowSpacing,
        applyRowHeight
    ]);
    const hydrateRowsMeta = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useRowsMeta.useCallback[hydrateRowsMeta]": ()=>{
            hasRowWithAutoHeight.current = false;
            var _pinnedRows_top_reduce;
            const pinnedTopRowsTotalHeight = (_pinnedRows_top_reduce = pinnedRows === null || pinnedRows === void 0 ? void 0 : pinnedRows.top.reduce({
                "useRowsMeta.useCallback[hydrateRowsMeta]": (acc, row)=>{
                    const entry = processHeightEntry(row);
                    return acc + entry.content + entry.spacingTop + entry.spacingBottom + entry.detail;
                }
            }["useRowsMeta.useCallback[hydrateRowsMeta]"], 0)) !== null && _pinnedRows_top_reduce !== void 0 ? _pinnedRows_top_reduce : 0;
            var _pinnedRows_bottom_reduce;
            const pinnedBottomRowsTotalHeight = (_pinnedRows_bottom_reduce = pinnedRows === null || pinnedRows === void 0 ? void 0 : pinnedRows.bottom.reduce({
                "useRowsMeta.useCallback[hydrateRowsMeta]": (acc, row)=>{
                    const entry = processHeightEntry(row);
                    return acc + entry.content + entry.spacingTop + entry.spacingBottom + entry.detail;
                }
            }["useRowsMeta.useCallback[hydrateRowsMeta]"], 0)) !== null && _pinnedRows_bottom_reduce !== void 0 ? _pinnedRows_bottom_reduce : 0;
            const positions = [];
            const currentPageTotalHeight = rows.reduce({
                "useRowsMeta.useCallback[hydrateRowsMeta].currentPageTotalHeight": (acc, row)=>{
                    positions.push(acc);
                    const entry = processHeightEntry(row);
                    const total = entry.content + entry.spacingTop + entry.spacingBottom + entry.detail;
                    return acc + total;
                }
            }["useRowsMeta.useCallback[hydrateRowsMeta].currentPageTotalHeight"], 0);
            if (!hasRowWithAutoHeight.current) {
                // No row has height=auto, so all rows are already measured
                lastMeasuredRowIndex.current = Infinity;
            }
            const didHeightsChange = pinnedTopRowsTotalHeight !== store.state.rowsMeta.pinnedTopRowsTotalHeight || pinnedBottomRowsTotalHeight !== store.state.rowsMeta.pinnedBottomRowsTotalHeight || currentPageTotalHeight !== store.state.rowsMeta.currentPageTotalHeight;
            const rowsMeta = {
                currentPageTotalHeight,
                positions,
                pinnedTopRowsTotalHeight,
                pinnedBottomRowsTotalHeight
            };
            store.set('rowsMeta', rowsMeta);
            if (didHeightsChange) {
                updateDimensions();
            }
            isHeightMetaValid.current = true;
        }
    }["useRowsMeta.useCallback[hydrateRowsMeta]"], [
        store,
        pinnedRows,
        rows,
        processHeightEntry,
        updateDimensions
    ]);
    const hydrateRowsMetaLatest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(hydrateRowsMeta);
    const getRowHeight = (rowId)=>{
        var _heightCache_get;
        var _heightCache_get_content;
        return (_heightCache_get_content = (_heightCache_get = heightCache.get(rowId)) === null || _heightCache_get === void 0 ? void 0 : _heightCache_get.content) !== null && _heightCache_get_content !== void 0 ? _heightCache_get_content : selectors.rowHeight(store.state);
    };
    const storeRowHeightMeasurement = (id, height)=>{
        var _isHeightMetaValid;
        const entry = getRowHeightEntry(id);
        const didChange = entry.content !== height;
        entry.needsFirstMeasurement = false;
        entry.content = height;
        (_isHeightMetaValid = isHeightMetaValid).current && (_isHeightMetaValid.current = !didChange);
    };
    const rowHasAutoHeight = (id)=>{
        var _heightCache_get;
        var _heightCache_get_autoHeight;
        return (_heightCache_get_autoHeight = (_heightCache_get = heightCache.get(id)) === null || _heightCache_get === void 0 ? void 0 : _heightCache_get.autoHeight) !== null && _heightCache_get_autoHeight !== void 0 ? _heightCache_get_autoHeight : false;
    };
    const getLastMeasuredRowIndex = ()=>{
        return lastMeasuredRowIndex.current;
    };
    const setLastMeasuredRowIndex = (index)=>{
        if (hasRowWithAutoHeight.current && index > lastMeasuredRowIndex.current) {
            lastMeasuredRowIndex.current = index;
        }
    };
    const resetRowHeights = ()=>{
        heightCache.clear();
        hydrateRowsMeta();
    };
    const resizeObserver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useLazyRef$2f$useLazyRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useRowsMeta.useLazyRef": ()=>typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver({
                "useRowsMeta.useLazyRef": (entries)=>{
                    for(let i = 0; i < entries.length; i += 1){
                        var _params_focusedVirtualCell, _params_focusedVirtualCell1;
                        const entry = entries[i];
                        const height = entry.borderBoxSize && entry.borderBoxSize.length > 0 ? entry.borderBoxSize[0].blockSize : entry.contentRect.height;
                        const rowId = entry.target.__mui_id;
                        const focusedVirtualRowId = (_params_focusedVirtualCell1 = params.focusedVirtualCell) === null || _params_focusedVirtualCell1 === void 0 ? void 0 : (_params_focusedVirtualCell = _params_focusedVirtualCell1.call(params)) === null || _params_focusedVirtualCell === void 0 ? void 0 : _params_focusedVirtualCell.id;
                        if (focusedVirtualRowId === rowId && height === 0) {
                            // Focused virtual row has 0 height.
                            // We don't want to store it to avoid scroll jumping.
                            // https://github.com/mui/mui-x/issues/14726
                            return;
                        }
                        storeRowHeightMeasurement(rowId, height);
                    }
                    if (!isHeightMetaValid.current) {
                        // Avoids "ResizeObserver loop completed with undelivered notifications" error
                        requestAnimationFrame({
                            "useRowsMeta.useLazyRef": ()=>{
                                hydrateRowsMetaLatest();
                            }
                        }["useRowsMeta.useLazyRef"]);
                    }
                }
            }["useRowsMeta.useLazyRef"])
    }["useRowsMeta.useLazyRef"]).current;
    const observeRowHeight = (element, rowId)=>{
        element.__mui_id = rowId;
        resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.observe(element);
        return ()=>resizeObserver === null || resizeObserver === void 0 ? void 0 : resizeObserver.unobserve(element);
    };
    // The effect is used to build the rows meta data - currentPageTotalHeight and positions.
    // Because of variable row height this is needed for the virtualization
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useRowsMeta.useLayoutEffect": ()=>{
            hydrateRowsMeta();
        }
    }["useRowsMeta.useLayoutEffect"], [
        hydrateRowsMeta
    ]);
    return {
        getRowHeight,
        setLastMeasuredRowIndex,
        storeRowHeightMeasurement,
        hydrateRowsMeta,
        observeRowHeight,
        rowHasAutoHeight,
        getRowHeightEntry,
        getLastMeasuredRowIndex,
        resetRowHeights
    };
}
function observeRootNode(node, store, setRootSize) {
    if (!node) {
        return undefined;
    }
    const bounds = node.getBoundingClientRect();
    const initialSize = {
        width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$math$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundToDecimalPlaces"])(bounds.width, 1),
        height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$math$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundToDecimalPlaces"])(bounds.height, 1)
    };
    if (store.state.rootSize === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].EMPTY || !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].equals(initialSize, store.state.rootSize)) {
        setRootSize(initialSize);
    }
    if (typeof ResizeObserver === 'undefined') {
        return undefined;
    }
    const observer = new ResizeObserver((param)=>{
        let [entry] = param;
        if (!entry) {
            return;
        }
        const rootSize = {
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$math$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundToDecimalPlaces"])(entry.contentRect.width, 1),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$math$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roundToDecimalPlaces"])(entry.contentRect.height, 1)
        };
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Size"].equals(rootSize, store.state.rootSize)) {
            setRootSize(rootSize);
        }
    });
    observer.observe(node);
    return ()=>{
        observer.disconnect();
    };
}
const scrollbarSizeCache = new WeakMap();
function measureScrollbarSize(element, scrollbarSize) {
    if (scrollbarSize !== undefined) {
        return scrollbarSize;
    }
    if (element === null) {
        return 0;
    }
    const cachedSize = scrollbarSizeCache.get(element);
    if (cachedSize !== undefined) {
        return cachedSize;
    }
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(element);
    const scrollDiv = doc.createElement('div');
    scrollDiv.style.width = '99px';
    scrollDiv.style.height = '99px';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.className = 'scrollDiv';
    element.appendChild(scrollDiv);
    const size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    element.removeChild(scrollDiv);
    scrollbarSizeCache.set(element, size);
    return size;
}
function eslintUseValue(_) {}
}),
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/virtualization/virtualization.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMPTY_RENDER_CONTEXT",
    ()=>EMPTY_RENDER_CONTEXT,
    "Virtualization",
    ()=>Virtualization,
    "areRenderContextsEqual",
    ()=>areRenderContextsEqual,
    "computeOffsetLeft",
    ()=>computeOffsetLeft,
    "roundToDecimalPlaces",
    ()=>roundToDecimalPlaces
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.19_react-dom@19.2.7_react@19.2.7__react@19.2.7/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.19_react-dom@19.2.7_react@19.2.7__react@19.2.7/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useLazyRef$2f$useLazyRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useTimeout$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useTimeout/useTimeout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/platform/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$useRunOnce$2f$useRunOnce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/useRunOnce/useRunOnce.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/store/createSelector.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/store/useStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStoreEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/store/useStoreEffect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$reactMajor$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/reactMajor/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/models/core.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/dimensions.mjs [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/* eslint-disable import/export, @typescript-eslint/no-redeclare */ const clamp = (value, min, max)=>Math.max(min, Math.min(max, value));
const MINIMUM_COLUMN_WIDTH = 50;
const EMPTY_SCROLL_POSITION = {
    top: 0,
    left: 0
};
const EMPTY_DETAIL_PANELS = Object.freeze(new Map());
const EMPTY_RENDER_CONTEXT = {
    firstRowIndex: 0,
    lastRowIndex: 0,
    firstColumnIndex: 0,
    lastColumnIndex: 0
};
const selectors = (()=>{
    const firstRowIndexSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.virtualization.renderContext.firstRowIndex);
    return {
        store: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.virtualization),
        renderContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.virtualization.renderContext),
        enabledForRows: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.virtualization.enabledForRows),
        enabledForColumns: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.virtualization.enabledForColumns),
        offsetTop: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.rowPositions, firstRowIndexSelector, (rowPositions, firstRowIndex)=>{
            var _rowPositions_firstRowIndex;
            return (_rowPositions_firstRowIndex = rowPositions[firstRowIndex]) !== null && _rowPositions_firstRowIndex !== void 0 ? _rowPositions_firstRowIndex : 0;
        }),
        context: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.virtualization.context),
        scrollPosition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelector"])((state)=>state.virtualization.scrollPosition)
    };
})();
const Virtualization = {
    initialize: initializeState,
    use: useVirtualization,
    selectors
};
function initializeState(params) {
    var _params_initialState;
    const state = {
        virtualization: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
            enabled: !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJSDOM"],
            enabledForRows: !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJSDOM"],
            enabledForColumns: !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJSDOM"],
            renderContext: EMPTY_RENDER_CONTEXT,
            props: params.layout.constructor.elements.reduce((acc, key)=>(acc[key], acc), {}),
            context: {},
            scrollPosition: {
                current: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollPosition"].EMPTY
            }
        }, (_params_initialState = params.initialState) === null || _params_initialState === void 0 ? void 0 : _params_initialState.virtualization),
        // FIXME: refactor once the state shape is settled
        getters: null
    };
    return state;
}
/** APIs to override for colspan/rowspan */ function useVirtualization(store, params, api) {
    const { layout, dimensions: { rowHeight, columnsTotalWidth = 0 }, virtualization: { isRtl = false, rowBufferPx = 150, columnBufferPx = 150 }, colspan, initialState, rows, range, columns, pinnedRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PinnedRows"].EMPTY, pinnedColumns = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PinnedColumns"].EMPTY, onWheel, onTouchMove, onRenderContextChange, onScrollChange, scrollReset, renderRow, renderInfiniteLoadingTrigger } = params;
    const hasBottomPinnedRows = pinnedRows.bottom.length > 0;
    const [panels, setPanels] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](EMPTY_DETAIL_PANELS);
    const isUpdateScheduled = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const isRenderContextReady = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const renderContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(store, selectors.renderContext);
    const enabledForRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(store, selectors.enabledForRows);
    const enabledForColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(store, selectors.enabledForColumns);
    const contentHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.contentHeight);
    var _initialState_scroll;
    /*
   * Scroll context logic
   * ====================
   * We only render the cells contained in the `renderContext`. However, when the user starts scrolling the grid
   * in a direction, we want to render as many cells as possible in that direction, as to avoid presenting white
   * areas if the user scrolls too fast/far and the viewport ends up in a region we haven't rendered yet. To render
   * more cells, we store some offsets to add to the viewport in `scrollCache.buffer`. Those offsets make the render
   * context wider in the direction the user is going, but also makes the buffer around the viewport `0` for the
   * dimension (horizontal or vertical) in which the user is not scrolling. So if the normal viewport is 8 columns
   * wide, with a 1 column buffer (10 columns total), then we want it to be exactly 8 columns wide during vertical
   * scroll.
   * However, we don't want the rows in the old context to re-render from e.g. 10 columns to 8 columns, because that's
   * work that's not necessary. Thus we store the context at the start of the scroll in `frozenContext`, and the rows
   * that are part of this old context will keep their same render context as to avoid re-rendering.
   */ const scrollPosition = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]((_initialState_scroll = initialState === null || initialState === void 0 ? void 0 : initialState.scroll) !== null && _initialState_scroll !== void 0 ? _initialState_scroll : EMPTY_SCROLL_POSITION);
    const ignoreNextScrollEvent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    const previousContextScrollPosition = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](EMPTY_SCROLL_POSITION);
    const previousRowContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](EMPTY_RENDER_CONTEXT);
    const scrollTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useTimeout$2f$useTimeout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const frozenContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const scrollCache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useLazyRef$2f$useLazyRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useVirtualization.useLazyRef": ()=>createScrollCache(isRtl, rowBufferPx, columnBufferPx, rowHeight * 15, MINIMUM_COLUMN_WIDTH * 6)
    }["useVirtualization.useLazyRef"]).current;
    const updateRenderContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useVirtualization.useCallback[updateRenderContext]": (nextRenderContext)=>{
            if (!areRenderContextsEqual(nextRenderContext, store.state.virtualization.renderContext)) {
                store.set('virtualization', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, store.state.virtualization, {
                    renderContext: nextRenderContext,
                    scrollPosition: {
                        current: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, scrollPosition.current)
                    }
                }));
            }
            // The lazy-loading hook is listening to `renderedRowsIntervalChange`,
            // but only does something if we already have a render context, because
            // otherwise we would call an update directly on mount
            const isReady = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.dimensions(store.state).isReady;
            const didRowsIntervalChange = nextRenderContext.firstRowIndex !== previousRowContext.current.firstRowIndex || nextRenderContext.lastRowIndex !== previousRowContext.current.lastRowIndex;
            if (isReady && didRowsIntervalChange) {
                previousRowContext.current = nextRenderContext;
                onRenderContextChange === null || onRenderContextChange === void 0 ? void 0 : onRenderContextChange(nextRenderContext);
            }
            previousContextScrollPosition.current = scrollPosition.current;
        }
    }["useVirtualization.useCallback[updateRenderContext]"], [
        store,
        onRenderContextChange
    ]);
    const triggerUpdateRenderContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useVirtualization.useEventCallback[triggerUpdateRenderContext]": ()=>{
            const scroller = layout.refs.scroller.current;
            if (!scroller) {
                return undefined;
            }
            const dimensions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.dimensions(store.state);
            const maxScrollTop = Math.ceil(dimensions.contentSize.height - dimensions.viewportInnerSize.height);
            const maxScrollLeft = Math.ceil(dimensions.contentSize.width - dimensions.viewportInnerSize.width);
            // Clamp the scroll position to the viewport to avoid re-calculating the render context for scroll bounce
            const newScroll = {
                top: clamp(scroller.scrollTop, 0, maxScrollTop),
                left: isRtl ? clamp(scroller.scrollLeft, -Math.abs(maxScrollLeft), 0) : clamp(scroller.scrollLeft, 0, maxScrollLeft)
            };
            const dx = newScroll.left - scrollPosition.current.left;
            const dy = newScroll.top - scrollPosition.current.top;
            const isScrolling = dx !== 0 || dy !== 0;
            scrollPosition.current = newScroll;
            const direction = isScrolling ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].forDelta(dx, dy) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].NONE;
            // Since previous render, we have scrolled...
            const rowScroll = Math.abs(scrollPosition.current.top - previousContextScrollPosition.current.top);
            const columnScroll = Math.abs(scrollPosition.current.left - previousContextScrollPosition.current.left);
            // PERF: use the computed minimum column width instead of a static one
            const didCrossThreshold = rowScroll >= rowHeight || columnScroll >= MINIMUM_COLUMN_WIDTH;
            const didChangeDirection = scrollCache.direction !== direction;
            const shouldUpdate = didCrossThreshold || didChangeDirection;
            if (!shouldUpdate) {
                store.set('virtualization', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, store.state.virtualization, {
                    scrollPosition: {
                        current: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, scrollPosition.current)
                    }
                }));
                return renderContext;
            }
            // Render a new context
            if (didChangeDirection) {
                switch(direction){
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].NONE:
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].LEFT:
                    case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].RIGHT:
                        frozenContext.current = undefined;
                        break;
                    default:
                        frozenContext.current = renderContext;
                        break;
                }
            }
            scrollCache.direction = direction;
            scrollCache.buffer = bufferForDirection(isRtl, direction, rowBufferPx, columnBufferPx, rowHeight * 15, MINIMUM_COLUMN_WIDTH * 6);
            const inputs = inputsSelector(store, params, api, enabledForRows, enabledForColumns);
            const nextRenderContext = computeRenderContext(inputs, scrollPosition.current, scrollCache);
            if (!areRenderContextsEqual(nextRenderContext, renderContext)) {
                // Prevents batching render context changes
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"]({
                    "useVirtualization.useEventCallback[triggerUpdateRenderContext]": ()=>{
                        updateRenderContext(nextRenderContext);
                    }
                }["useVirtualization.useEventCallback[triggerUpdateRenderContext]"]);
                scrollTimeout.start(1000, triggerUpdateRenderContext);
            } else {
                store.set('virtualization', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, store.state.virtualization, {
                    scrollPosition: {
                        current: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, scrollPosition.current)
                    }
                }));
            }
            return nextRenderContext;
        }
    }["useVirtualization.useEventCallback[triggerUpdateRenderContext]"]);
    const forceUpdateRenderContext = ()=>{
        // skip update if dimensions are not ready and virtualization is enabled
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.dimensions(store.state).isReady && (enabledForRows || enabledForColumns)) {
            return;
        }
        const inputs = inputsSelector(store, params, api, enabledForRows, enabledForColumns);
        const nextRenderContext = computeRenderContext(inputs, scrollPosition.current, scrollCache);
        // Reset the frozen context when the render context changes, see the illustration in https://github.com/mui/mui-x/pull/12353
        frozenContext.current = undefined;
        updateRenderContext(nextRenderContext);
    };
    const forceUpdateRenderContextCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(forceUpdateRenderContext);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStoreEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoreEffect"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.dimensions, {
        "useVirtualization.useStoreEffect": (previous, next)=>{
            if (next.isReady) {
                forceUpdateRenderContext();
            }
        }
    }["useVirtualization.useStoreEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useVirtualization.useEnhancedEffect": ()=>{
            if (isUpdateScheduled.current) {
                forceUpdateRenderContext();
                isUpdateScheduled.current = false;
            }
        }
    }["useVirtualization.useEnhancedEffect"]);
    const scheduleUpdateRenderContext = ()=>{
        isUpdateScheduled.current = true;
    };
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useVirtualization.useEventCallback[handleScroll]": ()=>{
            if (ignoreNextScrollEvent.current) {
                ignoreNextScrollEvent.current = false;
                return;
            }
            const nextRenderContext = triggerUpdateRenderContext();
            if (nextRenderContext) {
                onScrollChange === null || onScrollChange === void 0 ? void 0 : onScrollChange(scrollPosition.current, nextRenderContext);
            }
        }
    }["useVirtualization.useEventCallback[handleScroll]"]);
    /**
   * HACK: unstable_rowTree fixes the issue described below, but does it by tightly coupling this
   * section of code to the DataGrid's rowTree model. The `unstable_rowTree` param is a temporary
   * solution to decouple the code.
   */ const getRows = function() {
        let rowParams = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, unstable_rowTree = arguments.length > 1 ? arguments[1] : void 0;
        var _params_focusedVirtualCell;
        if (!rowParams.rows && !range) {
            return [];
        }
        let baseRenderContext = renderContext;
        if (rowParams.renderContext) {
            baseRenderContext = rowParams.renderContext;
            baseRenderContext.firstColumnIndex = renderContext.firstColumnIndex;
            baseRenderContext.lastColumnIndex = renderContext.lastColumnIndex;
        }
        const isLastSection = !hasBottomPinnedRows && rowParams.position === undefined || hasBottomPinnedRows && rowParams.position === 'bottom';
        const isPinnedSection = rowParams.position !== undefined;
        let rowIndexOffset;
        switch(rowParams.position){
            case 'top':
                rowIndexOffset = 0;
                break;
            case 'bottom':
                rowIndexOffset = pinnedRows.top.length + rows.length;
                break;
            case undefined:
            default:
                rowIndexOffset = pinnedRows.top.length;
                break;
        }
        var _rowParams_rows;
        const rowModels = (_rowParams_rows = rowParams.rows) !== null && _rowParams_rows !== void 0 ? _rowParams_rows : rows;
        const firstRowToRender = baseRenderContext.firstRowIndex;
        const lastRowToRender = Math.min(baseRenderContext.lastRowIndex, rowModels.length);
        const rowIndexes = rowParams.rows ? createRange(0, rowParams.rows.length) : createRange(firstRowToRender, lastRowToRender);
        let virtualRowIndex = -1;
        const focusedVirtualCell = (_params_focusedVirtualCell = params.focusedVirtualCell) === null || _params_focusedVirtualCell === void 0 ? void 0 : _params_focusedVirtualCell.call(params);
        if (!isPinnedSection && focusedVirtualCell) {
            if (focusedVirtualCell.rowIndex < firstRowToRender && focusedVirtualCell.rowIndex >= 0 && focusedVirtualCell.rowIndex < rowModels.length) {
                rowIndexes.unshift(focusedVirtualCell.rowIndex);
                virtualRowIndex = focusedVirtualCell.rowIndex;
            }
            if (focusedVirtualCell.rowIndex > lastRowToRender && focusedVirtualCell.rowIndex < rowModels.length) {
                rowIndexes.push(focusedVirtualCell.rowIndex);
                virtualRowIndex = focusedVirtualCell.rowIndex;
            }
        }
        const rowElements = [];
        const columnPositions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.columnPositions(store.state, columns);
        rowIndexes.forEach((rowIndexInPage)=>{
            const { id, model } = rowModels[rowIndexInPage];
            // In certain cases, the state might already be updated and `params.rows` (which sets `rowModels`)
            // contains stale data.
            // In that case, skip any further row processing.
            // See:
            // - https://github.com/mui/mui-x/issues/16638
            // - https://github.com/mui/mui-x/issues/17022
            if (unstable_rowTree && !unstable_rowTree[id]) {
                return;
            }
            const rowIndex = ((range === null || range === void 0 ? void 0 : range.firstRowIndex) || 0) + rowIndexOffset + rowIndexInPage;
            // NOTE: This is an expensive feature, the colSpan code could be optimized.
            if (colspan === null || colspan === void 0 ? void 0 : colspan.enabled) {
                const minFirstColumn = pinnedColumns.left.length;
                const maxLastColumn = columns.length - pinnedColumns.right.length;
                api.calculateColSpan(id, minFirstColumn, maxLastColumn, columns);
                if (pinnedColumns.left.length > 0) {
                    api.calculateColSpan(id, 0, pinnedColumns.left.length, columns);
                }
                if (pinnedColumns.right.length > 0) {
                    api.calculateColSpan(id, columns.length - pinnedColumns.right.length, columns.length, columns);
                }
            }
            const baseRowHeight = !api.rowsMeta.rowHasAutoHeight(id) ? api.rowsMeta.getRowHeight(id) : 'auto';
            let isFirstVisible = false;
            if (rowParams.position === undefined) {
                isFirstVisible = rowIndexInPage === 0;
            }
            let isLastVisible = false;
            const isLastVisibleInSection = rowIndexInPage === rowModels.length - 1;
            if (isLastSection) {
                if (!isPinnedSection) {
                    const lastIndex = rows.length - 1;
                    const isLastVisibleRowIndex = rowIndexInPage === lastIndex;
                    if (isLastVisibleRowIndex) {
                        isLastVisible = true;
                    }
                } else {
                    isLastVisible = isLastVisibleInSection;
                }
            }
            let currentRenderContext = baseRenderContext;
            if (frozenContext.current && rowIndexInPage >= frozenContext.current.firstRowIndex && rowIndexInPage < frozenContext.current.lastRowIndex) {
                currentRenderContext = frozenContext.current;
            }
            const isVirtualFocusRow = rowIndexInPage === virtualRowIndex;
            const isVirtualFocusColumn = (focusedVirtualCell === null || focusedVirtualCell === void 0 ? void 0 : focusedVirtualCell.rowIndex) === rowIndex;
            const offsetLeft = computeOffsetLeft(columnPositions, currentRenderContext, pinnedColumns.left.length);
            const showBottomBorder = isLastVisibleInSection && rowParams.position === 'top';
            const firstColumnIndex = currentRenderContext.firstColumnIndex;
            const lastColumnIndex = currentRenderContext.lastColumnIndex;
            rowElements.push(renderRow({
                id,
                model,
                rowIndex,
                offsetLeft,
                columnsTotalWidth,
                baseRowHeight,
                firstColumnIndex,
                lastColumnIndex,
                focusedColumnIndex: isVirtualFocusColumn ? focusedVirtualCell.columnIndex : undefined,
                isFirstVisible,
                isLastVisible,
                isVirtualFocusRow,
                showBottomBorder
            }));
            if (isVirtualFocusRow) {
                return;
            }
            const panel = panels.get(id);
            if (panel) {
                rowElements.push(panel);
            }
            if (rowParams.position === undefined && isLastVisibleInSection && renderInfiniteLoadingTrigger) {
                rowElements.push(renderInfiniteLoadingTrigger(id));
            }
        });
        return rowElements;
    };
    const scrollRestoreCallback = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useVirtualization.useEnhancedEffect": ()=>{
            if (!isRenderContextReady.current) {
                return;
            }
            forceUpdateRenderContextCallback();
        }
    }["useVirtualization.useEnhancedEffect"], [
        enabledForColumns,
        enabledForRows,
        forceUpdateRenderContextCallback
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useVirtualization.useEnhancedEffect": ()=>{
            if (layout.refs.scroller.current) {
                layout.refs.scroller.current.scrollLeft = 0;
            }
        }
    }["useVirtualization.useEnhancedEffect"], [
        layout.refs.scroller,
        scrollReset
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$useRunOnce$2f$useRunOnce$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRunOnce"])(renderContext !== EMPTY_RENDER_CONTEXT, {
        "useVirtualization.useRunOnce": ()=>{
            onScrollChange === null || onScrollChange === void 0 ? void 0 : onScrollChange(scrollPosition.current, renderContext);
            isRenderContextReady.current = true;
            if ((initialState === null || initialState === void 0 ? void 0 : initialState.scroll) && layout.refs.scroller.current) {
                const scroller = layout.refs.scroller.current;
                const { top, left } = initialState.scroll;
                const isScrollRestored = {
                    top: !(top > 0),
                    left: !(left > 0)
                };
                if (!isScrollRestored.left && columnsTotalWidth) {
                    scroller.scrollLeft = left;
                    isScrollRestored.left = true;
                    ignoreNextScrollEvent.current = true;
                }
                // To restore the vertical scroll, we need to wait until the rows are available in the DOM (otherwise
                // there's nowhere to scroll). We still set the scrollTop to the initial value at this point in case
                // there already are rows rendered in the DOM, but we only confirm `isScrollRestored.top = true` in the
                // asynchronous callback below.
                if (!isScrollRestored.top && contentHeight) {
                    scroller.scrollTop = top;
                    ignoreNextScrollEvent.current = true;
                }
                if (!isScrollRestored.top || !isScrollRestored.left) {
                    scrollRestoreCallback.current = ({
                        "useVirtualization.useRunOnce": (columnsTotalWidthCurrent, contentHeightCurrent)=>{
                            if (!isScrollRestored.left && columnsTotalWidthCurrent) {
                                scroller.scrollLeft = left;
                                isScrollRestored.left = true;
                                ignoreNextScrollEvent.current = true;
                            }
                            if (!isScrollRestored.top && contentHeightCurrent) {
                                scroller.scrollTop = top;
                                isScrollRestored.top = true;
                                ignoreNextScrollEvent.current = true;
                            }
                            if (isScrollRestored.left && isScrollRestored.top) {
                                scrollRestoreCallback.current = null;
                            }
                        }
                    })["useVirtualization.useRunOnce"];
                }
            }
        }
    }["useVirtualization.useRunOnce"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$useStoreEffect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoreEffect"])(store, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.dimensions, forceUpdateRenderContext);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEnhancedEffect$2f$useEnhancedEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useVirtualization.useEnhancedEffect": ()=>{
            if (layout.refs.scroller) {
                var _scrollRestoreCallback_current;
                (_scrollRestoreCallback_current = scrollRestoreCallback.current) === null || _scrollRestoreCallback_current === void 0 ? void 0 : _scrollRestoreCallback_current.call(scrollRestoreCallback, columnsTotalWidth, contentHeight);
            }
        }
    }["useVirtualization.useEnhancedEffect"], [
        layout.refs.scroller,
        columnsTotalWidth,
        contentHeight
    ]);
    const isFirstSizing = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](true);
    const containerRef = useRefCallback({
        "useVirtualization.useRefCallback[containerRef]": (node)=>{
            layout.refs.container.current = node;
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeRootNode"])(node, store, {
                "useVirtualization.useRefCallback[containerRef].unsubscribe": (rootSize)=>{
                    if (rootSize.width === 0 && rootSize.height === 0 && store.state.rootSize.height !== 0 && store.state.rootSize.width !== 0) {
                        return;
                    }
                    store.state.rootSize = rootSize;
                    if (isFirstSizing.current || !api.debouncedUpdateDimensions) {
                        // We want to initialize the grid dimensions as soon as possible to avoid flickering
                        api.updateDimensions(isFirstSizing.current);
                        isFirstSizing.current = false;
                    } else {
                        api.debouncedUpdateDimensions();
                    }
                }
            }["useVirtualization.useRefCallback[containerRef].unsubscribe"]);
            return ({
                "useVirtualization.useRefCallback[containerRef]": ()=>{
                    unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe();
                    layout.refs.container.current = null;
                }
            })["useVirtualization.useRefCallback[containerRef]"];
        }
    }["useVirtualization.useRefCallback[containerRef]"]);
    const scrollerRef = useRefCallback({
        "useVirtualization.useRefCallback[scrollerRef]": (node)=>{
            layout.refs.scroller.current = node;
            const opts = {
                passive: true
            };
            node.addEventListener('scroll', handleScroll, opts);
            node.addEventListener('wheel', onWheel, opts);
            node.addEventListener('touchmove', onTouchMove, opts);
            return ({
                "useVirtualization.useRefCallback[scrollerRef]": ()=>{
                    node.removeEventListener('scroll', handleScroll, opts);
                    node.removeEventListener('wheel', onWheel, opts);
                    node.removeEventListener('touchmove', onTouchMove, opts);
                    layout.refs.scroller.current = null;
                }
            })["useVirtualization.useRefCallback[scrollerRef]"];
        }
    }["useVirtualization.useRefCallback[scrollerRef]"]);
    const layoutParams = {
        containerRef,
        scrollerRef
    };
    const layoutAPI = layout.use(store, params, api, layoutParams);
    const getters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        setPanels,
        getRows,
        rows: params.rows
    }, layoutAPI);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        getters,
        setPanels,
        forceUpdateRenderContext,
        scheduleUpdateRenderContext
    }, createSpanningAPI());
}
function useRefCallback(fn) {
    const refCleanup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$2$2e$7_react$40$19$2e$2$2e$7_$5f$react$40$19$2e$2$2e$7$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](undefined);
    const refCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useRefCallback.useEventCallback[refCallback]": (node)=>{
            if (!node) {
                var // Cleanup for R18
                _refCleanup_current;
                (_refCleanup_current = refCleanup.current) === null || _refCleanup_current === void 0 ? void 0 : _refCleanup_current.call(refCleanup);
                return;
            }
            refCleanup.current = fn(node);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$reactMajor$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] >= 19) {
                /* eslint-disable-next-line consistent-return */ return refCleanup.current;
            }
        }
    }["useRefCallback.useEventCallback[refCallback]"]);
    return refCallback;
}
function inputsSelector(store, params, api, enabledForRows, enabledForColumns) {
    var _params_rows_at;
    const dimensions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.dimensions(store.state);
    const rows = params.rows;
    const range = params.range;
    const columns = params.columns;
    const hiddenCellsOriginMap = api.getHiddenCellsOrigin();
    const lastRowId = (_params_rows_at = params.rows.at(-1)) === null || _params_rows_at === void 0 ? void 0 : _params_rows_at.id;
    const lastColumn = columns.at(-1);
    var _lastColumn_computedWidth;
    return {
        api,
        enabledForRows,
        enabledForColumns,
        autoHeight: dimensions.autoHeight,
        rowBufferPx: params.virtualization.rowBufferPx,
        columnBufferPx: params.virtualization.columnBufferPx,
        leftPinnedWidth: dimensions.leftPinnedWidth,
        columnsTotalWidth: dimensions.columnsTotalWidth,
        viewportInnerWidth: dimensions.viewportInnerSize.width,
        viewportInnerHeight: dimensions.viewportInnerSize.height,
        lastRowHeight: lastRowId !== undefined ? api.rowsMeta.getRowHeight(lastRowId) : 0,
        lastColumnWidth: (_lastColumn_computedWidth = lastColumn === null || lastColumn === void 0 ? void 0 : lastColumn.computedWidth) !== null && _lastColumn_computedWidth !== void 0 ? _lastColumn_computedWidth : 0,
        rowsMeta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.rowsMeta(store.state),
        columnPositions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.columnPositions(store.state, params.columns),
        rows,
        range,
        pinnedColumns: params.pinnedColumns,
        columns,
        hiddenCellsOriginMap,
        virtualizeColumnsWithAutoRowHeight: params.virtualizeColumnsWithAutoRowHeight
    };
}
function computeRenderContext(inputs, scrollPosition, scrollCache) {
    const renderContext = {
        firstRowIndex: 0,
        lastRowIndex: inputs.rows.length,
        firstColumnIndex: 0,
        lastColumnIndex: inputs.columns.length
    };
    const { top, left } = scrollPosition;
    const realLeft = Math.abs(left) + inputs.leftPinnedWidth;
    if (inputs.enabledForRows) {
        // Clamp the value because the search may return an index out of bounds.
        // In the last index, this is not needed because Array.slice doesn't include it.
        let firstRowIndex = Math.min(getNearestIndexToRender(inputs, top, {
            atStart: true,
            lastPosition: inputs.rowsMeta.positions[inputs.rowsMeta.positions.length - 1] + inputs.lastRowHeight
        }), inputs.rowsMeta.positions.length - 1);
        // If any of the cells in the `firstRowIndex` is hidden due to an extended row span,
        // Make sure the row from where the rowSpan is originated is visible.
        const rowSpanHiddenCellOrigin = inputs.hiddenCellsOriginMap[firstRowIndex];
        if (rowSpanHiddenCellOrigin) {
            const minSpannedRowIndex = Math.min(...Object.values(rowSpanHiddenCellOrigin));
            firstRowIndex = Math.min(firstRowIndex, minSpannedRowIndex);
        }
        const lastRowIndex = inputs.autoHeight ? firstRowIndex + inputs.rows.length : getNearestIndexToRender(inputs, top + inputs.viewportInnerHeight);
        renderContext.firstRowIndex = firstRowIndex;
        renderContext.lastRowIndex = lastRowIndex;
    }
    // XXX
    // if (inputs.listView) {
    //   return {
    //     ...renderContext,
    //     lastColumnIndex: 1,
    //   };
    // }
    if (inputs.enabledForColumns) {
        let firstColumnIndex = 0;
        let lastColumnIndex = inputs.columnPositions.length;
        let hasRowWithAutoHeight = false;
        const [firstRowToRender, lastRowToRender] = getIndexesToRender({
            firstIndex: renderContext.firstRowIndex,
            lastIndex: renderContext.lastRowIndex,
            minFirstIndex: 0,
            maxLastIndex: inputs.rows.length,
            bufferBefore: scrollCache.buffer.rowBefore,
            bufferAfter: scrollCache.buffer.rowAfter,
            positions: inputs.rowsMeta.positions,
            lastSize: inputs.lastRowHeight
        });
        if (!inputs.virtualizeColumnsWithAutoRowHeight) {
            for(let i = firstRowToRender; i < lastRowToRender && !hasRowWithAutoHeight; i += 1){
                const row = inputs.rows[i];
                hasRowWithAutoHeight = inputs.api.rowsMeta.rowHasAutoHeight(row.id);
            }
        }
        if (!hasRowWithAutoHeight || inputs.virtualizeColumnsWithAutoRowHeight) {
            firstColumnIndex = binarySearch(realLeft, inputs.columnPositions, {
                atStart: true,
                lastPosition: inputs.columnsTotalWidth
            });
            lastColumnIndex = binarySearch(realLeft + inputs.viewportInnerWidth, inputs.columnPositions);
        }
        renderContext.firstColumnIndex = firstColumnIndex;
        renderContext.lastColumnIndex = lastColumnIndex;
    }
    const actualRenderContext = deriveRenderContext(inputs, renderContext, scrollCache);
    return actualRenderContext;
}
function getNearestIndexToRender(inputs, offset, options) {
    var _inputs_range, _inputs_range1;
    const lastMeasuredIndexRelativeToAllRows = inputs.api.rowsMeta.getLastMeasuredRowIndex();
    let allRowsMeasured = lastMeasuredIndexRelativeToAllRows === Infinity;
    if (((_inputs_range = inputs.range) === null || _inputs_range === void 0 ? void 0 : _inputs_range.lastRowIndex) && !allRowsMeasured) {
        // Check if all rows in this page are already measured
        allRowsMeasured = lastMeasuredIndexRelativeToAllRows >= inputs.range.lastRowIndex;
    }
    const lastMeasuredIndexRelativeToCurrentPage = clamp(lastMeasuredIndexRelativeToAllRows - (((_inputs_range1 = inputs.range) === null || _inputs_range1 === void 0 ? void 0 : _inputs_range1.firstRowIndex) || 0), 0, inputs.rowsMeta.positions.length);
    if (allRowsMeasured || inputs.rowsMeta.positions[lastMeasuredIndexRelativeToCurrentPage] >= offset) {
        // If all rows were measured (when no row has "auto" as height) or all rows before the offset
        // were measured, then use a binary search because it's faster.
        return binarySearch(offset, inputs.rowsMeta.positions, options);
    }
    // Otherwise, use an exponential search.
    // If rows have "auto" as height, their positions will be based on estimated heights.
    // In this case, we can skip several steps until we find a position higher than the offset.
    // Inspired by https://github.com/bvaughn/react-virtualized/blob/master/source/Grid/utils/CellSizeAndPositionManager.js
    return exponentialSearch(offset, inputs.rowsMeta.positions, lastMeasuredIndexRelativeToCurrentPage, options);
}
/**
 * Accepts as input a raw render context (the area visible in the viewport) and adds
 * computes the actual render context based on pinned elements, buffer dimensions and
 * spanning.
 */ function deriveRenderContext(inputs, nextRenderContext, scrollCache) {
    var _inputs_pinnedColumns, _inputs_pinnedColumns1;
    const [firstRowToRender, lastRowToRender] = getIndexesToRender({
        firstIndex: nextRenderContext.firstRowIndex,
        lastIndex: nextRenderContext.lastRowIndex,
        minFirstIndex: 0,
        maxLastIndex: inputs.rows.length,
        bufferBefore: scrollCache.buffer.rowBefore,
        bufferAfter: scrollCache.buffer.rowAfter,
        positions: inputs.rowsMeta.positions,
        lastSize: inputs.lastRowHeight
    });
    var _inputs_pinnedColumns_left_length, _inputs_pinnedColumns_right_length;
    const [initialFirstColumnToRender, lastColumnToRender] = getIndexesToRender({
        firstIndex: nextRenderContext.firstColumnIndex,
        lastIndex: nextRenderContext.lastColumnIndex,
        minFirstIndex: (_inputs_pinnedColumns_left_length = (_inputs_pinnedColumns = inputs.pinnedColumns) === null || _inputs_pinnedColumns === void 0 ? void 0 : _inputs_pinnedColumns.left.length) !== null && _inputs_pinnedColumns_left_length !== void 0 ? _inputs_pinnedColumns_left_length : 0,
        maxLastIndex: inputs.columns.length - ((_inputs_pinnedColumns_right_length = (_inputs_pinnedColumns1 = inputs.pinnedColumns) === null || _inputs_pinnedColumns1 === void 0 ? void 0 : _inputs_pinnedColumns1.right.length) !== null && _inputs_pinnedColumns_right_length !== void 0 ? _inputs_pinnedColumns_right_length : 0),
        bufferBefore: scrollCache.buffer.columnBefore,
        bufferAfter: scrollCache.buffer.columnAfter,
        positions: inputs.columnPositions,
        lastSize: inputs.lastColumnWidth
    });
    const firstColumnToRender = getFirstNonSpannedColumnToRender({
        api: inputs.api,
        firstColumnToRender: initialFirstColumnToRender,
        firstRowToRender,
        lastRowToRender,
        visibleRows: inputs.rows
    });
    return {
        firstRowIndex: firstRowToRender,
        lastRowIndex: lastRowToRender,
        firstColumnIndex: firstColumnToRender,
        lastColumnIndex: lastColumnToRender
    };
}
/**
 * Use binary search to avoid looping through all possible positions.
 * The `options.atStart` provides the possibility to match for the first element that
 * intersects the screen, even if said element's start position is before `offset`. In
 * other words, we search for `offset + width`.
 */ function binarySearch(offset, positions) {
    let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : undefined, sliceStart = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, sliceEnd = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : positions.length;
    if (positions.length <= 0) {
        return -1;
    }
    if (sliceStart >= sliceEnd) {
        return sliceStart;
    }
    const pivot = sliceStart + Math.floor((sliceEnd - sliceStart) / 2);
    const position = positions[pivot];
    let isBefore;
    if (options === null || options === void 0 ? void 0 : options.atStart) {
        const width = (pivot === positions.length - 1 ? options.lastPosition : positions[pivot + 1]) - position;
        isBefore = offset - width < position;
    } else {
        isBefore = offset <= position;
    }
    return isBefore ? binarySearch(offset, positions, options, sliceStart, pivot) : binarySearch(offset, positions, options, pivot + 1, sliceEnd);
}
function exponentialSearch(offset, positions, index) {
    let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : undefined;
    let interval = 1;
    while(index < positions.length && Math.abs(positions[index]) < offset){
        index += interval;
        interval *= 2;
    }
    return binarySearch(offset, positions, options, Math.floor(index / 2), Math.min(index, positions.length));
}
function getIndexesToRender(param) {
    let { firstIndex, lastIndex, bufferBefore, bufferAfter, minFirstIndex, maxLastIndex, positions, lastSize } = param;
    const firstPosition = positions[firstIndex] - bufferBefore;
    const lastPosition = positions[lastIndex] + bufferAfter;
    const firstIndexPadded = binarySearch(firstPosition, positions, {
        atStart: true,
        lastPosition: positions[positions.length - 1] + lastSize
    });
    const lastIndexPadded = binarySearch(lastPosition, positions);
    return [
        clamp(firstIndexPadded, minFirstIndex, maxLastIndex),
        clamp(lastIndexPadded, minFirstIndex, maxLastIndex)
    ];
}
function areRenderContextsEqual(context1, context2) {
    if (context1 === context2) {
        return true;
    }
    return context1.firstRowIndex === context2.firstRowIndex && context1.lastRowIndex === context2.lastRowIndex && context1.firstColumnIndex === context2.firstColumnIndex && context1.lastColumnIndex === context2.lastColumnIndex;
}
function computeOffsetLeft(columnPositions, renderContext, pinnedLeftLength) {
    var _columnPositions_renderContext_firstColumnIndex, _columnPositions_pinnedLeftLength;
    const left = ((_columnPositions_renderContext_firstColumnIndex = columnPositions[renderContext.firstColumnIndex]) !== null && _columnPositions_renderContext_firstColumnIndex !== void 0 ? _columnPositions_renderContext_firstColumnIndex : 0) - ((_columnPositions_pinnedLeftLength = columnPositions[pinnedLeftLength]) !== null && _columnPositions_pinnedLeftLength !== void 0 ? _columnPositions_pinnedLeftLength : 0);
    return Math.abs(left);
}
function bufferForDirection(isRtl, direction, rowBufferPx, columnBufferPx, verticalBuffer, horizontalBuffer) {
    if (isRtl) {
        switch(direction){
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].LEFT:
                direction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].RIGHT;
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].RIGHT:
                direction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].LEFT;
                break;
            default:
        }
    }
    switch(direction){
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].NONE:
            return {
                rowAfter: rowBufferPx,
                rowBefore: rowBufferPx,
                columnAfter: columnBufferPx,
                columnBefore: columnBufferPx
            };
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].LEFT:
            return {
                rowAfter: 0,
                rowBefore: 0,
                columnAfter: 0,
                columnBefore: horizontalBuffer
            };
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].RIGHT:
            return {
                rowAfter: 0,
                rowBefore: 0,
                columnAfter: horizontalBuffer,
                columnBefore: 0
            };
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].UP:
            return {
                rowAfter: 0,
                rowBefore: verticalBuffer,
                columnAfter: 0,
                columnBefore: 0
            };
        case __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].DOWN:
            return {
                rowAfter: verticalBuffer,
                rowBefore: 0,
                columnAfter: 0,
                columnBefore: 0
            };
        default:
            // eslint unable to figure out enum exhaustiveness
            throw new Error('unreachable');
    }
}
function createScrollCache(isRtl, rowBufferPx, columnBufferPx, verticalBuffer, horizontalBuffer) {
    return {
        direction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].NONE,
        buffer: bufferForDirection(isRtl, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$models$2f$core$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDirection"].NONE, rowBufferPx, columnBufferPx, verticalBuffer, horizontalBuffer)
    };
}
function createRange(from, to) {
    return Array.from({
        length: to - from
    }).map((_, i)=>from + i);
}
function getFirstNonSpannedColumnToRender(param) {
    let { api, firstColumnToRender, firstRowToRender, lastRowToRender, visibleRows } = param;
    let firstNonSpannedColumnToRender = firstColumnToRender;
    let foundStableColumn = false;
    // Keep checking columns until we find one that's not spanned in any visible row
    while(!foundStableColumn && firstNonSpannedColumnToRender >= 0){
        foundStableColumn = true;
        for(let i = firstRowToRender; i < lastRowToRender; i += 1){
            const row = visibleRows[i];
            if (row) {
                const rowId = visibleRows[i].id;
                const cellColSpanInfo = api.getCellColSpanInfo(rowId, firstNonSpannedColumnToRender);
                if (cellColSpanInfo && cellColSpanInfo.spannedByColSpan && cellColSpanInfo.leftVisibleCellIndex < firstNonSpannedColumnToRender) {
                    firstNonSpannedColumnToRender = cellColSpanInfo.leftVisibleCellIndex;
                    foundStableColumn = false;
                    break; // Check the new column index against the visible rows, because it might be spanned
                }
            }
        }
    }
    return firstNonSpannedColumnToRender;
}
/** Placeholder API functions for colspan & rowspan to re-implement */ function createSpanningAPI() {
    const getCellColSpanInfo = ()=>{
        throw new Error('Unimplemented: colspan feature is required');
    };
    const calculateColSpan = ()=>{
        throw new Error('Unimplemented: colspan feature is required');
    };
    const getHiddenCellsOrigin = ()=>{
        throw new Error('Unimplemented: rowspan feature is required');
    };
    return {
        getCellColSpanInfo,
        calculateColSpan,
        getHiddenCellsOrigin
    };
}
function roundToDecimalPlaces(value, decimals) {
    return Math.round(value * 10 ** decimals) / 10 ** decimals;
}
}),
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/keyboard.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Keyboard",
    ()=>Keyboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/dimensions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/virtualization/virtualization.mjs [app-client] (ecmascript)");
;
;
/* eslint-disable import/export, @typescript-eslint/no-redeclare */ const selectors = {};
const Keyboard = {
    initialize: initializeState,
    use: useKeyboard,
    selectors
};
function initializeState(_params) {
    return {};
}
function useKeyboard(store, params, _api) {
    const getViewportPageSize = ()=>{
        const dimensions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.dimensions(store.state);
        if (!dimensions.isReady) {
            return 0;
        }
        // TODO: Use a combination of scrollTop, dimensions.viewportInnerSize.height and rowsMeta.possitions
        // to find out the maximum number of rows that can fit in the visible part of the grid
        if (params.getRowHeight) {
            const renderContext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.renderContext(store.state);
            const viewportPageSize = renderContext.lastRowIndex - renderContext.firstRowIndex;
            return Math.min(viewportPageSize - 1, params.rows.length);
        }
        const maximumPageSizeWithoutScrollBar = Math.floor(dimensions.viewportInnerSize.height / dimensions.rowHeight);
        return Math.min(maximumPageSizeWithoutScrollBar, params.rows.length);
    };
    return {
        getViewportPageSize
    };
}
}),
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/rowspan.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable import/export, @typescript-eslint/no-redeclare */ __turbopack_context__.s([
    "Rowspan",
    ()=>Rowspan
]);
const EMPTY_RANGE = {
    firstRowIndex: 0,
    lastRowIndex: 0
};
const EMPTY_CACHES = {
    spannedCells: {},
    hiddenCells: {},
    hiddenCellOriginMap: {}
};
const selectors = {
    state: (state)=>state.rowSpanning,
    hiddenCells: (state)=>state.rowSpanning.caches.hiddenCells,
    spannedCells: (state)=>state.rowSpanning.caches.spannedCells,
    hiddenCellsOriginMap: (state)=>state.rowSpanning.caches.hiddenCellOriginMap
};
const Rowspan = {
    initialize: initializeState,
    use: useRowspan,
    selectors
};
function initializeState(params) {
    var _params_initialState;
    var _params_initialState_rowSpanning;
    return {
        rowSpanning: (_params_initialState_rowSpanning = (_params_initialState = params.initialState) === null || _params_initialState === void 0 ? void 0 : _params_initialState.rowSpanning) !== null && _params_initialState_rowSpanning !== void 0 ? _params_initialState_rowSpanning : {
            caches: EMPTY_CACHES,
            processedRange: EMPTY_RANGE
        }
    };
}
function useRowspan(store, _params, _api) {
    const getHiddenCellsOrigin = ()=>selectors.hiddenCellsOriginMap(store.state);
    return {
        getHiddenCellsOrigin
    };
}
}),
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_COLUMNS",
    ()=>DEFAULT_COLUMNS,
    "DEFAULT_PARAMS",
    ()=>DEFAULT_PARAMS
]);
const DEFAULT_COLUMNS = [
    {
        field: 'DEFAULT_COLUMN'
    }
];
const DEFAULT_PARAMS = {
    resizeThrottleMs: 100,
    columns: DEFAULT_COLUMNS,
    dimensions: {
        autoHeight: false,
        columnsTotalWidth: 0,
        leftPinnedWidth: 0,
        rightPinnedWidth: 0,
        topPinnedHeight: 0,
        bottomPinnedHeight: 0
    },
    virtualization: {
        isRtl: false,
        rowBufferPx: 150,
        columnBufferPx: 150
    }
};
}),
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/useVirtualizer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVirtualizer",
    ()=>useVirtualizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useLazyRef$2f$useLazyRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$Store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/store/Store.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$colspan$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/colspan.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/dimensions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$keyboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/keyboard.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$rowspan$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/rowspan.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/virtualization/virtualization.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/constants.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
/* eslint-disable jsdoc/require-param-type */ /* eslint-disable jsdoc/require-param-description */ /* eslint-disable jsdoc/require-returns-type */ const FEATURES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$colspan$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Colspan"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$rowspan$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rowspan"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$keyboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Keyboard"]
];
const useVirtualizer = (params)=>{
    const paramsWithDefault = mergeDefaults(params, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PARAMS"]);
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useLazyRef$2f$useLazyRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "useVirtualizer.useLazyRef": ()=>{
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$Store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"](FEATURES.map({
                "useVirtualizer.useLazyRef": (f)=>f.initialize(paramsWithDefault)
            }["useVirtualizer.useLazyRef"]).reduce({
                "useVirtualizer.useLazyRef": (state, partial)=>Object.assign(state, partial)
            }["useVirtualizer.useLazyRef"], {}));
        }
    }["useVirtualizer.useLazyRef"]).current;
    const api = {};
    for (const feature of FEATURES){
        Object.assign(api, feature.use(store, paramsWithDefault, api));
    }
    return {
        store,
        api
    };
};
function mergeDefaults(params, defaults) {
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$babel$2b$runtime$40$7$2e$29$2e$7$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({}, params);
    for(const key in defaults){
        if (Object.hasOwn(defaults, key)) {
            const value = defaults[key];
            if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                var _params_key;
                result[key] = mergeDefaults((_params_key = params[key]) !== null && _params_key !== void 0 ? _params_key : {}, value);
            } else {
                var _params_key1;
                result[key] = (_params_key1 = params[key]) !== null && _params_key1 !== void 0 ? _params_key1 : value;
            }
        }
    }
    return result;
}
}),
"[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/virtualization/layout.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Layout",
    ()=>Layout,
    "LayoutDataGrid",
    ()=>LayoutDataGrid,
    "LayoutDataGridLegacy",
    ()=>LayoutDataGridLegacy,
    "LayoutList",
    ()=>LayoutList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useForkRef$2f$useForkRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useForkRef/useForkRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+utils@7.3.11_@types+react@19.2.17_react@19.2.7/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/platform/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-internals@8.29.0_@types+react@19.2.17_react@19.2.7/node_modules/@mui/x-internals/store/createSelector.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/dimensions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+x-virtualizer@0.4.0_@t_26666697697608b068c57fc8984ebdd5/node_modules/@mui/x-virtualizer/features/virtualization/virtualization.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
class Layout {
    refSetter(name) {
        return (node)=>{
            if (node && this.refs[name].current !== node) {
                this.refs[name].current = node;
            }
        };
    }
    constructor(refs){
        this.refs = refs;
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Layout, "elements", [
    'scroller',
    'container'
]);
class LayoutDataGrid extends Layout {
    use(store, _params, _api, layoutParams) {
        const { scrollerRef, containerRef } = layoutParams;
        const scrollbarVerticalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(this.refSetter('scrollbarVertical'));
        const scrollbarHorizontalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(this.refSetter('scrollbarHorizontal'));
        store.state.virtualization.context = {
            scrollerRef,
            containerRef,
            scrollbarVerticalRef,
            scrollbarHorizontalRef
        };
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(LayoutDataGrid, "elements", (()=>[
        'scroller',
        'container',
        'content',
        'positioner',
        'scrollbarVertical',
        'scrollbarHorizontal'
    ])());
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(LayoutDataGrid, "selectors", (()=>({
        containerProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.context, (context)=>({
                ref: context.containerRef
            })),
        scrollerProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.context, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.autoHeight, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.needsHorizontalScrollbar, (context, autoHeight, needsHorizontalScrollbar)=>({
                ref: context.scrollerRef,
                style: {
                    overflowX: !needsHorizontalScrollbar ? 'hidden' : undefined,
                    overflowY: autoHeight ? 'hidden' : undefined
                },
                role: 'presentation',
                // `tabIndex` shouldn't be used along role=presentation, but it fixes a Firefox bug
                // https://github.com/mui/mui-x/pull/13891#discussion_r1683416024
                tabIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirefox"] ? -1 : undefined
            })),
        contentProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.contentHeight, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.minimalContentHeight, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.columnsTotalWidth, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.needsHorizontalScrollbar, (contentHeight, minimalContentHeight, columnsTotalWidth, needsHorizontalScrollbar)=>({
                style: {
                    width: needsHorizontalScrollbar ? columnsTotalWidth : 'auto',
                    flexBasis: contentHeight === 0 ? minimalContentHeight : contentHeight,
                    flexShrink: 0
                },
                role: 'presentation'
            })),
        positionerProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.offsetTop, (offsetTop)=>({
                style: {
                    transform: "translate3d(0, ".concat(offsetTop, "px, 0)")
                }
            })),
        scrollbarHorizontalProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.context, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.scrollPosition, (context, scrollPosition)=>({
                ref: context.scrollbarHorizontalRef,
                scrollPosition
            })),
        scrollbarVerticalProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.context, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.scrollPosition, (context, scrollPosition)=>({
                ref: context.scrollbarVerticalRef,
                scrollPosition
            })),
        scrollAreaProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.scrollPosition, (scrollPosition)=>({
                scrollPosition
            }))
    }))());
class LayoutDataGridLegacy extends LayoutDataGrid {
    use(store, _params, _api, layoutParams) {
        super.use(store, _params, _api, layoutParams);
        const containerProps = store.use(LayoutDataGrid.selectors.containerProps);
        const scrollerProps = store.use(LayoutDataGrid.selectors.scrollerProps);
        const contentProps = store.use(LayoutDataGrid.selectors.contentProps);
        const positionerProps = store.use(LayoutDataGrid.selectors.positionerProps);
        const scrollbarVerticalProps = store.use(LayoutDataGrid.selectors.scrollbarVerticalProps);
        const scrollbarHorizontalProps = store.use(LayoutDataGrid.selectors.scrollbarHorizontalProps);
        const scrollAreaProps = store.use(LayoutDataGrid.selectors.scrollAreaProps);
        return {
            getContainerProps: ()=>containerProps,
            getScrollerProps: ()=>scrollerProps,
            getContentProps: ()=>contentProps,
            getPositionerProps: ()=>positionerProps,
            getScrollbarVerticalProps: ()=>scrollbarVerticalProps,
            getScrollbarHorizontalProps: ()=>scrollbarHorizontalProps,
            getScrollAreaProps: ()=>scrollAreaProps
        };
    }
}
class LayoutList extends Layout {
    use(store, _params, _api, layoutParams) {
        const { scrollerRef, containerRef } = layoutParams;
        const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$utils$40$7$2e$3$2e$11_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useForkRef$2f$useForkRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(scrollerRef, containerRef);
        store.state.virtualization.context = {
            mergedRef
        };
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(LayoutList, "elements", (()=>[
        'scroller',
        'container',
        'content',
        'positioner'
    ])());
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$swc$2b$helpers$40$0$2e$5$2e$15$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(LayoutList, "selectors", (()=>({
        containerProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.context, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.autoHeight, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.needsHorizontalScrollbar, (context, autoHeight, needsHorizontalScrollbar)=>({
                ref: context.mergedRef,
                style: {
                    overflowX: !needsHorizontalScrollbar ? 'hidden' : undefined,
                    overflowY: autoHeight ? 'hidden' : undefined,
                    position: 'relative'
                },
                role: 'presentation',
                // `tabIndex` shouldn't be used along role=presentation, but it fixes a Firefox bug
                // https://github.com/mui/mui-x/pull/13891#discussion_r1683416024
                tabIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirefox"] ? -1 : undefined
            })),
        contentProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dimensions"].selectors.contentHeight, (contentHeight)=>{
            return {
                style: {
                    position: 'absolute',
                    display: 'inline-block',
                    width: '100%',
                    height: contentHeight,
                    top: 0,
                    left: 0,
                    zIndex: -1
                },
                role: 'presentation'
            };
        }),
        positionerProps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$internals$40$8$2e$29$2e$0_$40$types$2b$react$40$19$2e$2$2e$17_react$40$19$2e$2$2e$7$2f$node_modules$2f40$mui$2f$x$2d$internals$2f$store$2f$createSelector$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSelectorMemoized"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$x$2d$virtualizer$40$0$2e$4$2e$0_$40$t_26666697697608b068c57fc8984ebdd5$2f$node_modules$2f40$mui$2f$x$2d$virtualizer$2f$features$2f$virtualization$2f$virtualization$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Virtualization"].selectors.offsetTop, (offsetTop)=>({
                style: {
                    height: offsetTop
                }
            }))
    }))());
}),
]);

//# sourceMappingURL=ba26c_%40mui_x-virtualizer_ded7d766._.js.map