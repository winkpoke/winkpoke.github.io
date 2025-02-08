/* tslint:disable */
/* eslint-disable */
/**
 * @param {Array<any>} files
 * @returns {Promise<DicomRepo>}
 */
export function parse_dcm_files_wasm(files: Array<any>): Promise<DicomRepo>;
/**
 * @returns {Promise<void>}
 */
export function init(): Promise<void>;
/**
 * @param {CTVolume} vol
 * @returns {Promise<void>}
 */
export function run(vol: CTVolume): Promise<void>;
/**
 * @param {string} image_series_number
 */
export function load_data_from_repo_wasm(image_series_number: string): void;
export class CTVolume {
  free(): void;
}
export class DicomRepo {
  free(): void;
  /**
   * @returns {string}
   */
  get_all_patients(): string;
  /**
   * @param {string} patient_id
   * @returns {string}
   */
  get_patient(patient_id: string): string;
  /**
   * @param {string} patient_id
   * @returns {string}
   */
  get_studies_by_patient(patient_id: string): string;
  /**
   * @param {string} study_id
   * @returns {string}
   */
  get_series_by_study(study_id: string): string;
  /**
   * @param {string} series_id
   * @returns {string}
   */
  get_images_by_series(series_id: string): string;
  /**
   * @param {string} image_series_id
   * @returns {CTVolume}
   */
  generate_ct_volume(image_series_id: string): CTVolume;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly parse_dcm_files_wasm: (a: number) => number;
  readonly init: () => void;
  readonly run: (a: number) => number;
  readonly __wbg_ctvolume_free: (a: number, b: number) => void;
  readonly __wbg_dicomrepo_free: (a: number, b: number) => void;
  readonly dicomrepo_get_all_patients: (a: number) => Array;
  readonly dicomrepo_get_patient: (a: number, b: number, c: number) => Array;
  readonly dicomrepo_get_studies_by_patient: (a: number, b: number, c: number) => Array;
  readonly dicomrepo_get_series_by_study: (a: number, b: number, c: number) => Array;
  readonly dicomrepo_get_images_by_series: (a: number, b: number, c: number) => Array;
  readonly dicomrepo_generate_ct_volume: (a: number, b: number, c: number) => Array;
  readonly load_data_from_repo_wasm: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly closure150_externref_shim: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he68435b04de92038: (a: number, b: number) => void;
  readonly closure155_externref_shim: (a: number, b: number, c: number, d: number) => void;
  readonly closure158_externref_shim_multivalue_shim: (a: number, b: number, c: number) => Array;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly closure1371_externref_shim: (a: number, b: number, c: number) => void;
  readonly closure3141_externref_shim: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0a6741edb9490d63: (a: number, b: number) => void;
  readonly closure3223_externref_shim: (a: number, b: number, c: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly closure3245_externref_shim: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
