<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::latest()->get();

        return view('tasks.index', compact('tasks'));
    }

    public function store(Request $request)
    {

        // מוודא שהמשתמש הזין כותרת למשימה
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // יוצר את המשימה בטבלה
        $task = Task::create([
            'title' => $request->title,
            'is_completed' => false,
        ]);

        // מחזיר את המשימה שנוצרה
        return response()->json([
            'success' => true,
            'task' => $task
        ]);
    }

    public function toggle(Task $task)
    {

        $task->is_completed = !$task->is_completed;
        $task->save();

        return response()->json([
            'success' => true,
            'task' => $task
        ]);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
