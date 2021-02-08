export default {
  name: 'MisFormula',
  props: {
    formula: {
      type: Object,
      required: false,
      default: function() {
        return {
          exp: '',
          condition: '',
          target: ''
        };
      }
    },
  },
  methods: {
    handleFormula(context) {
      const {exp, condition, target} = this.formula;
      if (exp && condition) {
        const shouldEval = this.$onExpressionEval(condition, {data: context});
        if (shouldEval) {
          const {value, oldValue, ...linkage} = this.$onFormulaEval(exp, {data: context});
          this.linkageTrigger(target, linkage);
        }
      }
    },
  }
}
