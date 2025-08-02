<template>
  <div class="about-wrapper">
    <h1>About This App</h1>
    <div class="card">
      <p>
        Hello this is a website by the wonderful Vu Tuan Nghia!
      </p>
      <p>
        A basic CRUD website utilizing MEVN (MongoDB, Express, Vue and Node) that teaches you vocabulary
      </p>
      <p>
        This website is very good!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
.about-wrapper {
  max-width: 800px;
  margin: 2em auto;
  text-align: center;
  color: #ffffff;
}

h1 {
  font-size: 2em;
  margin-bottom: 1em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 1);
}

.card {
  background: rgba(255, 255, 255, 0.2);
  padding: 2.5em 2em;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin-top: 1em;
  line-height: 1.6em;
  color: #fefefe;
}

p {
    text-shadow: 0 2px 8px rgba(0,0,0,1);
}
</style>
