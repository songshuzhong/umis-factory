export default {
  name: 'InitApi',
  props: {
    initApi: {
      type: Object,
      required: false,
      edit: {
        renderer: 'mis-combo',
        name: 'initApi',
        label: 'initApi',
        tip: '初始化api',
        controls: [
          {
            renderer: 'mis-input',
            name: 'url',
            label: '请求地址'
          },
          {
            renderer: 'mis-input',
            name: 'method',
            label: '请求类型'
          },
          {
            renderer: 'mis-input',
            name: 'params',
            label: '请求参数'
          }
        ]
      },
    },
    initData: {
      type: Object,
      required: false,
      default: {},
    },
    initRows: {
      type: Array,
      required: false,
      default: []
    },
    inherit: {
      type: Object,
      required: false,
      default: function() {
        return {
          type: 'all',
          value: []
        };
      }
    },
    interval: {
      type: Number,
      required: false,
      default: 0,
      edit: {
        renderer: 'mis-input',
        label: 'interval',
        name: 'interval',
        tip: '轮询间隔'
      }
    },
    sendOn: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        name: 'sendOn',
        label: 'sendOn',
        tip: '满足条件时请求'
      }
    },
    stopAutoRefreshWhen: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        name: 'stopAutoRefreshWhen',
        label: 'stopAutoRefreshWhen',
        tip: '满足条件时停止轮询'
      }
    },
    silentLoading: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-input',
        name: 'silentLoading',
        label: 'silentLoading',
        tip: '屏蔽加载动画'
      }
    },
    silentMessage: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-input',
        name: 'silentMessage',
        label: 'silentMessage',
        tip: '响应信息'
      }
    },
    syncLocation: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-input',
        name: 'syncLocation',
        label: 'syncLocation',
        tip: '将参数锁定到地址栏'
      }
    },
  },
}
