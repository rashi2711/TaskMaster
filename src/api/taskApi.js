const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTasksFromAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}/todos?_limit=10`);
    const data = await response.json();
    return data.map(item => ({
      id: item.id.toString(),
      title: item.title,
      completed: item.completed,
      priority: item.id % 3 === 0 ? 'High' : item.id % 2 === 0 ? 'Medium' : 'Low',
      createdAt: new Date().toISOString(),
      description: `Task fetched from API. ID: ${item.id}`,
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};