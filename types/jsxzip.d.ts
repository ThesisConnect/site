interface CompressedObject {
  compressedSize: number;
  uncompressedSize: number;
  crc32: number;
  compression: object;
  compressedContent: string | ArrayBuffer | Uint8Array | Buffer;
}
declare namespace JSX {
  export interface JSZipObject {
    _data: CompressedObject;
  }
}
