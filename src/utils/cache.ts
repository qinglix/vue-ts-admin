enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    //TODO 这里有个bug
    if (value) {
      // localStorage.setItem(key, JSON.stringify(value))
      this.storage.setItem(key, JSON.stringify(value))
    }

    // this.storage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    // const value = localStorage.getItem(key)
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    // localStorage.removeItem(key)
    this.storage.removeItem(key)
  }

  clearCache() {
    // localStorage.clear()
    this.storage.clear()
  }
}

// export default new Cache()

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
