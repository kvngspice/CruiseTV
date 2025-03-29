import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import handDrawnCircle from '../assets/scramble.svg';

const EpisodesSection = styled.section`
  min-height: 100vh;
  padding: 60px 2rem;
  background: #0a0a0a;
  position: relative;

  @media (max-width: 768px) {
    padding: 40px 1rem;
    min-height: auto;
  }
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, #fff 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 20px;

  span.highlight {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    -webkit-text-fill-color: #f3d250;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    display: inline-block;
    transform: rotate(-2deg);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: rotate(2deg) scale(1.05);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 65%;
    width: calc(1000% + 300px);
    height: calc(160% + 40px);
    transform: translate(-50%, -50%);
    background: url(${handDrawnCircle}) no-repeat center;
    background-size: contain;
    z-index: -1;
    filter: drop-shadow(0 0 5px rgba(207, 198, 74, 0.1));
    opacity: 0.8;
    mix-blend-mode: overlay;
    animation: scrambleIn 1s ease-out forwards;
    transform-origin: center;
  }

  @keyframes scrambleIn {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 10px;
    
    &::before {
      width: calc(800% + 200px);
      height: calc(120% + 30px);
    }
  }
`;

const ScrollingContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const EpisodesGrid = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 0;
  animation: scroll 20s linear infinite;
  width: max-content;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const EpisodeCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  flex: 0 0 300px;
  scroll-snap-align: start;
  
  @media (max-width: 768px) {
    flex: 0 0 85vw;
  }
`;

const EpisodeThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${props => props.image ? `url(${props.image})` : '#1a1a1a'};
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '▶';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: rgba(255, 0, 0, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const Duration = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const EpisodeInfo = styled.div`
  padding: 1.5rem;
`;

const EpisodeTitle = styled.h3`
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const EpisodeDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const WatchButton = styled.a`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const YoutubeIcon = styled.span`
  color: #ff0000;
  font-size: 1.2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff4444;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

// Add animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Add scroll indicators
const ScrollIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2rem;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.3s ease;
`;

function LatestEpisodes() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const gridRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const CHANNEL_ID = 'UCOvGHa9GYZyyatJqsKTCWSA';

  // Auto-scroll functionality
  const autoScroll = useCallback(() => {
    if (gridRef.current && videos.length > 0) {
      const maxSlide = videos.length - 1;
      const nextSlide = activeSlide >= maxSlide ? 0 : activeSlide + 1;
      const cardWidth = gridRef.current.offsetWidth;
      
      if (nextSlide === 0) {
        // When reaching the end, quickly reset to start without animation
        gridRef.current.style.scrollBehavior = 'auto';
        gridRef.current.scrollLeft = 0;
        gridRef.current.style.scrollBehavior = 'smooth';
      } else {
        // Normal smooth scroll
        gridRef.current.scrollTo({
          left: nextSlide * cardWidth,
          behavior: 'smooth'
        });
      }
      
      setActiveSlide(nextSlide);
    }
  }, [activeSlide, videos.length]);

  // Handle scroll pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Set up auto-scroll interval
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(autoScroll, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoScroll, isPaused]);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
          throw new Error('Missing API key or Channel ID');
        }

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=4`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to fetch videos');
        }

        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
          throw new Error('No videos found for this channel');
        }

        setVideos(data.items.slice(0, 4)); // Limit to 4 videos
        setLoading(false);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [YOUTUBE_API_KEY, CHANNEL_ID]);

  if (loading) {
    return (
      <EpisodesSection>
        <Container>
          <Title>Latest <span className="highlight">Episodes</span></Title>
          <LoadingMessage>Loading videos from YouTube...</LoadingMessage>
        </Container>
      </EpisodesSection>
    );
  }

  if (error) {
    return (
      <EpisodesSection>
        <Container>
          <Title>Latest <span className="highlight">Episodes</span></Title>
          <ErrorMessage>
            Error: {error}
            <br />
            Channel ID: {CHANNEL_ID || 'Not set'}
          </ErrorMessage>
        </Container>
      </EpisodesSection>
    );
  }

  return (
    <EpisodesSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <Title>Latest <span className="highlight">Episodes</span></Title>
        <ScrollingContainer>
          <EpisodesGrid>
            {videos.map((video) => (
              <EpisodeCard
                key={video.id.videoId}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EpisodeThumbnail
                    image={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                  >
                    <Duration>{video.snippet.title}</Duration>
                  </EpisodeThumbnail>
                  <EpisodeInfo>
                    <EpisodeTitle>{video.snippet.title}</EpisodeTitle>
                    <EpisodeDetails>
                      <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
                    </EpisodeDetails>
                    <WatchButton 
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <YoutubeIcon>▶</YoutubeIcon>
                      Watch on YouTube
                    </WatchButton>
                  </EpisodeInfo>
                </a>
              </EpisodeCard>
            ))}
            {videos.map((video) => (
              <EpisodeCard
                key={`${video.id.videoId}-duplicate`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EpisodeThumbnail
                    image={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                  >
                    <Duration>{video.snippet.title}</Duration>
                  </EpisodeThumbnail>
                  <EpisodeInfo>
                    <EpisodeTitle>{video.snippet.title}</EpisodeTitle>
                    <EpisodeDetails>
                      <span>{new Date(video.snippet.publishedAt).toLocaleDateString()}</span>
                    </EpisodeDetails>
                    <WatchButton 
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <YoutubeIcon>▶</YoutubeIcon>
                      Watch on YouTube
                    </WatchButton>
                  </EpisodeInfo>
                </a>
              </EpisodeCard>
            ))}
          </EpisodesGrid>
        </ScrollingContainer>
      </Container>
    </EpisodesSection>
  );
}

export default LatestEpisodes; 