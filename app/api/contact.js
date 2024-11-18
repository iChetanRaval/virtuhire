import { db } from '@/utils/db';
import { contactUs } from '@/utils/schema';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, userEmail, userMessage } = req.body;

    // Check if all required fields are provided
    if (!name || !userEmail || !userMessage) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Insert data into the database
      await db.insert(contactUs).values({
        name,
        userEmail,
        userMessage,
      });

      res.status(200).json({ message: 'Message saved successfully' });
    } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
