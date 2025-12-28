# 📉 Short Interest Tracker

A modern web application that tracks the **top 25 most shorted stocks** using real data from FINRA (Financial Industry Regulatory Authority).

## 🚀 Live Demo

**[https://stocks-shorted.vercel.app](https://stocks-shorted.vercel.app/)**

---

## 📊 What It Does

This app displays the most heavily shorted stocks in the US stock market, helping traders and investors identify potential short squeeze candidates and market sentiment.

### Key Metrics Displayed:
- **Ticker & Company Name** - Stock symbol and company
- **Short Interest** - Total number of shares currently sold short
- **Average Volume** - Average daily trading volume
- **Days to Cover** - How many days it would take to cover all short positions based on average volume
- **Change %** - Percentage change in short interest from the previous reporting period

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📈 **Real FINRA Data** | Official short interest data from the Financial Industry Regulatory Authority |
| 🔄 **Auto-Refresh** | Data refreshes automatically every 60 seconds |
| 🌙 **Dark Theme** | Modern dark UI with gradient accents and glassmorphism effects |
| 📱 **Responsive** | Works on desktop, tablet, and mobile devices |
| ⚡ **Fast** | Built with Next.js 14+ and optimized for performance |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: Tailwind CSS
- **Data Source**: [FINRA API](https://developer.finra.org/)
- **Hosting**: [Vercel](https://vercel.com/)

---

## 🏃 Running Locally

```bash
# Clone the repository
git clone https://github.com/mitvpatel97/stocksShorted.git

# Navigate to the project
cd stocksShorted

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 License

MIT License - feel free to use this project for your own purposes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a PR or issue.

---

Built with ❤️ using Next.js and shadcn/ui
