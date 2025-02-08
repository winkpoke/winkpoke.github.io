let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_3.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}
function __wbg_adapter_34(arg0, arg1, arg2) {
    wasm.closure150_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_41(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he68435b04de92038(arg0, arg1);
}

function __wbg_adapter_46(arg0, arg1, arg2, arg3) {
    wasm.closure155_externref_shim(arg0, arg1, arg2, arg3);
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}
function __wbg_adapter_51(arg0, arg1, arg2) {
    const ret = wasm.closure158_externref_shim_multivalue_shim(arg0, arg1, arg2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

function __wbg_adapter_54(arg0, arg1, arg2) {
    wasm.closure1371_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_59(arg0, arg1, arg2) {
    wasm.closure3141_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_62(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0a6741edb9490d63(arg0, arg1);
}

function __wbg_adapter_75(arg0, arg1, arg2) {
    wasm.closure3223_externref_shim(arg0, arg1, arg2);
}

/**
 * @param {Array<any>} files
 * @returns {Promise<DicomRepo>}
 */
export function parse_dcm_files_wasm(files) {
    const ret = wasm.parse_dcm_files_wasm(files);
    return ret;
}

/**
 * @returns {Promise<void>}
 */
export function init() {
    wasm.init();
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
 * @param {CTVolume} vol
 * @returns {Promise<void>}
 */
export function run(vol) {
    _assertClass(vol, CTVolume);
    const ret = wasm.run(vol.__wbg_ptr);
    return ret;
}

/**
 * @param {string} image_series_number
 */
export function load_data_from_repo_wasm(image_series_number) {
    const ptr0 = passStringToWasm0(image_series_number, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.load_data_from_repo_wasm(ptr0, len0);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}
function __wbg_adapter_1164(arg0, arg1, arg2, arg3) {
    wasm.closure3245_externref_shim(arg0, arg1, arg2, arg3);
}

const __wbindgen_enum_GpuAddressMode = ["clamp-to-edge", "repeat", "mirror-repeat"];

const __wbindgen_enum_GpuAutoLayoutMode = ["auto"];

const __wbindgen_enum_GpuBlendFactor = ["zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant"];

const __wbindgen_enum_GpuBlendOperation = ["add", "subtract", "reverse-subtract", "min", "max"];

const __wbindgen_enum_GpuBufferBindingType = ["uniform", "storage", "read-only-storage"];

const __wbindgen_enum_GpuBufferMapState = ["unmapped", "pending", "mapped"];

const __wbindgen_enum_GpuCanvasAlphaMode = ["opaque", "premultiplied"];

const __wbindgen_enum_GpuCompareFunction = ["never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"];

const __wbindgen_enum_GpuCompilationMessageType = ["error", "warning", "info"];

const __wbindgen_enum_GpuCullMode = ["none", "front", "back"];

const __wbindgen_enum_GpuDeviceLostReason = ["unknown", "destroyed"];

const __wbindgen_enum_GpuErrorFilter = ["validation", "out-of-memory", "internal"];

const __wbindgen_enum_GpuFeatureName = ["depth-clip-control", "depth32float-stencil8", "texture-compression-bc", "texture-compression-bc-sliced-3d", "texture-compression-etc2", "texture-compression-astc", "timestamp-query", "indirect-first-instance", "shader-f16", "rg11b10ufloat-renderable", "bgra8unorm-storage", "float32-filterable"];

const __wbindgen_enum_GpuFilterMode = ["nearest", "linear"];

const __wbindgen_enum_GpuFrontFace = ["ccw", "cw"];

const __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"];

const __wbindgen_enum_GpuLoadOp = ["load", "clear"];

const __wbindgen_enum_GpuMipmapFilterMode = ["nearest", "linear"];

const __wbindgen_enum_GpuPowerPreference = ["low-power", "high-performance"];

const __wbindgen_enum_GpuPrimitiveTopology = ["point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"];

const __wbindgen_enum_GpuQueryType = ["occlusion", "timestamp"];

const __wbindgen_enum_GpuSamplerBindingType = ["filtering", "non-filtering", "comparison"];

const __wbindgen_enum_GpuStencilOperation = ["keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"];

const __wbindgen_enum_GpuStorageTextureAccess = ["write-only", "read-only", "read-write"];

const __wbindgen_enum_GpuStoreOp = ["store", "discard"];

const __wbindgen_enum_GpuTextureAspect = ["all", "stencil-only", "depth-only"];

const __wbindgen_enum_GpuTextureDimension = ["1d", "2d", "3d"];

const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];

const __wbindgen_enum_GpuTextureSampleType = ["float", "unfilterable-float", "depth", "sint", "uint"];

const __wbindgen_enum_GpuTextureViewDimension = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"];

const __wbindgen_enum_GpuVertexFormat = ["uint8x2", "uint8x4", "sint8x2", "sint8x4", "unorm8x2", "unorm8x4", "snorm8x2", "snorm8x4", "uint16x2", "uint16x4", "sint16x2", "sint16x4", "unorm16x2", "unorm16x4", "snorm16x2", "snorm16x4", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2"];

const __wbindgen_enum_GpuVertexStepMode = ["vertex", "instance"];

const __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"];

const __wbindgen_enum_VisibilityState = ["hidden", "visible"];

const CTVolumeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ctvolume_free(ptr >>> 0, 1));

export class CTVolume {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CTVolume.prototype);
        obj.__wbg_ptr = ptr;
        CTVolumeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CTVolumeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ctvolume_free(ptr, 0);
    }
}

const DicomRepoFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_dicomrepo_free(ptr >>> 0, 1));

export class DicomRepo {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DicomRepo.prototype);
        obj.__wbg_ptr = ptr;
        DicomRepoFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DicomRepoFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dicomrepo_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get_all_patients() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.dicomrepo_get_all_patients(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {string} patient_id
     * @returns {string}
     */
    get_patient(patient_id) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(patient_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.dicomrepo_get_patient(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} patient_id
     * @returns {string}
     */
    get_studies_by_patient(patient_id) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(patient_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.dicomrepo_get_studies_by_patient(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} study_id
     * @returns {string}
     */
    get_series_by_study(study_id) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(study_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.dicomrepo_get_series_by_study(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} series_id
     * @returns {string}
     */
    get_images_by_series(series_id) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(series_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.dicomrepo_get_images_by_series(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} image_series_id
     * @returns {CTVolume}
     */
    generate_ct_volume(image_series_id) {
        const ptr0 = passStringToWasm0(image_series_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dicomrepo_generate_ct_volume(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return CTVolume.__wrap(ret[0]);
    }
}

export function __wbg_dicomrepo_new(arg0) {
    const ret = DicomRepo.__wrap(arg0);
    return ret;
};

export function __wbindgen_cb_drop(arg0) {
    const obj = arg0.original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

export function __wbindgen_is_undefined(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

export function __wbg_new_abda76e883ba8a5f() {
    const ret = new Error();
    return ret;
};

export function __wbg_stack_658279fe44541cf6(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_error_f851667af71bcfc6(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbg_instanceof_GpuValidationError_604476220bf156bf(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUValidationError;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_getMappedRange_04117a51eede193a(arg0, arg1, arg2) {
    const ret = arg0.getMappedRange(arg1, arg2);
    return ret;
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_instanceof_GpuDeviceLostInfo_4bf3217f5c8749c1(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUDeviceLostInfo;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_error_249c0dd963d4ab5a(arg0) {
    const ret = arg0.error;
    return ret;
};

export function __wbg_reason_2b378223c49cada7(arg0) {
    const ret = arg0.reason;
    return (__wbindgen_enum_GpuDeviceLostReason.indexOf(ret) + 1 || 3) - 1;
};

export function __wbg_message_d5db362f81086f2a(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_has_b82813ba456e1005(arg0, arg1, arg2) {
    const ret = arg0.has(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_maxTextureDimension1D_cff730f1156f8b8d(arg0) {
    const ret = arg0.maxTextureDimension1D;
    return ret;
};

export function __wbg_maxTextureDimension2D_4dbe7b408dd0a444(arg0) {
    const ret = arg0.maxTextureDimension2D;
    return ret;
};

export function __wbg_maxTextureDimension3D_59c8c8c6207a0b4b(arg0) {
    const ret = arg0.maxTextureDimension3D;
    return ret;
};

export function __wbg_maxTextureArrayLayers_fa9ba508259ccd59(arg0) {
    const ret = arg0.maxTextureArrayLayers;
    return ret;
};

export function __wbg_maxBindGroups_b15e24b803f4cea6(arg0) {
    const ret = arg0.maxBindGroups;
    return ret;
};

export function __wbg_maxBindingsPerBindGroup_411ff71115b92d72(arg0) {
    const ret = arg0.maxBindingsPerBindGroup;
    return ret;
};

export function __wbg_maxDynamicUniformBuffersPerPipelineLayout_0d8e6734243cff4d(arg0) {
    const ret = arg0.maxDynamicUniformBuffersPerPipelineLayout;
    return ret;
};

export function __wbg_maxDynamicStorageBuffersPerPipelineLayout_2cbcd7043d5f0302(arg0) {
    const ret = arg0.maxDynamicStorageBuffersPerPipelineLayout;
    return ret;
};

export function __wbg_maxSampledTexturesPerShaderStage_2901e9784df18f11(arg0) {
    const ret = arg0.maxSampledTexturesPerShaderStage;
    return ret;
};

export function __wbg_maxSamplersPerShaderStage_2ea2ce19a3ec30ab(arg0) {
    const ret = arg0.maxSamplersPerShaderStage;
    return ret;
};

export function __wbg_maxStorageBuffersPerShaderStage_e1562a3ba8475a6f(arg0) {
    const ret = arg0.maxStorageBuffersPerShaderStage;
    return ret;
};

export function __wbg_maxStorageTexturesPerShaderStage_7c92ccfb6c7651f0(arg0) {
    const ret = arg0.maxStorageTexturesPerShaderStage;
    return ret;
};

export function __wbg_maxUniformBuffersPerShaderStage_d0e977c99697c719(arg0) {
    const ret = arg0.maxUniformBuffersPerShaderStage;
    return ret;
};

export function __wbg_maxUniformBufferBindingSize_f320b256bdc2ee62(arg0) {
    const ret = arg0.maxUniformBufferBindingSize;
    return ret;
};

export function __wbg_maxStorageBufferBindingSize_35c990aec65c425c(arg0) {
    const ret = arg0.maxStorageBufferBindingSize;
    return ret;
};

export function __wbg_maxVertexBuffers_c954675929978303(arg0) {
    const ret = arg0.maxVertexBuffers;
    return ret;
};

export function __wbg_maxBufferSize_518d33b35341e35b(arg0) {
    const ret = arg0.maxBufferSize;
    return ret;
};

export function __wbg_maxVertexAttributes_adfbeb8779db1db2(arg0) {
    const ret = arg0.maxVertexAttributes;
    return ret;
};

export function __wbg_maxVertexBufferArrayStride_1779893144a387a3(arg0) {
    const ret = arg0.maxVertexBufferArrayStride;
    return ret;
};

export function __wbg_minUniformBufferOffsetAlignment_16185da6fd170fa5(arg0) {
    const ret = arg0.minUniformBufferOffsetAlignment;
    return ret;
};

export function __wbg_minStorageBufferOffsetAlignment_f62e51aecab8fe49(arg0) {
    const ret = arg0.minStorageBufferOffsetAlignment;
    return ret;
};

export function __wbg_maxColorAttachments_4fc3994ebcf6322d(arg0) {
    const ret = arg0.maxColorAttachments;
    return ret;
};

export function __wbg_maxColorAttachmentBytesPerSample_9efa1be1790ac1e8(arg0) {
    const ret = arg0.maxColorAttachmentBytesPerSample;
    return ret;
};

export function __wbg_maxComputeWorkgroupStorageSize_0398c195215a9078(arg0) {
    const ret = arg0.maxComputeWorkgroupStorageSize;
    return ret;
};

export function __wbg_maxComputeInvocationsPerWorkgroup_39ca5176db5c4bdc(arg0) {
    const ret = arg0.maxComputeInvocationsPerWorkgroup;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeX_d06475da47473ecb(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeX;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeY_6f4fb4118dfb3d9a(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeY;
    return ret;
};

export function __wbg_maxComputeWorkgroupSizeZ_68a6936a17b9f73a(arg0) {
    const ret = arg0.maxComputeWorkgroupSizeZ;
    return ret;
};

export function __wbg_maxComputeWorkgroupsPerDimension_4afe3222590de7a8(arg0) {
    const ret = arg0.maxComputeWorkgroupsPerDimension;
    return ret;
};

export function __wbg_instanceof_GpuAdapter_fd8970d6d418670f(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUAdapter;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_queue_566a92286df72fc7(arg0) {
    const ret = arg0.queue;
    return ret;
};

export function __wbindgen_is_object(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbg_instanceof_GpuCanvasContext_a399ff9faaa6397a(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUCanvasContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_Window_1312ff59e6ccd128(arg0) {
    const ret = arg0.Window;
    return ret;
};

export function __wbg_WorkerGlobalScope_9a7aa30908f786bb(arg0) {
    const ret = arg0.WorkerGlobalScope;
    return ret;
};

export function __wbg_gpu_561fab773c9ab16a(arg0) {
    const ret = arg0.gpu;
    return ret;
};

export function __wbindgen_is_null(arg0) {
    const ret = arg0 === null;
    return ret;
};

export function __wbg_requestAdapter_1bdad63a1ddc272e(arg0, arg1) {
    const ret = arg0.requestAdapter(arg1);
    return ret;
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return ret;
};

export function __wbg_requestDevice_9c3b0738a9a0ed3b(arg0, arg1) {
    const ret = arg0.requestDevice(arg1);
    return ret;
};

export function __wbg_features_ae1b48c3b0fbfb6e(arg0) {
    const ret = arg0.features;
    return ret;
};

export function __wbg_limits_a7a01a71cf71d244(arg0) {
    const ret = arg0.limits;
    return ret;
};

export function __wbg_getPreferredCanvasFormat_09fe7d54a984601c(arg0) {
    const ret = arg0.getPreferredCanvasFormat();
    return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
};

export function __wbg_configure_688ecf639ae331d8(arg0, arg1) {
    arg0.configure(arg1);
};

export function __wbg_getCurrentTexture_a70ac1f9cbea2e92(arg0) {
    const ret = arg0.getCurrentTexture();
    return ret;
};

export function __wbg_features_d22adc18065dea35(arg0) {
    const ret = arg0.features;
    return ret;
};

export function __wbg_limits_4e247bf67fe50f41(arg0) {
    const ret = arg0.limits;
    return ret;
};

export function __wbg_createShaderModule_1890957151f6c1fe(arg0, arg1) {
    const ret = arg0.createShaderModule(arg1);
    return ret;
};

export function __wbg_createBindGroupLayout_6e1e24775fcd1a51(arg0, arg1) {
    const ret = arg0.createBindGroupLayout(arg1);
    return ret;
};

export function __wbg_createBindGroup_e557393083e79e91(arg0, arg1) {
    const ret = arg0.createBindGroup(arg1);
    return ret;
};

export function __wbg_createPipelineLayout_94d063e8b7b2bfaf(arg0, arg1) {
    const ret = arg0.createPipelineLayout(arg1);
    return ret;
};

export function __wbg_createRenderPipeline_14d55317ecb25e97(arg0, arg1) {
    const ret = arg0.createRenderPipeline(arg1);
    return ret;
};

export function __wbg_createComputePipeline_2dbc51d14a6d4272(arg0, arg1) {
    const ret = arg0.createComputePipeline(arg1);
    return ret;
};

export function __wbg_createBuffer_9752e1eb669e28af(arg0, arg1) {
    const ret = arg0.createBuffer(arg1);
    return ret;
};

export function __wbg_createTexture_db230c96d9844dcb(arg0, arg1) {
    const ret = arg0.createTexture(arg1);
    return ret;
};

export function __wbg_createSampler_b72db822d4097205(arg0, arg1) {
    const ret = arg0.createSampler(arg1);
    return ret;
};

export function __wbg_createQuerySet_224498857904784d(arg0, arg1) {
    const ret = arg0.createQuerySet(arg1);
    return ret;
};

export function __wbg_createCommandEncoder_977db110ff3f00f8(arg0, arg1) {
    const ret = arg0.createCommandEncoder(arg1);
    return ret;
};

export function __wbg_createRenderBundleEncoder_b84f34d05c88ade0(arg0, arg1) {
    const ret = arg0.createRenderBundleEncoder(arg1);
    return ret;
};

export function __wbg_destroy_913d63aafddf45b9(arg0) {
    arg0.destroy();
};

export function __wbg_lost_0223ee817fa37e9e(arg0) {
    const ret = arg0.lost;
    return ret;
};

export function __wbg_setonuncapturederror_24c814e18e05078d(arg0, arg1) {
    arg0.onuncapturederror = arg1;
};

export function __wbg_pushErrorScope_ca660ea180276786(arg0, arg1) {
    arg0.pushErrorScope(__wbindgen_enum_GpuErrorFilter[arg1]);
};

export function __wbg_popErrorScope_fb90f57837d9cfd5(arg0) {
    const ret = arg0.popErrorScope();
    return ret;
};

export function __wbg_mapAsync_274844cc369e68c6(arg0, arg1, arg2, arg3) {
    const ret = arg0.mapAsync(arg1 >>> 0, arg2, arg3);
    return ret;
};

export function __wbg_unmap_6988792c2c7a4a71(arg0) {
    arg0.unmap();
};

export function __wbg_getCompilationInfo_d0c9466b62316191(arg0) {
    const ret = arg0.getCompilationInfo();
    return ret;
};

export function __wbg_messages_6651d3cea9d927ff(arg0) {
    const ret = arg0.messages;
    return ret;
};

export function __wbg_createView_1a6b4f88ca831cd4(arg0, arg1) {
    const ret = arg0.createView(arg1);
    return ret;
};

export function __wbg_destroy_2474e53d29b064b4(arg0) {
    arg0.destroy();
};

export function __wbg_destroy_4ec61a7e88e53f71(arg0) {
    arg0.destroy();
};

export function __wbg_getBindGroupLayout_4aff302f5a2246d4(arg0, arg1) {
    const ret = arg0.getBindGroupLayout(arg1 >>> 0);
    return ret;
};

export function __wbg_getBindGroupLayout_91242c8afde3c326(arg0, arg1) {
    const ret = arg0.getBindGroupLayout(arg1 >>> 0);
    return ret;
};

export function __wbg_copyBufferToBuffer_8f7b1729aeb8a936(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_copyBufferToTexture_0de6fee3a12e0663(arg0, arg1, arg2, arg3) {
    arg0.copyBufferToTexture(arg1, arg2, arg3);
};

export function __wbg_copyTextureToBuffer_122e08d885cff9c0(arg0, arg1, arg2, arg3) {
    arg0.copyTextureToBuffer(arg1, arg2, arg3);
};

export function __wbg_copyTextureToTexture_00edc17eeb2f42c3(arg0, arg1, arg2, arg3) {
    arg0.copyTextureToTexture(arg1, arg2, arg3);
};

export function __wbg_beginComputePass_6caa6dfa0b3b9d8e(arg0, arg1) {
    const ret = arg0.beginComputePass(arg1);
    return ret;
};

export function __wbg_beginRenderPass_3deabc2eb6903e74(arg0, arg1) {
    const ret = arg0.beginRenderPass(arg1);
    return ret;
};

export function __wbg_label_6114e5e57faee858(arg0, arg1) {
    const ret = arg1.label;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_finish_e2470b4bfee4037c(arg0) {
    const ret = arg0.finish();
    return ret;
};

export function __wbg_finish_f650effb6034653a(arg0, arg1) {
    const ret = arg0.finish(arg1);
    return ret;
};

export function __wbg_clearBuffer_db21589094550562(arg0, arg1, arg2) {
    arg0.clearBuffer(arg1, arg2);
};

export function __wbg_clearBuffer_f1afc328ff5e5fe9(arg0, arg1, arg2, arg3) {
    arg0.clearBuffer(arg1, arg2, arg3);
};

export function __wbg_resolveQuerySet_261c2d9443d0963b(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.resolveQuerySet(arg1, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_finish_d312a2f20a389d29(arg0) {
    const ret = arg0.finish();
    return ret;
};

export function __wbg_finish_dacb1b6036869d23(arg0, arg1) {
    const ret = arg0.finish(arg1);
    return ret;
};

export function __wbg_writeBuffer_819aaf8665e99d3f(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.writeBuffer(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_usage_25f5f4e86282b2d7(arg0) {
    const ret = arg0.usage;
    return ret;
};

export function __wbg_size_4b772c1352ac563a(arg0) {
    const ret = arg0.size;
    return ret;
};

export function __wbg_writeTexture_b7d21e7b86e22229(arg0, arg1, arg2, arg3, arg4) {
    arg0.writeTexture(arg1, arg2, arg3, arg4);
};

export function __wbg_copyExternalImageToTexture_ff6bf98eefeffbc1(arg0, arg1, arg2, arg3) {
    arg0.copyExternalImageToTexture(arg1, arg2, arg3);
};

export function __wbg_setPipeline_ed3b7aeeab6f9865(arg0, arg1) {
    arg0.setPipeline(arg1);
};

export function __wbg_setBindGroup_2103539d88f18f8a(arg0, arg1, arg2) {
    arg0.setBindGroup(arg1 >>> 0, arg2);
};

export function __wbg_setBindGroup_6ece8aa73fba49f2(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_dispatchWorkgroups_80386891c065b1c7(arg0, arg1, arg2, arg3) {
    arg0.dispatchWorkgroups(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_dispatchWorkgroupsIndirect_47a86be0c52ea872(arg0, arg1, arg2) {
    arg0.dispatchWorkgroupsIndirect(arg1, arg2);
};

export function __wbg_end_a44c107680ee0803(arg0) {
    arg0.end();
};

export function __wbg_setPipeline_c3cf9f77691c18c4(arg0, arg1) {
    arg0.setPipeline(arg1);
};

export function __wbg_setBindGroup_c6d1db05350b21c7(arg0, arg1, arg2) {
    arg0.setBindGroup(arg1 >>> 0, arg2);
};

export function __wbg_setBindGroup_ca49e4e100536dbd(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_setIndexBuffer_8412de8faee3d889(arg0, arg1, arg2, arg3) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
};

export function __wbg_setIndexBuffer_820b9021e211d9e8(arg0, arg1, arg2, arg3, arg4) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
};

export function __wbg_setVertexBuffer_b6b1752f6fd0fb40(arg0, arg1, arg2, arg3) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
};

export function __wbg_setVertexBuffer_b165577cf50ed1fb(arg0, arg1, arg2, arg3, arg4) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_draw_661166ccae7dc46b(arg0, arg1, arg2, arg3, arg4) {
    arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_drawIndexed_34bc3ac21751d562(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_drawIndirect_4da53d97b6c3da9e(arg0, arg1, arg2) {
    arg0.drawIndirect(arg1, arg2);
};

export function __wbg_drawIndexedIndirect_1d80f42570d3ba23(arg0, arg1, arg2) {
    arg0.drawIndexedIndirect(arg1, arg2);
};

export function __wbg_setPipeline_30329d52adca2412(arg0, arg1) {
    arg0.setPipeline(arg1);
};

export function __wbg_setBindGroup_419dceb5087046cb(arg0, arg1, arg2) {
    arg0.setBindGroup(arg1 >>> 0, arg2);
};

export function __wbg_setBindGroup_01a308e240cdb1f3(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
};

export function __wbg_setIndexBuffer_db939adb61e306d0(arg0, arg1, arg2, arg3) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
};

export function __wbg_setIndexBuffer_48c7482a533fbefd(arg0, arg1, arg2, arg3, arg4) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
};

export function __wbg_setVertexBuffer_cee27f6ca6323cd8(arg0, arg1, arg2, arg3) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
};

export function __wbg_setVertexBuffer_39e04a758bc699d2(arg0, arg1, arg2, arg3, arg4) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_draw_89680412c833ebbb(arg0, arg1, arg2, arg3, arg4) {
    arg0.draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_drawIndexed_78e7bc147f6bb50b(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_drawIndirect_f990594da590d736(arg0, arg1, arg2) {
    arg0.drawIndirect(arg1, arg2);
};

export function __wbg_drawIndexedIndirect_bf99f285658aaafe(arg0, arg1, arg2) {
    arg0.drawIndexedIndirect(arg1, arg2);
};

export function __wbg_setBlendConstant_a5a9bd2489aba999(arg0, arg1) {
    arg0.setBlendConstant(arg1);
};

export function __wbg_setScissorRect_5ee9750ebe441067(arg0, arg1, arg2, arg3, arg4) {
    arg0.setScissorRect(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_setViewport_e367bddaaaf13e04(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setViewport(arg1, arg2, arg3, arg4, arg5, arg6);
};

export function __wbg_setStencilReference_cf5d086eba01cd9b(arg0, arg1) {
    arg0.setStencilReference(arg1 >>> 0);
};

export function __wbg_executeBundles_34d34a510955dfbb(arg0, arg1) {
    arg0.executeBundles(arg1);
};

export function __wbg_end_60f657e4529b7220(arg0) {
    arg0.end();
};

export function __wbg_submit_96b0776fdc0e8da9(arg0, arg1) {
    arg0.submit(arg1);
};

export function __wbg_message_598914532fa04918(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_instanceof_GpuOutOfMemoryError_28aa0d9cb5b14767(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUOutOfMemoryError;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_type_3b2f1f65a2630816(arg0) {
    const ret = arg0.type;
    return (__wbindgen_enum_GpuCompilationMessageType.indexOf(ret) + 1 || 4) - 1;
};

export function __wbg_offset_46876693a620f4b8(arg0) {
    const ret = arg0.offset;
    return ret;
};

export function __wbg_length_8f9f39ba8f9d3174(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_lineNum_d65cee867984603c(arg0) {
    const ret = arg0.lineNum;
    return ret;
};

export function __wbg_message_9e89baf8090fb5f5(arg0, arg1) {
    const ret = arg1.message;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_boolean_get(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbg_offsetX_d08eda91526f22a2(arg0) {
    const ret = arg0.offsetX;
    return ret;
};

export function __wbg_offsetY_3c895bb1534dfbf4(arg0) {
    const ret = arg0.offsetY;
    return ret;
};

export function __wbg_webkitFullscreenElement_533c5f32e2ac8d0c(arg0) {
    const ret = arg0.webkitFullscreenElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_onpointerrawupdate_e087759b4021ec00(arg0) {
    const ret = arg0.onpointerrawupdate;
    return ret;
};

export function __wbg_getCoalescedEvents_4665669d237be577(arg0) {
    const ret = arg0.getCoalescedEvents;
    return ret;
};

export function __wbg_requestFullscreen_a851d70cb190396a(arg0) {
    const ret = arg0.requestFullscreen;
    return ret;
};

export function __wbg_scheduler_6932606c19435996(arg0) {
    const ret = arg0.scheduler;
    return ret;
};

export function __wbg_requestIdleCallback_081ddac93612a53e(arg0) {
    const ret = arg0.requestIdleCallback;
    return ret;
};

export function __wbg_webkitRequestFullscreen_8abcfecec7127495(arg0) {
    arg0.webkitRequestFullscreen();
};

export function __wbg_requestFullscreen_f4349fb8a7429cf9(arg0) {
    const ret = arg0.requestFullscreen();
    return ret;
};

export function __wbg_prototype_8e5075a5dd95f801() {
    const ret = ResizeObserverEntry.prototype;
    return ret;
};

export function __wbg_Window_cc0273a5da2c36dc(arg0) {
    const ret = arg0.Window;
    return ret;
};

export function __wbg_postTask_4674878f9a603824(arg0, arg1, arg2) {
    const ret = arg0.postTask(arg1, arg2);
    return ret;
};

export function __wbg_scheduler_8082c844a9cfc0df(arg0) {
    const ret = arg0.scheduler;
    return ret;
};

export function __wbg_queueMicrotask_848aa4969108a57e(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

export const __wbg_queueMicrotask_c5419c06eab41e73 = typeof queueMicrotask == 'function' ? queueMicrotask : notDefined('queueMicrotask');

export function __wbg_instanceof_WebGl2RenderingContext_8dbe5170d8fdea28(arg0) {
    let result;
    try {
        result = arg0 instanceof WebGL2RenderingContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_beginQuery_b8e402f471b94597(arg0, arg1, arg2) {
    arg0.beginQuery(arg1 >>> 0, arg2);
};

export function __wbg_bindBufferRange_68e6d902beca2cf8(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.bindBufferRange(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_bindSampler_e6594b2914f5003c(arg0, arg1, arg2) {
    arg0.bindSampler(arg1 >>> 0, arg2);
};

export function __wbg_bindVertexArray_9971ca458d8940ea(arg0, arg1) {
    arg0.bindVertexArray(arg1);
};

export function __wbg_blitFramebuffer_bd01a21856ea0fbc(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
};

export function __wbg_bufferData_d29d96e444b898a8(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_97b16c4aedab785a(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferSubData_0c11461edf66f156(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_clearBufferfv_f66e3443cdea656a(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferiv_5636255b7ffdf249(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferuiv_8a5714476351aebf(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
};

export function __wbg_clientWaitSync_d784ff3d0b4d725e(arg0, arg1, arg2, arg3) {
    const ret = arg0.clientWaitSync(arg1, arg2 >>> 0, arg3 >>> 0);
    return ret;
};

export function __wbg_compressedTexSubImage2D_568fabb4a468221c(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
};

export function __wbg_compressedTexSubImage2D_a6583905f3a9480f(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
};

export function __wbg_compressedTexSubImage3D_a61af2271039d4bf(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
};

export function __wbg_compressedTexSubImage3D_a73e16b704a1d1d5(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
};

export function __wbg_copyBufferSubData_67fcdafd4e5ee17e(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_copyTexSubImage3D_8da44b12589b4f99(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

export function __wbg_createQuery_0795eefd252e80f8(arg0) {
    const ret = arg0.createQuery();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createSampler_04ad5e8ab76483fb(arg0) {
    const ret = arg0.createSampler();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createVertexArray_ec08b54b9f8c74ea(arg0) {
    const ret = arg0.createVertexArray();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_deleteQuery_e5827ae2abdd5cc5(arg0, arg1) {
    arg0.deleteQuery(arg1);
};

export function __wbg_deleteSampler_3edc3465d87c6e64(arg0, arg1) {
    arg0.deleteSampler(arg1);
};

export function __wbg_deleteSync_7a5ecbff89c2476b(arg0, arg1) {
    arg0.deleteSync(arg1);
};

export function __wbg_deleteVertexArray_112dd9bcd72ec608(arg0, arg1) {
    arg0.deleteVertexArray(arg1);
};

export function __wbg_drawArraysInstanced_58629707b4b330ef(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawBuffers_c5aeef68633961f5(arg0, arg1) {
    arg0.drawBuffers(arg1);
};

export function __wbg_drawElementsInstanced_6bb33869244a4898(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_endQuery_0abcffd7cf85f99b(arg0, arg1) {
    arg0.endQuery(arg1 >>> 0);
};

export function __wbg_fenceSync_e39c9079309664a2(arg0, arg1, arg2) {
    const ret = arg0.fenceSync(arg1 >>> 0, arg2 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_framebufferTextureLayer_553e4303fd9ac85d(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_getBufferSubData_573ee8fa19051981(arg0, arg1, arg2, arg3) {
    arg0.getBufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_getIndexedParameter_c046ce18fdfe2dd2() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getQueryParameter_7a26f48a8e221c3e(arg0, arg1, arg2) {
    const ret = arg0.getQueryParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getSyncParameter_c832b09cdf83e9a1(arg0, arg1, arg2) {
    const ret = arg0.getSyncParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getUniformBlockIndex_58495b7e010514a3(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformBlockIndex(arg1, getStringFromWasm0(arg2, arg3));
    return ret;
};

export function __wbg_invalidateFramebuffer_85aacd2d6706f92c() { return handleError(function (arg0, arg1, arg2) {
    arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
}, arguments) };

export function __wbg_readBuffer_3be142023c4594fe(arg0, arg1) {
    arg0.readBuffer(arg1 >>> 0);
};

export function __wbg_readPixels_f1573092ee7b3fc7() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_readPixels_9a37d680e1902966() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_renderbufferStorageMultisample_fe52b83cbe6a1263(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_samplerParameterf_8e3f1f759df1f227(arg0, arg1, arg2, arg3) {
    arg0.samplerParameterf(arg1, arg2 >>> 0, arg3);
};

export function __wbg_samplerParameteri_bba8403da2e67783(arg0, arg1, arg2, arg3) {
    arg0.samplerParameteri(arg1, arg2 >>> 0, arg3);
};

export function __wbg_texImage2D_05363c5a13ee70f9() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texImage3D_6371804354a63939() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
}, arguments) };

export function __wbg_texStorage2D_d7ea0bec2ad1d754(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_texStorage3D_c78e9d392c9afef5(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
};

export function __wbg_texSubImage2D_97bed542c038dfb5() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_74255449b4229fd1() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_a70ed16617b934eb() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_40174c6ee920fe24() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_fcc3db78c8c4dfd4() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_e5ec0c323060b567() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_a6bd57ab52392bb5() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage3D_b1219aeae15b17e7() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_fa9088aa90bc643e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_d6c66c1a0d0b4328() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_872ac7e01fe6afdb() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_dbf08e66ae19c720() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_ab86e6cf9338a779() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_772730c836caeb64() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_uniform1ui_db9ba46f665c3c8d(arg0, arg1, arg2) {
    arg0.uniform1ui(arg1, arg2 >>> 0);
};

export function __wbg_uniform2fv_ee34c52d95d497de(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_a3a3a2d9dd160669(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2uiv_b9b0306bb5a34533(arg0, arg1, arg2, arg3) {
    arg0.uniform2uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_560886b2a558fa83(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_dd1472a6dabcbacf(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3uiv_19d2c541c5b13765(arg0, arg1, arg2, arg3) {
    arg0.uniform3uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4fv_b355da0bf0a80967(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_5eb5f6d6b8f7b5eb(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4uiv_cf3029bbfadb5167(arg0, arg1, arg2, arg3) {
    arg0.uniform4uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniformBlockBinding_7ce0de2472517231(arg0, arg1, arg2, arg3) {
    arg0.uniformBlockBinding(arg1, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_uniformMatrix2fv_65856c74b9e6fe59(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2x3fv_c5b0f3b7ad9c9d70(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2x4fv_45b56d62d9b54f07(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_4409fe9c61d17bae(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3x2fv_8ec31c1c6e15f466(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3x4fv_f4747cbe196496d7(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_5bf1d4fcb9b38046(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4x2fv_995a5133239fcdf8(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4x3fv_55fdabeba339030e(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_vertexAttribDivisor_657bb3e5aaa0a9d0(arg0, arg1, arg2) {
    arg0.vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_vertexAttribIPointer_9ce0758a819f9ebd(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_activeTexture_a2e9931456fe92b4(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
};

export function __wbg_attachShader_299671ccaa78592c(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
};

export function __wbg_bindAttribLocation_76abc768e01a6a90(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindBuffer_70e5a7ef4920142a(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindFramebuffer_21286675ec02dcb0(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindRenderbuffer_b5a39364d07f8f0e(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindTexture_78210066cfdda8ac(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
};

export function __wbg_blendColor_82a78d74caf24e36(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendEquation_99ed9620b96c3390(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
};

export function __wbg_blendEquationSeparate_f31b2648426dff95(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFunc_fc7489df4b31e3ec(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFuncSeparate_79ff089d1b7d8fdd(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_clear_678615798766f804(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
};

export function __wbg_clearDepth_58463f034e740951(arg0, arg1) {
    arg0.clearDepth(arg1);
};

export function __wbg_clearStencil_170e89ddfd178df9(arg0, arg1) {
    arg0.clearStencil(arg1);
};

export function __wbg_colorMask_88c579e312b0fdcf(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_compileShader_9680f4f1d833586c(arg0, arg1) {
    arg0.compileShader(arg1);
};

export function __wbg_copyTexSubImage2D_7150b4aa99c21fde(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_createBuffer_478457cb9beff1a3(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createFramebuffer_ad461f789f313e65(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createProgram_48b8a105fd0cfb35(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createRenderbuffer_fd9d446bba29f340(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createShader_f956a5ec67a77964(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_3ebc81a77f42cd4b(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_cullFace_32ec426f9cf738ba(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
};

export function __wbg_deleteBuffer_4ab8b253a2ff7ec7(arg0, arg1) {
    arg0.deleteBuffer(arg1);
};

export function __wbg_deleteFramebuffer_a7d2812b702a9416(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
};

export function __wbg_deleteProgram_ef8d37545b8ab3ce(arg0, arg1) {
    arg0.deleteProgram(arg1);
};

export function __wbg_deleteRenderbuffer_fe2288d56301005f(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
};

export function __wbg_deleteShader_c65ef8df50ff2e29(arg0, arg1) {
    arg0.deleteShader(arg1);
};

export function __wbg_deleteTexture_05e26b0508f0589d(arg0, arg1) {
    arg0.deleteTexture(arg1);
};

export function __wbg_depthFunc_7589bc6d5bb03a9b(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
};

export function __wbg_depthMask_e4963468d5b609c0(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
};

export function __wbg_depthRange_ee8b5b65dd5c7ea2(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
};

export function __wbg_disable_d0317155c2bda795(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_58aa0d2748ca82d4(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_drawArrays_af53529e509d0c8b(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_enable_b73a997042de6e09(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_08b992ae13fe30a9(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_framebufferRenderbuffer_b3aa0a942c6bdcc5(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
};

export function __wbg_framebufferTexture2D_d190f9f327cc46ec(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
};

export function __wbg_frontFace_2f9be9f6e61eab57(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
};

export function __wbg_getExtension_811520f1db50ca11() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getParameter_1b7c85c782ee0a5e() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getProgramInfoLog_16c69289b6a9c98e(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getProgramParameter_4c981ddc3b62dda8(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getShaderInfoLog_afb2baaac4baaff5(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getShaderParameter_e21fb00f8255b86b(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getSupportedExtensions_ae0473d2b21281af(arg0) {
    const ret = arg0.getSupportedExtensions();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getUniformLocation_74149153bba4c4cb(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_linkProgram_983c5972b815b0de(arg0, arg1) {
    arg0.linkProgram(arg1);
};

export function __wbg_pixelStorei_1077f1f904f1a03d(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_polygonOffset_1b4508ccdc143fe7(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
};

export function __wbg_renderbufferStorage_822379366751a4aa(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_scissor_3cdd53b98aa49fb5(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_shaderSource_c36f18b5114855e7(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
};

export function __wbg_stencilFuncSeparate_f70a2363259de010(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilMask_87e5dfdb3daacf5d(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
};

export function __wbg_stencilMaskSeparate_03f10bfd58cf3e1e(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilOpSeparate_14c4ac8259d6ae13(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_texParameteri_a73df30f47a92fec(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_uniform1f_d2ba9f3d60c3859c(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
};

export function __wbg_uniform1i_b7abcc7b3b4aee52(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
};

export function __wbg_uniform4f_7e85e8eb9dff7886(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_useProgram_8232847dbf97643a(arg0, arg1) {
    arg0.useProgram(arg1);
};

export function __wbg_vertexAttribPointer_f602d22ecb0758f6(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_viewport_e333f63662d91f3a(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_instanceof_Window_6575cd7f1322f82f(arg0) {
    let result;
    try {
        result = arg0 instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_document_d7fa2c739c2b191a(arg0) {
    const ret = arg0.document;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_navigator_3d3836196a5d8e62(arg0) {
    const ret = arg0.navigator;
    return ret;
};

export function __wbg_devicePixelRatio_5d0556383aa83231(arg0) {
    const ret = arg0.devicePixelRatio;
    return ret;
};

export function __wbg_cancelIdleCallback_7e85ac94feec1b33(arg0, arg1) {
    arg0.cancelIdleCallback(arg1 >>> 0);
};

export function __wbg_getComputedStyle_ec7e113b79b74e98() { return handleError(function (arg0, arg1) {
    const ret = arg0.getComputedStyle(arg1);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_matchMedia_2c5a513148e49e4a() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.matchMedia(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_requestIdleCallback_effe682e9df1695f() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestIdleCallback(arg1);
    return ret;
}, arguments) };

export function __wbg_cancelAnimationFrame_f802bc3f3a9b2e5c() { return handleError(function (arg0, arg1) {
    arg0.cancelAnimationFrame(arg1);
}, arguments) };

export function __wbg_requestAnimationFrame_8c3436f4ac89bc48() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestAnimationFrame(arg1);
    return ret;
}, arguments) };

export function __wbg_clearTimeout_8567b0ecb6ec5d60(arg0, arg1) {
    arg0.clearTimeout(arg1);
};

export function __wbg_setTimeout_c9db6bce0a6bb71c() { return handleError(function (arg0, arg1) {
    const ret = arg0.setTimeout(arg1);
    return ret;
}, arguments) };

export function __wbg_setTimeout_e5d5b865335ce177() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.setTimeout(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_body_8e909b791b1745d3(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_visibilityState_5e9ade0fb5df3c9c(arg0) {
    const ret = arg0.visibilityState;
    return (__wbindgen_enum_VisibilityState.indexOf(ret) + 1 || 3) - 1;
};

export function __wbg_activeElement_4ab2bc6dcf8da330(arg0) {
    const ret = arg0.activeElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_fullscreenElement_d39685ee9d78d455(arg0) {
    const ret = arg0.fullscreenElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createElement_e4523490bd0ae51d() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments) };

export function __wbg_getElementById_734c4eac4fec5911(arg0, arg1, arg2) {
    const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_querySelector_e4353fe90bee0601() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_querySelectorAll_28e417f74795a70f() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments) };

export function __wbg_setAttribute_2a8f647a8d92c712() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setPointerCapture_739b13a4c8b0c2b0() { return handleError(function (arg0, arg1) {
    arg0.setPointerCapture(arg1);
}, arguments) };

export function __wbg_style_04eb1488bc2ceffc(arg0) {
    const ret = arg0.style;
    return ret;
};

export function __wbg_focus_6b6181f7644f6dbc() { return handleError(function (arg0) {
    arg0.focus();
}, arguments) };

export function __wbg_bufferData_074e48650ef2dd18(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_11bf0e7b1bcebb55(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferSubData_75812ffb9c1cd1d4(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_compressedTexSubImage2D_bd83f8f696b6d591(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
};

export function __wbg_readPixels_4e84fb582bf012e3() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_texImage2D_12005a1c57d665bb() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_e784b7363b6c212d() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_uniform2fv_9a442fc12ac6908d(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_381ff23066f6a1b5(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_00fe7be94f38d819(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_2e1c0ab4a03ec4ce(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4fv_a4022bbb233e7635(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_4d0ac6295a7128b4(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniformMatrix2fv_d8a8d5939ca67037(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_2e2aa0a9cc686289(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_7c95912c063d4e2b(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_activeTexture_b0bb95e7b2c13666(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
};

export function __wbg_attachShader_4a6cb7b86d7531b8(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
};

export function __wbg_bindAttribLocation_5f1fbf398e621d36(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindBuffer_87bece1307f4836f(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindFramebuffer_b9be4c8bf236f0e8(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindRenderbuffer_c0813f918b791132(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindTexture_578ab0356afb56df(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
};

export function __wbg_blendColor_edc626d0dcb0353d(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendEquation_3d98c2e4520f67f0(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
};

export function __wbg_blendEquationSeparate_4dba689f460b83c7(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFunc_a0cad1569253dd9b(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFuncSeparate_54734c3d5f7ec376(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_clear_c5af939d0a44a025(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
};

export function __wbg_clearDepth_48522b9afc0fcae3(arg0, arg1) {
    arg0.clearDepth(arg1);
};

export function __wbg_clearStencil_f75695e44d9d07fb(arg0, arg1) {
    arg0.clearStencil(arg1);
};

export function __wbg_colorMask_f1fbf32fb9ff5f55(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_compileShader_48a677cac607634b(arg0, arg1) {
    arg0.compileShader(arg1);
};

export function __wbg_copyTexSubImage2D_c8c32f4ef2dc582d(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_createBuffer_2f1b069b0fbe4db7(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createFramebuffer_982db8b568b3eca9(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createProgram_1510c4697aed8d2f(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createRenderbuffer_99bf5d848bb24276(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createShader_3edd95eb001d29c9(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_01a5bbc5d52164d2(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_cullFace_e6b0b54ef3b7307c(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
};

export function __wbg_deleteBuffer_2b49293fc295ccea(arg0, arg1) {
    arg0.deleteBuffer(arg1);
};

export function __wbg_deleteFramebuffer_3b2693a1a495f793(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
};

export function __wbg_deleteProgram_16d8257cfae7ddbe(arg0, arg1) {
    arg0.deleteProgram(arg1);
};

export function __wbg_deleteRenderbuffer_b7ef144995140813(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
};

export function __wbg_deleteShader_a49077cc02f9d75c(arg0, arg1) {
    arg0.deleteShader(arg1);
};

export function __wbg_deleteTexture_f72079e46289ccf8(arg0, arg1) {
    arg0.deleteTexture(arg1);
};

export function __wbg_depthFunc_c3a66baecbd39fce(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
};

export function __wbg_depthMask_621842c53eaaf9cb(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
};

export function __wbg_depthRange_89d7e77aac8924b5(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
};

export function __wbg_disable_a342a9330a0cd452(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_636452904a337436(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_drawArrays_bb3d6e0af7dcb469(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_enable_d120ad9b31220426(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_a12ed0a684959868(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_framebufferRenderbuffer_a2b559ae4519abb6(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
};

export function __wbg_framebufferTexture2D_8edd7a84454a0f67(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
};

export function __wbg_frontFace_380eb97b8e84036d(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
};

export function __wbg_getParameter_21bd0c7970e3e51c() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getProgramInfoLog_2ebf87ded3a93ef1(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getProgramParameter_2fc04fee21ea5036(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getShaderInfoLog_eabc357ae8803006(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getShaderParameter_e5207a499ce4b3a1(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getUniformLocation_f600c2277dd826b4(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_linkProgram_b4246295077a3859(arg0, arg1) {
    arg0.linkProgram(arg1);
};

export function __wbg_pixelStorei_86e41250cf27c77f(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_polygonOffset_473b27921774b31d(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
};

export function __wbg_renderbufferStorage_cf618d17929fccad(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_scissor_f1b8dd095e3fa77a(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_shaderSource_f8f569556926b597(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
};

export function __wbg_stencilFuncSeparate_ce7a3a558108c580(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilMask_90c593098dd34f2c(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
};

export function __wbg_stencilMaskSeparate_bc74c4776009bfc5(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilOpSeparate_86845a9132af3755(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_texParameteri_72793934be86cdcf(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_uniform1f_800970b4947e87c4(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
};

export function __wbg_uniform1i_55c667a20431c589(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
};

export function __wbg_uniform4f_13782133211399be(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_useProgram_0f0a7b123a5eba79(arg0, arg1) {
    arg0.useProgram(arg1);
};

export function __wbg_vertexAttribPointer_6e1de5dfe082f820(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_viewport_567a7a444dd3650b(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_navigator_4093e51a109a906e(arg0) {
    const ret = arg0.navigator;
    return ret;
};

export const __wbg_debug_69675dd374e2c249 = typeof console.debug == 'function' ? console.debug : notDefined('console.debug');

export const __wbg_error_53abcd6a461f73d8 = typeof console.error == 'function' ? console.error : notDefined('console.error');

export const __wbg_error_e297661c1014a1cc = typeof console.error == 'function' ? console.error : notDefined('console.error');

export const __wbg_info_f073b719c8035bbf = typeof console.info == 'function' ? console.info : notDefined('console.info');

export const __wbg_log_f740dc2253ea759b = typeof console.log == 'function' ? console.log : notDefined('console.log');

export const __wbg_warn_41503a1c2194de89 = typeof console.warn == 'function' ? console.warn : notDefined('console.warn');

export function __wbg_instanceof_File_5a973fb2039b9d6f(arg0) {
    let result;
    try {
        result = arg0 instanceof File;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_pointerId_93f7e5e10bb641ad(arg0) {
    const ret = arg0.pointerId;
    return ret;
};

export function __wbg_pressure_ad8dacbd14c9076f(arg0) {
    const ret = arg0.pressure;
    return ret;
};

export function __wbg_pointerType_6d91ef0da43639d3(arg0, arg1) {
    const ret = arg1.pointerType;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getCoalescedEvents_8f8920b382098ac5(arg0) {
    const ret = arg0.getCoalescedEvents();
    return ret;
};

export function __wbg_new_bc395d17a25f9f2f() { return handleError(function (arg0) {
    const ret = new ResizeObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_disconnect_91f6e3e629264c78(arg0) {
    arg0.disconnect();
};

export function __wbg_observe_51c387de0413edcf(arg0, arg1) {
    arg0.observe(arg1);
};

export function __wbg_observe_e05a589c42476328(arg0, arg1, arg2) {
    arg0.observe(arg1, arg2);
};

export function __wbg_unobserve_79fd6473e7891735(arg0, arg1) {
    arg0.unobserve(arg1);
};

export function __wbg_getSupportedProfiles_4e71d1eaf77f6211(arg0) {
    const ret = arg0.getSupportedProfiles();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getPropertyValue_b199c95cfeadebdf() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_removeProperty_5acbca68235d0706() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_setProperty_b9a2384cbfb499fb() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_width_655495d54a5383b4(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_height_ad9c075afdac4ed7(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_media_80aa0a213cbd9b0b(arg0, arg1) {
    const ret = arg1.media;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_matches_7df350fbe7beb09f(arg0) {
    const ret = arg0.matches;
    return ret;
};

export function __wbg_addListener_503d439bc3f84ff3() { return handleError(function (arg0, arg1) {
    arg0.addListener(arg1);
}, arguments) };

export function __wbg_removeListener_0e5684bf9a4fe773() { return handleError(function (arg0, arg1) {
    arg0.removeListener(arg1);
}, arguments) };

export function __wbg_port1_a6e649ef4f3886f3(arg0) {
    const ret = arg0.port1;
    return ret;
};

export function __wbg_port2_6fdacea6fa8e446e(arg0) {
    const ret = arg0.port2;
    return ret;
};

export function __wbg_new_e207405ddca58ee2() { return handleError(function () {
    const ret = new MessageChannel();
    return ret;
}, arguments) };

export function __wbg_setbox_0540f4f0ed4733b6(arg0, arg1) {
    arg0.box = __wbindgen_enum_ResizeObserverBoxOptions[arg1];
};

export function __wbg_width_45de62653cf1c40c(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_height_333816c9b207333d(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_videoWidth_2cca108f1f2055da(arg0) {
    const ret = arg0.videoWidth;
    return ret;
};

export function __wbg_videoHeight_d80fda4a200a84da(arg0) {
    const ret = arg0.videoHeight;
    return ret;
};

export function __wbg_new_4422dda84db10905() { return handleError(function (arg0) {
    const ret = new IntersectionObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_disconnect_8d41ebc92b193580(arg0) {
    arg0.disconnect();
};

export function __wbg_observe_6f2910a25347a592(arg0, arg1) {
    arg0.observe(arg1);
};

export function __wbg_appendChild_bc4a0deae90a5164() { return handleError(function (arg0, arg1) {
    const ret = arg0.appendChild(arg1);
    return ret;
}, arguments) };

export function __wbg_contains_a28a8f7c01e4c130(arg0, arg1) {
    const ret = arg0.contains(arg1);
    return ret;
};

export function __wbg_get_602f2a39a831c929(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_inlineSize_bdd9c1683673d79e(arg0) {
    const ret = arg0.inlineSize;
    return ret;
};

export function __wbg_blockSize_5d28da4852a3728e(arg0) {
    const ret = arg0.blockSize;
    return ret;
};

export function __wbg_signal_9acfcec9e7dffc22(arg0) {
    const ret = arg0.signal;
    return ret;
};

export function __wbg_new_75169ae5a9683c55() { return handleError(function () {
    const ret = new AbortController();
    return ret;
}, arguments) };

export function __wbg_abort_c57daab47a6c1215(arg0) {
    arg0.abort();
};

export function __wbg_instanceof_HtmlCanvasElement_022ad88c76df9031(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLCanvasElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_width_cd62a064492c4489(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_setwidth_23bf2deedd907275(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_height_f9f3ea69baf38ed4(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_setheight_239dc283bbe50da4(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_getContext_bf8985355a4d22ca() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_cfe4caa91ffe938e() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_isIntersecting_57d03835f2fb0c18(arg0) {
    const ret = arg0.isIntersecting;
    return ret;
};

export function __wbg_width_3222ca0e491047f8(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_setwidth_e02ce7ae3e45c1b6(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_height_ad067168e1893e7e(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_setheight_45e518143d1ca78f(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_getContext_211e7f0e615215a4() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_3661e96619dc6e6c() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_queryCounterEXT_15995970e64411dc(arg0, arg1, arg2) {
    arg0.queryCounterEXT(arg1, arg2 >>> 0);
};

export function __wbg_instanceof_FileReader_16f057aa83e1e124(arg0) {
    let result;
    try {
        result = arg0 instanceof FileReader;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_result_5cc84600fc64bf35() { return handleError(function (arg0) {
    const ret = arg0.result;
    return ret;
}, arguments) };

export function __wbg_setonload_0e9d43ec0cbb3987(arg0, arg1) {
    arg0.onload = arg1;
};

export function __wbg_new_e282c42c5fc7a7b1() { return handleError(function () {
    const ret = new FileReader();
    return ret;
}, arguments) };

export function __wbg_readAsArrayBuffer_467dfea5cb42f85c() { return handleError(function (arg0, arg1) {
    arg0.readAsArrayBuffer(arg1);
}, arguments) };

export function __wbg_setonmessage_81b2f44fc2b4b0a4(arg0, arg1) {
    arg0.onmessage = arg1;
};

export function __wbg_close_8356c7a6c6893135(arg0) {
    arg0.close();
};

export function __wbg_postMessage_5109299871335137() { return handleError(function (arg0, arg1) {
    arg0.postMessage(arg1);
}, arguments) };

export function __wbg_start_818baa7ac87fe59f(arg0) {
    arg0.start();
};

export function __wbg_framebufferTextureMultiviewOVR_7662ba7db516244e(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.framebufferTextureMultiviewOVR(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
};

export function __wbg_persisted_af13b0ad7952721a(arg0) {
    const ret = arg0.persisted;
    return ret;
};

export function __wbg_drawArraysInstancedANGLE_3b6ca9b052d4d8a2(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawElementsInstancedANGLE_c25bed1e47757546(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_vertexAttribDivisorANGLE_7b5fc471794338ce(arg0, arg1, arg2) {
    arg0.vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_ctrlKey_4015247a39aa9410(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_shiftKey_6d843f3032fd0366(arg0) {
    const ret = arg0.shiftKey;
    return ret;
};

export function __wbg_altKey_c9401b041949ea90(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_metaKey_5d680933661ea1ea(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_button_d8226b772c8cf494(arg0) {
    const ret = arg0.button;
    return ret;
};

export function __wbg_buttons_2cb9e49b40e20105(arg0) {
    const ret = arg0.buttons;
    return ret;
};

export function __wbg_movementX_468fdc7a7281744b(arg0) {
    const ret = arg0.movementX;
    return ret;
};

export function __wbg_movementY_8bbbf8c3bffd1fce(arg0) {
    const ret = arg0.movementY;
    return ret;
};

export function __wbg_deltaX_10154f810008c0a0(arg0) {
    const ret = arg0.deltaX;
    return ret;
};

export function __wbg_deltaY_afd77a1b9e0d9ccd(arg0) {
    const ret = arg0.deltaY;
    return ret;
};

export function __wbg_deltaMode_f31810d86a9defec(arg0) {
    const ret = arg0.deltaMode;
    return ret;
};

export function __wbg_target_b0499015ea29563d(arg0) {
    const ret = arg0.target;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_preventDefault_eecc4a63e64c4526(arg0) {
    arg0.preventDefault();
};

export function __wbg_width_fa277b4243adaabb(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_height_250d8ced017769f8(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_width_750c9a65f82e45fe(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_height_7288861efacc653d(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_contentRect_0ff902e25b5b4c7a(arg0) {
    const ret = arg0.contentRect;
    return ret;
};

export function __wbg_devicePixelContentBoxSize_67d2874a12290f0b(arg0) {
    const ret = arg0.devicePixelContentBoxSize;
    return ret;
};

export function __wbg_addEventListener_4357f9b7b3826784() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_removeEventListener_4c13d11156153514() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_altKey_ebf03e2308f51c08(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_ctrlKey_f592192d87040d94(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_shiftKey_cb120edc9c25950d(arg0) {
    const ret = arg0.shiftKey;
    return ret;
};

export function __wbg_metaKey_0735ca81e2ec6c72(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_location_a7e2614c5720fcd7(arg0) {
    const ret = arg0.location;
    return ret;
};

export function __wbg_repeat_1f81f308f5d8d519(arg0) {
    const ret = arg0.repeat;
    return ret;
};

export function __wbg_key_001eb20ba3b3d2fd(arg0, arg1) {
    const ret = arg1.key;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_code_bec0d5222298000e(arg0, arg1) {
    const ret = arg1.code;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_bindVertexArrayOES_f7ae803496f6f82f(arg0, arg1) {
    arg0.bindVertexArrayOES(arg1);
};

export function __wbg_createVertexArrayOES_6e8273e64e878af6(arg0) {
    const ret = arg0.createVertexArrayOES();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_deleteVertexArrayOES_f24bf9fab17be367(arg0, arg1) {
    arg0.deleteVertexArrayOES(arg1);
};

export function __wbg_drawBuffersWEBGL_d616b2870195ce8e(arg0, arg1) {
    arg0.drawBuffersWEBGL(arg1);
};

export function __wbg_performance_eeefc685c9bc38b4(arg0) {
    const ret = arg0.performance;
    return ret;
};

export function __wbg_now_e0d8ec93dd25766a(arg0) {
    const ret = arg0.now();
    return ret;
};

export function __wbg_get_5419cf6b954aa11d(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};

export function __wbg_length_f217bbbf7e8e4df4(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_new_034f913e7636e987() {
    const ret = new Array();
    return ret;
};

export function __wbg_newnoargs_1ede4bf2ebbaaf43(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_call_a9ef466721e824f2() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

export function __wbg_new_e69b5f66fda8f13c() {
    const ret = new Object();
    return ret;
};

export function __wbg_self_bf91bf94d9e04084() { return handleError(function () {
    const ret = self.self;
    return ret;
}, arguments) };

export function __wbg_window_52dd9f07d03fd5f8() { return handleError(function () {
    const ret = window.window;
    return ret;
}, arguments) };

export function __wbg_globalThis_05c129bf37fcf1be() { return handleError(function () {
    const ret = globalThis.globalThis;
    return ret;
}, arguments) };

export function __wbg_global_3eca19bb09e9c484() { return handleError(function () {
    const ret = global.global;
    return ret;
}, arguments) };

export function __wbg_includes_2d453f0c8f71a0e8(arg0, arg1, arg2) {
    const ret = arg0.includes(arg1, arg2);
    return ret;
};

export function __wbg_of_064d1507296514c2(arg0) {
    const ret = Array.of(arg0);
    return ret;
};

export function __wbg_push_36cf4d81d7da33d1(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};

export function __wbg_call_3bfa248576352471() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_instanceof_Object_4bbac482eda9b711(arg0) {
    let result;
    try {
        result = arg0 instanceof Object;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_getOwnPropertyDescriptor_419345cdc0d1ec14(arg0, arg1) {
    const ret = Object.getOwnPropertyDescriptor(arg0, arg1);
    return ret;
};

export function __wbg_is_4b64bc96710d6a0f(arg0, arg1) {
    const ret = Object.is(arg0, arg1);
    return ret;
};

export function __wbg_valueOf_caadbb280a0b350a(arg0) {
    const ret = arg0.valueOf();
    return ret;
};

export function __wbg_new_1073970097e5a420(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_1164(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return ret;
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_all_ab7e051c1e454555(arg0) {
    const ret = Promise.all(arg0);
    return ret;
};

export function __wbg_resolve_0aad7c1484731c99(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
};

export function __wbg_catch_8097da4375a5dd1b(arg0, arg1) {
    const ret = arg0.catch(arg1);
    return ret;
};

export function __wbg_then_748f75edfb032440(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
};

export function __wbg_then_4866a7d9f55d8f3e(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
};

export function __wbg_buffer_ccaed51a635d8a2d(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_a477014f6b279082(arg0, arg1, arg2) {
    const ret = new Int8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_2162229fb032f49b(arg0, arg1, arg2) {
    const ret = new Int16Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_98f18acc088b651f(arg0, arg1, arg2) {
    const ret = new Int32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_7e3eb787208af730(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_new_fec2611eb9180f95(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

export function __wbg_set_ec2fcf81bc573fd9(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

export function __wbg_length_9254c4bd3b9f23c4(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_e74b33a1f7565139(arg0, arg1, arg2) {
    const ret = new Uint16Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_5f67057565ba35bf(arg0, arg1, arg2) {
    const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_fc445c2d308275d0(arg0, arg1, arg2) {
    const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_buffer_95102df5554646dc(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_set_e864d25d9b399c9f() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
}, arguments) };

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return ret;
};

export function __wbindgen_closure_wrapper900(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 151, __wbg_adapter_34);
    return ret;
};

export function __wbindgen_closure_wrapper901(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 151, __wbg_adapter_34);
    return ret;
};

export function __wbindgen_closure_wrapper902(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 151, __wbg_adapter_34);
    return ret;
};

export function __wbindgen_closure_wrapper903(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 151, __wbg_adapter_41);
    return ret;
};

export function __wbindgen_closure_wrapper904(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 151, __wbg_adapter_34);
    return ret;
};

export function __wbindgen_closure_wrapper905(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 151, __wbg_adapter_46);
    return ret;
};

export function __wbindgen_closure_wrapper906(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 151, __wbg_adapter_34);
    return ret;
};

export function __wbindgen_closure_wrapper911(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 151, __wbg_adapter_51);
    return ret;
};

export function __wbindgen_closure_wrapper2410(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 1372, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper2412(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 1372, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper7147(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3139, __wbg_adapter_59);
    return ret;
};

export function __wbindgen_closure_wrapper7148(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3139, __wbg_adapter_62);
    return ret;
};

export function __wbindgen_closure_wrapper7149(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3139, __wbg_adapter_59);
    return ret;
};

export function __wbindgen_closure_wrapper7150(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3139, __wbg_adapter_59);
    return ret;
};

export function __wbindgen_closure_wrapper7151(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3139, __wbg_adapter_59);
    return ret;
};

export function __wbindgen_closure_wrapper7152(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3139, __wbg_adapter_59);
    return ret;
};

export function __wbindgen_closure_wrapper7153(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3139, __wbg_adapter_59);
    return ret;
};

export function __wbindgen_closure_wrapper7391(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3224, __wbg_adapter_75);
    return ret;
};

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

