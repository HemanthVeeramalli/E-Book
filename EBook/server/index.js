const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/books', async (req, res) => {
  const { q, limit = 10, startIndex = 0 } = req.query;
  const page = Math.floor(startIndex / limit) + 1;
  const startTime = Date.now();

  try {
    
    const result = await axios.get(`https://openlibrary.org/search.json`, {
      params: { q, limit, page },
    });

    


    const books = result.data.docs.map((doc, index) => ({
      id: `${doc.key}-${index}`,
      title: doc.title,
      authors: doc.author_name || ['Unknown'],
      description: doc.subject ? `Subject: ${doc.subject.slice(0, 3).join(', ')}` : 'No description available.',
      publishedDate: doc.first_publish_year?.toString() || 'N/A',
      image: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : 'https://via.placeholder.com/150x200?text=No+Image',
    }));
    

    // Stats
    const allAuthors = books.flatMap(book => book.authors);
    const authorCounts = {};
    allAuthors.forEach(author => {
      authorCounts[author] = (authorCounts[author] || 0) + 1;
    });
    const mostCommonAuthor =
      Object.entries(authorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const dates = books
      .map(b => parseInt(b.publishedDate))
      .filter(y => !isNaN(y));
    const earliest = dates.length ? Math.min(...dates) : 'N/A';
    const latest = dates.length ? Math.max(...dates) : 'N/A';

    const responseTime = `${Date.now() - startTime} ms`;

    res.json({
      books,
      totalItems: result.data.num_found,
      stats: {
        mostCommonAuthor,
        earliest,
        latest,
        responseTime,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
