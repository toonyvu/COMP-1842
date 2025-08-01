const VocabBuilder = require('../controllers/vocabController');
const vocabModels = require('../models/vocabModels');

module.exports = app => {
    app
        .route('/words')
        .get(VocabBuilder.list_all_words)
        .post(VocabBuilder.create_a_word);

    app
        .route('/words/:wordId')
        .get(VocabBuilder.read_a_word)
        .put(VocabBuilder.update_a_word)
        .delete(VocabBuilder.delete_a_word);
};

