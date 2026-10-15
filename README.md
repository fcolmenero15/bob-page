# Bob Learning Hub

This website serves as a dedicated learning hub for Bobathon attendees to continue exploring Bob beyond the event. While a Bobathon introduces users to Bob’s capabilities, meaningful adoption happens through ongoing, hands-on experience. This platform supports that journey by bringing together personalized resources, tutorials, demonstration videos, use cases, and other learning materials tailored to each audience.

Users can easily discover content that aligns with their interests, skill level, and business needs, allowing them to revisit key concepts, deepen their understanding, and uncover new ways to leverage Bob in their daily work. By extending learning beyond the Bobathon experience, this encourages ongoing engagement with Bob, helping our IBM sales teams with adoption and deployment.

---

Please feel free to clone and customize this site using the instructions below.

## 1. Setting Up Your Repository

Choose one of the two ways below to get your own copy of the codebase:

### Method A: Fresh Repository (Recommended for Multiple Versions)
If you want a standalone repository or plan to create multiple separate versions under your account:

1. Create a new empty repository on GitHub (do not initialize with a README).
2. Clone this repository to your local computer:
   ```bash
   git clone <source-repository-url> my-bob-page
   cd my-bob-page
   ```
3. Re-link the remote to your new repository:
   ```bash
   git remote set-url origin https://github.com/<your-username>/<your-new-repo>.git
   ```
4. Push the code to your repository:
   ```bash
   git push -u origin main
   ```

### Method B: Forking (Quick Single Copy)
If you only need a single linked copy under your GitHub account:

1. Click the **Fork** button at the top-right of this repository.
2. Clone your fork locally to make edits:
   ```bash
   git clone https://github.com/<your-username>/bob-page.git
   cd bob-page
   ```

---

## 2. Running & Deploying

### Option A: GitHub Pages Deployment
To host your customized site live on GitHub Pages:

1. **Enable GitHub Pages (Deploy from a Branch)**:
   - In your repository on GitHub, go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `gh-pages` and `/ (root)`, then click **Save**.

2. **Deploy**:
   - Push your changes to the `main` branch. The repository's automated workflow will build the project and push the output to the `gh-pages` branch, which GitHub Pages serves from.

### Option B: Local Development
To run and test the site locally on your computer:

#### Prerequisites
- Node.js (v18 or newer)

#### Commands
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

## 3. Customizing Resources with Bob

> **Note:** The **Personalized Resources** page is currently disabled for privacy reasons regarding client documents.

See [`adding_changes.md`](adding_changes.md) for full instructions and prompt examples on using **Bob** to update client branding, add new presentations/PDFs, or swap out personalized workshop resources once enabled.