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
                        <div class="btn-group mb-3" role="group">
                            <button type="button" class="btn btn-primary filter-option active" data-filter="all">
                                All
                            </button>

                            <button type="button" class="btn btn-outline-primary filter-option" data-filter="active">
                                Active
                            </button>

                            <button type="button" class="btn btn-outline-primary filter-option" data-filter="completed">
                                Completed
                            </button>
                        </div>
                        <ul class="list-group" id="task-list">
                            @forelse ($tasks as $task)
                                <li class="list-group-item d-flex align-items-center gap-3 task-item {{ $task->is_completed ? 'task-completed' : '' }}"
                                    data-id="{{ $task->id }}">

                                    <input class="form-check-input task-toggle m-0" type="checkbox"
                                        data-id="{{ $task->id }}" {{ $task->is_completed ? 'checked' : '' }}>

                                    <span class="task-title flex-grow-1">
                                        {{ $task->title }}
                                    </span>

                                    <button type="button" class="btn btn-sm btn-outline-primary edit-task"
                                        data-id="{{ $task->id }}">
                                        Edit
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-danger delete-task"
                                        data-id="{{ $task->id }}">
                                        Delete
                                    </button>
                                </li>
                            @empty
                                <li class="list-group-item text-center text-muted empty-tasks">
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
