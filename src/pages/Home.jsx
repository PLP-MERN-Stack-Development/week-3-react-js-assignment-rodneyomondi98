 import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchPosts } from '../utils/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts(page);
        setPosts((prev) => (page === 1 ? data : [...prev, ...data]));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [page]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Search posts..."
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
          </Card>
        ))}
      </div>
      {loading && <p className="text-center">Loading...</p>}
      <div className="text-center mt-4">
        <Button onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Home;
