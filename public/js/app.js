// CSRF token לבקשות ajax
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function () {
    $('#task-form').on('submit', function (e) {
        e.preventDefault();

        let form = $(this);

        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            success: function (response) {
                let task = response.task;

                $('#task-list').prepend(`
                    <li class="list-group-item d-flex align-items-center gap-3 task-item ${task.is_completed ? 'task-completed' : ''}"
                        data-id="${task.id}">

                        <input
                            class="form-check-input task-toggle m-0"
                            type="checkbox"
                            data-id="${task.id}"
                            ${task.is_completed ? 'checked' : ''}
                        >

                        <span class="task-title flex-grow-1">
                            ${task.title}
                        </span>

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-danger delete-task"
                            data-id="${task.id}">
                            Delete
                        </button>
                    </li>
                `);

                form[0].reset();

                $('.empty-tasks').addClass('d-none');
            },
            error: function (xhr) {
                alert('Something went wrong');
                console.log(xhr.responseText);
            }
        });
    });
});

$(document).on('change', '.task-toggle', function () {
    let checkbox = $(this);
    let id = checkbox.data('id');
    let item = checkbox.closest('.task-item');

    $.ajax({
        url: '/tasks/' + id + '/toggle',
        method: 'POST',
        success: function (response) {
            item.toggleClass('task-completed', response.task.is_completed);
            checkbox.prop('checked', response.task.is_completed);
        },
        error: function () {
            checkbox.prop('checked', !checkbox.prop('checked'));
            alert('Could not update task status');
        }
    });
});

$(document).on('click', '.delete-task', function () {
    let button = $(this);
    let id = button.data('id');
    let item = button.closest('.task-item');

    $.ajax({
        url: '/tasks/' + id,
        method: 'DELETE',
        success: function () {
            item.remove();

            if ($('#task-list .task-item').length === 0) {
                $('.empty-tasks').removeClass('d-none');
            }
        },
        error: function () {
            alert('Could not delete task');
        }
    });
});
