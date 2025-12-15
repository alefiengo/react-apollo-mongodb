import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import './App.css';

const GET_TASKS = gql`
    query GetAllTasks {
        getAllTasks {
            id
            title
            description
        }
    }
`;

const CREATE_TASK = gql`
    mutation CreateTask($task: TaskInput!) {
        createTask(task: $task) {
            id
            title
            description
        }
    }
`;

const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $task: TaskInput) {
        updateTask(id: $id, task: $task) {
            id
            title
            description
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id)
    }
`;

function TaskForm({ onSubmit, initialData = null, onCancel = null }) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit({ title, description });
            if (!initialData) {
                setTitle('');
                setDescription('');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
            />
            <textarea
                placeholder="Task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
            />
            <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                    {initialData ? 'Update' : 'Create'} Task
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

function TaskList() {
    const { loading, error, data } = useQuery(GET_TASKS);
    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    });
    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    });

    const [editingId, setEditingId] = useState(null);

    if (loading) return <p className="loading">Loading tasks...</p>;

    if (error) {
        return (
            <div className="error">
                <p>Error connecting to the server</p>
                <p className="error-details">
                    Make sure the backend is running on http://localhost:3000/graphql
                </p>
            </div>
        );
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask({ variables: { id } });
            } catch (err) {
                alert('Error deleting task: ' + err.message);
            }
        }
    };

    const handleUpdate = async (id, taskData) => {
        try {
            await updateTask({
                variables: {
                    id,
                    task: taskData,
                },
            });
            setEditingId(null);
        } catch (err) {
            alert('Error updating task: ' + err.message);
        }
    };

    if (!data.getAllTasks || data.getAllTasks.length === 0) {
        return <p className="loading">No tasks found. Create one above!</p>;
    }

    return (
        <div className="tasks-container">
            {data.getAllTasks.map((task) => (
                <div key={task.id} className="task-card">
                    {editingId === task.id ? (
                        <TaskForm
                            initialData={task}
                            onSubmit={(taskData) => handleUpdate(task.id, taskData)}
                            onCancel={() => setEditingId(null)}
                        />
                    ) : (
                        <>
                            <h3>{task.title}</h3>
                            <p className={task.description ? '' : 'no-description'}>
                                {task.description || 'No description'}
                            </p>
                            <div className="task-actions">
                                <button
                                    onClick={() => setEditingId(task.id)}
                                    className="btn btn-edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="btn btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

function App() {
    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }],
    });

    const handleCreateTask = async (taskData) => {
        try {
            await createTask({
                variables: {
                    task: taskData,
                },
            });
        } catch (err) {
            alert('Error creating task: ' + err.message);
        }
    };

    return (
        <div className="App">
            <h2>Task Manager</h2>
            <div className="create-task-section">
                <h3>Create New Task</h3>
                <TaskForm onSubmit={handleCreateTask} />
            </div>
            <div className="tasks-section">
                <h3>My Tasks</h3>
                <TaskList />
            </div>
        </div>
    );
}

export default App;
