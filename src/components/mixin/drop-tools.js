export default {
  name: 'DropTools',
  data() {
    return {
      schemaInstance: '',
      activeTrack: '',
    };
  },
  mounted() {
    this.schemaInstance = window.UMIS.pageSchema;
  },
  methods: {
    dragStart(e) {
      let componentName = e.target.getAttribute('data-name');
      let info = {
        renderer: componentName,
      };
      e.dataTransfer.setData('info', JSON.stringify(info));
    },
    dragOver(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    drop(e) {
      const info = JSON.parse(e.dataTransfer.getData('info'));
      const dropPosition = e.target.getAttribute('drop-position');
      const node = this.findMisComponent(e.target);
      const activeTrack = node.getAttribute('track');
      if (this.path !== activeTrack) {
        return;
      }
      if (!activeTrack || !dropPosition) {
        this.schemaInstance.body.push(info);
      } else {
        this.activeTrack = activeTrack;
        const { json } = this.beforeJSONEdit();
        if (dropPosition) {
          if (json[dropPosition]) {
            json[dropPosition].push(info);
          } else {
            json[dropPosition] = [info];
          }
        }
      }
    },
    beforeJSONEdit() {
      let trackList = this.activeTrack.split('/');
      trackList = trackList.slice(2);
      return this.findOneInJSON(this.schemaInstance, trackList);
    },
    findMisComponent(node) {
      while (node && !node.classList.contains('umis-toolmaker__container') && !node.getAttribute('track')) {
        node = node.parentNode;
      }
      return node;
    },
    swapOneInJSON(json, trackIndex, targetIndex) {
      json[trackIndex] = json.splice(targetIndex, 1, json[trackIndex])[0];
    },
    findOneInJSON(json, tracks, pJson, trackIndex) {
      const track = tracks.shift();
      let index = trackIndex;
      if (tracks.length === 1) {
        index = track;
      }
      if (!track) {
        return { json, pJson, trackIndex: Number(trackIndex) };
      }
      if (track.startsWith('mis-') && json.renderer === track) {
        return this.findOneInJSON(json, tracks, pJson, index);
      }
      if (json[track]) {
        return this.findOneInJSON(json[track], tracks, json, index)
      }
    }
  }
}
