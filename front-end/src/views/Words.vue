<template>
  <div>
    <div class="headerdiv">
      <h1>Words</h1>
    </div>
    <table id="words" class="ui celled compact table">  
      <thead> <!--Creates a table that displays words and translations-->
        <tr>
          <th class="center aligned">English</th>
          <th class="center aligned">German</th>
          <th class="center aligned">French</th>
          <th colspan="3" class="center aligned">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in words" :key="word._id">
          <!--A v-loop that displays the appropriate language as each cell in a row.-->
          <td>{{ word.English }}</td>
          <td>{{ word.German }}</td>
          <td>{{ word.French }}</td>

          <!--Action buttons that changes the website route to the right path.-->
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { wordId: word._id } }">Show</router-link>
          </td>

          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { wordId: word._id } }">Edit</router-link>
          </td>

          <td width="75" class="center aligned">
            <a href="#" @click.prevent="onDestroy(word._id)">Destroy</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Words',
  data() {
    return {
      words: []
    };
  },

  async mounted() {
    /* As soon as app is mounted, fetch words from MongoDB database and pushes it into words*/
    const result = await api.getWords();
    console.log("Fetched words:", result);
    this.words = result || [];
  },

  methods: {
    async onDestroy(id) {
      const sure = window.confirm("Are you sure you want to delete this word?");
      if (!sure) return;
      /* Uses API to delete word from database */
      await api.deleteWord(id);
      alert("Word deleted successfully!");

      /* Exclude the recently deleted word from the words list */
      this.words = this.words.filter(word => word._id !== id);
    }
  }
};
</script>
