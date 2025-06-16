import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Container, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  CircularProgress,
  Paper,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Send as SendIcon, Create as CreateIcon, Article as ArticleIcon } from '@mui/icons-material';
import './App.css';

interface Post {
  id?: number;
  title: string;
  content: string;
  author?: string;
  created_at?: string;
}

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [post, setPost] = useState<Post>({
    title: '',
    content: '',
    author: ''
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoadingPosts(true);
      const response = await fetch('http://localhost:8000/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Error fetching posts', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: 'linear-gradient(45deg, #ff5252 30%, #ff1744 90%)',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }
      });
      setPosts([]);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const postData = { ...post };
      if (!postData.author?.trim()) {
        delete postData.author;
      }
      
      const response = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      toast.success('Post created successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: 'linear-gradient(45deg, #4caf50 30%, #45a049 90%)',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }
      });
      setPost({ title: '', content: '', author: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error creating post', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          background: 'linear-gradient(45deg, #ff5252 30%, #ff1744 90%)',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box className="app-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <Container maxWidth="md" sx={{ py: isMobile ? 2 : 4 }}>
        <Paper elevation={3} sx={{ 
          p: isMobile ? 2 : 4, 
          mb: 3, 
          borderRadius: 3, 
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CreateIcon sx={{ fontSize: isMobile ? 24 : 32, mr: 1.5, color: '#2196f3' }} />
            <Typography variant={isMobile ? "h5" : "h4"} component="h1" sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Create a New Post
            </Typography>
          </Box>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#2196f3',
                  },
                },
              }}
            />
            
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              multiline
              rows={isMobile ? 3 : 4}
              margin="normal"
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#2196f3',
                  },
                },
              }}
            />
            
            <TextField
              fullWidth
              label="Author (optional)"
              name="author"
              value={post.author}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              size={isMobile ? "small" : "medium"}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#2196f3',
                  },
                },
              }}
            />
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={loading}
                sx={{ 
                  minWidth: isMobile ? 150 : 200,
                  height: isMobile ? 40 : 48,
                  borderRadius: 24,
                  background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #1CB5E0 90%)',
                  }
                }}
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              >
                {loading ? 'Creating...' : 'Create Post'}
              </Button>
            </Box>
          </form>
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ArticleIcon sx={{ fontSize: isMobile ? 20 : 24, mr: 1, color: '#1976d2' }} />
          <Typography variant={isMobile ? "h6" : "h5"} component="h2" sx={{ 
            fontWeight: 600,
            color: '#1976d2'
          }}>
            Recent Posts
          </Typography>
        </Box>

        {isLoadingPosts ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : posts.length === 0 ? (
          <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
            <Typography color="text.secondary">
              No posts yet. Be the first to create one!
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {posts.map((post) => (
              <Card 
                key={post.id} 
                elevation={2} 
                sx={{ 
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                  <Typography variant={isMobile ? "subtitle1" : "h6"} component="h3" gutterBottom sx={{ 
                    fontWeight: 600,
                    color: '#1976d2'
                  }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ 
                    lineHeight: 1.6,
                    mb: 1.5
                  }}>
                    {post.content}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {post.author && (
                      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        By: {post.author}
                      </Typography>
                    )}
                    {post.created_at && (
                      <Typography variant="caption" color="text.secondary">
                        {new Date(post.created_at).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
