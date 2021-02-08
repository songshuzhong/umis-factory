export default {
  props: {
    cached: {
      type: Object,
      required: false,
      default: {}
    },
  },
  methods: {
    handleCache(context) {
      if (this.cached && this.cached.in && this.cached.in.condition) {
        const shouldCachedIn = this.$onExpressionEval(this.cached.in.condition, {data: context});
        if (shouldCachedIn) {
          let cacheInData = this[this.cached.primaryKey];
          cacheInData = JSON.stringify(cacheInData);
          sessionStorage.setItem(this.cached.name, cacheInData);
        }
      }
      if (this.cached && this.cached.out && this.cached.out.condition) {
        const shouldCacheOut = this.$onExpressionEval(this.cached.out.condition, {data: context});
        if (shouldCacheOut) {
          let cacheOutData = sessionStorage.getItem(this.cached.name);
          if (cacheOutData && typeof cacheOutData === 'string') {
            cacheOutData = JSON.parse(cacheOutData);
            this.linkageTrigger(this.cached.target, cacheOutData);
          }
        }
      }
    }
  }
}
