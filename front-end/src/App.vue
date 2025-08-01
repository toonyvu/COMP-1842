<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item"> <!--Router links that updates the view based on the defined route.-->
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { // Exports the app so thhat other files can use it. the "Name" field is optional, can be omitted.
  name: 'app'
};
</script>

<style>
/* Base App Styles */
#app {
  background-image: url('@/assets/z.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2a2a2a;
}

/* Navbar */
#app > div.navbar {
  background-image: url('@/assets/G.gif');
  margin-bottom: 2em;
  padding: 1em 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.ui.menu .item {
  font-weight: bold;
  transition: background 0.3s, color 0.3s;
  padding: 12px 20px;
  border-radius: 6px;
}

.ui.menu .item:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

/* Flash Message */
.myFlash {
  width: 300px;
  margin: 10px;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

/* Forms and Inputs */
input {
  width: 100%;
  max-width: 350px;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

div.label {
  font-weight: bold;
  margin-bottom: 5px;
}

div.input {
  margin-bottom: 15px;
}

/* Buttons */
button.ui.button {
  margin-top: 20px;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  transition: background 0.3s, transform 0.2s;
}

button.ui.button:hover {
  background: linear-gradient(to right, #2575fc, #6a11cb);
  transform: scale(1.03);
}

/* Words Table/Card Styling */
#words {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s;
  margin-bottom: 2em;
}

#words:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

thead {
  border: 2px solid #eee;
}

tbody {
  background-color: rgba(255,255,255,.8) !important;
  border: 2px solid #eee;
}

#words th {
  background: linear-gradient(to right, rgba(220, 200, 255, 0.7), rgba(180, 205, 255, 0.7));
  color: #eee;
  text-shadow: 1px 1px #4c00529e;
  font-weight: bold;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #eee;
}

#words td {
  color: black;
  font-size: 15px;
  padding: 10px;
  border: 1px solid #eee;
}

/* Titles */
h1 {
  text-align: center;
  font-size: 3em;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px #4c00529e;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  margin-bottom: 1em;
}

/* Links */
a,
.router-link-active {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
  color: #0056b3;
}

div.ui.label {
  background: linear-gradient(to right, rgba(220, 200, 255, 0.7), rgba(180, 205, 255, 0.7)) !important;
  min-width: 120px; /* or 130px, depending on your design */
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
}

</style>
