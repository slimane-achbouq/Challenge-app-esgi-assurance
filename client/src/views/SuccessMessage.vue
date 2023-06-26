<template>
  <div class="px-4 py-8">
    <div class="max-w-md mx-auto">
      <div class="text-center">
        <div class="success-checkmark">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
        <h1 class="text-3xl text-slate-800 font-bold mb-8">{{ message }}</h1>
        <router-link
          class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          to="/login"
          >Go to login -&gt;</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessMessage",
  props: ["message"],
};
</script>
<style lang="scss">
@import "../css/views/successMessage.scss";
</style>
