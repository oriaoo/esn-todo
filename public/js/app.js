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
                    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${task.id}">
                        <span>${task.title}</span>

                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-outline-success toggle-task">
                                Done
                            </button>

                            <button class="btn btn-sm btn-outline-danger delete-task">
                                Delete
                            </button>
                        </div>
                    </li>
                `);

                form[0].reset();
            },
            error: function (xhr) {
                alert('Something went wrong');
                console.log(xhr.responseText);
            }
        });
    });
});
