import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/variations', async (req, res) => {
  try {
    const data = await readFile('./variation.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ message: 'Error loading variations' });
  }
});

app.post('/update-variation', async (req, res) => {
  try {
    const { control, test } = req.body;
    const newContent = { control, test };
    await writeFile('./variation.json', JSON.stringify(newContent, null, 2));
    res.status(200).json({ message: 'Variations updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating variations' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));