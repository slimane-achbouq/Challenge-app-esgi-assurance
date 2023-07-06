<template>
  <main class="bg-white">
    <div class="relative flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-screen h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div
              class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
            >
              <!-- Logo -->
              <router-link class="block" to="/">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient
                      x1="28.538%"
                      y1="20.229%"
                      x2="100%"
                      y2="108.156%"
                      id="logo-a"
                    >
                      <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%" />
                      <stop stop-color="#A5B4FC" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="88.638%"
                      y1="29.267%"
                      x2="22.42%"
                      y2="100%"
                      id="logo-b"
                    >
                      <stop stop-color="#38BDF8" stop-opacity="0" offset="0%" />
                      <stop stop-color="#38BDF8" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16" />
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-a)"
                  />
                  <path
                    d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                    fill="url(#logo-b)"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <div class="max-w-sm mx-auto px-4 py-8">
            <SuccessMessage
              :message="successMessage"
              v-if="isSuccess"
            ></SuccessMessage>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div
        class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
        aria-hidden="true"
      >
        <img
          class="absolute top-1/4 -translate-x-1/4 ml-8 hidden lg:block"
          src="../images/verificationCompte.png"
          alt="Authentication"
        />
        <!-- <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src="../images/auth-decoration.png" width="218" height="224" alt="Authentication decoration" /> -->
      </div>
    </div>
  </main>
</template>

<script>
import Banner from "@/components/Banner.vue";
import SuccessMessage from "./SuccessMessage.vue";
import Swal from "sweetalert2";

export default {
  components: {
    Banner,
    SuccessMessage,
  },
  data() {
    return {
      isSuccess: false,
      successMessage: "",
      failedMessage: "",
    };
  },
  methods: {},
  async created() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verifyUser`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            token: this.$route.params.token,
          }),
        }
      );

      const responseJSON = await response.json();

      if (responseJSON.message == "User is already activated !") {
        Swal.fire({
          text: responseJSON.message,
          icon: "success",
        }).then(() => {
          const redirectUrl = "/" + (this.$route.query.redirect || "login");
          this.$router.replace(redirectUrl);
        });
        return;
      }

      if (responseJSON.message == "Token wrong !") {
        Swal.fire({
          title: "Sorry!",
          text: "go away !",
          icon: "warning",
        }).then(() => {
          const redirectUrl = "/" + (this.$route.query.redirect || "login");
          this.$router.replace(redirectUrl);
        });
        return;
      }

      this.successMessage = "Your profile is activated !";
      this.isSuccess = true;
    } catch (ex) {
      this.successMessage = "Failed to verify profile. please return later !";
      const error = new Error(
        ex || "Failed to verify profile. please return later !"
      );
      Swal.fire({
        title: "Sorry!",
        text: ex.message,
        icon: "error",
      }).then(() => {
        const redirectUrl = "/" + (this.$route.query.redirect || "login");
        this.$router.replace(redirectUrl);
      });
      throw error;
    }
  },
};
</script>
