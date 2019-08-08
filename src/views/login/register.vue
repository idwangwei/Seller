<template>
    <div class="register-container">
        <div class="register-header">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="16" class="header-left">
                    <img src="@/assets/logo.jpg" alt style="width:100px; height:100%" />

                    <span style="font-size:2rem">轮胎匠</span>
                </el-col>
                <el-col :span="6" class="header-right">
                    <span>
                        已有账号
                        <i class="el-icon-question"></i>
                    </span>
                    <el-link type="primary" @click="goLogin">
                        去登录
                        <i class="el-icon-arrow-right"></i>
                    </el-link>
                </el-col>
            </el-row>
        </div>

        <el-steps :active="stepActive" align-center class="register-steps">
            <el-step title="验证手机号"></el-step>
            <el-step title="填写账号信息"></el-step>
            <el-step title="注册成功"></el-step>
        </el-steps>

        <el-form
            ref="registerForm"
            :model="registerForm"
            :rules="registerRules"
            class="register-form"
            auto-complete="on"
            label-position="left"
        >
            <template v-if="stepActive===1">
                <el-form-item prop="telephone">
                    <span class="svg-container">
                        <svg-icon icon-class="user"></svg-icon>
                    </span>
                    <el-input
                        ref="telephone"
                        v-model="registerForm.telephone"
                        placeholder="请输入常用手机号"
                        name="telephone"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>
                <el-form-item prop="verification">
                    <span class="svg-container">
                        <svg-icon icon-class="user"></svg-icon>
                    </span>
                    <el-input
                        ref="telephone"
                        v-model="registerForm.telephone"
                        placeholder="请输入常用手机号"
                        name="telephone"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

            </template>

            <template v-else-if="stepActive===2">

                <el-form-item prop="username">
                    <span class="svg-container">
                        <svg-icon icon-class="user"></svg-icon>
                    </span>
                    <el-input
                        ref="username"
                        v-model="registerForm.username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password"></svg-icon>
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="registerForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter.native="handleRegister"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
                    </span>
                </el-form-item>

            </template>
            <template v-else-if="stepActive===3">
                <div>success</div>
            </template>

            <el-button
                :loading="loading"
                type="primary"
                style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleRegister"
            >下一步</el-button>
        </el-form>
    </div>
</template>

<script>
import { validUsername, validTelephone } from '@/utils/validate';

export default {
    name: 'Register',
    data() {
        const validateTelephone = (rule, value, callback) => {
            if (!validTelephone(value)) {
                callback(new Error('请正确输入11位手机号码'));
            } else {
                callback();
            }
        };
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(
                    new Error('The password can not be less than 6 digits')
                );
            } else {
                callback();
            }
        };
        return {
            registerForm: {
                username: 'admin',
                password: '111111',
                telephone: '',
                verification: ''
            },
            registerRules: {
                telephone: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validateTelephone
                    }
                ],
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validateUsername
                    }
                ],
                password: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validatePassword
                    }
                ]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
            stepActive: 1
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleRegister() {
            this.stepActive = (this.stepActive % 3) + 1;
            /*   this.$refs.registerForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('register', this.registerForm)
                        .then(() => {
                            this.$router.push({ path: this.redirect || '/' });
                            this.loading = false;
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            }); */
        },
        goLogin() {
            this.$router.push({ path: '/login' });
        }
    }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
$light_gray: #409EFF;
$cursor: #409EFF;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .register-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.register-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(41, 38, 207, 0.308);
        // background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #889aa4;
$light_gray: #409EFF;
.register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    /deep/ .el-divider__text,
    .el-link {
        font-size: 1rem;
    }
    .register-header {
        height: 110px;
        box-shadow: 0 0 0.5rem $dark_gray;
        .row-bg {
            height: 100%;
        }
        .header-left {
            height: 100%;
            display: flex;
            align-items: center;
            color: $dark_gray;
            justify-content: flex-start;
        }
        .header-right {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: $dark_gray;
        }
    }
    .register-steps {
        width: 520px;
        max-width: 100%;
        margin: 0 auto;
        margin-top: 5rem;
    }
    .register-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
