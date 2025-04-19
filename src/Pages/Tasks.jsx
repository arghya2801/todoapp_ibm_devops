import { useState } from 'react';
import { Trash2, Plus, Check, Circle, Calendar, Eye, EyeOff } from 'lucide-react';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      dueDate: newTaskDueDate
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setNewTaskDueDate('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return 0;
    }
    return a.completed ? 1 : -1;
  });

  const filteredTasks = showCompleted 
    ? sortedTasks 
    : sortedTasks.filter(task => !task.completed);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        <button 
          className="flex items-center text-gray-600 hover:text-blue-500"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? 
            <><EyeOff size={18} className="mr-1" /> Hide Completed</> : 
            <><Eye size={18} className="mr-1" /> Show Completed</>
          }
        </button>
      </div>
      
      <div className="flex mb-6 gap-2">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="relative flex items-center">
          <Calendar size={18} className="absolute left-2 text-gray-500" />
          <input
            type="date"
            className="pl-8 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
          onClick={addTask}
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-3">No tasks to display</p>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
            >
              <div className="flex items-center flex-grow">
                <button 
                  className="text-gray-500 hover:text-blue-500 mr-2"
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.completed ? 
                    <Check className="text-green-500" size={20} /> : 
                    <Circle size={20} />
                  }
                </button>
                <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {task.text}
                </span>
              </div>
              
              {task.dueDate && (
                <div className="text-sm text-gray-500 mx-4">
                  Due: {formatDate(task.dueDate)}
                </div>
              )}
              
              <button 
                className="text-gray-400 hover:text-red-500" 
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        {tasks.filter(task => task.completed).length} of {tasks.length} tasks completed
      </div>
    </div>
  );
}