@extends('layouts.app')

@section('content')
    <div class="container py-5">
        <div class="row justify-content-center">

            <div class="col-lg-7">

                <div class="card border-0 shadow-lg rounded-4">

                    <div class="card-body p-5">
                        <div class="text-center mb-4">
                            <div class="logo-icon mb-3">
                                <i class="bi bi-card-checklist"></i>
                            </div>
                            <h1 class="display-6 fw-bold mb-2">
                                ESN Todo List
                            </h1>
                            <p class="text-secondary">
                                Organize your tasks and get things done
                            </p>
                        </div>
                        <form id="task-form" action="{{ route('tasks.store') }}" method="POST" class="mb-4">
                            @csrf
                            <div class="input-group input-group-lg">
                                <span class="input-group-text">
                                    <i class="bi bi-pencil-square"></i>
                                </span>
                                <input type="text" class="form-control" id="task-title" name="title"
                                    placeholder="What do you need to do?">
                                <button class="btn btn-success">
                                    <i class="bi bi-plus-lg me-1"></i>
                                    Add
                                </button>
                            </div>
                        </form>
                        <div class="btn-group w-100 mb-4">
                            <button class="btn btn-success filter-option py-2" data-filter="all">
                                <i class="bi bi-list-ul me-2"></i>
                                All
                            </button>
                            <button class="btn btn-outline-success filter-option" data-filter="active">
                                <i class="bi bi-circle me-2"></i>
                                Active
                            </button>
                            <button class="btn btn-outline-success filter-option" data-filter="completed">
                                <i class="bi bi-check-circle me-2"></i>
                                Completed
                            </button>
                        </div>
                        <ul class="list-group border-0" id="task-list">
                            @foreach ($tasks as $task)
                                <li class="list-group-item task-item rounded-4 mb-3 border-0 shadow-sm d-flex align-items-center gap-3 {{ $task->is_completed ? 'task-completed' : '' }}"
                                    data-id="{{ $task->id }}">
                                    <input class="form-check-input task-toggle" type="checkbox"
                                        data-id="{{ $task->id }}" {{ $task->is_completed ? 'checked' : '' }}>
                                    <span class="task-title flex-grow-1">
                                        {{ $task->title }}
                                    </span>
                                    <button class="btn btn-light edit-task" data-id="{{ $task->id }}">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button class="btn btn-light text-danger delete-task" data-id="{{ $task->id }}">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </li>
                            @endforeach
                            <li
                                class="list-group-item text-center text-muted empty-tasks {{ $tasks->count() ? 'd-none' : '' }}">
                                No tasks yet.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
