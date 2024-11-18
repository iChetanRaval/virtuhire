

// app/admin/components/ContactMessagesServer.jsx
import { db } from '@/utils/db';
import { contactUs } from '@/utils/schema';
import ContactMessagesClient from './ContactUsTable';

export default async function ContactMessagesServer() {
  // Fetch messages from the database
  const messages = await db.select().from(contactUs);

  // Ensure messages is an array before passing
  return <ContactMessagesClient messages={messages || []} />;
}
