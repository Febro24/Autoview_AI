import * as tf from '@tensorflow/tfjs';

const MODEL_URL = '/model/model.json';
const IMG_SIZE = 300;
const CLASS_NAMES = ['front', 'frontleft', 'frontright', 'random', 'rear', 'rearleft', 'rearright'];

let model = null;
let loadingPromise = null;

export async function loadModel() {
  if (model) return model;

  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      console.log('[AutoView] Loading TF.js model...');
      await tf.ready();
      console.log('[AutoView] TF.js backend:', tf.getBackend());

      model = await tf.loadGraphModel(MODEL_URL);
      console.log('[AutoView] Model loaded successfully');

      // Warm up with a dummy prediction
      const dummy = tf.zeros([1, IMG_SIZE, IMG_SIZE, 3]);
      model.predict(dummy).dispose();
      dummy.dispose();
      console.log('[AutoView] Model warmed up');

      return model;
    } catch (err) {
      console.warn('[AutoView] Model load failed, using fallback:', err.message);
      loadingPromise = null;
      return null;
    }
  })();

  return loadingPromise;
}

export async function predict(imageElement) {
  const loadedModel = await loadModel();

  if (loadedModel) {
    return predictWithModel(loadedModel, imageElement);
  } else {
    return predictWithFallback(imageElement);
  }
}

async function predictWithModel(model, imageElement) {
  const tensor = tf.tidy(() => {
    const img = tf.browser.fromPixels(imageElement);
    const resized = tf.image.resizeBilinear(img, [IMG_SIZE, IMG_SIZE]);
    // EfficientNet expects [0, 255] range
    return resized.expandDims(0).toFloat();
  });

  const predictions = model.predict(tensor);
  const scores = await predictions.data();

  tensor.dispose();
  predictions.dispose();

  const result = {};
  CLASS_NAMES.forEach((cls, i) => {
    result[cls] = scores[i];
  });

  const maxIdx = scores.indexOf(Math.max(...scores));
  return {
    prediction: {
      class: CLASS_NAMES[maxIdx],
      confidence: scores[maxIdx],
    },
    scores: result,
    method: 'tfjs',
  };
}

// Fallback: pixel-analysis heuristic when model isn't available
async function predictWithFallback(imageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageElement, 0, 0, 300, 300);
  const imageData = ctx.getImageData(0, 0, 300, 300);
  const data = imageData.data;

  let edges = 0;
  const total = data.length / 4;

  for (let y = 1; y < 299; y++) {
    for (let x = 1; x < 299; x++) {
      const idx = (y * 300 + x) * 4;
      const idxR = (y * 300 + x + 1) * 4;
      const idxD = ((y + 1) * 300 + x) * 4;
      const dx = Math.abs(data[idx] - data[idxR]) + Math.abs(data[idx + 1] - data[idxR + 1]);
      const dy = Math.abs(data[idx] - data[idxD]) + Math.abs(data[idx + 1] - data[idxD + 1]);
      if (dx + dy > 60) edges++;
    }
  }
  const edgeRatio = edges / (298 * 298);

  let topB = 0, botB = 0, leftB = 0, rightB = 0;
  for (let y = 0; y < 300; y++) {
    for (let x = 0; x < 300; x++) {
      const idx = (y * 300 + x) * 4;
      const b = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
      if (y < 150) topB += b; else botB += b;
      if (x < 150) leftB += b; else rightB += b;
    }
  }
  const half = 150 * 300;
  topB /= half; botB /= half; leftB /= half; rightB /= half;

  const vBias = (topB - botB) / 255;
  const hBias = (leftB - rightB) / 255;

  const raw = {
    front: 0.3 + vBias * 0.4 + Math.random() * 0.12,
    rear: 0.3 - vBias * 0.4 + Math.random() * 0.12,
    frontleft: 0.2 + hBias * 0.3 + vBias * 0.2 + Math.random() * 0.08,
    frontright: 0.2 - hBias * 0.3 + vBias * 0.2 + Math.random() * 0.08,
    rearleft: 0.2 + hBias * 0.3 - vBias * 0.2 + Math.random() * 0.08,
    rearright: 0.2 - hBias * 0.3 - vBias * 0.2 + Math.random() * 0.08,
    random: edgeRatio > 0.15 ? 0.5 + Math.random() * 0.2 : 0.1 + Math.random() * 0.1,
  };

  // Softmax
  const maxRaw = Math.max(...Object.values(raw));
  let sumExp = 0;
  const expScores = {};
  for (const cls of CLASS_NAMES) {
    expScores[cls] = Math.exp((raw[cls] - maxRaw) * 3);
    sumExp += expScores[cls];
  }
  const scores = {};
  for (const cls of CLASS_NAMES) {
    scores[cls] = expScores[cls] / sumExp;
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  return {
    prediction: { class: best[0], confidence: best[1] },
    scores,
    method: 'fallback',
  };
}

export { CLASS_NAMES, IMG_SIZE };
