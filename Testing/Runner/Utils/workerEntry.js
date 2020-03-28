// src/Utils/workerEntry.js
import { workerData } from 'worker_threads';

if (!workerData || !workerData.workerPath) {
  throw new Error('Invalid worker thread call');
}

import(workerData.workerPath);
