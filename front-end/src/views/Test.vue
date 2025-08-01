<template>
  <div class="test-wrapper">
    <h1>Test Yourself</h1>

    <!-- Language selection -->
    <div v-if="!chosenLang" class="card">
      <p>Select the language you want to be tested on (source):</p>
      <div class="button-group">
        <button class="ui primary button" @click="setLanguage('English')">English</button>
        <button class="ui blue button" @click="setLanguage('German')">German</button>
        <button class="ui violet button" @click="setLanguage('French')">French</button>
      </div>
    </div>

    <!-- Quiz questions -->
    <div v-else-if="words.length && wordIndex < words.length" class="card">
      <p><strong>Translate this word:</strong></p>
      <h2>{{ getQuestion() }}</h2>

      <div v-for="lang in chosenLang.to" :key="lang" class="field">
        <input
          v-model="userAnswers[lang]"
          @keyup.enter="checkAnswer"
          :placeholder="`Your ${lang} translation...`"
        />
      </div>

      <button class="ui green button" @click="checkAnswer">Submit</button>

      <p class="feedback" :class="isCorrect ? 'correct' : 'wrong'" v-if="feedback">
        {{ feedback }}
      </p>
    </div>


    <!-- Results -->
    <div v-else-if="words.length && wordIndex >= words.length" class="card">
      <h2>Test complete!</h2>
      <p>You got {{ score }} out of {{ words.length }} correct.</p>
      <button class="ui violet button" @click="restartTest">
        Try Again
      </button>
    </div>

    <!-- Loading -->
    <div v-else class="card">
      <p>Loading words...</p>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Test',
  data() {
    return {
      words: [],
      wordIndex: 0,
      userAnswers: {},
      correctAnswer: {},
      feedback: '',
      isCorrect: false,
      score: 0,
      chosenLang: null // e.g. { from: 'English', to: ['German', 'French'] }
    };
  },

  async mounted() {
    try {
      this.words = await api.getWords();
    } catch (error) {
      console.error("Failed to load words:", error);
    }
  },

  methods: {
    setLanguage(fromLang) {
      const allLangs = ['English', 'German', 'French'];
      const toLangs = allLangs.filter(lang => lang !== fromLang);
      this.chosenLang = { from: fromLang, to: toLangs };
    },

    getQuestion() {
      const word = this.words[this.wordIndex];
      return word[this.chosenLang.from];
    },

    checkAnswer() {
      const word = this.words[this.wordIndex];
      let allCorrect = true;
      let feedbackMessages = [];

      this.chosenLang.to.forEach(lang => {
        const userInput = (this.userAnswers[lang] || '').trim().toLowerCase();
        const correct = (word[lang] || '').trim().toLowerCase();

        if (userInput === correct) {
          feedbackMessages.push(`✅ ${lang}`);
        } else {
          feedbackMessages.push(`❌ ${lang}: correct is "${word[lang]}"`);
          allCorrect = false;
        }
      });

      this.feedback = feedbackMessages.join(' | ');
      this.isCorrect = allCorrect;

      if (allCorrect) this.score++;

      setTimeout(() => {
        this.wordIndex++;
        this.userAnswers = {};
        this.feedback = '';
        this.isCorrect = false;
      }, 2000);
    },

    restartTest() {
      this.wordIndex = 0;
      this.userAnswers = {};
      this.feedback = '';
      this.isCorrect = false;
      this.score = 0;
      this.chosenLang = null;
    }
  }
};
</script>
<style scoped>
.test-wrapper {
  max-width: 700px;
  margin: 3em auto;
  text-align: center;
  color: #ffffff;
}

h1 {
  font-size: 2em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  margin-bottom: 1em;
}

.card {
  background: rgba(255, 255, 255, 0.2);
  padding: 2.5em 2em;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  max-width: 600px;
  margin: 0 auto 2em auto;
}

.button-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
  margin-top: 1.5em;
}

h2 {
  font-size: 2em;
  margin: 1em 0;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
}

input {
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin: 1em 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  font-size: 1em;
  background: linear-gradient(to right, #43e97b, #38f9d7);
  color: white;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}

button:hover {
  transform: scale(1.05);
  background: linear-gradient(to right, #38f9d7, #43e97b);
}

.feedback {
  font-size: 1.2em;
  margin-top: 1em;
  font-weight: bold;
}

.correct {
  color: #00ff95;
}

.wrong {
  color: #ff4d4d;
}
</style>
