class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.cache = new Map();
      this.head = { key: null, value: null, next: null, prev: null };
      this.tail = { key: null, value: null, next: null, prev: this.head };
      this.head.next = this.tail;
    }
  
    get(key) {
      if (this.cache.has(key)) {
        const node = this.cache.get(key);
        this.moveToHead(node);
        return node.value;
      } else {
        return -1;
      }
    }
  
    put(key, value) {
      if (this.cache.has(key)) {
        const node = this.cache.get(key);
        node.value = value;
        this.moveToHead(node);
      } else {
        if (this.cache.size === this.capacity) {
          const removedNode = this.removeTail();
          this.cache.delete(removedNode.key);
        }
        const newNode = { key, value, next: this.head.next, prev: this.head };
        this.head.next.prev = newNode;
        this.head.next = newNode;
        this.cache.set(key, newNode);
      }
    }
  
    moveToHead(node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      node.next = this.head.next;
      node.prev = this.head;
      this.head.next.prev = node;
      this.head.next = node;
    }
  
    removeTail() {
      const removedNode = this.tail.prev;
      this.tail.prev = removedNode.prev;
      removedNode.prev.next = this.tail;
      return removedNode;
    }
  }    

const iterations = 5;
const N = 200000;

function runBenchmark() {
  const lruCache = new LRUCache(N);

  // Set benchmark
  const setStartTime = performance.now();
  for (let i = 0; i < N; i++) {
    lruCache.put(i, Math.random());
  }
  const setEndTime = performance.now();
  const setOpsPerMs = N / (setEndTime - setStartTime);

  // Get1 benchmark
  const get1StartTime = performance.now();
  for (let i = 0; i < N; i++) {
    lruCache.get(i);
  }
  const get1EndTime = performance.now();
  const get1OpsPerMs = N / (get1EndTime - get1StartTime);

  // Update benchmark
  const updateStartTime = performance.now();
  for (let i = 0; i < N; i++) {
    lruCache.put(i, Math.random());
  }
  const updateEndTime = performance.now();
  const updateOpsPerMs = N / (updateEndTime - updateStartTime);

  // Get2 benchmark
  const get2StartTime = performance.now();
  for (let i = 0; i < N; i++) {
    lruCache.get(i);
  }
  const get2EndTime = performance.now();
  const get2OpsPerMs = N / (get2EndTime - get2StartTime);

  // Evict benchmark
  const evictStartTime = performance.now();
  for (let i = N; i < 2 * N; i++) {
    lruCache.put(i, Math.random());
  }
  const evictEndTime = performance.now();
  const evictOpsPerMs = N / (evictEndTime - evictStartTime);

  return {
    set: setOpsPerMs,
    get1: get1OpsPerMs,
    update: updateOpsPerMs,
    get2: get2OpsPerMs,
    evict: evictOpsPerMs,
  };
}

// Run the benchmark for multiple iterations
const results = [];
for (let i = 0; i < iterations; i++) {
  results.push(runBenchmark());
}

// Calculate medians
const median = (arr) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
};

const medianResults = {
  set: median(results.map((result) => result.set)),
  get1: median(results.map((result) => result.get1)),
  update: median(results.map((result) => result.update)),
  get2: median(results.map((result) => result.get2)),
  evict: median(results.map((result) => result.evict)),
};

console.log("Median Operations per Millisecond:");
console.log("Set:", medianResults.set);
console.log("Get1:", medianResults.get1);
console.log("Update:", medianResults.update);
console.log("Get2:", medianResults.get2);
console.log("Evict:", medianResults.evict);

