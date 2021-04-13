const express = require('express');
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    ranking: {
        type: Number,
        required: true,
        trim: true
    }, 
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true,
        trim: true
    },
    event: {
        type: String,
        default: '100m'
    }
});

const PlayersRanking = new mongoose.model('PlayersRanking', playerSchema);

module.exports = PlayersRanking