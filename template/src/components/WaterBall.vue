<template>
    <div class="waterBall">
        <div class="header" v-text="option.name"></div>
        <div class="time" v-text="$moment(option.fileTime).format('YYYY/MM/DD HH:mm')"></div>
        <div class="content"></div>
        <div class="bg"></div>
        <div class="bottom" v-text="'实收' + option.value + '/' + option.total + '应收'"></div>
    </div>
</template>

<script>
    import '../assets/js/echarts-liquidfill.min';

    export default {
        name: 'WaterBall',
        props: {
            option: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                chart: null
            };
        },
        watch: {
            option() {
                this.update();
            }
        },
        mounted() {
            let chartDom = this.$el.getElementsByClassName('content')[0];
            this.chart = this.$echarts.init(chartDom);
            this.update();
        },
        methods: {
            update() {
                let val = this.option.value / this.option.total;
                let option = {
                    backgroundColor: '#05003800',
                    title: {
                        text: parseInt(val * 100) + '%',
                        textStyle: {
                            fontSize: 14,
                            fontFamily: 'Microsoft Yahei',
                            fontWeight: 'normal',
                            color: 'rgba(255,255,255,1)'
                        },
                        x: 'center',
                        y: '35%'
                    },
                    series: [{
                        type: 'liquidFill',
                        radius: '100%',
                        center: ['50%', '50%'],
                        data: [val, val, val],
                        backgroundStyle: {
                            borderWidth: 1,
                            color: 'rgb(255,0,255,0.1)'
                        },
                        label: {
                            normal: {
                                formatter: ''
                            }
                        },
                        outline: {
                            show: false
                        }
                    }, {
                        'type': 'pie',
                        'center': ['50%', '50%'],
                        'radius': ['96%', '100%'],
                        'hoverAnimation': false,
                        'data': [{
                            'name': '',
                            'value': 500,
                            labelLine: {
                                show: false
                            },
                            itemStyle: {
                                color: '#5886f0'
                            },
                            emphasis: {
                                labelLine: {
                                    show: false
                                },
                                itemStyle: {
                                    color: '#5886f0'
                                }
                            }
                        }

                        ]
                    }

                    ]
                };
                this.chart.setOption(option, true);
            }
        }
    };
</script>

<style scoped>
    .waterBall {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 200px;
        height: 200px;
        padding-top: 20px;
        position: relative;
    }

    .header {
        height: 25px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 25px;
        color: rgba(255, 255, 255, 1);
        text-shadow: 0px 0px 6px rgba(0, 85, 255, 1);
    }

    .content {
        width: 92px;
        height: 92px;
    }

    .bg {
        position: absolute;
        bottom: 10px;
        width: 125px;
        height: 65px;
        background-image: url("../assets/images/waterBall_bg.png");
        background-size: cover;
        background-repeat: no-repeat;
    }

    .bottom {
        width: 100%;
        height: 22px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: rgba(255, 255, 255, 1);
        text-shadow: 0px 0px 6px rgba(0, 85, 255, 1);
        opacity: 1;
    }

    .time {
        font-family: Digital-7;
        font-weight: 400;
        line-height: 23px;
        color: rgba(0, 220, 255, 1);
        text-shadow: 0px 0px 7px rgba(0, 220, 255, 1);
        letter-spacing: px;
    }

</style>
