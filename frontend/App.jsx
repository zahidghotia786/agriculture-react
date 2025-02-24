import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState([]);

  const fetchingData = async () => {
    try {
      const response = await axios.get('http://localhost:3007/post');
      setData(response.data); 
    } catch (error) {
      alert('Error fetching data');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-500">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-8">User Data</h1>
      {data.length > 0 ? (
        <ul className=" relative w-[800px] border border-gray-400 rounded-lg flex flex-wrap justify-around items-center shadow-2xl">
          {data.map((post) => (
            <li key={post.id} className="relative w-[380px] h-[420px] bg-gray-700 border border-blue-300 rounded-lg mt-5 mb-5 shadow-lg transition-transform transform hover:scale-105 ease-in-out duration-300 ">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-400 mb-3 mt-4">{post.title}</h2>
                <p className="text-gray-300 mb-3">{post.content}</p>
                <div className="flex flex-wrap">
                  {post.tags && post.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-300 text-blue-700 px-3 py-1 mr-2 mt-3 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                {post.imageUrl && (
                  <div className='absolute left-0 bottom-0 w-full flex justify-center'>
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-[300px] h-48 object-cover rounded-lg mb-3"
                    />
                    </div>
                )}
              </div>
              <div className='absolute right-3 top-3 rounded-full w-[50px] h-[50px] border border-gray-500'>
                {post.userImg && (
                  <img
                  src={post.userImg}
                  alt={post.username}
                  className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
            </li>
          ))}

        </ul>
      ) : (
        <p className="text-gray-600">Loading data...</p>
      )}
    </div>
  );
}
