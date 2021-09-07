<script>
export default {
  components: {},
  filters: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    },
    logout() {
      this.$store.dispatch('LogOut')
    }
  }
}
</script>
<template>
  <div class="errPage-container"></div>
</template>
<style lang="scss" scoped>
</style>