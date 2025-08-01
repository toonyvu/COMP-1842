<template>
  <div class="form-wrapper">
    <form action="#" @submit.prevent="onSubmit" class="word-form">
      <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

      <div class="field">
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="germany flag"></i> German
          </div>
          <input type="text" placeholder="Enter word..." v-model="word.German" />
        </div>
      </div>

      <div class="field">
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="united kingdom flag"></i> English
          </div>
          <input type="text" placeholder="Enter word..." v-model="word.English" />
        </div>
      </div>

      <div class="field">
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="france flag"></i> French
          </div>
          <input type="text" placeholder="Enter word..." v-model="word.French" />
        </div>
      </div>


      <button class="ui positive fluid button">Submit</button>
    </form>
  </div>
</template>

 
 <script>
export default {
  name: 'word-form',
  props: {
    word: {
      type: Object,
      required: false,
      default: () => {
        return {
          English: '',
          German: '',
          French: ''
        };
      }
    }
  },
  data() {
    return {
      errorsPresent: false
    };
  },
  methods: {
    onSubmit: function () {
      if (this.word.English === '' || this.word.German === '' || this.word.French === '') {
        this.errorsPresent = true;
      } else {
        this.errorsPresent = false;
        this.$emit('createOrUpdate', this.word);
      }
    }
  }
};

 </script>
 
<style scoped>
.form-wrapper {
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.2);
  padding: 2.5em;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  margin-top: 2em;
  transition: transform 0.3s ease, box-shadow 0.3s;
}

.form-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.word-form h1 {
  text-align: center;
  color: #333;
  font-size: 2em;
  margin-bottom: 1em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.field {
  margin-bottom: 1.5em;
}

.ui.labeled.input input {
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.ui.label {
  font-weight: bold;
  background: rgba(240, 240, 240, 0.8);
  border-radius: 8px 0 0 8px;
}

button.ui.button {
  font-weight: bold;
  font-size: 1.1em;
  padding: 12px;
  border-radius: 10px;
  background: linear-gradient(to right, #28a745, #218838);
  color: white;
  transition: background 0.3s, transform 0.2s;
}

button.ui.button:hover {
  background: linear-gradient(to right, #218838, #1e7e34);
  transform: scale(1.02);
}

.error {
  color: red;
  text-align: center;
  margin-bottom: 1em;
  font-weight: bold;
}
</style>
