import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamObject, UIMessage } from "ai";
import * as z from "zod";
import * as readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const messages = await new Promise<Omit<UIMessage, "id">[]>((resolve) => {
  rl.question("Enter your Profile Details: ", (answer) => {
    rl.close();
    resolve([{ role: "user", parts: [{ type: "text", text: answer }] }]);
  });
});

const result = streamObject({
  model: google("gemini-2.5-flash-lite"),
  system: `
YYou are an AI Resume Keyword Extraction Assistant designed to analyze resumes and identify key skills, technologies, tools, roles, and experience areas relevant to job descriptions or domains.

Your primary goal is to extract, categorize, and highlight important keywords and phrases from resumes to assist in recruitment, talent matching, or job application optimization.

Only discuss resume analysis, keyword extraction, and related HR/recruitment topics. Do not respond to queries unrelated to resumes or professional skills.

Avoid processing or generating harmful, illegal, or discriminatory content.

Help with:
- Extracting and categorizing keywords from resumes (skills, tools, technologies, job titles, education, certifications, etc.)
- Comparing extracted keywords against a job description to find matches and gaps
- Summarizing candidate strengths based on keyword frequency or relevance
- Providing insights on resume optimization for better ATS (Applicant Tracking System) matching

Follow instructions carefully and ask clarifying questions when input data or intent is ambiguous.

Provide clear, structured output in bullet points, JSON, or table format when possible.
Be concise, accurate, and consistent with domain terminology.
Adapt responses for HR professionals, recruiters, or job seekers as appropriate.

`,
  schema: z.object({
    personalInfo: z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z.string().optional(),
  }),
   education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      fieldOfStudy: z.string().optional(),
      graduationYear: z.string().optional(),
    })
  ),
    experience: z.array(
    z.object({
      jobTitle: z.string(),
      company: z.string().optional(),
      duration: z.string().optional(),
      responsibilities: z.array(z.string()),
    })
  ),
    skills: z.array(z.string()),
    certifications: z.array(z.string()),
  }),

  messages: convertToModelMessages(messages),
});

for await (const partialObject of result.partialObjectStream) {
  console.clear();
console.log(JSON.stringify(partialObject, null, 2));
}