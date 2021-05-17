<template>
    <div class="base">
        <top-nav></top-nav>
    </div>
</template>

<script>

    import TopNav from './assess/TopNav';

    export default {
        name: 'Assess',
        components: {
            TopNav

        },
        mounted() {
            let interval = this.$moment(this.$moment().format('YYYY-MM-DD 00')).add(1,'days').valueOf() - this.$moment().valueOf();
            setTimeout(() => {
                history.go(0)
            }, interval);
            this.initSock();
            this.connect();
        },
        methods: {
            initSock: function () {
                let me = this;
                me.socket = new SockJS('endpointHxgis');
                me.stompClient = Stomp.over(me.socket);
                me.socket.onclose = function(){
                    console.log(this.$moment().format('YYYY-MM-DD HH:mm:ss') + ' socket关闭，重新连接socket');
                    me.connect();
                }
            },
            // 连接webSocket的服务端
            connect: function () {
                let self = this;
                this.stompClient.connect({}, function () {
                    self.stompClient.subscribe('topic/important', function (res) {
                        console.log(JSON.parse(res.body).data);
                        self.$store.dispatch('setAssessData', JSON.parse(res.body).data);
                    });
                    self.stompClient.subscribe('topic/getResponse', function (res) {
                        console.log(JSON.parse(res.body).data.time);
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
        background-image: url("../assets/images/bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
    }

</style>
