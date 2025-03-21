CREATE TABLE IF NOT EXISTS "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResp" text,
	"jobPosition" varchar NOT NULL,
	"jobDesc" varchar NOT NULL,
	"jobExperience" varchar NOT NULL,
	"jobResume" varchar,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar,
	"mockId" varchar NOT NULL,
	"options" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar NOT NULL,
	"question" varchar NOT NULL,
	"correctAns" text,
	"userAns" text,
	"feedback" text,
	"rating" varchar,
	"userEmail" varchar,
	"createdAt" varchar,
	"options" varchar,
	"eyeContact" varchar,
	"confidence" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contactUs" (
	"id" serial PRIMARY KEY NOT NULL,
	"userName" varchar NOT NULL,
	"userEmail" varchar NOT NULL,
	"userMessage" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resumeScore" (
	"id" serial PRIMARY KEY NOT NULL,
	"resumeText" varchar NOT NULL,
	"jobDescription" varchar,
	"atsScore" varchar NOT NULL,
	"strength" varchar,
	"weakness" varchar,
	"jobMatching" varchar,
	"missingKeywords" varchar,
	"suggestions" varchar
);
