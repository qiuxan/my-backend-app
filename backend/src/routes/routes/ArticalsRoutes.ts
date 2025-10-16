import HttpStatusCodes from "@src/common/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/common/types";

async function getAll(_:IReq, res: IRes) {
  const articles = [{ id: 1, title: "Sample Article", content: "This is a sample article." }];
  res.status(HttpStatusCodes.OK).json({ articles });
}

async function add(req: IReq, res: IRes) {

  console.log({ body: req.body });
  // Implementation for adding an article
  res.status(HttpStatusCodes.CREATED).json({  message: "Article added successfully" });
}


// get one article by id
async function getOne(req: IReq, res: IRes) {
  const { id } = req.params;
  // Implementation for getting an article by id
  res.status(HttpStatusCodes.OK).json({ article: { id, title: "Sample Article", content: "This is a sample article." } });
}

// get articles by user id
async function getByUserId(req: IReq, res: IRes) {
  const { userId } = req.params;
  const userIdNumber = parseInt(userId as string);
  
  // Mock database of articles for different users
  const allArticles = [
    // User 1 articles
    { 
      id: 1, 
      title: "My First Article", 
      content: "This is my first article content.", 
      userId: 1,
      createdAt: "2024-01-15T10:30:00Z",
      tags: ["personal", "introduction"]
    },
    { 
      id: 2, 
      title: "Learning TypeScript", 
      content: "Today I learned about TypeScript interfaces and types.", 
      userId: 1,
      createdAt: "2024-01-20T14:45:00Z",
      tags: ["programming", "typescript"]
    },
    
    // User 2 articles
    { 
      id: 3, 
      title: "React Best Practices", 
      content: "Exploring the best practices for React development.", 
      userId: 2,
      createdAt: "2024-01-18T09:15:00Z",
      tags: ["react", "frontend", "javascript"]
    },
    { 
      id: 4, 
      title: "State Management with Redux", 
      content: "A comprehensive guide to Redux for state management.", 
      userId: 2,
      createdAt: "2024-01-22T16:20:00Z",
      tags: ["redux", "state-management", "react"]
    },
    { 
      id: 5, 
      title: "CSS Grid Layout", 
      content: "Mastering CSS Grid for modern web layouts.", 
      userId: 2,
      createdAt: "2024-01-28T11:30:00Z",
      tags: ["css", "layout", "frontend"]
    },
    
    // User 3 articles
    { 
      id: 6, 
      title: "Database Design Principles", 
      content: "Understanding the fundamentals of good database design.", 
      userId: 3,
      createdAt: "2024-01-12T08:45:00Z",
      tags: ["database", "design", "backend"]
    },
    
    // User 4 articles
    { 
      id: 7, 
      title: "DevOps with Docker", 
      content: "Getting started with containerization using Docker.", 
      userId: 4,
      createdAt: "2024-01-25T14:15:00Z",
      tags: ["docker", "devops", "containers"]
    },
    { 
      id: 8, 
      title: "CI/CD Pipelines", 
      content: "Building effective continuous integration and deployment pipelines.", 
      userId: 4,
      createdAt: "2024-01-30T10:00:00Z",
      tags: ["ci-cd", "automation", "devops"]
    }
  ];

  // Filter articles by userId
  const articles = allArticles.filter(article => article.userId === userIdNumber);
  
  res.status(HttpStatusCodes.OK).json({ 
    articles,
    totalCount: articles.length,
    userId: userIdNumber
  });
}



export default {
  getAll,
  add,
  getOne,
  getByUserId
} as const;