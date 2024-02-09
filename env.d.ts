


declare global {
    namespace NodeJS {
      interface ProcessEnv {
        // The KV Namespace binding type used here comes
        // from `@cloudflare/workers-types`, in order to
        // use it like so, make sure that you have installed
        // the package as a dev dependency and you have added
        // it to your `tsconfig.json` file under
        // `compilerOptions.types`.
        CAT_R2_BUCKET: R2Bucket;
      }
    }
  }
  
  export {};