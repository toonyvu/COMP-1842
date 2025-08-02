<template>
  <div class="test-wrapper">
    <h1>Test Yourself</h1>

    <!-- Language selection -->
    <div v-if="!chosenLang" class="card"> <!--If Language isn't chosen, prompts the user to select with 3 buttons. -->
      <p>Select the language you want to be tested on (source):</p>
      <div class="button-group">
        <button class="ui primary button" @click="setLanguage('English')">English</button>
        <button class="ui primary button" @click="setLanguage('German')">German</button>
        <button class="ui primary button" @click="setLanguage('French')">French</button>
        <!--Clicking on any button calls the setLanguage function and passes in the language as the argument. -->
      </div>
    </div>

    <!-- Quiz questions -->
    <div v-else-if="words.length && wordIndex < words.length" class="card"> <!--If chosen, check if there are words in the wordslist, and current question smaller than length of list.-->
      <p><strong>Translate this word:</strong></p>
      <h2>{{ getQuestion() }}</h2> <!--Displays the from language.-->

      <div v-for="lang in chosenLang.to" :key="lang" class="field"> <!--Loops through the other languages and stores lang as a unique key.-->
        <!--Creating input fields, using v-model binds the user's two languages to the userAnswers variable, storing it as key-value pairs.-->
        <!--When enter is pressed, call checkAnswer fucntion.-->
        <!--Adds placeholder text to inform the user which input belongs to what language.-->
        <input 
          v-model="userAnswers[lang]" 
          @keyup.enter="checkAnswer" 
          :placeholder="`Your ${lang} translation...`"
        />
      </div>

      <button class="ui green button" @click="checkAnswer">Submit</button>
      <!--Alternatively, press button to check answer.-->

      <!--Ternary operator to check if isCorrect is true. if false, displays feedback message.-->
      <p class="feedback" :class="isCorrect ? 'correct' : 'wrong'" v-if="feedback">
        {{ feedback }}
      </p>
    </div>


    <!-- Results -->
    <div v-else-if="words.length && wordIndex >= words.length" class="card">
      <h2>Test complete!</h2>
      <p>You got {{ score }} out of {{ words.length }} correct.</p> <!--Displays score for user.-->
      <button class="ui violet button" @click="restartTest"> <!--Calls restartTest function.-->
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
      words: [], // The list of words fetched from the API function call.
      wordIndex: 0, // Current word the user is on.
      userAnswers: {}, // A key-value pair collection of user answers, given when user typed into the box.
      correctAnswer: {}, // A key-value pair collection of correct answers, retrieved from the checkAnser function.
      feedback: '', // Feedback message. Also retrieved from checkAnswer.
      isCorrect: false, // Check variable to see if user input is correct.
      score: 0, // User's score.
      chosenLang: null // e.g. { from: 'English', to: ['German', 'French'] }
    };
  },

  async mounted() {
    try {
      // When app is mounted, get words using helper API.
      this.words = await api.getWords();
    } catch (error) {
      console.error("Failed to load words:", error);
    }
  },

  methods: {
    // SET LANGUAGE FUNCTION.
    setLanguage(fromLang) {
      const allLangs = ['English', 'German', 'French']; // Defines a list of all languages.
      const toLangs = allLangs.filter(lang => lang !== fromLang); // Excludes the chosen language from toLang. Result is a tuple [LanguageA, LanguageB].
      this.chosenLang = { from: fromLang, to: toLangs }; // Defines chosenLang as a keyPair. e.g (from: English, to: [German, French])
    },

    getQuestion() {
      const word = this.words[this.wordIndex]; // Fetches current word with the index. e.g. on question 3, take words[3].
      return word[this.chosenLang.from];  // Return the from language in the chosenLang keypair dictionary.
    },

    checkAnswer() {
      const word = this.words[this.wordIndex]; // Retrieves the correct words. e.g ['Ice cream', 'Eiscreme', 'Glace']
      let allCorrect = true; // Initial condition
      let feedbackMessages = []; // Feedback message

      this.chosenLang.to.forEach(lang => { // Loops through each To language in chosenLang
        const userInput = (this.userAnswers[lang] || '').trim().toLowerCase(); // Check value of user input using lang as key, trimming it and put in lowercase.
        const correct = (word[lang] || '').trim().toLowerCase(); // Does the same as above, but checks from the word list.

        if (userInput === correct) {
          //If correct, displays message to user.
          feedbackMessages.push(`✅ ${lang}`);
        } else {
          //If incorrect. displays the message and correct user.
          //Sets allCorrect = false to not increment score.
          feedbackMessages.push(`❌ ${lang}: correct is "${word[lang]}"`);
          allCorrect = false;
        }
      });

      this.feedback = feedbackMessages.join(' | ');
      this.isCorrect = allCorrect; // Sets isCorrect to true before incrementing the wordIndex.

      if (allCorrect) this.score++;

      setTimeout(() => {
        this.wordIndex++;
        this.userAnswers = {};
        this.feedback = '';
        this.isCorrect = false;
      }, 2000); // Waits 2 seconds before incrementing to next question.
    },

    restartTest() { // Restarts the test to original.
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

p {
    text-shadow: 0 2px 8px rgba(0,0,0,1);
}
</style>
