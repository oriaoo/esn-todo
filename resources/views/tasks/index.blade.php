@extends('layouts.app')

@section('content')
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">

                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">

                        <h1 class="h3 text-center mb-4">ESN Todo List</h1>

                        <form action="{{ route('tasks.store') }}" method="POST" class="mb-4" id="task-form">
                            @csrf

                            <div class="input-group">
                                <input type="text" name="title" id="task-title" class="form-control form-control-lg"
                                    placeholder="What do you need to do?" required>

                                <button type="submit" class="btn btn-primary px-4">
                                    Add
                                </button>
                            </div>
                        </form>

                        <ul class="list-group" id="task-list">
                            @forelse ($tasks as $task)
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span
                                        class="{{ $task->is_completed ? 'text-decoration-line-through text-muted' : '' }}">
                                        {{ $task->title }}
                                    </span>

                                    <div class="d-flex gap-2">
                                        <form action="{{ route('tasks.toggle', $task) }}" method="POST">
                                            @csrf
                                            <button type="submit" class="btn btn-sm btn-outline-success">
                                                {{ $task->is_completed ? 'Undo' : 'Done' }}
                                            </button>
                                        </form>

                                        <form action="{{ route('tasks.destroy', $task) }}" method="POST">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-sm btn-outline-danger">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </li>
                            @empty
                                <li class="list-group-item text-center text-muted">
                                    No tasks yet.
                                </li>
                            @endforelse
                        </ul>

                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
