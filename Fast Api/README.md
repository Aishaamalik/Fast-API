# FastAPI Blog Application

A modern blog application built with FastAPI backend and React frontend, featuring real-time post creation and beautiful UI.

## Features

- Create and view blog posts
- Modern and responsive UI
- Real-time notifications
- Beautiful animations and transitions
- Mobile-friendly design
- Clean and intuitive user interface

## Prerequisites

- Python 3.7+
- Node.js 14+
- npm or yarn

## Installation

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Fast-Api
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI backend:
```bash
uvicorn main:app --reload
```
The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```
The frontend will be available at `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Create a new post by filling out the form:
   - Title (required)
   - Content (required)
   - Author (optional)
3. Click "Create Post" to submit
4. View your posts in the "Recent Posts" section
5. Posts are displayed in chronological order with author information and timestamps

## API Endpoints

### Backend API

- `GET /api/posts` - Retrieve all posts
- `POST /api/posts` - Create a new post

## Technologies Used

### Backend
- FastAPI
- Pydantic
- Python 3.7+

### Frontend
- React
- TypeScript
- Material-UI
- React-Toastify

## Development

### Backend Development
- The backend uses FastAPI for high performance and automatic API documentation
- Data is currently stored in memory (can be extended to use a database)
- CORS is enabled for local development

### Frontend Development
- Built with React and TypeScript for type safety
- Uses Material-UI for consistent and modern design
- Implements responsive design for all screen sizes
- Features toast notifications for user feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FastAPI documentation
- Material-UI components
- React-Toastify for notifications 