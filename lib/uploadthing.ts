import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
// import { UTApi } from "uploadthing/server";

import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
// export const utapi = new UTApi();
