const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    publishDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                // Ensure the date is not in the future
                return v <= new Date();
            },
            message: props => `${props.value} is a future date and cannot be a publish date!`
        }
    },
    tags: [String],
    category: {
        type: String,
        enum: ['Technology', 'Travel', 'Food', 'Lifestyle', 'Other'],
        default: 'Other'
    },
    imageUrl: { // Added for image support
        type: String,
        trim: true,
        default: '' // Can be an empty string or a default placeholder image URL
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update `updatedAt` field on save
blogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Update `updatedAt` field on findOneAndUpdate
blogSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;