<template>
  <section class="bg-gradient-to-t from-white to-transparent">
    <div class="container py-20">
      <!-- <div
        class="w-full max-w-md mx-auto bg-white shadow-2xl rounded-xl px-6 py-10"
      >
        <h4 class="text-lg font-medium mb-8 text-center">
          Sign up to Paperdaz
        </h4>
        <social-auth class="mb-10" />
        <div class="h-px bg-paperdazgray-100 w-full relative mb-10">
          <span
            class="inline-block bg-white p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-paperdazgray-500 font-medium text-sm"
            >OR</span
          >
        </div>

        <form action="" class="text-sm" @submit.prevent="submit">
          <message-alert-widget
            :message="errorMessage"
            v-show="errorMessage"
            type="error"
            class="mb-8"
          />
          <message-alert-widget
            v-show="isRedirecting"
            type="success"
            class="mb-8"
          >
            <div class="w-full flex justify-between gap-3 items-center">
              <div class="flex-1">
                <p class="text-base">Registration Successful!</p>
                <p class="font-normal">Please wait, signing in user.</p>
              </div>
              <div>
                <span class="animate-spin inline-block">
                  <spinner-dotted-icon height="22" width="22" />
                </span>
              </div>
            </div>
          </message-alert-widget>
          <div class="mb-6">
            <label for="" class="mb-2 block">First Name</label>
             class="form-control"<input-field
              v-model="user.firstName"
              required
              :disabled="isLoading || isRedirecting"
              type="text"
              placeholder="Jane"
            />
          </div>
          <div class="mb-6">
            <label for="" class="mb-2 block">Last Name</label>
             class="form-control"<input-field
              v-model="user.lastName"
              :disabled="isLoading || isRedirecting"
              required
              type="text"
              placeholder="Doe"
            />
          </div>
          <div class="mb-6">
            <label for="" class="mb-2 block">Email</label>
             class="form-control"<input-field
              v-model="user.email"
              :disabled="isLoading || isRedirecting"
              required
              type="email"
              placeholder="example@email.com"
            />
          </div>
          <div class="mb-10">
            <label for="" class="mb-2 block">Password</label>
            <password-field
              v-model="user.password"
              :disabled="isLoading || isRedirecting"
              required
              placeholder="xxxxxxxxxxxxxxxxxxxx"
            />
          </div>
          <div class="mb-10">
            <label for="" class="mb-2 block">Confirm Password</label>
            <password-field
              v-model="confirmPassword"
              :disabled="isLoading || isRedirecting"
              placeholder="xxxxxxxxxxxxxxxxxxxx"
              :class="{
                'border-red-500':
                  user.password &&
                  confirmPassword &&
                  confirmPassword != user.password,
              }"
            />
            <small
              v-show="
                user.password &&
                confirmPassword &&
                confirmPassword != user.password
              "
              class="text-red-500"
              >Passwords don't match</small
            >
          </div>

          <div class="flex justify-between text-xs mb-10">
            <div
              class="text-paperdazgray-400 font-medium flex items-center gap-2"
            >
            class="form-control"   <input id="remember-me-checkbox" type="checkbox" hidden />
              <label
                for="remember-me-checkbox"
                class="cursor-pointer circle circle-8 text-white relative"
              >
                <div class="overlay circle circle-18"></div>
                <check-icon
                  class="relative"
                  style="z-index: 1"
                  height="8"
                  width="8"
                />
              </label>
              <label for="remember-me-checkbox" class="cursor-pointer"
                >Accept
                <nuxt-link to="#" class="text-paperdazgreen-300"
                  >terms and conditions</nuxt-link
                ></label
              >
            </div>
          </div>
          <div class="flex flex-col items-center">
            <button
              class="h-10 rounded-lg shadow px-5 text-white text-sm bg-paperdazgreen-300 disabled:bg-opacity-70"
              :class="[isLoading ? 'cursor-progress' : '']"
              :disabled="isLoading"
            >
              <span class="inline-flex items-center gap-3">
                <span>Register</span>
                <transition name="fade" :duration="100">
                  <span v-show="isLoading" class="animate-spin">
                    <spinner-dotted-icon height="22" width="22" />
                  </span>
                </transition>
              </span>
            </button>

            <span class="text-xs inline-block mt-6"
              >Already have an account?
              <nuxt-link to="/login" class="text-paperdazgreen-300"
                >Login</nuxt-link
              ></span
            >
          </div>
        </form>
      </div> -->
      <div class="signup-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="left-form">
                <div class="signup-form">
                  <h1>Create your free account</h1>
                  <div class="social-btns">
                    <button class="btn btn-light">
                      <i class="fa-brands fa-facebook"></i>Facebook
                    </button>
                    <button class="btn btn-light">
                      <i class="fa-brands fa-google"></i>Google
                    </button>
                    <button class="btn btn-light">
                      <i class="fa-brands fa-twitter"></i>Twitter
                    </button>
                  </div>
                  <div class="or-line">
                    <div class="text">Or</div>
                    <div class="line"></div>
                  </div>
                  <div class="form">
                    <div class="row">
                      <div class="col-lg-6">
                        <input type="text" placeholder="First name" class="form-control" />
                      </div>
                      <div class="col-lg-6">
                        <input type="text" placeholder="Last name" class="form-control" />
                      </div>
                      <div class="col-lg-12">
                        <input type="text" placeholder="Email address" class="form-control" />
                      </div>
                      <div class="col-lg-12">
                        <button class="btn btn-success next-btn">Next ></button>
                      </div>
                      <div class="col-lg-12">
                        <p>
                          We’re committed to your privacy. Paperdaz uses the
                          information you provide to us to you about our relevant
                          content, products, and services. You may unsubcribe from
                          these communications at any time. For more information,
                          check out our <a href="#"> Privacy Policy</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-image">
                <img src="../static/card.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="payment-info-section">
        <div class="container">
          <div class="form-header-outer">
            <div class="bg-line"></div>
            <div class="form-header">
              <div class="step">
                <div class="icon-box">
                  <i class="fa-sharp fa-solid fa-check"></i>
                </div>
                <h6>1. Select Package</h6>
              </div>
              <div class="step">
                <div class="icon-box"><i class="fa-solid fa-envelope"></i></div>
                <h6>2. Verify Email</h6>
              </div>
              <div class="step">
                <div class="icon-box">
                  <i class="fa-solid fa-dollar-sign"></i>
                </div>
                <h6>3. Payment</h6>
              </div>
            </div>
          </div>
          <div class="payment-form">
            <div class="row">
              <div class="col-lg-4">
                <div class="payment-card">
                  <div class="heading">
                    <h6>Professional</h6>
                    <img class="badge2" src="../static/Polyg.png" alt="" />
                  </div>
                  <div class="price">
                    <sub>$</sub>
                    <h1>19</h1>
                    <sub>/mo</sub>
                  </div>
                  <div class="check-rows">
                    <h6><i class="fa-solid fa-check"></i>35 Paperlinks</h6>
                    <h6><i class="fa-solid fa-check"></i>3 Team Member</h6>
                    <h6><i class="fa-solid fa-check"></i>4 CC Flow</h6>
                    <h6><i class="fa-solid fa-check"></i>Public Profile</h6>
                    <h6><i class="fa-solid fa-check"></i>Company Ledger</h6>
                  </div>
                  <div class="btn-row">
                    <button class="btn btn-success">Start Now</button>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="payment-form">
                  <div class="hook-row">
                    <div class="info">
                      Create business hook<i class="fa-solid fa-circle-info"></i>
                    </div>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="sub-heading">Credit Card</div>
                  <div class="form">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">Email</label>
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">Card Information</label>
                          <input type="text" class="form-control" placeholder="1234 1234 1234 1234" />
                        </div>
                        <br />
                      </div>
                      <div class="col-6">
                        <div class="form-group">
                          <input class="form-control" placeholder="MM/YY" />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="form-group">
                          <input class="form-control" placeholder="CVC" />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">Name on card</label>
                          <input type="text" class="form-control" placeholder="1234 1234 1234 1234" />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="">Country or region</label>
                          <select name="" class="form-control" id="">
                            <option value="">United States</option>
                            <option value="">United States</option>
                            <option value="">United States</option>
                          </select>
                        </div>
                        <br />
                      </div>
                      <div class="col-lg-12">
                        <div>
                          <input class="form-control" placeholder="ZIP" />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <button class="btn btn-light register-btn">
                          Pay {$ amount}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import SocialAuth from '~/components/auth/SocialAuth.vue'
import CheckIcon from '~/components/svg-icons/CheckIcon.vue'
import SpinnerDottedIcon from '~/components/svg-icons/SpinnerDottedIcon.vue'
import SvgIcon from '~/components/svg-icons/SvgIcon.vue'
import InputField from '~/components/widgets/InputField.vue'
import MessageAlertWidget from '~/components/widgets/MessageAlertWidget.vue'
import PasswordField from '~/components/widgets/PasswordField.vue'
export default Vue.extend({
  name: 'RegisterPage',
  auth: 'guest',
  components: {
    SocialAuth,
    InputField,
    PasswordField,
    SvgIcon,
    CheckIcon,
    MessageAlertWidget,
    SpinnerDottedIcon,
  },
  layout: 'landing',
  data() {
    return {
      confirmPassword: undefined,
      user: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
      },
      isLoading: false,
      errorMessage: '',
      isRedirecting: false,
    }
  },
  methods: {
    submit() {
      event?.preventDefault()

      if (this.user.password && this.user.password !== this.confirmPassword)
        return

      if (this.isLoading || this.isRedirecting) return

      this.isLoading = true
      this.errorMessage = ''
      this.isRedirecting = false

      const data = {
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
      }

      this.$axios
        .$post('/auth/register', data)
        .then(async () => {
          this.isRedirecting = true
          await this.$nextTick()

          // if registration is successful, login
          await this.$auth
            .loginWith('local', {
              data: { email: this.user.email, password: this.user.password },
            })
            .then(() => {
              this.$nuxt.$router.push('/dashboard')
            })
        })
        .catch((error) => {
          let message = ''
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            message = error.response.data.message
          } else {
            message = 'Server not reachable'
          }
          this.errorMessage = message
          this.isRedirecting = false
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
})
</script>
