<template>
    <div class="guage">
        <div class="bg2">
            <div v-text="option.time + '时'"></div>
            <div v-text="getPercent + '%'"></div>
        </div>
        <div class="bg" >
            <label class="name" v-text="option.name"></label>
        </div>
        <div class="content"></div>
        <template>
            <div
                    class="lack"
                    v-for="(item,index) in lackOptions"
                    :key="index"
            >

                <template v-if="item[1]>=total/2 && item[0]!==item[1]">
                    <label class="lackDom right"
                           :style="'top:'+ getY(item[1])+'px;left:'+ getX(item[1]) + 'px'"
                    >
                        <label> ● </label>
                        <label
                                class="text"
                                v-text="formatText(item[1])"
                        > </label>
                    </label>
                </template>
                <template v-else-if="item[0]!==item[1]">
                    <label class="lackDom left"
                           :style="'top:'+ getY(item[1],true)+'px;left:'+ getX(item[1],true) + 'px'"
                    >
                        <label
                                class="text"
                                v-text="formatText(item[1])"
                        > </label>
                        <label> ● </label>
                    </label>
                </template>

            </div>

            <label class="total right"
                   :style="'top:'+ getY(total)+'px;left:'+ getX(total) + 'px'"
            >
                <label> ● </label>
                <label
                        class="text"
                        v-text="formatText(total)"
                > </label>
            </label>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'Guage',
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
        computed: {
            total() {
                return this.option.max;
            },
            getPercent() {
                return parseInt(this.option.receiveNum * 100 / this.option.shouldNum);
            },
            lackOptions() {
                let arr = [];
                for (let item of this.option.data) {
                    if (item.status === 2) {
                        arr.push(item.time);
                    }
                }
                return arr;
            }
        },
        mounted() {
            let chartDom = this.$el.getElementsByClassName('content')[0];
            this.chart = this.$echarts.init(chartDom);
            this.update();
        },
        methods: {
            update() {
                let max = this.option.max;
                let shouldNum = this.option.shouldNum;
                let receiveNum = this.option.receiveNum;
                let colorList2 = [];
                if(this.option.name === '日本细网格'){
                    let item = this.option;
                    max = item.shouldNum;
                    colorList2.push({
                        value:item.receiveNum,
                        itemStyle: {
                            color: '#1fff1b'
                        },
                        lackFiles: [],
                        status: status
                    });
                    colorList2.push({
                        value: item.shouldNum - item.receiveNum,
                        itemStyle: {
                            color: '#ff3321'
                        },
                        lackFiles: item.lackFiles,
                        status: item.status
                    });
                }
                else{
                    for (let item of this.option.data) {
                        let status = item.status;
                        let color = '#1fff1b';
                        if (status === 1) {
                            color = '#1fff1b';
                        } else if (status === 0) {
                            color = '#767676';
                        } else if (status === 2) {
                            color = '#ff3321';
                        }
                        colorList2.push({
                            value: item.time[1] - item.time[0] + 1,
                            itemStyle: {
                                color: color
                            },
                            lackFiles: item.lackFiles,
                            status: status
                        });
                    }
                }

                colorList2.push({
                    value: max / 3,
                    itemStyle: {
                        color: 'rgba(0,0,0,0)'
                    }
                });
                let option = {
                    title: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter(params) {
                            if (params.data.status === 2 && params.data.lackFiles) {
                                return '缺失文件数：' + params.data.lackFiles;
                            }
                        },
                        textStyle: {
                            fontSize: 16
                        }
                    },
                    series: [{
                        name: '',
                        type: 'pie',
                        startAngle: 225,
                        endAngle: 135,
                        radius: ['58%', '69%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: false
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: colorList2
                    }, {
                        name: '',
                        type: 'gauge',
                        min: 0,
                        max: shouldNum,
                        splitNumber: 6,
                        radius: '60%',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 10 * 410,
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            distance: -50,
                            color: '#FFF'
                        },
                        splitLine: {
                            show: false
                        },
                        pointer: {
                            show: false
                        },
                        data: [{ value: receiveNum, name: '' }],
                        detail: {
                            show: false
                        },
                        tooltip: {
                            formatter(params) {
                                console.log(params);
                            }
                        }
                    }, {
                        name: '',
                        type: 'gauge',
                        min: 0,
                        max: shouldNum,
                        splitNumber: 6,
                        radius: '55%',
                        pointer: {
                            length: '60%',
                            width: 4
                        },
                        itemStyle: {
                            color: '#1fff1b'
                        },
                        data: [{ value: receiveNum, name: '' }],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: '#c4c6cc',
                                width: 1
                            },
                            length: 3
                        },
                        splitLine: {
                            length: 6,
                            lineStyle: {
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        detail: {
                            show: false
                        },
                        tooltip: {
                            formatter(params) {
                                console.log(params);
                            }
                        }

                    }]
                };

                this.chart.setOption(option, true);
            },
            getX(value, isLeft) {
                let pi = Math.PI;
                return (98 + 62 * Math.cos(pi * 5 / 4 - (value / (this.total * 2 / 3)) * pi).toFixed(6) + (isLeft ? -50 : 30));
            },
            getY(value) {
                let pi = Math.PI;
                return (78 - 62 * Math.sin(pi * 5 / 4 - (value / (this.total * 2 / 3)) * pi).toFixed(6));
            },
            formatText(value) {
                if (value < 10) {
                    return '00' + value;
                } else if (value < 100) {
                    return '0' + value;
                }
                return value;
            }
        }
    };
</script>

<style scoped>
    .guage {
        position: relative;
        width: 236px;
        height: 186px;
        display: flex;
        justify-content: center;
    }

    .content {
        width: 100%;
        height: 100%;
    }

    .bg {
        position: absolute;
        bottom: 10px;
        width: 125px;
        height: 65px;
        background-image: url("../assets/images/waterBall_bg.png");
        background-size: cover;
        background-repeat: no-repeat;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-shadow: 0px 0px 6px rgba(0, 85, 255, 1);
        line-height: 100px;
    }

    .bg2 {
        position: absolute;
        top: 40px;
        width: 105px;
        height: 105px;
        background: radial-gradient(circle, rgba(0, 96, 152, 0.73) 0%, rgba(0, 19, 57, 1) 100%);
        border-radius: 50%;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 20px;
        color: rgba(255, 255, 255, 1);
        text-shadow: 0px 0px 6px rgba(0, 85, 255, 1);
        padding-top: 65px;
    }

    .lackDom {
        position: absolute;
        color: red;
    }

    .normal {
        position: absolute;
        color: #26DED2;
    }

    .left {
        width: 60px;
        text-align: right;
    }

    .text {
        color: #FFF;
    }

    .total {
        position: absolute;
        color: #004275
    }

    .name{
        position: absolute;
        width: 200px;
        left: -35px;
        height: 30px;
        text-align: center;
    }

</style>
