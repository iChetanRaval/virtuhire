// import { serial } from "drizzle-orm/mysql-core";
// import { pgTable } from "drizzle-orm/pg-core";
import { pgTable, PgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp'),
  jobPosition: varchar('jobPosition').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  jobResume: varchar('jobResume'),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  mockId: varchar('mockId').notNull(),
  options: varchar('options'),
})

export const UserAnswer = pgTable('userAnswer', {

  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockId').notNull(),
  question: varchar('question').notNull(),
  correctAns: text('correctAns'),
  userAns: text('userAns'),
  feedback: text('feedback'),
  rating: varchar('rating'),
  userEmail: varchar('userEmail'),
  createdAt: varchar('createdAt'),
  options: varchar('options'),
  eyeContact: varchar('eyeContact'),
  confidence: varchar('confidence'),

})

export const resumeScore = pgTable('resumeScore', {

  id: serial('id').primaryKey(),
  resumeText: varchar('resumeText').notNull(),
  jobDescription: varchar('jobDescription'),
  atsScore: varchar('atsScore').notNull(),
  strength: varchar('strength'),
  weakness: varchar('weakness'),
  jobMatching: varchar('jobMatching'),
  missingKeywords: varchar('missingKeywords'),
  suggestions: varchar('suggestions'),

})

export const contactUs = pgTable('contactUs', {

  id: serial('id').primaryKey(),
  name: varchar('userName').notNull(),
  userEmail: varchar('userEmail').notNull(),
  userMessage: varchar('userMessage').notNull(),
})