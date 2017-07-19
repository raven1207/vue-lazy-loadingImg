<template>
    <div :class="imageClass">
        <img :class="[ imageState]" :src="computedImg" :data-width="imageWidth" :data-height="imageHeight"
             :data-state="imageState"/>
    </div>

</template>

<script>
    export default {
        props: {
            //接口请求成功的图片路径
            imageSource: {
                type: String,
                required: true
            },
            //图片上的类名
            imageClass: {
                type: String,
                required: false,
                default: ''
            },
            //请求加载的时候显示加载图片
            loadingImage: {
                type: String,
                required: true
            },
            //请求的图片不显示显示默认图片
            errorImage: {
                type: String,
                required: true
            },
            //请求图片失败回调操作
            imageErrorCallback: {
                type: Function,
                required: false,
                default: function () {
                }
            },
            //请求图片成功回调操作
            imageSuccessCallback: {
                type: Function,
                required: false,
                default: function () {
                }
            }
        },
        data() {
            return {
                imageWidth: 0,
                imageHeight: 0,
                imageState: 'loading',
                asyncImage: new Image()
            }
        },
        computed: {
            computedImg() {
                if (this.imageState === 'loading') {
                    return this.loadingImage;
                }
                if (this.imageState === 'error') {
                    return this.errorImage;
                }
                if (this.imageState === 'loaded') {
                    return this.asyncImage.src;
                }
                return '';
            }
        },
        methods: {
            fetchImage(url) {
                this.asyncImage.onload = this.imageOnLoad
                this.asyncImage.onerror = this.imageOnError
                this.imageState = 'loading'
                this.asyncImage.src = this.imageSource
            },
            imageOnLoad(success) {
                this.imageState = 'loaded'
                this.imageWidth = this.asyncImage.naturalWidth
                this.imageHeight = this.asyncImage.naturalHeight
                this.imageSuccessCallback()
            },
            imageOnError(error) {
                this.imageState = 'error'
                this.imageErrorCallback()
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.fetchImage()
            })
        }
    }
</script>
<style lang="less" scoped>
    @import "../../less/components/recommend.less";
</style>