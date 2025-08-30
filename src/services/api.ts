const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async () => {
  try {
    const response = await fetch(`${BASE_URL}?_limit=10`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
};

export const createTodoRemote = async (task: any) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to create todo:", error);
  }
};

export const updateTodoRemote = async (id: number, data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to update todo:", error);
  }
};

export const deleteTodoRemote = async (id: number) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};
