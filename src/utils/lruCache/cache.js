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
    

  export default LRUCache;