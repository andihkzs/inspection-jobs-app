# Online Inspection Form Webapp with Chat

A modern, responsive web application for handling inspection forms with integrated real-time chat functionality. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **📋 Interactive Form Interface**: Multi-section inspection form with real-time validation
- **💬 Real-time Chat**: Integrated chat system for customer support
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **🔄 Auto-save**: Automatic form progress saving
- **📎 File Upload**: Drag-and-drop file upload functionality
- **🎨 Modern UI**: Clean, professional interface with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Yup validation
- **State Management**: Zustand
- **Real-time Chat**: Socket.io Client
- **File Upload**: React Dropzone
- **PDF Generation**: jsPDF

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inspection-jobs-app.git
   cd inspection-jobs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/
│   ├── chat/          # Chat functionality components
│   ├── jobs/          # Job management components
│   ├── layout/        # Layout and navigation components
│   └── ui/            # Reusable UI components
├── pages/             # Main page components
├── stores/            # Zustand state management
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## 🌐 Deployment

### Netlify
1. Build the app: `npm run build`
2. Drag the `build` folder to Netlify dashboard
3. Or connect your GitHub repo for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

## 📋 Form Features

- Multi-section form navigation
- Real-time field validation
- Auto-save functionality
- File upload with drag-and-drop
- Progress tracking
- Conditional field display

## 💬 Chat Features

- Real-time messaging
- File sharing
- Typing indicators
- Message history
- User status indicators

## ⚙️ Configuration

The app uses environment variables for configuration. Create a `.env.local` file in the root directory:

```env
REACT_APP_API_URL=your_api_url
REACT_APP_SOCKET_URL=your_socket_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please open an issue on GitHub or contact the development team.
