const request = require('supertest');
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());


app.get('/api/books', async (req, res) => {
  try {
    const { q = 'harry potter', limit = 5, startIndex = 0 } = req.query;
    const page = Math.floor(startIndex / limit) + 1;

    const result = await axios.get(`https://openlibrary.org/search.json?q=${q}&limit=${limit}&page=${page}`);
    res.json({ totalItems: result.data.num_found });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});

describe('GET /api/books', () => {
  it('should return book data with totalItems', async () => {
    const res = await request(app).get('/api/books?q=harry');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalItems');
  });
});
