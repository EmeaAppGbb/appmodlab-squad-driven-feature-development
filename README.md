# 🎮 SQUAD-DRIVEN FEATURE DEVELOPMENT 🕹️

```
███████╗ ██████╗ ██╗   ██╗ █████╗ ██████╗     ██████╗ ██╗   ██╗███████╗███████╗████████╗
██╔════╝██╔═══██╗██║   ██║██╔══██╗██╔══██╗   ██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝
███████╗██║   ██║██║   ██║███████║██║  ██║   ██║   ██║██║   ██║█████╗  ███████╗   ██║   
╚════██║██║▄▄ ██║██║   ██║██╔══██║██║  ██║   ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   
███████║╚██████╔╝╚██████╔╝██║  ██║██████╔╝   ╚██████╔╝╚██████╔╝███████╗███████║   ██║   
╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   
                                                                                          
      🗡️  ASSEMBLE YOUR PARTY · CONQUER THE QUEST · SHIP THE FEATURE 🛡️
```

> _"A lone hero can slay goblins. But to defeat the dragon? You need a SQUAD."_  
> **— Ancient DevOps Proverb**

---

## 🌌 OVERVIEW

Welcome, brave developer, to the **SQUAD-DRIVEN FEATURE DEVELOPMENT** lab! In this epic quest, you'll harness the full power of your AI party to plan, implement, test, and ship a **complete feature** to a production-grade polyglot codebase.

Your mission: Build a **Product Review & Recommendation System** for **ShopSmart**, a bustling e-commerce platform running on **TypeScript (Node.js)** and **Python (FastAPI)**. The platform already has products, users, and orders working perfectly — but the reviews and recommendations modules are **empty shells** waiting for your SQUAD to breathe life into them.

This isn't a tutorial where you follow step-by-step instructions. This is **open-world gameplay**. You'll brief **Brain** 🧠 (the strategist), coordinate **Hands** 👐 (the builders) across languages, summon **Eyes** 👁️ (the reviewer) to inspect quality, and deploy **Mouth** 💬 (the documenter) to write the lore. Together, your party will deliver production-ready code.

**🎯 QUEST OBJECTIVE:** Ship a fully functional review + recommendation system using SQUAD.

---

## 🎯 WHAT YOU'LL LEARN

By completing this lab, you'll master the **full SQUAD development lifecycle**:

| **Skill**                          | **SQUAD Member** | **XP Earned** |
|------------------------------------|------------------|---------------|
| Feature decomposition & planning   | Brain 🧠         | +300 XP       |
| Polyglot coordination (TS + Py)    | Brain + Hands    | +500 XP       |
| API implementation (TypeScript)    | Hands 👐         | +400 XP       |
| ML service development (Python)    | Hands 👐         | +400 XP       |
| Code review & quality assurance    | Eyes 👁️         | +350 XP       |
| Documentation generation           | Mouth 💬         | +250 XP       |
| End-to-end integration testing     | Full SQUAD       | +500 XP       |
| **TOTAL**                          | **🏆**           | **+2700 XP**  |

### 🌟 Abilities Unlocked
- **Party Coordination**: Direct multiple specialized agents toward a unified goal
- **Cross-Language Strategy**: Manage polyglot architecture decisions
- **Iterative Development**: Brief → Build → Review → Fix → Ship
- **Production Mindset**: Security, performance, testing, and documentation from day one

---

## 🎒 INVENTORY CHECK: PREREQUISITES

Before embarking on this quest, ensure your inventory contains:

### ✅ **Required Items**
- [ ] ✨ **Completed "Getting Started with SQUAD" lab** — you know how to summon your party
- [ ] 🔧 **Docker Desktop** — running and ready (for containerized services)
- [ ] 📦 **Node.js 20+** — installed and on your PATH
- [ ] 🐍 **Python 3.12+** — installed and ready
- [ ] 🤖 **GitHub Copilot CLI** — authenticated and configured
- [ ] 💻 **Git** — for version control

### ⚔️ **Recommended Skills**
- TypeScript / Node.js experience (Express, REST APIs)
- Python experience (FastAPI, NumPy, basic ML concepts)
- Basic understanding of Docker Compose
- Familiarity with PostgreSQL

> **💡 TIP:** If you haven't completed the "Getting Started with SQUAD" lab yet, do that first! You need to know how to summon Brain, Hands, Eyes, and Mouth before taking on this boss fight.

---

## 🚀 QUICK START

### 🪄 Summon the Platform

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd appmodlab-squad-driven-feature-development/shopsmart

# Start all services with Docker Compose
docker-compose up -d

# Wait ~30 seconds for services to initialize...
```

### ✅ Verify Your Party is Ready

```bash
# Check API service (TypeScript)
curl http://localhost:3000/api/health
# Expected: {"status":"healthy","service":"shopsmart-api"}

# Check ML service (Python)
curl http://localhost:8000/health
# Expected: {"status":"healthy","service":"ml-recommender"}

# Test existing features
curl http://localhost:3000/api/products
curl http://localhost:3000/api/users
curl http://localhost:3000/api/orders
```

If all endpoints respond correctly: **🎉 PARTY ASSEMBLED! Ready to accept quest.**

---

## 📁 PROJECT STRUCTURE

```
shopsmart/
├── api/                          # 🔷 TypeScript API (Node.js + Express)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── products.ts       # ✅ Working
│   │   │   ├── users.ts          # ✅ Working
│   │   │   ├── orders.ts         # ✅ Working
│   │   │   ├── reviews.ts        # ⚠️ EMPTY - You'll build this!
│   │   │   └── recommendations.ts# ⚠️ EMPTY - You'll build this!
│   │   ├── models/
│   │   ├── middleware/
│   │   └── index.ts
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── ml-service/                   # 🐍 Python ML Service (FastAPI)
│   ├── src/
│   │   ├── api/
│   │   │   └── routes.py         # ⚠️ Has placeholders
│   │   ├── models/
│   │   │   ├── sentiment.py      # ⚠️ EMPTY - You'll build this!
│   │   │   └── recommender.py    # ⚠️ EMPTY - You'll build this!
│   │   └── main.py
│   ├── tests/
│   ├── Dockerfile
│   └── pyproject.toml
│
├── database/                     # 🗄️ PostgreSQL schemas & migrations
│   └── init.sql
│
└── docker-compose.yml            # 🐳 Orchestration config
```

**🎯 YOUR TARGETS:**
- `api/src/routes/reviews.ts` — Build from scratch
- `api/src/routes/recommendations.ts` — Build from scratch
- `ml-service/src/models/sentiment.py` — Implement sentiment analysis
- `ml-service/src/models/recommender.py` — Implement collaborative filtering

---

## 🛒 THE SHOPSMART PLATFORM

**ShopSmart** is a modern e-commerce platform with a microservices architecture:

### 🟢 **What's Already Working**

| **Feature**      | **Technology** | **Status** | **Description**                          |
|------------------|----------------|------------|------------------------------------------|
| Product Catalog  | TypeScript     | ✅ Live    | Browse products, search, filter          |
| User Management  | TypeScript     | ✅ Live    | Registration, auth, profiles             |
| Order System     | TypeScript     | ✅ Live    | Cart, checkout, order tracking           |
| Database         | PostgreSQL     | ✅ Live    | Relational data with migrations          |
| API Gateway      | Express        | ✅ Live    | RESTful API at `localhost:3000`          |
| ML Service       | FastAPI        | ✅ Live    | Health endpoint only (waiting for models)|

### 🔴 **What's Missing (Your Quest)**

The platform has **skeleton code** for reviews and recommendations, but they're not implemented. Customers can browse and buy products, but they can't:
- ❌ Submit product reviews
- ❌ See aggregated ratings
- ❌ Get personalized recommendations
- ❌ View "customers who liked this also liked..." suggestions

**This is where your SQUAD comes in.**

---

## 🎯 THE FEATURE SQUAD WILL BUILD

You'll implement a **production-grade Product Review & Recommendation System** with the following components:

### 📝 **Product Review System**
- **Review Submission API** (TypeScript)
  - POST `/api/reviews` — Submit a review with rating (1-5) and text
  - GET `/api/reviews/:productId` — Fetch reviews for a product
  - GET `/api/reviews/:reviewId` — Get a specific review
- **Review Moderation** (Python)
  - Sentiment analysis to detect toxic/spam reviews
  - Auto-flag suspicious content for human review
- **Review Aggregation**
  - Calculate average ratings per product
  - Count total reviews
  - Provide star distribution (5-star: 40%, 4-star: 30%, etc.)

### 🎲 **Recommendation Engine**
- **Collaborative Filtering** (Python)
  - "Customers who liked this also liked..." algorithm
  - Matrix factorization or item-based similarity
- **Recommendation API** (TypeScript)
  - GET `/api/recommendations/:userId` — Personalized product suggestions
  - GET `/api/recommendations/similar/:productId` — Similar products
- **Real-time Integration**
  - TypeScript API calls Python ML service
  - Caching layer for performance
  - Fallback to trending products if no data

### 🛡️ **Anti-Fraud Detection**
- Detect duplicate reviews from same user/IP
- Rate limiting on review submissions
- Velocity checks (too many reviews in short time)

### 🏗️ **Non-Functional Requirements**
- **Security**: Input validation, SQL injection protection, XSS prevention
- **Performance**: Response time <200ms (API), <500ms (ML)
- **Testing**: Unit tests + integration tests
- **Documentation**: OpenAPI/Swagger specs, README with examples

---

## 🕹️ LAB WALKTHROUGH

### 💎 **STEP 1: SET UP ENVIRONMENT**

**🎯 Objective:** Get the platform running locally.

```bash
cd shopsmart
docker-compose up -d
```

**Verify all services are healthy:**
```bash
# API health check
curl http://localhost:3000/api/health

# ML service health check
curl http://localhost:8000/health

# Test existing endpoints
curl http://localhost:3000/api/products | jq
curl http://localhost:3000/api/users | jq
curl http://localhost:3000/api/orders | jq
```

**✅ Checkpoint:** All services respond with 200 OK.

**🌟 +100 XP — Environment Ready!**

---

### 🧠 **STEP 2: BRIEF BRAIN (THE STRATEGIST)**

**🎯 Objective:** Get Brain to analyze the codebase and propose an architecture.

Summon Brain with the quest briefing:

```bash
gh copilot squad -a Brain
```

**Example Briefing:**

> "Brain, I need you to analyze the ShopSmart platform and design a Product Review & Recommendation System. The platform is polyglot: TypeScript API (Express) and Python ML service (FastAPI).
>
> **Requirements:**
> - Review submission API (POST /api/reviews)
> - Review retrieval (GET /api/reviews/:productId)
> - Sentiment analysis for moderation (Python)
> - Collaborative filtering for recommendations (Python)
> - API endpoints for recommendations (TypeScript)
> - Anti-fraud detection (duplicate reviews, rate limiting)
> - OpenAPI documentation
>
> **Explore the codebase** in `api/` and `ml-service/` to understand the existing patterns. Then propose:
> 1. Database schema changes (if needed)
> 2. API endpoints specification
> 3. ML model approach
> 4. Integration strategy between TypeScript and Python
> 5. Testing strategy
>
> Give me a detailed implementation plan."

**📜 QUEST ACCEPTED!** Brain will explore the code and return a battle plan.

**🌟 +200 XP — Strategy Formulated!**

---

### ⚔️ **STEP 3: ARCHITECTURE DECISION**

**🎯 Objective:** Review Brain's proposal and approve the approach.

Brain will present a plan that might look like:

**Database Schema:**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  sentiment_score FLOAT,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
```

**API Endpoints:**
- POST `/api/reviews`
- GET `/api/reviews/:productId`
- GET `/api/reviews/:reviewId`
- GET `/api/recommendations/:userId`
- GET `/api/recommendations/similar/:productId`

**ML Services:**
- Sentiment analysis using transformers (Hugging Face)
- Item-based collaborative filtering using cosine similarity

**Your job:** Review, ask follow-up questions, approve or request changes.

**🌟 +100 XP — Architecture Approved!**

---

### 👐 **STEP 4: IMPLEMENT REVIEW API (TYPESCRIPT)**

**🎯 Objective:** Have Hands build the TypeScript review endpoints.

Summon Hands:

```bash
gh copilot squad -a Hands
```

**Example Directive:**

> "Hands, implement the Review API in TypeScript following the architecture Brain designed.
>
> **Tasks:**
> 1. Create database migration in `database/migrations/` for reviews table
> 2. Implement `api/src/routes/reviews.ts` with:
>    - POST /api/reviews (validation, auth required)
>    - GET /api/reviews/:productId (with pagination)
>    - GET /api/reviews/:reviewId
> 3. Create model in `api/src/models/review.ts`
> 4. Add input validation middleware
> 5. Implement anti-fraud checks (duplicate detection, rate limiting)
> 6. Add unit tests in `api/tests/reviews.test.ts`
>
> Follow the existing code style in products.ts and users.ts. Use the same error handling patterns."

**⏳ Hands will code the implementation...**

**🌟 +400 XP — TypeScript Module Complete!**

---

### 🐍 **STEP 5: IMPLEMENT ML SERVICE (PYTHON)**

**🎯 Objective:** Have Hands build the Python sentiment analysis and recommendation engine.

Brief Hands again (or continue the conversation):

> "Hands, now implement the ML service components in Python.
>
> **Tasks:**
> 1. Implement `ml-service/src/models/sentiment.py`:
>    - Use transformers library for sentiment analysis
>    - Return sentiment score (-1 to 1)
>    - Flag toxic content
> 2. Implement `ml-service/src/models/recommender.py`:
>    - Collaborative filtering using item-based similarity
>    - Cosine similarity on user-product interaction matrix
>    - Return top 10 recommendations
> 3. Update `ml-service/src/api/routes.py`:
>    - POST /analyze-sentiment
>    - POST /recommend/:userId
>    - POST /similar/:productId
> 4. Add tests in `ml-service/tests/`
> 5. Update `pyproject.toml` with dependencies (transformers, scikit-learn, numpy)
>
> Make sure it integrates with the TypeScript API via HTTP calls."

**⏳ Hands will build the Python components...**

**🌟 +400 XP — Python Module Complete!**

---

### 👁️ **STEP 6: CODE REVIEW (EYES)**

**🎯 Objective:** Have Eyes review all implementations for quality, security, and bugs.

Summon Eyes:

```bash
gh copilot squad -a Eyes
```

**Example Directive:**

> "Eyes, perform a comprehensive code review of the new review and recommendation features.
>
> **Review:**
> - `api/src/routes/reviews.ts`
> - `api/src/routes/recommendations.ts`
> - `api/src/models/review.ts`
> - `ml-service/src/models/sentiment.py`
> - `ml-service/src/models/recommender.py`
> - `ml-service/src/api/routes.py`
>
> **Focus on:**
> - Security vulnerabilities (SQL injection, XSS, auth bypass)
> - Performance issues (N+1 queries, missing indexes)
> - Error handling (edge cases, null checks)
> - Code quality (TypeScript/Python best practices)
> - Test coverage gaps
>
> Provide specific line numbers and actionable feedback."

**🔍 Eyes will analyze the code...**

Eyes might report issues like:
- ❌ Missing input sanitization on review_text
- ❌ No rate limiting on POST /api/reviews
- ❌ Sentiment model not cached (loads on every request)
- ❌ Missing error handling for ML service downtime

**🌟 +350 XP — Code Reviewed!**

---

### 🛠️ **STEP 7: FIX REVIEW FEEDBACK**

**🎯 Objective:** Have Hands address all issues Eyes found.

Brief Hands:

> "Hands, Eyes found several issues in the code review. Fix them all:
>
> **Issues to Fix:**
> 1. [Copy specific issues from Eyes' report]
> 2. Add input sanitization for review_text
> 3. Implement rate limiting middleware
> 4. Cache sentiment model in memory
> 5. Add circuit breaker for ML service calls
> 6. Improve error messages
>
> Run the tests after each fix to ensure nothing breaks."

**⏳ Hands will fix the issues...**

**Re-run Eyes if needed:**
```bash
gh copilot squad -a Eyes
# "Eyes, re-review the files that were changed. Confirm all issues are resolved."
```

**🌟 +300 XP — All Bugs Squashed!**

---

### 💬 **STEP 8: DOCUMENTATION (MOUTH)**

**🎯 Objective:** Have Mouth generate comprehensive API documentation.

Summon Mouth:

```bash
gh copilot squad -a Mouth
```

**Example Directive:**

> "Mouth, generate complete documentation for the new review and recommendation features.
>
> **Tasks:**
> 1. Create OpenAPI/Swagger spec for:
>    - POST /api/reviews
>    - GET /api/reviews/:productId
>    - GET /api/reviews/:reviewId
>    - GET /api/recommendations/:userId
>    - GET /api/recommendations/similar/:productId
> 2. Write `api/docs/REVIEWS_API.md` with:
>    - Endpoint descriptions
>    - Request/response examples
>    - Error codes
>    - Authentication requirements
> 3. Write `ml-service/docs/ML_SERVICES.md` with:
>    - Model descriptions
>    - API contracts
>    - Performance characteristics
> 4. Update main `README.md` with feature overview
>
> Make it clear and easy for developers to integrate with these APIs."

**📝 Mouth will write the docs...**

**🌟 +250 XP — Documentation Complete!**

---

### 🧪 **STEP 9: INTEGRATION TESTING**

**🎯 Objective:** Test the entire flow end-to-end.

**Manual Testing:**

```bash
# 1. Submit a review
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "product_id": "550e8400-e29b-41d4-a716-446655440000",
    "rating": 5,
    "review_text": "Amazing product! Highly recommend."
  }'

# 2. Get reviews for a product
curl http://localhost:3000/api/reviews/550e8400-e29b-41d4-a716-446655440000 | jq

# 3. Get recommendations for a user
curl http://localhost:3000/api/recommendations/123e4567-e89b-12d3-a456-426614174000 | jq

# 4. Get similar products
curl http://localhost:3000/api/recommendations/similar/550e8400-e29b-41d4-a716-446655440000 | jq
```

**Automated Testing:**

```bash
# Run API tests
cd api
npm test

# Run ML service tests
cd ../ml-service
python -m pytest

# Check test coverage
npm run test:coverage
pytest --cov
```

**✅ Success Criteria:**
- All tests pass ✅
- Review submission works ✅
- Sentiment analysis flags toxic content ✅
- Recommendations return relevant products ✅
- Response times meet SLA (<200ms API, <500ms ML) ✅

**🌟 +500 XP — Integration Testing Complete!**

---

### 🚢 **STEP 10: SHIP IT**

**🎯 Objective:** Merge and deploy the feature.

```bash
# Ensure all tests pass
npm test
pytest

# Check linting
npm run lint
flake8 ml-service/src

# Commit your changes
git add .
git commit -m "feat: Add product review and recommendation system

- Implement review submission and retrieval API (TypeScript)
- Add sentiment analysis for review moderation (Python)
- Build collaborative filtering recommendation engine (Python)
- Add anti-fraud detection (rate limiting, duplicate checks)
- Generate OpenAPI documentation
- Add comprehensive test coverage

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# Push to remote
git push origin feature/reviews-recommendations

# Create PR and deploy! 🚀
```

**🐉 BOSS DEFEATED! Feature Shipped to Production! 🎉**

**🌟 +1000 XP — QUEST COMPLETE!**

---

## ⏱️ ESTIMATED DURATION

| **Phase**                  | **Time**  | **Difficulty** |
|----------------------------|-----------|----------------|
| Environment Setup          | 15 min    | ⭐ Easy        |
| Brief Brain & Planning     | 30 min    | ⭐⭐ Medium    |
| Implement TypeScript API   | 60 min    | ⭐⭐⭐ Hard    |
| Implement Python ML        | 60 min    | ⭐⭐⭐ Hard    |
| Code Review with Eyes      | 30 min    | ⭐⭐ Medium    |
| Fix Issues                 | 30 min    | ⭐⭐ Medium    |
| Documentation              | 20 min    | ⭐ Easy        |
| Integration Testing        | 30 min    | ⭐⭐ Medium    |
| **TOTAL**                  | **3-4 hrs** | **⭐⭐⭐⭐ Epic** |

> **💡 TIP:** This is not a race! Take breaks between phases. The SQUAD doesn't get tired, but you do.

---

## 🎓 LEARNING OUTCOMES

After completing this lab, you'll be able to:

✅ **Decompose complex features** into implementable tasks using Brain  
✅ **Coordinate polyglot development** across TypeScript and Python  
✅ **Build production-grade APIs** with proper validation, auth, and error handling  
✅ **Implement ML features** with practical algorithms (sentiment analysis, collaborative filtering)  
✅ **Conduct thorough code reviews** using Eyes to catch security and quality issues  
✅ **Generate comprehensive documentation** with Mouth  
✅ **Test end-to-end flows** in microservices architectures  
✅ **Ship features confidently** with SQUAD-verified quality  

---

## 🏆 ACHIEVEMENTS UNLOCKED

- 🗡️ **First Blood** — Completed environment setup
- 🧠 **Master Strategist** — Used Brain to plan a complex feature
- 👐 **Polyglot Warrior** — Built features in TypeScript AND Python
- 👁️ **Eagle Eye** — Used Eyes to prevent bugs from reaching production
- 💬 **Lorekeeper** — Generated complete documentation with Mouth
- 🎯 **Full SQUAD Deploy** — Used all four SQUAD members in one quest
- 🐉 **Dragon Slayer** — Shipped a production-ready feature end-to-end
- 🌟 **Level Up!** — Gained 2700+ XP in SQUAD mastery

---

## 🆘 TROUBLESHOOTING

### 🔥 **Services Won't Start**

```bash
# Check Docker status
docker ps

# View logs
docker-compose logs api
docker-compose logs ml-service

# Restart services
docker-compose down
docker-compose up -d
```

### 🔥 **TypeScript API Errors**

```bash
cd api
npm install  # Reinstall dependencies
npm run build  # Rebuild TypeScript
docker-compose restart api
```

### 🔥 **Python ML Service Errors**

```bash
cd ml-service
pip install -e .  # Reinstall dependencies
docker-compose restart ml-service
```

### 🔥 **Database Connection Issues**

```bash
# Check PostgreSQL logs
docker-compose logs db

# Reset database (⚠️ deletes data!)
docker-compose down -v
docker-compose up -d
```

---

## 🎮 NEXT STEPS

### 🌟 **Extend the Quest**

Want to level up even more? Try these bonus challenges:

- 🔥 **Hard Mode:** Add real-time review notifications using WebSockets
- 🧙 **Wizard Mode:** Implement image upload for reviews (with ML-based moderation)
- 🏰 **Raid Boss:** Deploy to Kubernetes with auto-scaling
- 🎨 **Cosmetic Upgrade:** Build a React frontend to display reviews
- 📊 **Analytics Dashboard:** Add review sentiment trends over time

### 📚 **More Labs**

- ✅ **Getting Started with SQUAD** — Learn the basics (prerequisite)
- 🚀 **SQUAD-Driven Debugging** — Fix bugs with your party
- 🔐 **SQUAD Security Hardening** — Use Eyes to find vulnerabilities
- 📖 **SQUAD Documentation Overhaul** — Revamp docs with Mouth

---

## 📜 LICENSE

This lab is part of the **App Modernization Labs** series.  
© Microsoft Corporation. All rights reserved.

---

## 🙏 ACKNOWLEDGMENTS

**Quest Design:** Marco Antonio Silva  
**Lore & Documentation:** Dana (Technical Writer)  
**AI Party Members:** Brain 🧠, Hands 👐, Eyes 👁️, Mouth 💬  
**Platform:** GitHub Copilot + SQUAD  

---

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🎉 CONGRATULATIONS, HERO!                                 ║
║                                                            ║
║   You've mastered SQUAD-driven feature development.       ║
║   Your party is ready for any quest the codebase          ║
║   throws at you.                                          ║
║                                                            ║
║   🗡️  May your builds be green and your deploys smooth.    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

**🎮 GAME OVER — PRESS START TO SHIP MORE FEATURES 🕹️**
