import 'jszip';

declare module 'jszip' {
  interface JSZipObject {
    _data: CompressedObject;
  }

  interface CompressedObject {
    compressedSize: number;
    uncompressedSize: number;
    crc32: number;
    compression: object;
    compressedContent: string | ArrayBuffer | Uint8Array | Buffer;
  }
}
