import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support large PDF payloads
  app.use(express.json({ limit: '60mb' }));
  app.use(express.urlencoded({ limit: '60mb', extended: true }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Main Paper Analysis Endpoint
  app.post('/api/analyze-paper', async (req, res) => {
    try {
      const { fileData, fileType, textContent, paperTitle } = req.body;

      if (!fileData && !textContent && !paperTitle) {
        return res.status(400).json({
          error: 'Please provide a PDF file, text content, or paper title/arXiv identifier to analyze.',
        });
      }

      const ai = getGeminiClient();

      const systemPrompt = `You are a world-class principal AI research scientist, peer reviewer, and science communicator.
Your mission is to perform an in-depth, rigorous, yet deeply intuitive analysis of the provided research paper (or text / title).
You must extract the genuine new outputs, evaluate the actual paradigm shift, craft intuitive comparative analogies, generate a high-engagement 6 to 8-step "doomscroll" bite-sized feed (like bite-sized research reels), find REAL ACTUALLY EXISTING related papers with valid URLs (arXiv, Semantic Scholar, IEEE, Nature, etc.), and synthesize the latest academic and industry buzz, open challenges, and future scope.

CRITICAL REQUIREMENTS:
1. All referenced related papers MUST BE REAL AND ACTUALLY EXISTING. Provide verified arXiv or publication URLs.
2. The "doomscrollCards" must be deeply insightful, punchy, conversational yet precise, breaking the paper into intuitive digestible bites.
3. Comparative analogies must bridge dense math/methods into crystal-clear real-world systems.
4. Output MUST be strictly a single, valid JSON object matching the requested schema without extra text outside the JSON.

Expected JSON Structure:
{
  "paperMeta": {
    "title": "Exact or inferred paper title",
    "authors": ["Author 1", "Author 2"],
    "year": 2024,
    "journalOrConference": "Venue or preprint server",
    "doiOrArxiv": "arXiv:XXXX.XXXX or DOI",
    "domain": "e.g. LLM Optimization / Computer Vision / Robotics",
    "tldr": "1-2 sentence core thesis and breakthrough",
    "readingTimeMinutes": 15,
    "complexityRating": "Introductory" | "Intermediate" | "Advanced" | "Cutting-Edge Frontier"
  },
  "newOutputs": {
    "primaryBreakthrough": "The central novel output or capability established by this paper.",
    "novelMechanisms": [
      {
        "name": "Mechanism or Algorithm Name",
        "description": "How it works mathematically or procedurally.",
        "whyItMatters": "Why prior methods failed here."
      }
    ],
    "keyFindings": ["Finding 1", "Finding 2", "Finding 3"],
    "benchmarkResults": [
      {
        "metric": "Benchmark or Metric Name",
        "priorState": "Prior baseline score",
        "thisPaper": "This paper's achieved score",
        "impact": "Percentage gain or practical consequence"
      }
    ],
    "statusQuoBeforeVsAfter": [
      {
        "aspect": "e.g. Memory Consumption / Training Latency / Expressivity",
        "before": "What researchers suffered through before",
        "after": "How this paper unlocks new capabilities"
      }
    ]
  },
  "comparativeAnalogies": {
    "everydayAnalogy": {
      "title": "Memorable title for the analogy",
      "narrative": "A vivid 3-4 sentence storytelling analogy (e.g., bustling restaurant kitchen, airport luggage routing, transparent sticky notes).",
      "cast": [
        { "technicalTerm": "Technical concept A", "everydayEquivalent": "Role in the analogy" },
        { "technicalTerm": "Technical concept B", "everydayEquivalent": "Role in the analogy" }
      ]
    },
    "visualMetaphor": "A 1-sentence visual description of what this looks like mentally.",
    "intuitionTakeaway": "The one sentence to remember forever."
  },
  "doomscrollCards": [
    {
      "id": "card-1",
      "stage": 1,
      "totalStages": 7,
      "type": "hook" | "problem" | "breakthrough" | "analogy" | "mechanism" | "metrics" | "buzz" | "future",
      "badge": "Badge text",
      "headline": "Bold, punchy hook headline",
      "subheadline": "Contextual subtitle",
      "analogyHighlight": "Optional highlighted comparison",
      "bulletPoints": ["Point 1", "Point 2", "Point 3"],
      "statOrQuote": { "label": "Label", "value": "Value" },
      "takeaway": "Key bottom-line lesson"
    }
  ],
  "relatedPapers": [
    {
      "title": "Real Existing Paper Title",
      "authors": "Author List",
      "year": 2023,
      "venueOrSource": "Conference / arXiv",
      "url": "https://arxiv.org/abs/...",
      "relationshipType": "Foundation / Precursor" | "Direct Competitor" | "Evolution / Follow-up" | "Real-world Application",
      "whyItMatters": "Why every reader of this paper should also know this companion work.",
      "comparisonWithAnalyzedPaper": "Direct technical contrast."
    }
  ],
  "recentBuzzAndTrends": {
    "buzzSummary": "What is the community, industry, and social media (Twitter/X, Reddit r/MachineLearning, Hugging Face, GitHub) buzzing about regarding this idea?",
    "communitySentiment": "Revolutionary" | "Broadly Adopted" | "Hotly Debated" | "Niche / Specialized",
    "industryAdoptionStatus": "Where is this deployed in production or adopted today?",
    "controversiesOrDebates": ["Debate point 1", "Critique or open debate 2"],
    "trendTimeline": [
      { "period": "Past", "milestone": "Historical foundation" },
      { "period": "Paper Launch", "milestone": "Disruption event" },
      { "period": "Recent 2024-2026", "milestone": "Current state of the art trajectory" }
    ]
  },
  "futureScope": {
    "unsolvedLimitations": ["Limitation 1", "Failure mode 2"],
    "promisingThesisTopics": [
      {
        "title": "Specific research project / thesis title",
        "description": "Concrete methodology and hypothesis to test.",
        "difficulty": "Medium" | "High" | "Moonshot"
      }
    ],
    "openQuestionsForField": ["Unanswered question 1", "Unanswered question 2"],
    "industryApplicationOpportunities": ["Commercial opportunity 1", "Commercial opportunity 2"]
  },
  "simpleTermsExplanation": {
    "forHighSchooler": "ELI15 explanation using relatable school / everyday analogies.",
    "forTechFounder": "Commercial and systems explanation focusing on unit economics, throughput, and value.",
    "forSeniorResearcher": "High-level theoretical synthesis highlighting inductive biases, optimization landscapes, and asymptotics."
  }
}`;

      let contentParts: any[] = [];

      if (fileData) {
        // PDF or uploaded file via base64
        const mime = fileType || 'application/pdf';
        contentParts.push({
          inlineData: {
            mimeType: mime,
            data: fileData,
          },
        });
        contentParts.push({
          text: `Please thoroughly read and analyze this research paper. ${
            paperTitle ? `Title or context: "${paperTitle}".` : ''
          } Extract all breakthrough outputs, benchmarks, analogies, real existing related papers, doomscroll cards, community buzz, and future research scope according to the instructions. Respond ONLY with valid JSON.`,
        });
      } else {
        // Text or paper query
        contentParts.push({
          text: `Analyze the following research paper context / text / title:
---
${textContent || paperTitle}
---
Perform a complete extraction of the paper's novel outputs, intuitive comparative analogies, a doomscroll feed, real existing related papers with URLs, community buzz/trends, and future scope. Respond ONLY with valid JSON.`,
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contentParts,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text || '';
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch (parseErr) {
        // Try extracting json block if wrapped in markdown
        const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[1]);
        } else {
          throw parseErr;
        }
      }

      return res.json({ success: true, data: parsedData });
    } catch (error: any) {
      console.error('Error analyzing paper:', error);
      return res.status(500).json({
        error: error?.message || 'Failed to analyze paper. Please try again.',
      });
    }
  });

  // Search Grounded Related Papers & Recent Buzz via Google Search Grounding
  app.post('/api/search-grounded-papers', async (req, res) => {
    try {
      const { topicOrTitle, domain } = req.body;
      if (!topicOrTitle) {
        return res.status(400).json({ error: 'Missing topic or title to search.' });
      }

      const ai = getGeminiClient();

      const prompt = `Research Query: Find real, currently existing research papers, recent 2024-2026 breakthroughs, citations, and community buzz related to:
"${topicOrTitle}" (Domain: ${domain || 'Computer Science & AI'}).

Provide:
1. 4-6 real, verified research papers with authors, publication year, venue/arXiv, their real URL, and how they advance or challenge "${topicOrTitle}".
2. What is the latest 2024-2026 buzz, benchmark records, real-world deployment, and open debates.
3. Future research directions and active grant/thesis areas.

Be factual, accurate, and include real links to arXiv or official academic sources.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || '';
      const groundingChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      // Extract web sources from grounding chunks
      const sources: { title: string; url: string }[] = [];
      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri,
          });
        }
      }

      return res.json({
        success: true,
        reportMarkdown: text,
        groundedSources: sources,
      });
    } catch (error: any) {
      console.error('Error in search-grounded-papers:', error);
      return res.status(500).json({
        error: error?.message || 'Failed to search grounded papers.',
      });
    }
  });

  // Paper Q&A Assistant Endpoint
  app.post('/api/paper-chat', async (req, res) => {
    try {
      const { question, paperSummary, chatHistory } = req.body;
      if (!question) {
        return res.status(400).json({ error: 'Missing question.' });
      }

      const ai = getGeminiClient();

      const messagesPrompt = `You are an expert research mentor answering questions about this paper.
Paper Context:
${JSON.stringify(paperSummary || {}).slice(0, 10000)}

Previous conversation:
${(chatHistory || [])
  .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
  .join('\n')}

User Question: ${question}

Answer clearly with high scientific accuracy, intuitive analogies where helpful, and actionable pointers. Use clean Markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: messagesPrompt,
      });

      return res.json({
        success: true,
        answer: response.text || 'No response generated.',
      });
    } catch (error: any) {
      console.error('Error in paper-chat:', error);
      return res.status(500).json({
        error: error?.message || 'Failed to answer question.',
      });
    }
  });

  // Vite middleware for dev vs static dist for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PaperPulse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
