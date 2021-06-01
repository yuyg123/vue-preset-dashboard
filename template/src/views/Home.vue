<template>
  <div class="base">
    <top-nav></top-nav>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import moment from 'moment';
import TopNav from './assess/TopNav.vue';

export default {
  name: 'Home',
  components: {
    TopNav
  },
  mounted() {
    const interval = moment(moment()
      .format('YYYY-MM-DD 00'))
      .add(1, 'days')
      .valueOf() - moment()
      .valueOf();
    setTimeout(() => {
      window.history.go(0);
    }, interval);
    this.initSock();
    this.connect();
  },
  methods: {
    initSock() {
      const me = this;
      me.socket = new SockJS('endpointHxgis');
      me.stompClient = Stomp.over(me.socket);
      me.socket.onclose = function () {
        me.connect();
      };
    },
    // 连接webSocket的服务端
    connect() {
      const self = this;
      this.stompClient.connect({}, () => {
        self.stompClient.subscribe('topic/important', (res) => {
          self.$store.dispatch('setAssessData', JSON.parse(res.body).data);
        });
        self.stompClient.subscribe('topic/getResponse', (res) => {
          self.$store.dispatch('setTime', JSON.parse(res.body).data.time);
        });
      });
    }

  }
};
</script>

<style scoped>
.base {
  display: block;
  width: 100%;
  height: 1080px;
  opacity: 1;
  background-image: url("../assets/image/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

</style>
