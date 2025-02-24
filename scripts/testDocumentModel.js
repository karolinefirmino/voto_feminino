const mongoose = require('mongoose');
const dbConnect = require('../src/utils/mongodb'); // Use relative path
const Document = require('../src/models/Document'); // Use relative path

async function testDocumentModel() {
  try {
    await dbConnect();

    // Create a test document
    const testDoc = await Document.create({
      title: 'Test Document',
      date: new Date('2023-10-01'),
      source: 'Test Source',
      category: 'Test Category',
      tags: ['tag1', 'tag2'],
      imageUrl: '/api/placeholder/160/200',
      transcription: 'This is a test transcription.',
    });

    console.log('Test document created:', testDoc);

    // Fetch the test document
    const fetchedDoc = await Document.findById(testDoc._id);
    console.log('Fetched document:', fetchedDoc);

    // Clean up
    await Document.deleteOne({ _id: testDoc._id });
    console.log('Test document deleted.');
  } catch (error) {
    console.error('Error testing Document model:', error);
  } finally {
    mongoose.connection.close();
  }
}

testDocumentModel();