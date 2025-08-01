const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VocabSchema = new Schema(
    {
        English: {
            type: String,
            trim: true,
            required: 'English word cannot be blank.' 
        },

        German: {
            type: String,
            trim: true,
            required: 'German word cannot be blank.'
        },
        
        French: {
            type: String,
            trim: true,
            required: 'French word cannot be blank.'
        }
    },
    {collection: 'vocab'}
);

module.exports = mongoose.model('Vocab', VocabSchema)
