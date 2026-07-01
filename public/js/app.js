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
                            class="btn btn-sm btn-outline-primary edit-task"
                            data-id="${task.id}">
                            Edit
                        </button>
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

$(document).on('click', '.edit-task', function () {
    // תופסים את השורה של המשימה ואת הכותרת הנוכחית
    let button = $(this);
    let id = button.data('id');
    let item = button.closest('.task-item');
    let titleSpan = item.find('.task-title');
    let currentTitle = titleSpan.text().trim();


    // יוצר אינוט לעריכה ומכניס את הטקסט הנוכחי מחליף את הspan לאינפוט  כדי שהמשתמש יראה שדה עריכה
    let inputField = $(`
        <input type="text" class="form-control form-control-sm flex-grow-1 edit-task-input">
    `);

    inputField.val(currentTitle);
    titleSpan.replaceWith(inputField);
    inputField.focus();

   inputField.on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        saveTask(inputField, id, currentTitle);
    }

    if (e.key === 'Escape') {
        inputField.replaceWith(`<span class="task-title flex-grow-1">${currentTitle}</span>`);
    }
});

inputField.on('blur', function () {
    saveTask(inputField, id, currentTitle);
});
});



// פונקציה לשמירת העריכה של המשימה בלחיצה מחוץ לאינפוט או אינטר
// לחיצה על esc תבטל את הפעולה
function saveTask(inputField, id, currentTitle) {
    let newTitle = inputField.val().trim();

    if (!newTitle) {
        inputField.replaceWith(`<span class="task-title flex-grow-1">${currentTitle}</span>`);
        return;
    }

    $.ajax({
        url: '/tasks/' + id,
        method: 'PUT',
        data: {
            title: newTitle
        },
        success: function (response) {
            inputField.replaceWith(`
                <span class="task-title flex-grow-1">${response.task.title}</span>
            `);
        },
        error: function () {
            inputField.replaceWith(`
                <span class="task-title flex-grow-1">${currentTitle}</span>
            `);
        }
    });
}


// סינון המשימות לפי הסטטוס שנבחר
$('.filter-option').on('click', function () {
    let selectedButton = $(this);
    let filter = selectedButton.data('filter');

    $('.filter-option')
        .removeClass('btn-primary active')
        .addClass('btn-outline-primary');

    selectedButton
        .removeClass('btn-outline-primary')
        .addClass('btn-primary active');

    $('.task-item').each(function () {
        let item = $(this);
        let isCompleted = item.hasClass('task-completed');

        if (filter === 'all') {
            item.removeClass('d-none');
        } else if (filter === 'completed' && isCompleted) {
            item.removeClass('d-none');
        } else if (filter === 'active' && !isCompleted) {
            item.removeClass('d-none');
        } else {
            item.addClass('d-none');
        }
    });
});
