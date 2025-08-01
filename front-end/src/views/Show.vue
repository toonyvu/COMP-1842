<template>
  <div class="main">
    <h1>Show Word</h1>
    <div class="word-card">
      <div class="field">
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly :value="word.German" />
      </div>
    </div>

    <div class="field">
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" readonly :value="word.English" />
      </div>
    </div>

    <div class="field">
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="france flag"></i> French
        </div>
        <input type="text" readonly :value="word.French" />
      </div>
    </div>

<div class="actions">
  <div class="left">
    <button @click="goToWords" class="ui secondary button">
      <i class="arrow left icon"></i> Back to Words
    </button>
  </div>
  <div class="right">
    <button @click="goToEdit" class="ui primary button">
      <i class="edit icon"></i> Edit Word
    </button>
  </div>
</div>


    </div>
  </div>
</template>

<style scoped>
.word-card {
  max-width: 600px;
  margin: 2em auto;
  padding: 2em;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s;
}

.word-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.word-card h1 {
  text-align: center;
  font-size: 2.5em;
  color: #fff;
  margin-bottom: 1em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.field {
  margin-bottom: 1.5em;
}

/* Match table header gradient from Words.vue */
.ui.label {
  background: linear-gradient(to right, rgba(220, 200, 255, 0.7), rgba(180, 205, 255, 0.7));
  color: #eee;
  font-weight: bold;
  border-radius: 8px 0 0 8px;
  padding: 10px 14px;
}

input[readonly] {
  background: white;
  padding: 10px;
  font-size: 1em;
  border-radius: 0 8px 8px 0;
  border: 1px solid #ccc;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5em;
}

.actions a {
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
}

.actions a:hover {
  text-decoration: underline;
  color: #0056b3;
}
</style>


<script>
import { api } from '../helpers/helpers';

export default {
  name: 'show',
  data() {
    return {
      word: ''
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.wordId);
  },
  methods: {
    goToEdit() {
      this.$router.push({
        name: 'edit',
        params: { wordId: this.$route.params.wordId }
      });
    },
    goToWords() {
    this.$router.push({ name: 'words' });
  }
  }
};
</script>
