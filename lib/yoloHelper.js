import * as ort from 'onnxruntime-web';

export async function loadYOLOModel() {
  ort.env.wasm.numThreads = 1;
  ort.env.wasm.wasmPaths = '/wasm/';

  const model = await ort.InferenceSession.create(
    '/models/yolov8n_quantized.onnx',
    { executionProviders: ['wasm'] }
  );

  return {
    run: async (inputs) => {
      const feeds = { images: new ort.Tensor('float32', inputs) };
      return await model.run(feeds);
    }
  };
}