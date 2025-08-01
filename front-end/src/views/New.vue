<template>
  <div>
    <h1>Add Words!</h1>
    <word-form @createOrUpdate="createOrUpdate"></word-form>
  </div>
</template>


<style scoped>
div.ui.label {
  background: linear-gradient(to right, rgba(220, 200, 255, 0.7), rgba(180, 205, 255, 0.7)) !important;
  color: #eee !important;
}

</style>


<script>
import VocabForm from '../components/VocabForm.vue';
import { api } from '../helpers/helpers';


export default {
  name: 'new-word',
  components: {
    'word-form': VocabForm
  },
  methods: {
    createOrUpdate: async function(word) {
      const res = await api.createWord(word);
      this.flash('Word created', 'success');
      this.$router.push(`/words/${res._id}`);
    }
  }
};
</script>
